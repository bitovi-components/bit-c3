import QUnit from "steal-qunit";
import F from "funcunit";
import ChartVM from "bit-c3/chart";
import DataVM from "bit-c3/data/";
import ColumnVM from "bit-c3/data/column/";
import GroupVM from "bit-c3/data/group/";
import NameVM from "bit-c3/data/name/";
import TypeVM from "bit-c3/data/type/";
import YGridVM from "bit-c3/y-grid/";
import YGridLineVM from "bit-c3/y-grid/y-grid-line/";
import {randomString} from "bit-c3/lib/";
import DefineList from "can-define/list/list";
import DefineMap from "can-define/map/map";
import stache from "can-stache";

F.attach(QUnit);

var flattenCanList = function(list) {
	var flatList = [];
	list.forEach((value, index) => {
		flatList.push(value.get());
	});
	return flatList;
}

QUnit.module('bit-c3');

// no tests currently

QUnit.module('bit-c3-data');

test('loadAttributeOnChart and loadAllAttributesOnChart', 20, () => {
	var groupsArray = [['group1a', 'group1b'], ['group2']],
		groups = new DefineList(groupsArray),
		transform = 'line',
		names = new DefineList(['foo', 'bar']);

	var chart = {
		groups: function(data) {
			deepEqual(groupsArray, flattenCanList(new DefineList(data)), "groups is passed the correct data")
		},
		transform: function(data) {
			deepEqual(transform, data, "transform is passed the correct data")
		},
		data: {
			names: function(data) {
				deepEqual(names, data, "names is passed the correct data");
			}
		}
	}

	var vm = new DataVM({
		chart: chart,
		groups: groups,
		type: transform
	});

	// two updates should be made for the above 3 attributes
	vm.loadAllAttributesOnChart();

	// if no value is passed, make sure value is looked up
	vm.loadAttributeOnChart('type');

	// if a sub-attribute changes, make sure value is the full value
	vm.loadAttributeOnChart('groups.1', ['group2']);

	// test transform
	vm.loadAttributeOnChart('type', transform);

	// test group
	vm.loadAttributeOnChart('groups', groups);

	// test chart
	equal(undefined, vm.loadAttributeOnChart('chart'), "chart changes are ignored");

	// test standard attributes
	equal(undefined, vm.loadAttributeOnChart('standardAttributes'), "standardAttributes changes are ignored");

	// test names
	vm.loadAttributeOnChart('names', names);

	// test standard attributes
	['url', 'json', 'columns', 'rows', 'classes', 'categories', 'axes', 'colors', 'types', 'unload', 'done'].forEach((value) => {
		vm.chart.load = function(obj) {
			var expected = {};
			expected[value] = 'foo';
			deepEqual(expected, obj, "load is passed the correct data for " + value);	
		}
		vm.loadAttributeOnChart(value, 'foo');
	})

	// test fake attribute
	vm.loadAttributeOnChart('foo', 'bar');
});

QUnit.module('bit-c3-data-column');

test('dequeueKey', () => {
	var vm = new ColumnVM({
		value: new DefineList(['key', 1, 2, 3])
	});

	// no key set - gets key from DataVM
	deepEqual(vm.dequeueKey(), [1, 2, 3], 'dequeueKey returns data without first element');
	equal(vm.key, 'key', 'key is set as first value in set');

	// change data, key doesn't change
	vm.value.push(4);
	deepEqual(vm.dequeueKey(), [1, 2, 3, 4], "dequeueKey returns data without first element after key is set and doesn't change");
	equal(vm.key, 'key', "key doesn't change if data changes but key doesn't");

	// key, old key remains with data
	vm.key = 'newKey';
	deepEqual(vm.dequeueKey(), ['key', 1, 2, 3, 4], "first element is no longer key, remains with data");
	equal(vm.key, 'newKey', 'new key is set and not changed by data set');	
});

test('updateColumn and unloadColumn', 6, () => {
	var chart = {
		load: function(obj) {
			deepEqual(obj, {
				'columns': [
					['key', 1, 2, 3]
				]
			}, "load called with correct value");
		},
		unload: function(obj) {
			deepEqual(obj, {
				'ids': 'key'
			});
		}
	};

	// chart load is called with correct params if value provided
	var vm1 = new ColumnVM({
		value: new DefineList(['key', 1, 2, 3]),
		chart: chart
	});
	vm1.updateColumn();
	vm1.unloadColumn();

	// chart load is called with correct params if key and value provided
	var vm2 = new ColumnVM({
		value: new DefineList([1, 2, 3]),
		key: 'key',
		chart: chart
	});
	vm2.updateColumn();
	vm2.unloadColumn();

	// chart unload is called if value is empty
	var vm3 = new ColumnVM({
		value: new DefineList([]),
		key: 'key',
		chart: chart
	});
	vm3.updateColumn();
	vm3.unloadColumn();
});

QUnit.module('bit-c3-data-group');

test('adding, removing, and updating groups', () => {
	var value = new DefineList([1, 2, 3]),
		vm = new GroupVM({
			value: value,
			groups: {}
		});

	// adding a value creates a new entry in groups
	vm.addToGroups();
	var key = vm.key;
	deepEqual(vm.groups[key], value, "groups is set correctly");

	// updating value updates the group
	value.push(4);
	vm.updateGroup();
	deepEqual(vm.groups[key], value, "groups is updated correctly");

	// removal removes the group
	vm.removeFromGroups();
	equal(vm.groups[key], undefined, "group no longer exists");
});

QUnit.module('bit-c3-data-name');

test('updateName', 1, () => {
	var key = 'foo',
		value = 'bar',
		chart = {
			data: {
				names: function(obj) {
					var result = {};
					result[key] = value;
					deepEqual(result, obj, "names is called with correct object");
				}
			}
		},
		vm = new NameVM({
			chart: chart,
			key: key,
			value: value
		});
	vm.updateName();
});

QUnit.module('bit-c3-data-type');

test('updateType', 2, () => {
	var key = 'foo',
		value = 'bar',
		chart = {
			transform: function(resVal, resKey) {
				equal(resVal, value, "transform is called with the correct value");
				equal(resKey, key, "transform is called with the correct key");
			}
		},
		vm = new TypeVM({
			chart: chart,
			key: key,
			value: value
		});
	vm.updateType();
});

QUnit.module('bit-c3-y-grid');

test('updateLine', 1, () => {
	var line = 'foo',
		chart = {
			ygrids: function(obj) {
				deepEqual(obj, [line], "ygrids is passed the correct value");
			}
		},
		vm = new YGridVM({
			chart: chart,
			lines: new DefineList([line])
		});
	vm.updateLines();
});

QUnit.module('bit-c3-y-grid-line');

test('adding, removing, and updating lines', () => {
	var value = 'foo',
		text = 'bar',
		line = {
			value: value,
			text: text,
			position: null,
			class: null
		},
		vm = new YGridLineVM({
			value: value,
			text: text,
			lines: {}
		});

	// gridline getter
	deepEqual(vm.gridLine, line, "gridline getter makes correct object");

	// adding a value creates a new entry in lines
	vm.addToLines();
	var key = vm.key;
	deepEqual(vm.lines[key], line, "lines is set correctly");

	// updating value updates the lines
	var newVal = 'baz';
	line.value = newVal;
	vm.value = newVal;
	vm.updateLines();
	deepEqual(vm.lines[key], line, "lines is updated correctly");

	// removal removes the line
	vm.removeFromLines();
	equal(vm.lines[key], undefined, "line no longer exists");
});

QUnit.module('lib');

test('randomString generates a correct length string', () => {
	var stringLength = 50;
	equal(randomString(stringLength).length, stringLength);
});


QUnit.module('Template tests (slow)');

test('Should remove chart from DOM correctly', 1, (assert) => {
	let tpl = '{{#if isVisible}}<bit-c3><bit-c3-data><bit-c3-data-column/></bit-c3-data></bit-c3>{{/if}}',
		vm = new (DefineMap.extend({
			isVisible: {value: true}
		}))(),
		frag = stache(tpl)(vm);

	// We need to render the fragment because test requires the "inserted" event of the components being called:
	document.getElementById('qunit-fixture').appendChild(frag);

	vm.isVisible = false;

	// The test will fail if removing the chart from DOM causes a JS exception.
	assert.ok(true, 'Chart was correctly removed');
});
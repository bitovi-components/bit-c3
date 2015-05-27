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

F.attach(QUnit);

var flattenCanList = function(list) {
	var flatList = [];
	list.each((value, index) => {
		flatList.push(value.attr());
	});
	return flatList;
}

QUnit.module('bit-c3');

// no tests currently

QUnit.module('bit-c3-data');

test('loadAttributeOnChart and loadAllAttributesOnChart', 20, () => {
	var groupsArray = [['group1a', 'group1b'], ['group2']],
		groups = new can.List(groupsArray),
		transform = 'line',
		names = new can.List(['foo', 'bar']);

	var chart = {
		groups: function(data) {
			deepEqual(groupsArray, flattenCanList(new can.List(data)), "groups is passed the correct data")
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
		vm.attr('chart').load = function(obj) {
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
		value: new can.List(['key', 1, 2, 3])
	});

	// no key set - gets key from DataVM
	deepEqual(vm.dequeueKey(), [1, 2, 3], 'dequeueKey returns data without first element');
	equal(vm.attr('key'), 'key', 'key is set as first value in set');

	// change data, key doesn't change
	vm.attr('value').push(4);
	deepEqual(vm.dequeueKey(), [1, 2, 3, 4], "dequeueKey returns data without first element after key is set and doesn't change");
	equal(vm.attr('key'), 'key', "key doesn't change if data changes but key doesn't");

	// key, old key remains with data
	vm.attr('key', 'newKey');
	deepEqual(vm.dequeueKey(), ['key', 1, 2, 3, 4], "first element is no longer key, remains with data");
	equal(vm.attr('key'), 'newKey', 'new key is set and not changed by data set');	
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
		value: new can.List(['key', 1, 2, 3]),
		chart: chart
	});
	vm1.updateColumn();
	vm1.unloadColumn();

	// chart load is called with correct params if key and value provided
	var vm2 = new ColumnVM({
		value: new can.List([1, 2, 3]),
		key: 'key',
		chart: chart
	});
	vm2.updateColumn();
	vm2.unloadColumn();

	// chart unload is called if value is empty
	var vm3 = new ColumnVM({
		value: new can.List([]),
		key: 'key',
		chart: chart
	});
	vm3.updateColumn();
	vm3.unloadColumn();
});

QUnit.module('bit-c3-data-group');

// no tests currently

QUnit.module('bit-c3-data-name');

// no tests currently

QUnit.module('bit-c3-data-type');

// no tests currently

QUnit.module('bit-c3-y-grid');

// no tests currently

QUnit.module('bit-c3-y-grid-line');

// no tests currently

QUnit.module('lib');

test('randomString generates a correct length string', () => {
	var stringLength = 50;
	equal(randomString(stringLength).length, stringLength);
});
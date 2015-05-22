import can from "can";
import 'can/map/define/';
import d3 from "d3";
import c3 from "c3";
import "c3/c3.css!";
import template from "./c3-chart.stache!";
import C3ChartViewModel from './viewmodel';

var randomString = function(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for(var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

/**
 * @module {can.Component} c3-chart.reference.c3-chart.c3-data.c3-data-group <c3-data-group>
 * @parent c3-chart.reference.c3-chart.c3-data 3
 *
 * @author Kyle Gifford
 *
 * @description
 * Chart data group element
 *
 * @signature '<c3-data-group></c3-data-group>'
 * @param {Array} value Data keys to be grouped.
 *
 * @body
 *
 * ## Component Initialization
 *
 * ```html
 *   <c3-data-group value="['data1', 'data2']"></c3-data-group>
 * ```
 */
can.Component.extend({
	tag: "c3-data-group",
	viewModel: {
		define: {
			'valueSerialized': {
				get: function() {
					return this.attr('value').serialize();
				}
			}
		},
		'groups': null,
		'key': null,
		'value': null,
		'addToGroups': function() {
			var key = randomString(50);
			this.attr('key', key);
			this.attr('groups').attr(key, this.attr('value'));
		},
		'updateGroup': function() {
			this.attr('groups').attr(this.attr('key'), this.attr('value'));
		},
		'removeFromGroups': function() {
			this.attr('groups').removeAttr(this.attr('key'));
		}
	},
	events: {
		inserted: function(viewModel, ev) {
			this.viewModel.attr('groups', this.element.parent().scope().attr('groups'));
			this.viewModel.addToGroups();
		},
		removed: function() {
			this.viewModel.removeFromGroups();
		},
		"{viewModel} valueSerialized": function() {
			this.viewModel.updateGroup();
		}
	}
});

/**
 * @module {can.Component} c3-chart.reference.c3-chart.c3-data.c3-data-type <c3-data-type>
 * @parent c3-chart.reference.c3-chart.c3-data 2
 *
 * @author Kyle Gifford
 *
 * @description
 * Chart data type element
 *
 * @signature '<c3-data-type></c3-data-type>'
 * @param {String} key Key for the data column.
 * @param {String} value Type for the data column.
 *
 * @body
 *
 * ## Component Initialization
 *
 * ```html
 *   <c3-data-type key="dataSet1" value="spline"></c3-data-type>
 * ```
 */
can.Component.extend({
	tag: "c3-data-type",
	viewModel: {
		define: {
			chart: {
				type: '*',
				value: null
			}
		},
		'key': null,
		'updateType': function() {
			var chart = this.attr('chart');
			chart.transform(this.attr('value'), this.attr('key'));
		}
	},
	events: {
		inserted: function(viewModel, ev) {
			this.viewModel.attr('chart', this.element.parent().scope().attr('chart'));
			this.viewModel.updateType();
		},
		"{viewModel} value": function() {
			this.viewModel.updateType();
		}
	}
});

/**
 * @module {can.Component} c3-chart.reference.c3-chart.c3-data.c3-data-name <c3-data-name>
 * @parent c3-chart.reference.c3-chart.c3-data 1
 *
 * @author Kyle Gifford
 *
 * @description
 * Chart data name element
 *
 * @signature '<c3-data-name></c3-data-name>'
 * @param {String} key Key for the data column.
 * @param {String} value Name for the data column.
 *
 * @body
 *
 * ## Component Initialization
 *
 * ```html
 *   <c3-data-name key="dataSet1" value="Data Set 1"></c3-data-name>
 * ```
 */
can.Component.extend({
	tag: "c3-data-name",
	viewModel: {
		define: {
			chart: {
				type: '*',
				value: null
			}
		},
		'key': null,
		'updateName': function() {
			var chart = this.attr('chart'),
				newName = {};
			newName[this.attr('key')] = this.attr('value');
			chart.data.names(newName);
		}
	},
	events: {
		inserted: function(viewModel, ev) {
			this.viewModel.attr('chart', this.element.parent().scope().attr('chart'));
			this.viewModel.updateName();
		},
		"{viewModel} value": function() {
			this.viewModel.updateName();
		}
	}
});

/**
 * @module {can.Component} c3-chart.reference.c3-chart.c3-data.c3-data-column <c3-data-column>
 * @parent c3-chart.reference.c3-chart.c3-data 0
 *
 * @author Kyle Gifford
 *
 * @description
 * Chart data column element
 *
 * @signature '<c3-data-column></c3-data-column>'
 * @param {String} key Key for the data column.
 * @param {Array} value Data values.
 *
 * @body
 *
 * ## Component Initialization
 *
 * ```html
 *   <c3-data-column value="['dataSet1', 1, 2, 3, 2]"></c3-data-column>
 * ```
 *
 * ```html
 *   <c3-data-column key="dataSet1" value="[1, 2, 3, 2]"></c3-data-column>
 * ```
 */
can.Component.extend({
	tag: "c3-data-column",
	viewModel: {
		define: {
			chart: {
				type: '*',
				value: null
			},
			valueSerialized: {
				get: function(val) {
					return this.attr('value').serialize();
				}
			}
		},
		'value': null,
		'key': null,
		'dequeueKey': function() {
			var value = this.attr('value').attr(),
				key = this.attr('key');
			if(key === null || (value !== null && value.length && value[0] === key)) {
				this.attr('key', value.shift());
			}
			return value;
		},
		'updateColumn': function() {
			var value = this.dequeueKey(this.attr('value')),
				key = this.attr('key'),
				chart = this.attr('chart'),
				pushing = [key].concat(value);
			if(value.length) {
				chart.load({
					columns: [pushing]
				});
			} else {
				this.unloadColumn();
			}
		},
		'unloadColumn': function() {
			this.attr('chart').unload({
				ids: this.attr('key')
			});
		}
	},
	events: {
		inserted: function(viewModel, ev) {
			this.viewModel.attr('chart', this.element.parent().scope().attr('chart'));
			this.viewModel.updateColumn();
		},
		removed: function() {
			this.viewModel.unloadColumn();
		},
		"{viewModel} valueSerialized": function() {
			this.viewModel.updateColumn();
		}
	}
});

/**
 * @module {can.Component} c3-chart.reference.c3-chart.c3-grid <c3-grid>
 * @parent c3-chart.reference.c3-chart 1
 *
 * @author Kyle Gifford
 *
 * @description
 * Chart grid element
 *
 * @signature '<c3-grid></c3-grid>'
 *
 * @body
 *
 * ## Component Initialization
 *
 * ```html
 *   <c3-grid></c3-grid>
 * ```
 */
can.Component.extend({
	tag: "c3-grid"
});

/**
 * @module {can.Component} c3-chart.reference.c3-chart.c3-data <c3-data>
 * @parent c3-chart.reference.c3-chart 0
 *
 * @author Kyle Gifford
 *
 * @description
 * Chart data element
 *
 * @signature '<c3-data></c3-data>'
 * @param {String} type Type of the graph (see http://c3js.org/reference.html#data-type).
 * @param {Object} names Names of the data elements, keyed by the data Key (see http://c3js.org/reference.html#api-data-names).
 * @param {String} url Load a CSV or JSON file from a URL (see http://c3js.org/reference.html#data-url).
 * @param {Object} json Parse a JSON object for data (see http://c3js.org/reference.html#data-json).
 * @param {Array} columns Load series data from a multidimensional array (see http://c3js.org/reference.html#data-columns).
 * @param {Array} rows Load row data from a multidimensional array (see http://c3js.org/reference.html#data-rows).
 * @param {Object} classes Set custom data classes (http://c3js.org/reference.html#data-classes).
 * @param {Array} categories Set custom X axis categories (see http://c3js.org/reference.html#axis-x-categories).
 * @param {Object} axes Relate data to an axis (see http://c3js.org/reference.html#api-data-axes).
 * @param {Object} colors Set color for data (see http://c3js.org/reference.html#data-colors).
 * @param {Object} types Set types for data series (see http://c3js.org/reference.html#data-types).
 * @param {String|Array} unload Data ID(s) to be unloaded.
 * @param {Function} done Function that will be ran after data is loaded.
 * @param {Object} groups Grouped data (keyed by a unique group name)
 *
 * @body
 *
 * ## Component Initialization
 *
 * ```html
 * <c3-chart>
 *   <c3-data></c3-data>
 * </c3-chart>
 * ```
 */
can.Component.extend({
	tag: "c3-data",
	viewModel: {
		define: {
			chart: {
				type: '*',
				value: null
			},
			groupsSerialized: {
				get: function() {
					return this.attr('groups').serialize();
				}
			}
		},
		groups: {},
		standardAttributes: ['url', 'json', 'columns', 'rows', 'classes', 'categories', 'axes', 'colors', 'types', 'unload', 'done'],
		loadAllAttributesOnChart: function() {
			this.each((item, key) => {
				this.loadAttributeOnChart(key, item);
			});
		},
		loadAttributeOnChart: function(attribute, value) {
			// if no value is passed, retrieve it
			if(value === undefined) {
				value = this.attr(attribute);
			}

			if(attribute.indexOf('.') !== -1) {
				attribute = attribute.substr(0, attribute.indexOf('.'));
				value = this.attr(attribute);
			}

			var chart = this.attr('chart');
			switch(true) {
				// groups change
				case (attribute === 'groupsSerialized' || attribute === 'groups'):
					var groups = [];
					// console.log(this.attr('groups'));
					this.attr('groups').each(function(value, key) {
						groups.push(value);
					});
					chart.groups(groups);
					break;
				// type change - full graph
				case (attribute === 'type'):
					chart.transform(value);
					break;
				// attributes to ignore
				case (attribute === 'chart'):
				case (attribute === 'standardAttributes'):
					break;
				// names change
				case (attribute === 'names'):
					chart.data.names(value);
					break;
				// standard attributes
				case (this.attr('standardAttributes').indexOf(attribute) !== -1):
					var loadVal = {};
					loadVal[attribute] = value;
					chart.load(loadVal);
					break;
				// we don't have a setter for this, warn and ignore it
				default:
					console.warn('The', attribute, 'property cannot be updated');
					break;
			}
		}
	},
	events: {
		inserted: function(viewModel, ev) {
			this.viewModel.attr('chart', this.element.parent().scope().attr('chart'));
			this.viewModel.loadAllAttributesOnChart();
		},
		"{viewModel} change": function(viewModel, ev, attr, type, newVal, oldVal) {
			// console.log(attr, 'from', oldVal, 'to', newVal);
			this.viewModel.loadAttributeOnChart(attr);
		}
	}
});

can.Component.extend({
	tag: 'c3-x-axis',
	viewModel: {

	},

})

/**
 * @module {can.Component} c3-chart.reference.c3-chart <c3-chart>
 * @parent c3-chart.reference 1
 * @group c3-chart.reference.c3-chart.c3-data 0 <c3-data>
 *
 * @author Kyle Gifford
 *
 *
 * @description
 * Chart container
 *
 * @signature '<c3-chart></chart>'
 *
 * @body
 *
 * ## Component Initialization
 *
 * ```html
 *   <c3-chart></c3-chart>
 * ```
 */
can.Component.extend({
    tag: "c3-chart",
    template: template,
    viewModel: C3ChartViewModel,
    events: {
		inserted: function(viewModel, ev) {
            var rootElement = ev.target,
                graphBaseElement = d3.select(rootElement.getElementsByClassName('chart-container')[0]),
                chart = c3.generate({
				    bindto: graphBaseElement,
				    data: {
				    	columns: []
				    }
				});
			this.viewModel.attr('chart', chart);
        },
        removed: function() {
        	this.viewmodel.attr('chart', this.viewModel.attr('chart').destroy());
        }
    }
});

export default C3ChartViewModel;
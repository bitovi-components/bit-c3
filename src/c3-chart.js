/**
 * @module {can.Component} c3-chart C3-Chart
 * @parent components
 * @group c3-chart/events 0 Events
 * @group c3-chart/viewModel 1 ViewModel
 *
 * @author Kyle Gifford
 *
 *
 * @description
 * Implementation of C3's charting system
 *
 *
 * @signature '<c3-chart />'
 *
 * @body
 *
 * ## Component Initialization
 *
 * ```html
 *   <c3-chart></c3-chart>
 * ```
 *
 * @demo c3-chart.html
 */
import can from "can";
import 'can/map/define/';
import d3 from "d3";
import c3 from "c3";
import "c3/c3.css!";
import template from "./c3-chart.stache!";
import C3ChartViewModel from './viewmodel';

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
			var chart = this.attr('chart'),
				newType = {};
			newType[this.attr('key')] = this.attr('value');
			chart.load({'types':newType});
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

can.Component.extend({
	tag: "c3-data-column",
	viewModel: {
		define: {
			chart: {
				type: '*',
				value: null
			},
			value: {
				set: function(newVal) {
					// if no key is set, or the first value === key, pop off the first value as the key
					var key = this.attr('key');
					if(key === null || (newVal.length && newVal[0] === key)) {
						this.attr('key', newVal.shift());
					}
					return newVal;
				}
			},
			valueSerialized: {
				get: function(val) {
					return this.attr('value').serialize();
				}
			}
		},
		'key': null,
		'updateColumn': function() {
			var value = this.attr('value'),
				key = this.attr('key'),
				chart = this.attr('chart'),
				pushing = [key].concat(value.attr());
			if(value.attr('length')) {
				chart.load({
					columns: [pushing]
				});
			} else {
				chart.unload({
					ids: this.attr('key')
				});
			}
		}
	},
	events: {
		inserted: function(viewModel, ev) {
			this.viewModel.attr('chart', this.element.parent().scope().attr('chart'));
			this.viewModel.updateColumn();
		},
		"{viewModel} valueSerialized": function() {
			this.viewModel.updateColumn();
		}
	}
});

can.Component.extend({
	tag: "c3-data",
	viewModel: {
		define: {
			chart: {
				type: '*',
				value: null
			}	
		},
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

			var chart = this.attr('chart');
			if(attribute.indexOf('.') !== -1) {
				attribute = attribute.substr(0, attr.indexOf('.'));
				value = this.attr(attribute);
			}
			// console.log(attribute, 'to', value);

			switch(true) {
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
			this.viewModel.loadAttributeOnChart(attr);
		}
	}
});

can.Component.extend({
    tag: "c3-chart",
    template: template,
    viewModel: C3ChartViewModel,
    events: {

        /**
         * @function c3-chart.events.inserted Chart Inserted Event
         * @parent c3-chart/events
         * @description Sets up the chart container element.
         * @param {viewModel} viewModel The viewModel of the chart
         * @param {event} ev The jQuery event triggered by DOM insertion 
         */
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
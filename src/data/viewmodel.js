import DefineMap from "can-define/map/map";

export default DefineMap.extend({
	chart: {
		type: '*',
		value: null
	},
	groupsSerialized: {
		get: function() {
			return this.groups.get();
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
			value = this[attribute];
		}

		if(attribute.indexOf('.') !== -1) {
			attribute = attribute.substr(0, attribute.indexOf('.'));
			value = this[attribute];
		}

		var chart = this.chart;
		switch(true) {
			// groups change
			case (attribute === 'groupsSerialized' || attribute === 'groups'):
				var groups = [];
				this.groups && this.groups.forEach(function(value, key) {
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
			case (this.standardAttributes && this.standardAttributes.indexOf(attribute) !== -1):
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
});
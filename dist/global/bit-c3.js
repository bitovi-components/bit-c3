/*[global-shim-start]*/
(function (exports, global){
	var origDefine = global.define;

	var get = function(name){
		var parts = name.split("."),
			cur = global,
			i;
		for(i = 0 ; i < parts.length; i++){
			if(!cur) {
				break;
			}
			cur = cur[parts[i]];
		}
		return cur;
	};
	var modules = (global.define && global.define.modules) ||
		(global._define && global._define.modules) || {};
	var ourDefine = global.define = function(moduleName, deps, callback){
		var module;
		if(typeof deps === "function") {
			callback = deps;
			deps = [];
		}
		var args = [],
			i;
		for(i =0; i < deps.length; i++) {
			args.push( exports[deps[i]] ? get(exports[deps[i]]) : ( modules[deps[i]] || get(deps[i]) )  );
		}
		// CJS has no dependencies but 3 callback arguments
		if(!deps.length && callback.length) {
			module = { exports: {} };
			var require = function(name) {
				return exports[name] ? get(exports[name]) : modules[name];
			};
			args.push(require, module.exports, module);
		}
		// Babel uses the exports and module object.
		else if(!args[0] && deps[0] === "exports") {
			module = { exports: {} };
			args[0] = module.exports;
			if(deps[1] === "module") {
				args[1] = module;
			}
		}

		global.define = origDefine;
		var result = callback ? callback.apply(null, args) : undefined;
		global.define = ourDefine;

		// Favor CJS module.exports over the return value
		modules[moduleName] = module && module.exports ? module.exports : result;
	};
	global.define.orig = origDefine;
	global.define.modules = modules;
	global.define.amd = true;
	global.System = {
		define: function(__name, __code){
			global.define = origDefine;
			eval("(function() { " + __code + " \n }).call(global);");
			global.define = ourDefine;
		},
		orig: global.System
	};
})({},window)
/*bit-c3@0.0.6#chart.stache!can@2.2.9#view/stache/system*/
define('bit-c3/chart.stache', ['can/view/stache/stache'], function (stache) {
    return stache([
        {
            'tokenType': 'start',
            'args': [
                'div',
                false
            ]
        },
        {
            'tokenType': 'attrStart',
            'args': ['class']
        },
        {
            'tokenType': 'attrValue',
            'args': ['chart-container']
        },
        {
            'tokenType': 'attrEnd',
            'args': ['class']
        },
        {
            'tokenType': 'end',
            'args': [
                'div',
                false
            ]
        },
        {
            'tokenType': 'close',
            'args': ['div']
        },
        {
            'tokenType': 'chars',
            'args': ['\n']
        },
        {
            'tokenType': 'start',
            'args': [
                'content',
                false
            ]
        },
        {
            'tokenType': 'end',
            'args': [
                'content',
                false
            ]
        },
        {
            'tokenType': 'close',
            'args': ['content']
        },
        {
            'tokenType': 'done',
            'args': []
        }
    ]);
});
/*bit-c3@0.0.6#viewmodel*/
define('bit-c3/viewmodel', [
    'exports',
    'module',
    'can'
], function (exports, module, _can) {
    'use strict';
    var _interopRequire = function (obj) {
        return obj && obj.__esModule ? obj['default'] : obj;
    };
    var can = _interopRequire(_can);
    module.exports = can.Map.extend({ chart: null });
});
/*bit-c3@0.0.6#chart*/
define('bit-c3/chart', [
    'exports',
    'module',
    'can',
    'd3',
    'c3',
    'bit-c3/chart.stache',
    'bit-c3/viewmodel'
], function (exports, module, _can, _d3, _c3, _chartStache, _viewmodel) {
    'use strict';
    var _interopRequire = function (obj) {
        return obj && obj.__esModule ? obj['default'] : obj;
    };
    var can = _interopRequire(_can);
    var d3 = _interopRequire(_d3);
    var c3 = _interopRequire(_c3);
    var template = _interopRequire(_chartStache);
    var ChartVM = _interopRequire(_viewmodel);
    can.Component.extend({
        tag: 'bit-c3',
        template: template,
        viewModel: ChartVM,
        events: {
            inserted: function (viewModel, ev) {
                var rootElement = ev.target, graphBaseElement = d3.select(rootElement.getElementsByClassName('chart-container')[0]), chart = c3.generate({
                        bindto: graphBaseElement,
                        data: { columns: [] }
                    });
                this.viewModel.attr('chart', chart);
            },
            removed: function () {
                this.viewmodel.attr('chart', this.viewModel.attr('chart').destroy());
            }
        }
    });
    module.exports = ChartVM;
});
/*bit-c3@0.0.6#data/viewmodel*/
define('bit-c3/data/viewmodel', [
    'exports',
    'module',
    'can',
    'can/map/define/define'
], function (exports, module, _can, _canMapDefine) {
    'use strict';
    var _interopRequire = function (obj) {
        return obj && obj.__esModule ? obj['default'] : obj;
    };
    var can = _interopRequire(_can);
    module.exports = can.Map.extend({
        define: {
            chart: {
                type: '*',
                value: null
            },
            groupsSerialized: {
                get: function () {
                    return this.attr('groups').serialize();
                }
            }
        },
        groups: {},
        standardAttributes: [
            'url',
            'json',
            'columns',
            'rows',
            'classes',
            'categories',
            'axes',
            'colors',
            'types',
            'unload',
            'done'
        ],
        loadAllAttributesOnChart: function () {
            var _this = this;
            this.each(function (item, key) {
                _this.loadAttributeOnChart(key, item);
            });
        },
        loadAttributeOnChart: function (attribute, value) {
            if (value === undefined) {
                value = this.attr(attribute);
            }
            if (attribute.indexOf('.') !== -1) {
                attribute = attribute.substr(0, attribute.indexOf('.'));
                value = this.attr(attribute);
            }
            var chart = this.attr('chart');
            switch (true) {
            case attribute === 'groupsSerialized' || attribute === 'groups':
                var groups = [];
                this.attr('groups').each(function (value, key) {
                    groups.push(value);
                });
                chart.groups(groups);
                break;
            case attribute === 'type':
                chart.transform(value);
                break;
            case attribute === 'chart':
            case attribute === 'standardAttributes':
                break;
            case attribute === 'names':
                chart.data.names(value);
                break;
            case this.attr('standardAttributes').indexOf(attribute) !== -1:
                var loadVal = {};
                loadVal[attribute] = value;
                chart.load(loadVal);
                break;
            default:
                console.warn('The', attribute, 'property cannot be updated');
                break;
            }
        }
    });
});
/*bit-c3@0.0.6#data/data*/
define('bit-c3/data/data', [
    'exports',
    'module',
    'can',
    'bit-c3/data/viewmodel'
], function (exports, module, _can, _viewmodel) {
    'use strict';
    var _interopRequire = function (obj) {
        return obj && obj.__esModule ? obj['default'] : obj;
    };
    var can = _interopRequire(_can);
    var DataVM = _interopRequire(_viewmodel);
    can.Component.extend({
        tag: 'bit-c3-data',
        viewModel: DataVM,
        events: {
            inserted: function (viewModel, ev) {
                this.viewModel.attr('chart', this.element.parent().scope().attr('chart'));
                this.viewModel.loadAllAttributesOnChart();
            },
            '{viewModel} change': function (viewModel, ev, attr, type, newVal, oldVal) {
                this.viewModel.loadAttributeOnChart(attr);
            }
        }
    });
    module.exports = DataVM;
});
/*bit-c3@0.0.6#data/column/viewmodel*/
define('bit-c3/data/column/viewmodel', [
    'exports',
    'module',
    'can',
    'can/map/define/define'
], function (exports, module, _can, _canMapDefine) {
    'use strict';
    var _interopRequire = function (obj) {
        return obj && obj.__esModule ? obj['default'] : obj;
    };
    var can = _interopRequire(_can);
    module.exports = can.Map.extend({
        define: {
            chart: {
                type: '*',
                value: null
            },
            valueSerialized: {
                get: function (val) {
                    return this.attr('value') && this.attr('value').serialize();
                }
            }
        },
        value: null,
        key: null,
        dequeueKey: function () {
            var value = this.attr('value') && this.attr('value').attr(), key = this.attr('key');
            if (value !== null && (key === null || value.length && value[0] === key)) {
                this.attr('key', value.shift());
            }
            return value;
        },
        updateColumn: function () {
            var value = this.dequeueKey(this.attr('value')), key = this.attr('key'), chart = this.attr('chart'), pushing = [key].concat(value);
            if (value && value.length) {
                chart.load({ columns: [pushing] });
            } else {
                this.unloadColumn();
            }
        },
        unloadColumn: function () {
            this.attr('chart').unload({ ids: this.attr('key') });
        }
    });
});
/*bit-c3@0.0.6#data/column/column*/
define('bit-c3/data/column/column', [
    'exports',
    'module',
    'can',
    'bit-c3/data/column/viewmodel'
], function (exports, module, _can, _viewmodel) {
    'use strict';
    var _interopRequire = function (obj) {
        return obj && obj.__esModule ? obj['default'] : obj;
    };
    var can = _interopRequire(_can);
    var ColumnVM = _interopRequire(_viewmodel);
    can.Component.extend({
        tag: 'bit-c3-data-column',
        viewModel: ColumnVM,
        events: {
            inserted: function (viewModel, ev) {
                this.viewModel.attr('chart', this.element.parent().scope().attr('chart'));
                this.viewModel.updateColumn();
            },
            removed: function () {
                this.viewModel.unloadColumn();
            },
            '{viewModel} valueSerialized': function () {
                this.viewModel.updateColumn();
            }
        }
    });
    module.exports = ColumnVM;
});
/*bit-c3@0.0.6#lib/lib*/
define('bit-c3/lib/lib', ['exports'], function (exports) {
    'use strict';
    var randomString = exports.randomString = function (length) {
            var text = '';
            var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            for (var i = 0; i < length; i++) {
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            return text;
        };
    Object.defineProperty(exports, '__esModule', { value: true });
});
/*bit-c3@0.0.6#data/group/viewmodel*/
define('bit-c3/data/group/viewmodel', [
    'exports',
    'module',
    'can',
    'can/map/define/define',
    'bit-c3/lib/lib'
], function (exports, module, _can, _canMapDefine, _bitC3LibLib) {
    'use strict';
    var _interopRequire = function (obj) {
        return obj && obj.__esModule ? obj['default'] : obj;
    };
    var can = _interopRequire(_can);
    var randomString = _bitC3LibLib.randomString;
    module.exports = can.Map.extend({
        define: {
            valueSerialized: {
                get: function () {
                    return this.attr('value').serialize();
                }
            }
        },
        groups: null,
        key: null,
        value: null,
        addToGroups: function () {
            var key = randomString(50);
            this.attr('key', key);
            this.attr('groups').attr(key, this.attr('value'));
        },
        updateGroup: function () {
            this.attr('groups').attr(this.attr('key'), this.attr('value'));
        },
        removeFromGroups: function () {
            this.attr('groups').removeAttr(this.attr('key'));
        }
    });
});
/*bit-c3@0.0.6#data/group/group*/
define('bit-c3/data/group/group', [
    'exports',
    'module',
    'can',
    'bit-c3/data/group/viewmodel'
], function (exports, module, _can, _viewmodel) {
    'use strict';
    var _interopRequire = function (obj) {
        return obj && obj.__esModule ? obj['default'] : obj;
    };
    var can = _interopRequire(_can);
    var GroupVM = _interopRequire(_viewmodel);
    can.Component.extend({
        tag: 'bit-c3-data-group',
        viewModel: GroupVM,
        events: {
            inserted: function (viewModel, ev) {
                this.viewModel.attr('groups', this.element.parent().scope().attr('groups'));
                this.viewModel.addToGroups();
            },
            removed: function () {
                this.viewModel.removeFromGroups();
            },
            '{viewModel} valueSerialized': function () {
                this.viewModel.updateGroup();
            }
        }
    });
    module.exports = GroupVM;
});
/*bit-c3@0.0.6#data/name/viewmodel*/
define('bit-c3/data/name/viewmodel', [
    'exports',
    'module',
    'can',
    'can/map/define/define'
], function (exports, module, _can, _canMapDefine) {
    'use strict';
    var _interopRequire = function (obj) {
        return obj && obj.__esModule ? obj['default'] : obj;
    };
    var can = _interopRequire(_can);
    module.exports = can.Map.extend({
        define: {
            chart: {
                type: '*',
                value: null
            }
        },
        key: null,
        updateName: function () {
            var chart = this.attr('chart'), newName = {};
            newName[this.attr('key')] = this.attr('value');
            chart.data.names(newName);
        }
    });
});
/*bit-c3@0.0.6#data/name/name*/
define('bit-c3/data/name/name', [
    'exports',
    'module',
    'can',
    'bit-c3/data/name/viewmodel'
], function (exports, module, _can, _viewmodel) {
    'use strict';
    var _interopRequire = function (obj) {
        return obj && obj.__esModule ? obj['default'] : obj;
    };
    var can = _interopRequire(_can);
    var NameVM = _interopRequire(_viewmodel);
    can.Component.extend({
        tag: 'bit-c3-data-name',
        viewModel: NameVM,
        events: {
            inserted: function (viewModel, ev) {
                this.viewModel.attr('chart', this.element.parent().scope().attr('chart'));
                this.viewModel.updateName();
            },
            '{viewModel} value': function () {
                this.viewModel.updateName();
            }
        }
    });
    module.exports = NameVM;
});
/*bit-c3@0.0.6#data/type/viewmodel*/
define('bit-c3/data/type/viewmodel', [
    'exports',
    'module',
    'can',
    'can/map/define/define'
], function (exports, module, _can, _canMapDefine) {
    'use strict';
    var _interopRequire = function (obj) {
        return obj && obj.__esModule ? obj['default'] : obj;
    };
    var can = _interopRequire(_can);
    module.exports = can.Map.extend({
        define: {
            chart: {
                type: '*',
                value: null
            }
        },
        key: null,
        updateType: function () {
            var chart = this.attr('chart');
            chart.transform(this.attr('value'), this.attr('key'));
        }
    });
});
/*bit-c3@0.0.6#data/type/type*/
define('bit-c3/data/type/type', [
    'exports',
    'module',
    'can',
    'bit-c3/data/type/viewmodel'
], function (exports, module, _can, _viewmodel) {
    'use strict';
    var _interopRequire = function (obj) {
        return obj && obj.__esModule ? obj['default'] : obj;
    };
    var can = _interopRequire(_can);
    var TypeVM = _interopRequire(_viewmodel);
    can.Component.extend({
        tag: 'bit-c3-data-type',
        viewModel: TypeVM,
        events: {
            inserted: function (viewModel, ev) {
                this.viewModel.attr('chart', this.element.parent().scope().attr('chart'));
                this.viewModel.updateType();
            },
            '{viewModel} value': function () {
                this.viewModel.updateType();
            }
        }
    });
    module.exports = TypeVM;
});
/*bit-c3@0.0.6#y-grid/viewmodel*/
define('bit-c3/y-grid/viewmodel', [
    'exports',
    'module',
    'can',
    'can/map/define/define'
], function (exports, module, _can, _canMapDefine) {
    'use strict';
    var _interopRequire = function (obj) {
        return obj && obj.__esModule ? obj['default'] : obj;
    };
    var can = _interopRequire(_can);
    module.exports = can.Map.extend({
        define: {
            chart: {
                type: '*',
                value: null
            },
            linesSerialized: {
                get: function () {
                    return this.attr('lines').serialize();
                }
            }
        },
        lines: {},
        updateLines: function () {
            var lines = [];
            this.attr('lines').each(function (value, key) {
                lines.push(value);
            });
            this.attr('chart').ygrids(lines);
        }
    });
});
/*bit-c3@0.0.6#y-grid/y-grid*/
define('bit-c3/y-grid/y-grid', [
    'exports',
    'module',
    'can',
    'bit-c3/y-grid/viewmodel'
], function (exports, module, _can, _viewmodel) {
    'use strict';
    var _interopRequire = function (obj) {
        return obj && obj.__esModule ? obj['default'] : obj;
    };
    var can = _interopRequire(_can);
    var YGridVM = _interopRequire(_viewmodel);
    can.Component.extend({
        tag: 'bit-c3-y-grid',
        viewModel: YGridVM,
        events: {
            inserted: function (viewModel, ev) {
                this.viewModel.attr('chart', this.element.parent().scope().attr('chart'));
                this.viewModel.updateLines();
            },
            removed: function () {
                this.viewModel.updateLines();
            },
            '{viewModel} linesSerialized': function () {
                this.viewModel.updateLines();
            }
        }
    });
    module.exports = YGridVM;
});
/*bit-c3@0.0.6#y-grid/y-grid-line/viewmodel*/
define('bit-c3/y-grid/y-grid-line/viewmodel', [
    'exports',
    'module',
    'can',
    'can/map/define/define',
    'bit-c3/lib/lib'
], function (exports, module, _can, _canMapDefine, _bitC3LibLib) {
    'use strict';
    var _interopRequire = function (obj) {
        return obj && obj.__esModule ? obj['default'] : obj;
    };
    var can = _interopRequire(_can);
    var randomString = _bitC3LibLib.randomString;
    module.exports = can.Map.extend({
        define: {
            gridLine: {
                get: function () {
                    return {
                        value: this.attr('value'),
                        text: this.attr('text'),
                        position: this.attr('position'),
                        'class': this.attr('class')
                    };
                }
            }
        },
        lines: null,
        value: null,
        text: null,
        position: null,
        'class': null,
        key: null,
        addToLines: function () {
            var key = randomString(50);
            this.attr('key', key);
            this.attr('lines').attr(key, this.attr('gridLine'));
        },
        updateLines: function () {
            this.attr('lines').attr(this.attr('key'), this.attr('gridLine'));
        },
        removeFromLines: function () {
            this.attr('lines').removeAttr(this.attr('key'));
        }
    });
});
/*bit-c3@0.0.6#y-grid/y-grid-line/y-grid-line*/
define('bit-c3/y-grid/y-grid-line/y-grid-line', [
    'exports',
    'module',
    'can',
    'bit-c3/y-grid/y-grid-line/viewmodel'
], function (exports, module, _can, _viewmodel) {
    'use strict';
    var _interopRequire = function (obj) {
        return obj && obj.__esModule ? obj['default'] : obj;
    };
    var can = _interopRequire(_can);
    var YGridLineVM = _interopRequire(_viewmodel);
    can.Component.extend({
        tag: 'bit-c3-y-grid-line',
        viewModel: YGridLineVM,
        events: {
            inserted: function (viewModel, ev) {
                this.viewModel.attr('lines', this.element.parent().scope().attr('lines'));
                this.viewModel.addToLines();
            },
            removed: function () {
                this.viewModel.removeFromLines();
            },
            '{viewModel} value': function () {
                this.viewModel.updateLines();
            },
            '{viewModel} text': function () {
                this.viewModel.updateLines();
            },
            '{viewModel} position': function () {
                this.viewModel.updateLines();
            },
            '{viewModel} class': function () {
                this.viewModel.updateLines();
            },
            '{viewModel} gridLine': function () {
                console.log('changed - update?');
            }
        }
    });
    module.exports = YGridLineVM;
});
/*bit-c3@0.0.6#bit-c3*/
define('bit-c3', [
    'exports',
    'bit-c3/bit-c3.less',
    'bit-c3/chart',
    'bit-c3/data/data',
    'bit-c3/data/column/column',
    'bit-c3/data/group/group',
    'bit-c3/data/name/name',
    'bit-c3/data/type/type',
    'bit-c3/y-grid/y-grid',
    'bit-c3/y-grid/y-grid-line/y-grid-line'
], function (exports, _bitC3Less, _chart, _dataData, _dataColumnColumn, _dataGroupGroup, _dataNameName, _dataTypeType, _yGridYGrid, _yGridYGridLineYGridLine) {
    'use strict';
});
/*[global-shim-end]*/
(function (){
	window._define = window.define;
	window.define = window.define.orig;
	window.System = window.System.orig;
})();
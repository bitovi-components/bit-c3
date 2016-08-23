/*[global-shim-start]*/
(function(exports, global, doEval){ // jshint ignore:line
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
	var set = function(name, val){
		var parts = name.split("."),
			cur = global,
			i, part, next;
		for(i = 0; i < parts.length - 1; i++) {
			part = parts[i];
			next = cur[part];
			if(!next) {
				next = cur[part] = {};
			}
			cur = next;
		}
		part = parts[parts.length - 1];
		cur[part] = val;
	};
	var useDefault = function(mod){
		if(!mod || !mod.__esModule) return false;
		var esProps = { __esModule: true, "default": true };
		for(var p in mod) {
			if(!esProps[p]) return false;
		}
		return true;
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
		} else if(!args[0] && deps[0] === "module") {
			args[0] = { id: moduleName };
		}

		global.define = origDefine;
		var result = callback ? callback.apply(null, args) : undefined;
		global.define = ourDefine;

		// Favor CJS module.exports over the return value
		result = module && module.exports ? module.exports : result;
		modules[moduleName] = result;

		// Set global exports
		var globalExport = exports[moduleName];
		if(globalExport && !get(globalExport)) {
			if(useDefault(result)) {
				result = result["default"];
			}
			set(globalExport, result);
		}
	};
	global.define.orig = origDefine;
	global.define.modules = modules;
	global.define.amd = true;
	ourDefine("@loader", [], function(){
		// shim for @@global-helpers
		var noop = function(){};
		return {
			get: function(){
				return { prepareGlobal: noop, retrieveGlobal: noop };
			},
			global: global,
			__exec: function(__load){
				doEval(__load.source, global);
			}
		};
	});
}
)({},window,function(__$source__, __$global__) { // jshint ignore:line
	eval("(function() { " + __$source__ + " \n }).call(__$global__);");
}
)
/*bit-c3@0.1.2#chart.stache!steal-stache@3.0.0-pre.3#steal-stache*/
define('bit-c3/chart.stache', [
    'module',
    'can-stache',
    'can-stache/src/mustache_core',
    'can-view-import@3.0.0-pre.2#can-view-import',
    'can-stache-bindings@3.0.0-pre.19#can-stache-bindings'
], function (module, stache, mustacheCore) {
    var renderer = stache([
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
    return function (scope, options, nodeList) {
        var moduleOptions = { module: module };
        if (!(options instanceof mustacheCore.Options)) {
            options = new mustacheCore.Options(options || {});
        }
        return renderer(scope, options.add(moduleOptions), nodeList);
    };
});
/*bit-c3@0.1.2#viewmodel*/
define('bit-c3/viewmodel', [
    'exports',
    'module',
    'can/legacy'
], function (exports, module, _canLegacy) {
    'use strict';
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { 'default': obj };
    }
    var _can = _interopRequireDefault(_canLegacy);
    module.exports = _can['default'].Map.extend({ chart: null });
});
/*bit-c3@0.1.2#chart*/
define('bit-c3/chart', [
    'exports',
    'module',
    'can/legacy',
    'd3',
    'c3',
    'bit-c3/chart.stache',
    'bit-c3/viewmodel'
], function (exports, module, _canLegacy, _d3, _c3, _chartStache, _viewmodel) {
    'use strict';
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { 'default': obj };
    }
    var _can = _interopRequireDefault(_canLegacy);
    var _d32 = _interopRequireDefault(_d3);
    var _c32 = _interopRequireDefault(_c3);
    var _template = _interopRequireDefault(_chartStache);
    var _ChartVM = _interopRequireDefault(_viewmodel);
    _can['default'].Component.extend({
        leakScope: true,
        tag: 'bit-c3',
        leakScope: true,
        template: _template['default'],
        viewModel: _ChartVM['default'],
        events: {
            inserted: function inserted(viewModel, ev) {
                var rootElement = ev.target, graphBaseElement = _d32['default'].select(rootElement.getElementsByClassName('chart-container')[0]), chart = _c32['default'].generate({
                        bindto: graphBaseElement,
                        data: { columns: [] }
                    });
                this.viewModel.attr('chart', chart);
            },
            beforeremove: function beforeremove() {
                this.viewModel.attr('chart', this.viewModel.attr('chart').destroy());
            }
        }
    });
    module.exports = _ChartVM['default'];
});
/*bit-c3@0.1.2#data/viewmodel*/
define('bit-c3/data/viewmodel', [
    'exports',
    'module',
    'can/legacy',
    'can/map/define/define'
], function (exports, module, _canLegacy, _canMapDefine) {
    'use strict';
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { 'default': obj };
    }
    var _can = _interopRequireDefault(_canLegacy);
    module.exports = _can['default'].Map.extend({
        define: {
            chart: {
                type: '*',
                value: null
            },
            groupsSerialized: {
                get: function get() {
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
        loadAllAttributesOnChart: function loadAllAttributesOnChart() {
            var _this = this;
            this.each(function (item, key) {
                _this.loadAttributeOnChart(key, item);
            });
        },
        loadAttributeOnChart: function loadAttributeOnChart(attribute, value) {
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
/*bit-c3@0.1.2#data/data*/
define('bit-c3/data/data', [
    'exports',
    'module',
    'can/legacy',
    'bit-c3/data/viewmodel',
    'can-jquery',
    'can-util/dom/data/data'
], function (exports, module, _canLegacy, _viewmodel, _canJquery, _canUtilDomData) {
    'use strict';
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { 'default': obj };
    }
    var _can = _interopRequireDefault(_canLegacy);
    var _DataVM = _interopRequireDefault(_viewmodel);
    var _$ = _interopRequireDefault(_canJquery);
    var _domData = _interopRequireDefault(_canUtilDomData);
    _can['default'].Component.extend({
        leakScope: true,
        tag: 'bit-c3-data',
        leakScope: true,
        viewModel: _DataVM['default'],
        events: {
            inserted: function inserted(viewModel, ev) {
                this.viewModel.attr('chart', _domData['default'].get.call((0, _$['default'])(this.element).parent()[0], 'viewModel').attr('chart'));
                this.viewModel.loadAllAttributesOnChart();
            },
            '{viewModel} change': function viewModelChange(viewModel, ev, attr, type, newVal, oldVal) {
                this.viewModel.loadAttributeOnChart(attr);
            },
            removed: function removed() {
                this.viewModel.removeAttr('chart');
            }
        }
    });
    module.exports = _DataVM['default'];
});
/*bit-c3@0.1.2#data/column/viewmodel*/
define('bit-c3/data/column/viewmodel', [
    'exports',
    'module',
    'can/legacy',
    'can/map/define/define'
], function (exports, module, _canLegacy, _canMapDefine) {
    'use strict';
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { 'default': obj };
    }
    var _can = _interopRequireDefault(_canLegacy);
    module.exports = _can['default'].Map.extend({
        define: {
            chart: {
                type: '*',
                value: null
            },
            valueSerialized: {
                get: function get(val) {
                    return this.attr('value') && this.attr('value').serialize();
                }
            }
        },
        'value': null,
        'key': null,
        'dequeueKey': function dequeueKey() {
            var value = this.attr('value') && this.attr('value').attr(), key = this.attr('key');
            if (value !== null && (key === null || value.length && value[0] === key)) {
                this.attr('key', value.shift());
            }
            return value;
        },
        'updateColumn': function updateColumn() {
            var value = this.dequeueKey(this.attr('value')), key = this.attr('key'), chart = this.attr('chart'), pushing = [key].concat(value);
            if (value && value.length) {
                chart.load({ columns: [pushing] });
            } else {
                this.unloadColumn();
            }
        },
        'unloadColumn': function unloadColumn() {
            this.attr('chart').unload({ ids: this.attr('key') });
        }
    });
});
/*bit-c3@0.1.2#data/column/column*/
define('bit-c3/data/column/column', [
    'exports',
    'module',
    'can/legacy',
    'bit-c3/data/column/viewmodel',
    'jquery',
    'can-util/dom/data/data'
], function (exports, module, _canLegacy, _viewmodel, _jquery, _canUtilDomData) {
    'use strict';
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { 'default': obj };
    }
    var _can = _interopRequireDefault(_canLegacy);
    var _ColumnVM = _interopRequireDefault(_viewmodel);
    var _$ = _interopRequireDefault(_jquery);
    var _domData = _interopRequireDefault(_canUtilDomData);
    _can['default'].Component.extend({
        leakScope: true,
        tag: 'bit-c3-data-column',
        viewModel: _ColumnVM['default'],
        events: {
            inserted: function inserted(viewModel, ev) {
                this.viewModel.attr('chart', _domData['default'].get.call((0, _$['default'])(this.element).parent()[0], 'viewModel').attr('chart'));
                this.viewModel.updateColumn();
            },
            beforeremove: function beforeremove() {
                if (_domData['default'].get.call((0, _$['default'])(this.element).parent()[0], 'viewModel').attr('chart')) {
                    this.viewModel.unloadColumn();
                }
            },
            '{viewModel} valueSerialized': function viewModelValueSerialized() {
                this.viewModel.updateColumn();
            }
        }
    });
    module.exports = _ColumnVM['default'];
});
/*bit-c3@0.1.2#lib/lib*/
define('bit-c3/lib/lib', ['exports'], function (exports) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    var randomString = function randomString(length) {
        var text = '';
        var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (var i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    };
    exports.randomString = randomString;
});
/*bit-c3@0.1.2#data/group/viewmodel*/
define('bit-c3/data/group/viewmodel', [
    'exports',
    'module',
    'can/legacy',
    'can/map/define/define',
    'bit-c3/lib/lib'
], function (exports, module, _canLegacy, _canMapDefine, _bitC3LibLib) {
    'use strict';
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { 'default': obj };
    }
    var _can = _interopRequireDefault(_canLegacy);
    module.exports = _can['default'].Map.extend({
        define: {
            'valueSerialized': {
                get: function get() {
                    return this.attr('value').serialize();
                }
            }
        },
        'groups': null,
        'key': null,
        'value': null,
        'addToGroups': function addToGroups() {
            var key = (0, _bitC3LibLib.randomString)(50);
            this.attr('key', key);
            this.attr('groups').attr(key, this.attr('value'));
        },
        'updateGroup': function updateGroup() {
            this.attr('groups').attr(this.attr('key'), this.attr('value'));
        },
        'removeFromGroups': function removeFromGroups() {
            this.attr('groups').removeAttr(this.attr('key'));
        }
    });
});
/*bit-c3@0.1.2#data/group/group*/
define('bit-c3/data/group/group', [
    'exports',
    'module',
    'can/legacy',
    'bit-c3/data/group/viewmodel'
], function (exports, module, _canLegacy, _viewmodel) {
    'use strict';
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { 'default': obj };
    }
    var _can = _interopRequireDefault(_canLegacy);
    var _GroupVM = _interopRequireDefault(_viewmodel);
    _can['default'].Component.extend({
        leakScope: true,
        tag: 'bit-c3-data-group',
        leakScope: true,
        viewModel: _GroupVM['default'],
        events: {
            inserted: function inserted(viewModel, ev) {
                this.element = $(this.element);
                this.viewModel.attr('groups', this.element.parent().scope().attr('groups'));
                this.viewModel.addToGroups();
            },
            removed: function removed() {
                this.viewModel.removeFromGroups();
            },
            '{viewModel} valueSerialized': function viewModelValueSerialized() {
                this.viewModel.updateGroup();
            }
        }
    });
    module.exports = _GroupVM['default'];
});
/*bit-c3@0.1.2#data/name/viewmodel*/
define('bit-c3/data/name/viewmodel', [
    'exports',
    'module',
    'can/legacy',
    'can/map/define/define'
], function (exports, module, _canLegacy, _canMapDefine) {
    'use strict';
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { 'default': obj };
    }
    var _can = _interopRequireDefault(_canLegacy);
    module.exports = _can['default'].Map.extend({
        define: {
            chart: {
                type: '*',
                value: null
            }
        },
        'key': null,
        'updateName': function updateName() {
            var chart = this.attr('chart'), newName = {};
            newName[this.attr('key')] = this.attr('value');
            chart.data.names(newName);
        }
    });
});
/*bit-c3@0.1.2#data/name/name*/
define('bit-c3/data/name/name', [
    'exports',
    'module',
    'can/legacy',
    'bit-c3/data/name/viewmodel'
], function (exports, module, _canLegacy, _viewmodel) {
    'use strict';
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { 'default': obj };
    }
    var _can = _interopRequireDefault(_canLegacy);
    var _NameVM = _interopRequireDefault(_viewmodel);
    _can['default'].Component.extend({
        leakScope: true,
        tag: 'bit-c3-data-name',
        leakScope: true,
        viewModel: _NameVM['default'],
        events: {
            inserted: function inserted(viewModel, ev) {
                this.element = $(this.element);
                this.viewModel.attr('chart', this.element.parent().scope().attr('chart'));
                this.viewModel.updateName();
            },
            '{viewModel} value': function viewModelValue() {
                this.viewModel.updateName();
            }
        }
    });
    module.exports = _NameVM['default'];
});
/*bit-c3@0.1.2#data/type/viewmodel*/
define('bit-c3/data/type/viewmodel', [
    'exports',
    'module',
    'can/legacy',
    'can/map/define/define'
], function (exports, module, _canLegacy, _canMapDefine) {
    'use strict';
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { 'default': obj };
    }
    var _can = _interopRequireDefault(_canLegacy);
    module.exports = _can['default'].Map.extend({
        define: {
            chart: {
                type: '*',
                value: null
            }
        },
        'key': null,
        'updateType': function updateType() {
            var chart = this.attr('chart');
            chart.transform(this.attr('value'), this.attr('key'));
        }
    });
});
/*bit-c3@0.1.2#data/type/type*/
define('bit-c3/data/type/type', [
    'exports',
    'module',
    'can/legacy',
    'bit-c3/data/type/viewmodel'
], function (exports, module, _canLegacy, _viewmodel) {
    'use strict';
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { 'default': obj };
    }
    var _can = _interopRequireDefault(_canLegacy);
    var _TypeVM = _interopRequireDefault(_viewmodel);
    _can['default'].Component.extend({
        leakScope: true,
        tag: 'bit-c3-data-type',
        leakScope: true,
        viewModel: _TypeVM['default'],
        events: {
            inserted: function inserted(viewModel, ev) {
                this.element = $(this.element);
                this.viewModel.attr('chart', this.element.parent().scope().attr('chart'));
                this.viewModel.updateType();
            },
            '{viewModel} value': function viewModelValue() {
                this.viewModel.updateType();
            }
        }
    });
    module.exports = _TypeVM['default'];
});
/*bit-c3@0.1.2#y-grid/viewmodel*/
define('bit-c3/y-grid/viewmodel', [
    'exports',
    'module',
    'can/legacy',
    'can/map/define/define'
], function (exports, module, _canLegacy, _canMapDefine) {
    'use strict';
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { 'default': obj };
    }
    var _can = _interopRequireDefault(_canLegacy);
    module.exports = _can['default'].Map.extend({
        define: {
            chart: {
                type: '*',
                value: null
            },
            linesSerialized: {
                get: function get() {
                    return this.attr('lines').serialize();
                }
            }
        },
        lines: {},
        updateLines: function updateLines() {
            var lines = [];
            this.attr('lines').each(function (value, key) {
                lines.push(value);
            });
            this.attr('chart').ygrids(lines);
        }
    });
});
/*bit-c3@0.1.2#y-grid/y-grid*/
define('bit-c3/y-grid/y-grid', [
    'exports',
    'module',
    'can/legacy',
    'bit-c3/y-grid/viewmodel'
], function (exports, module, _canLegacy, _viewmodel) {
    'use strict';
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { 'default': obj };
    }
    var _can = _interopRequireDefault(_canLegacy);
    var _YGridVM = _interopRequireDefault(_viewmodel);
    _can['default'].Component.extend({
        leakScope: true,
        tag: 'bit-c3-y-grid',
        leakScope: true,
        viewModel: _YGridVM['default'],
        events: {
            inserted: function inserted(viewModel, ev) {
                this.element = $(this.element);
                this.viewModel.attr('chart', this.element.parent().scope().attr('chart'));
                this.viewModel.updateLines();
            },
            removed: function removed() {
                this.viewModel.updateLines();
            },
            '{viewModel} linesSerialized': function viewModelLinesSerialized() {
                this.viewModel.updateLines();
            }
        }
    });
    module.exports = _YGridVM['default'];
});
/*bit-c3@0.1.2#y-grid/y-grid-line/viewmodel*/
define('bit-c3/y-grid/y-grid-line/viewmodel', [
    'exports',
    'module',
    'can/legacy',
    'can/map/define/define',
    'bit-c3/lib/lib'
], function (exports, module, _canLegacy, _canMapDefine, _bitC3LibLib) {
    'use strict';
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { 'default': obj };
    }
    var _can = _interopRequireDefault(_canLegacy);
    module.exports = _can['default'].Map.extend({
        define: {
            'gridLine': {
                get: function get() {
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
        'key': null,
        'addToLines': function addToLines() {
            var key = (0, _bitC3LibLib.randomString)(50);
            this.attr('key', key);
            this.attr('lines').attr(key, this.attr('gridLine'));
        },
        'updateLines': function updateLines() {
            this.attr('lines').attr(this.attr('key'), this.attr('gridLine'));
        },
        'removeFromLines': function removeFromLines() {
            this.attr('lines').removeAttr(this.attr('key'));
        }
    });
});
/*bit-c3@0.1.2#y-grid/y-grid-line/y-grid-line*/
define('bit-c3/y-grid/y-grid-line/y-grid-line', [
    'exports',
    'module',
    'can/legacy',
    'bit-c3/y-grid/y-grid-line/viewmodel'
], function (exports, module, _canLegacy, _viewmodel) {
    'use strict';
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { 'default': obj };
    }
    var _can = _interopRequireDefault(_canLegacy);
    var _YGridLineVM = _interopRequireDefault(_viewmodel);
    _can['default'].Component.extend({
        leakScope: true,
        tag: 'bit-c3-y-grid-line',
        leakScope: true,
        viewModel: _YGridLineVM['default'],
        events: {
            inserted: function inserted(viewModel, ev) {
                this.element = $(this.element);
                this.viewModel.attr('lines', this.element.parent().scope().attr('lines'));
                this.viewModel.addToLines();
            },
            removed: function removed() {
                this.viewModel.removeFromLines();
            },
            '{viewModel} value': function viewModelValue() {
                this.viewModel.updateLines();
            },
            '{viewModel} text': function viewModelText() {
                this.viewModel.updateLines();
            },
            '{viewModel} position': function viewModelPosition() {
                this.viewModel.updateLines();
            },
            '{viewModel} class': function viewModelClass() {
                this.viewModel.updateLines();
            },
            '{viewModel} gridLine': function viewModelGridLine() {
                console.log('changed - update?');
            }
        }
    });
    module.exports = _YGridLineVM['default'];
});
/*bit-c3@0.1.2#bit-c3*/
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
(function(){ // jshint ignore:line
	window._define = window.define;
	window.define = window.define.orig;
}
)();
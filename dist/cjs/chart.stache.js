/*bit-c3@0.1.3#chart.stache!can@2.3.28#view/stache/system*/
var stache = require('can/view/stache/stache');
var mustacheCore = require('can/view/stache/mustache_core');
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
module.exports = function (scope, options, nodeList) {
    var moduleOptions = { module: module };
    if (!(options instanceof mustacheCore.Options)) {
        options = new mustacheCore.Options(options || {});
    }
    return renderer(scope, options.add(moduleOptions), nodeList);
};
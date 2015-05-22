# c3-chart

[![Build Status](https://travis-ci.org/bitovi-components/c3-chart.svg?branch=master)](https://travis-ci.org/bitovi-components/c3-chart)

A live-reloading chart widget that can be loaded by:

- StealJS + ES6
- npm / browserify / CJS
- RequireJS / AMD
- Standalone with CanJS and jQuery

## Install

Use NPM to install `c3-chart`:

Coming soon!

## Usage

See [http://bitovi-components.github.io/c3-chart](http://bitovi-components.github.io/c3-chart) for usage instructions, examples and documentation.

## ES6 use

With StealJS, you can import this module directly in a template that is autorendered:

```html
<script type="text/stache" id="demo" can-autorender>
	<can-import from="c3-chart" />
	<c3-chart>
		<c3-data>
			<c3-data-column key="dataSource" value="{dataSource}" />
		</c3-data>
	</c3-chart>
</script>

<script src='./node_modules/steal/steal.js'
	main="can/view/autorender/">

	import can from "can";
	import $ from "jquery";

	$("#demo").viewModel().attr({
		dataSource: new can.List([1, 2, 3])
	});
</script>

```

Alternatively, you can import this module like:

```js
import "c3-chart";
import can from "can";
import $ from "jquery";
import stache from "can/view/stache/stache";

var template = stache('<c3-chart>' +
	'<c3-data>' +
		'<c3-data-column key="dataSource" value="{dataSource}" />' +
	'</c3-data>' +
'</c3-chart>');

$("body").viewModel().attr({
	dataSource: new can.List([1, 2, 3])
});

```

## CJS use

Use `require` to load `c3-chart` and everything else
needed to create a template that uses `c3-chart`:

```js
var can = require("canjs");
var $ = require("jquery")

// Add's c3-chart tag
require("c3-chart");
// Use stache
require("canjs/view/stache/stache");

var template = stache('<c3-chart>' +
	'<c3-data>' +
		'<c3-data-column key="dataSource" value="{dataSource}" />' +
	'</c3-data>' +
'</c3-chart>');

$("body").viewModel().attr({
	dataSource: new can.List([1, 2, 3])
});

```

## AMD use

Configure the `can` and `jquery` paths and the `c3-charts` package:

```html
<script src="require.js"></script>
<script>
	require.config({
	    paths: {
	        "jquery": "node_modules/jquery/dist/jquery",
	        "can": "node_modules/canjs/dist/amd/can"
	    },
	    packages: [{
		    	name: 'c3-chart',
		    	location: 'node_modules/c3-chart/dist/amd',
		    	main: 'c3-chart'
	    }]
	});
	require(["main-amd"], function(){});
</script>
```

Make sure you have the `css` plugin configured also!

Use c3-chart like:

```js
define(["can", "jquery", "can/view/stache", "c3-chart"], function(can, $) {
	var template = stache('<c3-chart>' +
		'<c3-data>' +
			'<c3-data-column key="dataSource" value="{dataSource}" />' +
		'</c3-data>' +
	'</c3-chart>');

	$("body").viewModel().attr({
		dataSource: new can.List([1, 2, 3])
	});
});
```

## Standalone use

Load the `global` css and js files:

```html
<link rel="stylesheet" type="text/css" 
      href="./node_modules/c3-chart/dist/global/c3-chart.css">
      
<script src='./node_modules/jquery/dist/jquery.js'></script>
<script src='./node_modules/canjs/dist/can.jquery.js'></script>
<script src='./node_modules/canjs/dist/can.stache.js'></script>
<script src='./node_modules/c3-chart/dist/global/c3-chart.js'></script>
<script id='main-stache' text='text/stache'>
	<c3-chart>
		<c3-data>
			<c3-data-column key="dataSource" value="{dataSource}" />
		</c3-data>
	</c3-chart>
</script>
<script>
	$("body").viewModel().attr({
		dataSource: new can.List([1, 2, 3])
	});
</script>
```

## Contributing

To setup your dev environment:

1. Clone and fork this repo.  
2. Run `npm install`.
3. Run `grunt test`. Everything should pass.
4. Launch development server by running `grunt serve`.
5. Run `grunt build`.  Everything should build ok.

To publish:

1.  Update the version number in package.json and commit and push this.
2.  Run `npm publish`.  This should generate the dist folder.
3.  Create and checkout a "release" branch.
4.  Run `git add -f dist`.
5.  Commit the addition and tag it `git tag v0.2.0`.  Push the tag `git push origin --tags`.

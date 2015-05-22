@page index
@hide sidebar
@hide title
@hide footer
@hide container
@hide article
@body

<section style="width: 800px; margin:100px auto 20px auto; overflow:hidden;">

# c3-chart

[![Build Status](https://travis-ci.org/bitovi-components/c3-chart.svg?branch=master)](https://travis-ci.org/bitovi-components/c3-chart)

A live-reloading chart widget that can be loaded by:

- StealJS + ES6
- npm / browserify / CJS
- RequireJS / AMD
- Standalone with CanJS and jQuery

## Install

Use NPM to install `c3-chart`:

```bash
npm install c3-chart --save
```

## Usage

Similar to how C3 constructs charts using a JavaScript object, `c3-chart` constructs charts using [canJS](http://canjs.org) components. Creating a chart as quick as installing the NPM packages, importing the module using one of the methods below, and adding the elements to your template.

We are currently working on a getting started guide. Until then, the [examples](docs) in the documentation are a great place to start!

### ES6 use

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

### CJS use

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

### AMD use

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

### Standalone use

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

</section>

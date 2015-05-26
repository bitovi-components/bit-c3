# Bit-C3

[![Build Status](https://travis-ci.org/bitovi-components/bit-c3.svg?branch=master)](https://travis-ci.org/bitovi-components/bit-c3)

A live-reloading chart widget that can be loaded by:

- StealJS + ES6
- npm / browserify / CJS
- RequireJS / AMD
- Standalone with CanJS and jQuery

## Install

Use NPM to install `bit-c3`:

`npm install bit-c3 --save`

## Usage

See [http://bitovi-components.github.io/bit-c3](http://bitovi-components.github.io/bit-c3) for usage instructions, examples and documentation.

## ES6 use

With StealJS, you can import this module directly in a template that is autorendered:

```html
<script type="text/stache" id="demo" can-autorender>
	<can-import from="bit-c3" />
	<bit-c3>
		<bit-c3-data>
			<bit-c3-data-column key="dataSource" value="{dataSource}" />
		</bit-c3-data>
	</bit-c3>
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
import "bit-c3";
import can from "can";
import $ from "jquery";
import stache from "can/view/stache/stache";

var template = stache('<bit-c3>' +
	'<bit-c3-data>' +
		'<bit-c3-data-column key="dataSource" value="{dataSource}" />' +
	'</bit-c3-data>' +
'</bit-c3>');

$("body").append(template({
	dataSource: new can.List([1, 2, 3])
}));

```

## CJS use

Use `require` to load `bit-c3` and everything else
needed to create a template that uses `bit-c3`:

```js
var can = require("canjs");
var $ = require("jquery")

// Add's bit-c3 tag
require("bit-c3");
// Use stache
require("canjs/view/stache/stache");

var bitC3template = can.stache('<bit-c3>' +
    '<bit-c3-data>' +
        '<bit-c3-data-column key="dataSource" value="{dataSource}" />' +
    '</bit-c3-data>' +
'</bit-c3>');

$("body").append(bitC3template({
    dataSource: new can.List([1, 2, 3])
}));

```

## AMD use

Configure the `can`, `jquery`, `c3`, and `d3` paths and the `bit-c3s` package:

```html
<script src="require.js"></script>
<script>
	require.config({
	    paths: {
	        "jquery": "node_modules/jquery/dist/jquery",
	        "can": "node_modules/canjs/dist/amd/can"
	    },
	    packages: [{
		    	name: 'bit-c3',
		    	location: 'node_modules/bit-c3/dist/amd',
		    	main: 'bit-c3'
	    }]
	});
	require(["main-amd"], function(){});
</script>
```

Make sure you have the `css` plugin configured also!

Use bit-c3 like:

```js
define(["can", "jquery", "can/view/stache", "bit-c3"], function(can, $) {
	var bitC3template = can.stache('<bit-c3>' +
	    '<bit-c3-data>' +
	        '<bit-c3-data-column key="dataSource" value="{dataSource}" />' +
	    '</bit-c3-data>' +
	'</bit-c3>');

	$("body").append(bitC3template({
	    dataSource: new can.List([1, 2, 3])
	}));
});
```

## Standalone use

Load the `global` css and js files:

```html
<link rel="stylesheet" type="text/css" 
      href="./node_modules/bit-c3/dist/global/bit-c3.css" />
      
<script src='./node_modules/jquery/dist/jquery.js'></script>
<script src='./node_modules/canjs/dist/can.jquery.js'></script>
<script src='./node_modules/canjs/dist/can.stache.js'></script>
<script src='./node_modules/bit-c3/dist/global/bit-c3.js'></script>
<script id='main-stache' text='text/stache'>
	<bit-c3>
		<bit-c3-data>
			<bit-c3-data-column key="dataSource" value="{dataSource}" />
		</bit-c3-data>
	</bit-c3>
</script>
<script>
	var bitC3template = can.stache('<h2>bit-c3</h2><bit-c3>' +
	    '<bit-c3-data>' +
	        '<bit-c3-data-column key="dataSource" value="{dataSource}" />' +
	    '</bit-c3-data>' +
	'</bit-c3>');

	$("body").append(bitC3template({
	    dataSource: new can.List([1, 2, 3])
	}));
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

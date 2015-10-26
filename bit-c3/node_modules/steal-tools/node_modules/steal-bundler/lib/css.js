var path = require("path");
var regexAll = require("./regex_all");

var urlExp = /url\(["']?(.+?)[?#"')]/g;

exports.find = function(bundle){
	var nodes = bundle.nodes || [];

	return nodes.map(function(node){
		var source = node.activeSource.code;

		var results = regexAll(urlExp, source);

		if(results.length) {
			return results.map(function(res){
				return { path: res[1] };
			});
		}

	}).filter(truthy)
		.reduce(flatten, []);
};

exports.rewrite = function(source, bundlePath, assets){
	assets.forEach(function(asset){
		var relativePath = path.relative(path.dirname(bundlePath), asset.dest);

		var exp = new RegExp(asset.path, "g");

		source = source.replace(exp, function(res){
			return relativePath;
		});
	});

	return source;
};

function truthy(t){
	return !!t;
};

function flatten(a, b){
	return a.concat(b);
}

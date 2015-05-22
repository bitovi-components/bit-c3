var _ = require('underscore');
var stripSlashes = function (name) {
	return name.replace(/^\/|\/$/g, '');
};
var methods = ['find', 'get', 'create', 'update', 'patch', 'remove'];
var Service = function(path, socket) {
	this.path = stripSlashes(path);
	this.socket = socket;
};

Service.prototype.on = function(name, callback) {
	this.socket.on(this.path + ' ' + name, callback);
};

Service.prototype.off = function(name, callback) {
	this.socket.off(this.path + ' ' + name, callback);
};

_.each(methods, function(method) {
	Service.prototype[method] = function() {
		var args = Array.prototype.slice.call(arguments, 0);
		args.unshift(this.path + '::' + method);
		this.socket.emit.apply(this.socket, args);
	};
});

module.exports = function(path, socket) {
	return new Service(path, socket);
};

module.exports.Service = Service;

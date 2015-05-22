(function(win, undefined) {
	var setProperty = function(name, value) {
		var descriptor;
		if(Object.getOwnPropertyDescriptor && (descriptor = Object.getOwnPropertyDescriptor(win, name))) {
			descriptor.value = value || undefined;
			Object.defineProperty(win, name, descriptor);
		} else {
			window[name] = value;
		}
	};

	// This is a hack for PhantomJS
	// see https://github.com/Automattic/socket.io/issues/1746#issuecomment-57828113
	if (window.callPhantom) {
		// work-around for a bug of phantomjs with socket.io
		window.Blob = undefined;
		window.BlobBuilder = undefined;
		window.WebKitBlobBuilder = undefined;
	}

  // Removes and stores module loader global variables.
  // This is needed for SocketIO to load without problems.
  win._restoreUMD = (function() {
    var oldExports = win.exports;
    var oldModule = win.module;
    var oldRequire = win.require;
    var oldDefine = win.define;

    return function() {
      setProperty('exports', oldExports);
      setProperty('module', oldModule);
      setProperty('require', oldRequire);
      setProperty('define', oldDefine);
    };
  })();

	setProperty('define');
	setProperty('require');
	setProperty('exports');
	setProperty('module');
})(this);

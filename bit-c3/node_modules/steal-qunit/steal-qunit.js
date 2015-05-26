"format amd";
define(["qunitjs/qunit/qunit","qunitjs/qunit/qunit.css!"], function(QUnit){
	QUnit.config.autorun = false;
	steal.done().then(function() {
		if (window.Testee) {
			Testee.init();
		}
		QUnit.load();
	});

	return QUnit;
});

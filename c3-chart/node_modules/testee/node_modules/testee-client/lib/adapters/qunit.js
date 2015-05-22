var guid = require('./../guid');

module.exports = function (QUnit, Runner, win) {
	var suites = []; // Contains all currently active suites (nested)
	// Returns the id of the currently active test suite (last one pushed)
	var suiteId = function () {
		return suites[suites.length - 1];
	};
  var endSuite = function () {
    Runner.suiteEnd({
      id: suiteId()
    });
    suites.pop();
  };
	var runId = guid();

	// TODO async tests
	// var oldstart = win.start;
	// var oldstop = win.stop;

	QUnit.begin(function () {
		var titleEl = win.document.getElementsByTagName('title')[0] || document.getElementsByTagName('h1')[0];
		var suite = guid();

		Runner.start({
			id: runId,
			environment: win.navigator.userAgent,
			runner: 'QUnit',
			time: new Date().getTime()
		});

		Runner.suite({
			title: titleEl ? titleEl.innerHTML : '',
			root: true,
			id: suite,
      parent: runId
		});

		suites.push(suite);
	});

	QUnit.moduleStart(function (data) {
		var id = guid();

		Runner.suite({
			title: data.name,
			parent: suiteId(),
			id: id
		});
		suites.push(id);
	});

	QUnit.moduleDone(function (data) {
		Runner.suiteEnd({
			failed: data.failed,
			total: data.total,
			id: suiteId()
		});
		suites.pop();
	});

	QUnit.testStart(function (data) {
		var id = guid();

		Runner.suite({
			title: data.name,
			parent: suiteId(),
			id: id
		});
		suites.push(id);
	});

	QUnit.testDone(endSuite);

	QUnit.log(function (data) {
		var testId = guid();
		var errorMessage = '';

		Runner.test({
			id: testId,
			title: data.message || 'okay',
			parent: suiteId()
		});

		if (data.result) {
			Runner.pass({
				id: testId
			});
		} else {
			errorMessage = data.expected ? 'Expected ' + data.expected + ' but was ' + data.actual :
				'Expected assertion to be truthy but it was not';

			var stack = (data.source || '').replace(/\\n/g, '\n\t');

			Runner.fail({
				id: testId,
				err: {
					message: errorMessage,
					stack: 'Error: ' + errorMessage + '\n' + stack
				}
			});
		}

		Runner.testEnd({
			id: testId
		});
	});

	QUnit.done(function (data) {
		data.id = runId;
    endSuite();
		Runner.end(data);
	});

	return QUnit;
};

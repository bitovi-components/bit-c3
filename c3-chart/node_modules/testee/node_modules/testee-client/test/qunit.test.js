(function (window, undefined) {
	var options = window.getTesteeOptions('QUnit');

	module('QUnit adapter test');

	var expected = [
		{
			"name": "runs::create",
			"data": {
				"status": "running",
				"environment": navigator.userAgent,
				"runner": "QUnit",
        "file": /qunit\/qunit\.html/
			}
		},
		{
			"name": "suites::create",
			"data": {
				"status": "running",
				"title": "QUnit example",
				"root": true,
        "file": /qunit\/qunit\.html/
			}
    },
		{
			"name": "suites::create",
			"data": {
				"status": "running",
				"title": "Test module",
        "file": /qunit\/qunit\.html/
			}
		},
		{
			"name": "suites::create",
			"data": {
				"status": "running",
				"title": "A failing test",
        "file": /qunit\/qunit\.html/
			}
		},
		{
			"name": "tests::create",
			"data": {
				"title": "This test should fail",
        "file": /qunit\/qunit\.html/
			}
		},
		{
			"name": "tests::patch",
			"data": {
				"status": "failed",
				"err": {
					"message": "Expected B but was A"
				}
			}
		},
		{
			"name": "suites::patch",
			"data": {
				"status": "finished"
			}
		},
		{
			"name": "suites::create",
			"data": {
				"status": "running",
				"title": "It does something",
        "file": /qunit\/qunit\.html/
			}
		},
		{
			"name": "tests::create",
			"data": {
				"title": "Test ran!",
        "file": /qunit\/qunit\.html/
			}
		},
		{
			"name": "tests::patch",
			"data": {
				"status": "passed"
			}
		},
		{
			"name": "suites::patch",
			"data": {
				"status": "finished"
			}
		},
		{
			"name": "suites::patch",
			"data": {
				"status": "finished",
				"failed": 1,
				"total": 2
			}
		},
		{
			"name": "suites::create",
			"data": {
				"status": "running",
				"title": "Other module",
        "file": /qunit\/qunit\.html/
			}
		},
		{
			"name": "suites::create",
			"data": {
        "status": "running",
        "title": "It does something async",
        "file": /qunit\/qunit\.html/
      }
		},
		{
			"name": "tests::create",
			"data": {
				"title": "Async test ran!",
        "file": /qunit\/qunit\.html/
			}
		},
		{
			"name": "tests::patch",
			"data": {
				"status": "passed"
			}
		},
		{
			"name": "suites::patch",
			"data": {
				"status": "finished"
			}
		},
		{
			"name": "suites::patch",
			"data": {
				"status": "finished",
				"failed": 0,
				"total": 1
			}
		},
    {
      "name": "suites::patch"
    },
    {
      "name": "coverages::create",
      "data": {
        coverage: {
          "test": "Qunit coverage"
        }
      }
    },
		{
			"name": "runs::patch",
			"data": {
				"status": "finished",
				"failed": 1,
				"passed": 2,
				"total": 3
			}
		}
	];

	test('runs the QUnit test and writes expected data to socket', function () {
		// Insert the iframe with the test
		var iframe = document.createElement('iframe');
		var walker = window.walkExpected(expected, options.socket);

		iframe.src = 'qunit/qunit.html';
		document.getElementById('qunit-fixture').appendChild(iframe);

		stop();
		walker();
	});
})(this);

(function (window, undefined) {
  var options = window.getTesteeOptions('Jasmine1');

	module('Jasmine 1.x adapter test');

	var expected = [
		{
			"name": "runs::create",
			"data": {
				"status": "running",
				"environment": navigator.userAgent,
				"runner": "Jasmine",
        "file": /jasmine-1\/jasmine\.html/
			}
		},
		{
			"name": "suites::create",
			"data": {
				"status": "running",
				"title": "Test module",
				"root": true,
        "file": /jasmine-1\/jasmine\.html/
			}
		},
		{
			"name": "suites::create",
			"data": {
				"status": "running",
				"title": "It does something",
        "file": /jasmine-1\/jasmine\.html/
			}
		},
		{
			"name": "tests::create",
			"data": {
				"title": "Fails",
        "file": /jasmine-1\/jasmine\.html/
			}
		},
		{
			"name": "tests::patch",
			"data": {
				"status": "failed",
				"err": {
					"message": "Expected false to be truthy."
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
				"title": "Some other suite",
        "file": /jasmine-1\/jasmine\.html/
			}
		},
		{
			"name": "suites::create",
			"data": {
				"status": "running",
				"title": "Nested suite",
        "file": /jasmine-1\/jasmine\.html/
			}
		},
		{
			"name": "tests::create",
			"data": {
				"title": "Test ran!"
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
				"status": "finished"
			}
		},
		{
			"name": "suites::patch",
			"data": {
				"status": "finished"
			}
		},
    {
      "name": "coverages::create",
      "data": {
        coverage: {
          "test": "Jasmine coverage"
        }
      }
    },
		{
			"name": "runs::patch",
			"data": {
				"failed": 1,
				"passed": 1,
				"status": "finished",
				"total": 2
			}
		}
	];

	test('runs the Jasmine test and writes expected data to socket', function () {
		// Insert the iframe with the test
		var iframe = document.createElement('iframe');
		var walker = window.walkExpected(expected, options.socket);

		iframe.src = 'jasmine-1/jasmine.html';
		document.getElementById('qunit-fixture').appendChild(iframe);

		stop();
		walker();
	});
})(this);
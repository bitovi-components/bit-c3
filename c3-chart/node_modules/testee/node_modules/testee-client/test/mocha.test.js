(function(window, undefined) {
  var options = window.getTesteeOptions('Mocha');

  module('Mocha adapter test');

  var expected = [
    {
      "name": "runs::create",
      "data": {
        "status": "running",
        "environment": navigator.userAgent,
        "runner": "Mocha",
        "file": /mocha\/mocha\.html/
      }
    },
    {
      "name": "suites::create",
      "data": {
        "status": "running",
        "title": "",
        "pending": false,
        "root": true,
        "file": /mocha\/mocha\.html/
      }
    },
    {
      "name": "suites::create",
      "data": {
        "status": "running",
        "title": "Test module",
        "pending": false,
        "root": false,
        "file": /mocha\/mocha\.html/
      }
    },
    {
      "name": "suites::create",
      "data": {
        "status": "running",
        "title": "It does something",
        "pending": false,
        "root": false,
        "file": /mocha\/mocha\.html/
      }
    },
    {
      "name": "tests::create",
      "data": {
        "title": "Skipped test",
        "sync": true,
        "timedOut": false,
        "pending": true,
        "type": "test",
        "status": "pending",
        "file": /mocha\/mocha\.html/
      }
    },
    {
      "name": "tests::create",
      "data": {
        "title": "Fails",
        "async": 0,
        "sync": true,
        "timedOut": false,
        "pending": false,
        "type": "test",
        "file": /mocha\/mocha\.html/
      }
    },
    {
      "name": "tests::patch",
      "data": {
        "status": "failed",
        "state": "failed",
        "err": {
          "message": "expected false to equal true"
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
        "pending": false,
        "root": false,
        "file": /mocha\/mocha\.html/
      }
    },
    {
      "name": "suites::create",
      "data": {
        "status": "running",
        "title": "Nested suite",
        "pending": false,
        "root": false,
        "file": /mocha\/mocha\.html/
      }
    },
    {
      "name": "tests::create",
      "data": {
        "title": "Test ran!",
        "async": 0,
        "sync": true,
        "timedOut": false,
        "pending": false,
        "type": "test",
        "file": /mocha\/mocha\.html/
      }
    },
    {
      "name": "tests::patch",
      "data": {
        "status": "passed",
        "duration": 0,
        "state": "passed"
      }
    },
    {
      "name": "tests::create",
      "data": {
        "title": "Runs async",
        "async": 1,
        "sync": false,
        "timedOut": false,
        "pending": false,
        "type": "test",
        "file": /mocha\/mocha\.html/
      }
    },
    {
      "name": "tests::patch",
      "data": {
        "status": "passed",
        "state": "passed"
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
      "name": "suites::patch",
      "data": {
        "status": "finished"
      }
    },
    {
      "name": "coverages::create",
      "data": {
        coverage: {
          "test": "Mocha coverage"
        }
      }
    },
    {
      "name": "runs::patch",
      "data": {
        "status": "finished",
        "total": 4,
        "failed": 1,
        "pending": 1,
        "passed": 2
      }
    }
  ];

  test('runs the Mocha test and writes expected data to socket', function() {
    // Insert the iframe with the test
    var iframe = document.createElement('iframe');
    var walker = window.walkExpected(expected, options.socket);

    iframe.src = 'mocha/mocha.html';
    document.getElementById('qunit-fixture').appendChild(iframe);

    stop();
    walker();
  });
})(this);

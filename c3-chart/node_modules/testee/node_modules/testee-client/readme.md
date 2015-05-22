# Testee client adapters

Testee client side adapters for Mocha, QUnit and Jasmine that convert test results into Feathers service socket calls (`runs`, `suites` and `tests`).

## Initializing options

In you test page you can set Testee options using `window.Testee`. To report to a different server for example set:

```html
<script type="text/javascript">
window.Testee = {
  socket: io('http://testee-server.com/')
}
</script>
<script type="text/javascript" src="http://testee-server.com/socket.io/socket.io.js"></script>
<script type="text/javascript" src="testee-client.js"></script>
```

When loading files asynchronously:

```html
<script type="text/javascript">
window.Testee = {
  autoInit: false
}

define(['testee-client', 'qunit'], function() {
  window.Testee.init();
});
</script>
```

## A test flow:

```js
var ids = {
  run: guid(),
  suite: guid(),
  childsuite: guid(),
  testpass: guid(),
  testfail: guid()
};

Testee.start({
  id: ids.run,
  environment : navigator.userAgent,
  runner : 'Jasmine'
});

Testee.suite({
  "title": "Main test suite title",
  "root": true, // If it is the root level test suite
  "id": ids.suite,
  "parent": runId
});

Testee.suite({
  "title": "Child test suite",
  "parent": ids.suite,
  "id": ids.childsuite
});

Testee.test({
  "title": "The test title",
  "parent": ids.childsuite, // Parent suite id
  "id": ids.testpass
});

Testee.pass({
  "duration": 0,
  "id": ids.testpass
});

Testee.testEnd({
  "id": ids.testspass
});

Testee.test({
  "title": "A failing test",
  "parent": ids.childsuite,
  "id": ids.testfail
});

Testee.fail({
  "id": ids.testfail,
  "err": {
    "message": "expected 1 to equal 2",
    "stack": "Error: expected 1 to equal 2\n    at Assertion.assert (/Users/daff/Development/node/swarmling/node_modules/expect.js/expect.js:99:13)\n    CUSTOM STACK TRACE"
  }
});

Testee.testEnd({
  "id": ids.testfail
});

Testee.suiteEnd({
  "id": ids.childsuite
});

Testee.suiteEnd({
  "id": ids.suite
});

Testee.end({});
```
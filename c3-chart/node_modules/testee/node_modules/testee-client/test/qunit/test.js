module('Test module');

test('A failing test', function() {
	equal('A', 'B', 'This test should fail');
});

test('It does something', function() {
	ok(true, 'Test ran!');
});

module('Other module');

test('It does something async', function() {
	stop();
	setTimeout(function() {
		ok(true, 'Async test ran!');
		start();
	}, 200);
});

describe('Test module', function () {

	describe('It does something', function () {
		xit('Skipped test', function() {
			expect(false).toBeTruthy();
		});

		it('Fails', function() {
			expect(false).toBeTruthy();
		});
	});

	describe('Some other suite', function() {
		describe('Nested suite', function() {
			it('Test ran!', function () {
				expect(true).toBeTruthy();
			});
		});
	});

});

describe('Test module', function () {

  describe('It does something', function () {
    it.skip('Skipped test', function() {
      expect(false).to.equal(true);
    });

    it('Fails', function() {
      expect(false).to.equal(true);
    });
  });

  describe('Some other suite', function() {
    describe('Nested suite', function() {
      it('Test ran!', function () {
        expect(true).to.equal(true);
      });

      it('Runs async', function(done) {
        setTimeout(function() {
          expect(true).to.equal(true);
          done();
        }, 200);
      });
    });
  });

});
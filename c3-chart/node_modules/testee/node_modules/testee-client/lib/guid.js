var md5 = require('MD5');

// Simple JavaScript GUID
// See http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
module.exports = function() {
  var guid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });

  // The plain guid can clash if browsers are started at exactly the same time.
  // Therefore lets also add the useragent string assuming that tests are not running
  // on exactly the same browser at the same time and create its MD5 hash.
  return md5(guid + navigator.useragent);
};

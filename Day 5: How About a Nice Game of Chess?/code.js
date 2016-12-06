var crypto = require('crypto');

var doorId = "wtnhxymk";
var code = "";

for(var i=0; code.length < 8; i++) {
    var hash = crypto.createHash('md5').update(doorId + i).digest('hex');
    if(hash.startsWith('00000')) {
        code = code + hash[5];
    }
}
console.log(code);
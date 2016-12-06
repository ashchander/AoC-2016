var crypto = require('crypto');

var doorId = 'wtnhxymk';
var code = ['X','X','X','X','X','X','X','X'];
var counter = 0;

for(var i=0; counter < 8; i++) {
    var hash = crypto.createHash('md5').update(doorId + i).digest('hex');
    if(hash.startsWith('00000')) {
        var index = parseInt(hash[5]);
        if(code[index] === 'X') {
            code[index] = hash[6];
            counter++;
        }
    }
}
console.log(code.join(''));
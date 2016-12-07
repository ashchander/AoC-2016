var fs = require('fs');
var path = require('path');

function readAndParseFile(callback) {
    var filePath = path.join(__dirname, 'input.txt');
    fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
        if (!err){   
            var lines = data.split('\n');
            var length = lines[0].length;
            lines.pop();

            var inputArray = [];
            for(var i=0; i < length; i++) {
                var string = '';

                for(var j=0; j < lines.length; j++) {
                    string += lines[j][i];
                }
                inputArray.push(string);
            }

            callback(inputArray);
        } else{
            console.error(err);
        }
    });
}

function getMostCommonLetter(string) {
    var counter = {};

    for(var i=0; i<string.length; i++) {
        if(counter[string[i]] === undefined) {
            counter[string[i]] = 1;
        } else {
            counter[string[i]] = counter[string[i]] + 1;
        }
    }
    
    var max = { letter: '', value: 0};
    for(var key in counter) {
        if(counter[key] > max.value) {
            max.value = counter[key];
            max.letter = key;
        }
    }
    return max.letter;
}

readAndParseFile(function(data){
    var output = '';
    for(var i=0; i<data.length; i++) {
        output += getMostCommonLetter(data[i]);
    }
    
    console.log(output);
});
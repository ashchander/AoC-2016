var fs = require('fs');
var path = require('path');
var verticalIndex = 2;
var horizontalIndex = 0;
var keypad = [
    ['0', '0', '1', '0', '0'],
    ['0', '2', '3', '4', '0'],
    ['5', '6', '7', '8', '9'],
    ['0', 'A', 'B', 'C', '0'],
    ['0', '0', 'D', '0', '0']
];

function readAndParseFile(callback) {
    var filePath = path.join(__dirname, 'input.txt');
    fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
        if (!err){
            var parsed = data.split('\n');
            callback(parsed);
        } else{
            console.error(err);
        }
    });
}

function processInputLine(input){
    for(var i=0; i < input.length; i++){
        switch(input[i]){
            case 'U':
                if (verticalIndex > 0){
                    if(keypad[verticalIndex -1][horizontalIndex] != '0'){
                        verticalIndex--;
                    }
                }
                break;
            case 'D':
                if (verticalIndex < 4){
                    if(keypad[verticalIndex + 1][horizontalIndex] != '0'){
                        verticalIndex++;
                    }
                }
                break;
            case 'L':
                if (horizontalIndex > 0){
                    if(keypad[verticalIndex][horizontalIndex-1] != '0'){
                        horizontalIndex--;
                    }
                }
                break;
            case 'R':
                if (horizontalIndex < 4){
                    if(keypad[verticalIndex][horizontalIndex+1] != '0'){
                        horizontalIndex++;
                    }
                }
                break;
        }
    }
}

readAndParseFile(function(data){
    var code = '';
    for(var i=0; i < data.length; i++) {
        if(data[i] != ''){
            processInputLine(data[i]);
            code = code + keypad[verticalIndex][horizontalIndex];
        }
    }
    console.log('Code: ' + code);
});
var fs = require('fs');
var path = require('path');


function formatInput(input) {
    var newArray = [];

    for(var i=0; i < input.length; i++) {
        if(input[i].length < 3){
            continue;   // skip anything that couldn't have 3 sides
        }
        
        var currentTriangle = [];
        for(var j=0; j<input[i].length; j++) {
            if(input[i][j] != ''){
                currentTriangle.push(parseInt(input[i][j]));
            }
        }
        newArray.push(currentTriangle);
    }
    return newArray;
}

function readAndParseFile(callback) {
    var filePath = path.join(__dirname, 'input.txt');
    fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
        if (!err){
            var inputArray = [];
            var lines = data.split('\n');
            for(var i=0; i < lines.length; i++) {
                inputArray.push(lines[i].split(/\s+/));
            }
            callback(formatInput(inputArray));
        } else{
            console.error(err);
        }
    });
}

function checkAllSides(lengths) {
    return lengths[0] + lengths[1] > lengths[2]
        && lengths[1] + lengths[2] > lengths[0]
        && lengths[0] + lengths[2] > lengths[1];
}

readAndParseFile(function(data){
    var count = 0;
    for(var i=0; i < data.length; i++){
        if(checkAllSides(data[i])){
            count++;
        }
    }
    console.log(count);
});
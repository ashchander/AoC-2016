var fs = require('fs');
var path = require('path');


function formatInput(input) {
    var newArray = [];

    for(var i=0; i < input.length; i++) {        
        var currentTriangle = [];
        for(var j=0; j<input[i].length; j++) {
            if(input[i][j] != ''){
                currentTriangle.push(parseInt(input[i][j]));
            }
        }
        if(currentTriangle.length > 0){
            newArray.push(currentTriangle);
        }
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

function constructTriangles(data) {
    var triangles = [];
    var currentTriangle = [];

    for(var i=0; i < 3; i++) {
        for(var j=0; j< data.length; j++) {
            currentTriangle.push(data[j][i]);
            if(currentTriangle.length === 3){
                triangles.push(currentTriangle);
                currentTriangle = [];
            }
        }
    }

    return triangles;
}

readAndParseFile(function(data){
    var count = 0;
    var triangles = constructTriangles(data);
    for(var i=0; i < triangles.length; i++){
        if(checkAllSides(triangles[i])){
            count++;
        }
    }
    console.log(count);
});
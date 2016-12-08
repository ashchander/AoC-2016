var fs = require('fs');
var path = require('path');

function splitHypernet(string) {
    var output = {
        normal: [],
        hypernet: []
    };

    while(string.indexOf('[') !== -1) {
        var openBracketIndex = string.indexOf('[');
        var closeBracketIndex = string.indexOf(']');

        output.normal.push(string.substring(0, openBracketIndex));
        output.hypernet.push(string.substring(openBracketIndex + 1, closeBracketIndex));
        string = string.substring(closeBracketIndex + 1);
    }
    output.normal.push(string);
    return output;
}

function readAndParseFile(callback) {
    var filePath = path.join(__dirname, 'input.txt');
    fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
        if (!err){   
            var lines = data.split('\n');
            lines.pop();

            var inputArray = [];
            for(var i=0; i < lines.length; i++) {
                inputArray.push(splitHypernet(lines[i]));
            }

            callback(inputArray);
        } else{
            console.error(err);
        }
    });
}

function abbaPatternMatches(string) {
    for(var i=0; i < string.length - 4; i++) {
        if(string[i] === string[i+3] && string[i+1] === string[i+2]) {
            return true;
        }
    }
    return false;
}

readAndParseFile(function(data){
    var counter = 0;

    for(var i=0; i < data.length; i++) {
        var normalMatches = false;
        var hypernetMatches = false;

        for(var j =0; j < data[i].normal.length; j++) {
            if(abbaPatternMatches(data[i].normal[j])) {
                normalMatches = true;
                break;
            }
        }

        for(var j =0; j < data[i].hypernet.length; j++) {
            if(abbaPatternMatches(data[i].hypernet[j])) {
                hypernetMatches = true;
                break;
            }
        }
        
        if(normalMatches && !hypernetMatches) {
            counter++;
        }
    }

    console.log(counter);
});
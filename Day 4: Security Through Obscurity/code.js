var fs = require('fs');
var path = require('path');

function readAndParseFile(callback) {
    var filePath = path.join(__dirname, 'input.txt');
    fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
        if (!err){
            var inputArray = [];
            var lines = data.split('\n');
            for(var i=0; i < lines.length; i++) {
                if(lines[i] == ''){
                    continue;
                }

                var inputObj = {
                    name: lines[i].substring(0, lines[i].lastIndexOf('-')).replace(new RegExp('-', 'g'),''),
                    sectionId: parseInt(lines[i].substring(lines[i].lastIndexOf('-') + 1, lines[i].indexOf('['))),
                    checksum: lines[i].substring(lines[i].indexOf('[') + 1, lines[i].indexOf(']'))
                };
                inputArray.push(inputObj);
            }
            callback(inputArray);
        } else{
            console.error(err);
        }
    });
}

function isValid(room){
    var counter = {};
    for(var i=0; i < room.name.length; i++) {
        if(counter[room.name[i]] === undefined) {
            counter[room.name[i]] = 1;
        } else {
            counter[room.name[i]]++;
        }
    }

    var sortable = [];
    for(var letter in counter){
        sortable.push({letter: letter, count: counter[letter]})
    }

    sortable.sort(function(a, b){
        return a.count === b.count ? 
            a.letter.localeCompare(b.letter)
            : b.count - a.count;
    });

    var valid = true;
    for(var i=0; i < room.checksum.length; i++) {
        if(room.checksum[i] !== sortable[i].letter){
            valid = false;
            break;
        }
    }
    return valid;
}

readAndParseFile(function(data){
    var realRoomsSum = 0;
    for(var i = 0; i < data.length; i++) {
        if(isValid(data[i])) {
            realRoomsSum += data[i].sectionId;
        }
    }

    console.log('Sum of valid section IDs: ' + realRoomsSum);
});
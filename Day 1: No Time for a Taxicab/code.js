var fs = require('fs');
var path = require('path');

var visitedLocations = [];
var x = 0, y = 0;

function parse(arr) {
    var formattedArray = [];
    for(var i=0; i < arr.length; i++) {
        formattedArray.push({
            direction: arr[i][0],
            steps: parseInt(arr[i].substring(1))
        });
    }
    return formattedArray;
}

function readAndParseFile(callback) {
    var filePath = path.join(__dirname, 'input.txt');
    fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
        if (!err){
            var parsed = parse(data.replace(/\s/g,'').split(','))
            callback(parsed);
        } else{
            console.error(err);
        }
    });
}

function isPreviouslyVisited() {
    for (var i = 0; i < visitedLocations.length; i++) {
        if (visitedLocations[i].x == x && visitedLocations[i].y == y) {
            return true;
        }
    }
    visitedLocations.push({
        x: x,
        y: y
    });
    return false;
}

function move(deltaX, deltaY, increment) {
    for (var i=0; i < deltaX; i++) {
        x += increment;
        if(isPreviouslyVisited()){
            return true;
        }
    }
    for (var i=0; i <deltaY; i++) {
        y += increment;
        if(isPreviouslyVisited()){
            return true;
        }
    }
    return false;
}

readAndParseFile(function(moves){
    var compass = ['N', 'E', 'S', 'W']
    var currentDirectionIndex = 0;
    var hasVisited = false;

    for (var i = 0; i < moves.length; i++) {
        if (moves[i].direction == 'R') {
            currentDirectionIndex += 1;
        } else {
            currentDirectionIndex -= 1;
        }

        if (currentDirectionIndex == -1) {
            currentDirectionIndex = 3;
        } else if(currentDirectionIndex == 4) {
            currentDirectionIndex = 0;
        }

        console.log(compass[currentDirectionIndex] + ' ' + moves[i].steps)
        switch (compass[currentDirectionIndex]) {
            case 'N':
                hasVisited = move(0, moves[i].steps, 1);
                break;
            case 'S':
                hasVisited = move(0, moves[i].steps, -1);
                break;
            case 'E':
                hasVisited = move(moves[i].steps, 0, 1);
                break;
            case 'W':
                hasVisited = move(moves[i].steps, 0, -1);
                break;
        }

        if(hasVisited) {
            break;
        }
    }

    console.log('X: ' + x);
    console.log('Y: ' + y);

    if (x < 0) {
        x *= -1;
    }

    if (y < 0) {
        y *= -1;
    }

    console.log('Distance: ' + (x + y));
});
var fs = require('fs');
var path = require('path');

var visitedLocations = [];

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

// function isPreviouslyVisited(x, y) {
//     console.log('Checking: ' + x + ',' + y);
//     for (var i = 0; i < visitedLocations.length; i++) {
//         if (visitedLocations[i].x == x && visitedLocations[i].y == y) {
//             return true;
//         }
//     }
//     visitedLocations.push({
//         x: x,
//         y: y
//     });
//     return false;
// }

// function move(currentX, currentY, deltaX, deltaY) {
//     currentX
// }


readAndParseFile(function(moves){
    var compass = ['N', 'E', 'S', 'W']
    var x = 0, y = 0;
    var currentDirectionIndex = 0;

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
                y += moves[i].steps;
                break;
            case 'S':
                y -= moves[i].steps;
                break;
            case 'E':
                x += moves[i].steps;
                break;
            case 'W':
                x -= moves[i].steps;
                break;
        }

        // if (isPreviouslyVisited(x, y)) {
        //     break;
        // }
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
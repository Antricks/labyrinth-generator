// dirty code written out of boredom, pls don't hate on me ^^;

var canvRaw = document.getElementById("canv");
var canv = canvRaw.getContext("2d");
var canv_width = canvRaw.clientWidth;
var canv_height = canvRaw.clientHeight;

var room_amount = 3;
var room_size_max = 15;
var room_size_min = 7;

var size_label = document.getElementById("size-label");
var size_input = document.getElementById("size");
var maxv = 51;
var tile_size = 10;

var tiles = []

function onDimensionChange() {
    maxv = size_input.value;
    size_label.innerText = "Amount of tiles (X & Y): " + maxv;

    if(maxv % 2 == 0) {
        maxv++;
    }

    canv_width = canvRaw.clientWidth;
    canv_height = canvRaw.clientHeight;

    if(canv_width > canv_height) {
        tile_size = canv_height/maxv;
    } else {
        tile_size = canv_width/maxv;
    }

    if(tile_size == 0) {
        tile_size = 1;
    }
}

function generateSetupRooms() {
    for(var i = 0; i < room_amount; i++) {
        var room_x = Math.floor(Math.random()*(maxv-room_size_min)/2)*2+1;
        var room_y = Math.floor(Math.random()*(maxv-room_size_min)/2)*2+1;
        
        var room_w = Math.floor(Math.random()*(room_size_max-room_size_min)/2)*2+room_size_min;
        var room_h = Math.floor(Math.random()*(room_size_max-room_size_min)/2)*2+room_size_min;
    
        room_w = Math.min(maxv-room_x-1, room_w);
        room_h = Math.min(maxv-room_y-1, room_h);
    
        for(var x = room_x; x < room_x + room_w; x++) {
            for(var y = room_y; y < room_y + room_h; y++) {
                tiles[x][y] = 2;
            }
        }
    }
}

function generateSetup() {
    tiles = [];

    for(var x = 0; x < maxv; x++) {
        tiles[x] = []
        for(var y = 0; y < maxv; y++) {
            tiles[x][y] = 0;
        }
    }
}

/*

  1
4 * 2
  3

*/

function generatePath(x, y) {
    tiles[x][y] = 1;
    
    var possible_neighbors = []

    if(y-2 > 0 && tiles[x][y-2] == 0) {
        possible_neighbors.push(1);
    }
    if(x+2 < maxv && tiles[x+2][y] == 0) {
        possible_neighbors.push(2);
    }
    if(y+2 < maxv && tiles[x][y+2] == 0) {
        possible_neighbors.push(3);
    } 
    if(x-2 > 0 && tiles[x-2][y] == 0) {
        possible_neighbors.push(4);
    }
    
    while(possible_neighbors.length > 0) {
        possible_neighbors = []

        if(y-2 > 0 && tiles[x][y-2] == 0) {
            possible_neighbors.push(1);
        }
        if(x+2 < maxv && tiles[x+2][y] == 0) {
            possible_neighbors.push(2);
        }
        if(y+2 < maxv && tiles[x][y+2] == 0) {
            possible_neighbors.push(3);
        } 
        if(x-2 > 0 && tiles[x-2][y] == 0) {
            possible_neighbors.push(4);
        }
        
        var chosen_index = Math.floor(Math.random()*possible_neighbors.length);
        var chosen_neighbor = possible_neighbors[chosen_index];
        
        if(chosen_neighbor == 1) {
            tiles[x][y-1] = 1;
            //setTimeout(generatePath, 100, x, y-2);
            generatePath(x, y-2);
        } else if(chosen_neighbor == 2) {
            tiles[x+1][y] = 1;
            //setTimeout(generatePath, 100, x+2, y);
            generatePath(x+2, y);
        } else if(chosen_neighbor == 3) {
            tiles[x][y+1] = 1;
            //setTimeout(generatePath, 100, x, y+2);
            generatePath(x, y+2);
        } else if(chosen_neighbor == 4) {
            tiles[x-1][y] = 1;
            //setTimeout(generatePath, 100, x-2, y);
            generatePath(x-2, y);
        }
    }
}

function draw() {
    canv.fillStyle = "#000";
    canv.fillRect(0, 0, canv_width, canv_height);

    for(var x = 0; x < maxv; x++) {
        for(var y = 0; y < maxv; y++) {
            if(tiles[x][y] == 0) {
                canv.fillStyle = "#000";
            } else if(tiles[x][y] == 1) {
                canv.fillStyle = "#fff";
            } else if(tiles[x][y] == 2) {
                canv.fillStyle = "#300";
            }

            canv.fillRect(x*tile_size, y*tile_size, tile_size, tile_size);
        }
    }
}

function generate() {
    generateSetup();
    generateSetupRooms();
    generatePath(Math.floor(Math.random()*maxv/2)*2+1, Math.floor(Math.random()*maxv/2)*2+1);
    draw();
}

window.onload = function() {
    onDimensionChange();
    generate();
};

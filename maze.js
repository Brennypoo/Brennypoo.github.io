let inputBuffer = {};
let canvas = null;
let context = null;
const listOfPrompts = [];

const COORD_SIZE = 1000;

let imgFloor = new Image();
imgFloor.isReady = false;
imgFloor.onload = function() {
    this.isReady = true;
};
imgFloor.src = 'floor.png';
function promptUser() {listOfPrompts.push(prompt("size of maze"));}

promptUser();
mazeSize = listOfPrompts[0]
let maze = [];
function generateMaze(mazeSize){
    for (let row = 0; row < mazeSize; row++) {
        maze.push([]);
        for (let col = 0; col < mazeSize; col++) {
            maze[row].push({
                x: col, y: row, visited:false, edges: {
                    n: null,
                    s: null,
                    w: null,
                    e: null,
                }
            });
        }
    }
    const dimensions = [maze.length,maze[0].length]
    let buildMaze = function(cell){
        if(cell.visited){return}
        console.log("----------------")
        console.log(cell.x)
        console.log(cell.y)
        console.log("-----------------")

        cell.visited = true;
        let pick = [];
        if(cell.y>0){
    //        console.log(maze[cell.x][cell.y-1].visited)
            if(maze[cell.y-1][cell.x].visited===false) {
            pick.push(maze[cell.y-1][cell.x]);
    //        console.log(pick);
                }
            }
        if(cell.y<mazeSize-1){

            if (maze[cell.y+1][cell.x].visited===false) {
            pick.push(maze[cell.y+1][cell.x]);

                }
            }

        if(cell.x>0){

            if (maze[cell.y][cell.x-1].visited===false) {
                pick.push(maze[cell.y][cell.x-1]);

                }
            }


        if(cell.x<mazeSize-1){

            if (maze[cell.y][cell.x+1].visited===false) {
                pick.push(maze[cell.y][cell.x+1]);
                }
            }



        if(pick.length>0){
            do{
                let chosen = Math.floor(Math.random() * pick.length);
                if(pick[chosen].visited){
                return;}
                // console.log("going back");
                console.log("=====");
                console.log(chosen);
                console.log(pick[chosen].x);
                console.log(pick[chosen].y);
                console.log("======")
                if(pick[chosen].x === cell.x+1 && pick[chosen].y === cell.y){
                    maze[cell.y][cell.x].edges.e = maze[cell.y][cell.x+1]
                    maze[cell.y][cell.x+1].edges.w = maze[cell.y][cell.x];
                }
                if(pick[chosen].x ===cell.x-1 && pick[chosen].y === cell.y){
                    maze[cell.y][cell.x].edges.w = maze[cell.y][cell.x-1];
                    maze[cell.y][cell.x-1].edges.e = maze[cell.y][cell.x];
                }
                if(pick[chosen].y === cell.y-1 && pick[chosen].x === cell.x){
                    maze[cell.y][cell.x].edges.n = maze[cell.y-1][cell.x];
                    maze[cell.y-1][cell.x].edges.s = maze[cell.y][cell.x];
                }
                if(pick[chosen].y === cell.y+1&& pick[chosen].x === cell.x){
                    maze[cell.y][cell.x].edges.s = maze[cell.y+1][cell.x];
                    maze[cell.y+1][cell.x].edges.n = maze[cell.y][cell.x];
                }
                buildMaze(pick[chosen]);
                pick.splice(chosen,1);
            }while(pick.length>0)
        }

    };
buildMaze((maze[0][0]));
}

generateMaze(mazeSize);
startTime = new Date();


function drawCell(cell) {

    if (imgFloor.isReady) {
        context.drawImage(imgFloor,
        cell.x * (COORD_SIZE / mazeSize), cell.y * (COORD_SIZE / mazeSize),
        COORD_SIZE / mazeSize + 0.5, COORD_SIZE / mazeSize + 0.5);
    }

    if (cell.edges.n === null) {
        context.moveTo(cell.x * (COORD_SIZE / mazeSize), cell.y * (COORD_SIZE / mazeSize));
        context.lineTo((cell.x + 1) * (COORD_SIZE / mazeSize), cell.y * (COORD_SIZE / mazeSize));
    }

    if (cell.edges.s === null) {
        context.moveTo(cell.x * (COORD_SIZE / mazeSize), (cell.y + 1) * (COORD_SIZE / mazeSize));
        context.lineTo((cell.x + 1) * (COORD_SIZE / mazeSize), (cell.y + 1) * (COORD_SIZE / mazeSize));
    }

    if (cell.edges.e === null) {
        context.moveTo((cell.x + 1) * (COORD_SIZE / mazeSize), cell.y * (COORD_SIZE / mazeSize));
        context.lineTo((cell.x + 1) * (COORD_SIZE / mazeSize), (cell.y + 1) * (COORD_SIZE / mazeSize));
    }

    if (cell.edges.w === null) {
        context.moveTo(cell.x * (COORD_SIZE / mazeSize), cell.y * (COORD_SIZE / mazeSize));
        context.lineTo(cell.x * (COORD_SIZE / mazeSize), (cell.y + 1) * (COORD_SIZE / mazeSize));
    }
}

function renderCharacter(character) {
    if (character.image.isReady) {
        context.drawImage(character.image, (character.location.x * (COORD_SIZE / mazeSize)), character.location.y * (COORD_SIZE / mazeSize),COORD_SIZE/mazeSize,COORD_SIZE/mazeSize);
    }
}
function drawElapsedTime(){
        var elapsed=parseInt((new Date() - startTime)/1000);
        g.save();
        g.beginPath();
        g.fillStyle="red";
        g.font="14px Verdana"
        // draw the running time at half opacity
        g.globalAlpha=0.50;
        g.fillText(elapsed+" secs",canvas.width-75,25);
        g.restore();
    }

function win(){
    alert(`${(new Date() - startTime)/1000} seconds`)
}

function moveCharacter(key, character) {
    if (key === 'ArrowDown' || key === 'k' || key === 's') {
        if (character.location.edges.s) {
            character.location = character.location.edges.s;
        }
    }
    if (key == 'ArrowUp' || key === 'w' || key === 'i') {
        if (character.location.edges.n) {
            character.location = character.location.edges.n;
        }
    }
    if (key == 'ArrowRight' || key === 'l' || key === 'd') {
        if (character.location.edges.e) {
            character.location = character.location.edges.e;
        }
    }
    if (key == 'ArrowLeft' || key === 'j' || key === 'a') {
        if (character.location.edges.w) {
            character.location = character.location.edges.w;
        }
    }
    if(character.location.y == mazeSize-1 && character.location.x == mazeSize-1){win();}
}

function renderMaze() {
    // Render the cells first
    context.beginPath();
    for (let row = 0; row < mazeSize; row++) {
        for (let col = 0; col < mazeSize; col++) {
            drawCell(maze[row][col]);
        }
    }
    context.strokeStyle = 'rgb(255, 255, 255)';
    context.lineWidth = 4;
    context.stroke();

    // Draw a black border around the whole maze
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(COORD_SIZE - 1, 0);
    context.lineTo(COORD_SIZE - 1, COORD_SIZE - 1);
    context.lineTo(0, COORD_SIZE - 1);
    context.closePath();
    context.strokeStyle = 'rgb(0, 0, 0)';
    context.stroke();


}

//
// Immediately invoked anonymous function
//
let myCharacter = function(imageSource, location) {
    let image = new Image();
    image.isReady = false;
    image.onload = function() {
        this.isReady = true;
    };
    image.src = imageSource;
    return {
        location: location ,
        image: image
    };
}('character.png', maze[0][0]);

function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    renderMaze();
    renderCharacter(myCharacter);
//    drawElapsedTime
}

function processInput() {
    for (input in inputBuffer) {
        moveCharacter(inputBuffer[input], myCharacter);
    }
    inputBuffer = {};
}
function update(){};
function gameLoop() {
    processInput();
    update();
    render();

    requestAnimationFrame(gameLoop);

}

function initialize() {
    canvas = document.getElementById('canvas-main');
    context = canvas.getContext('2d');

    window.addEventListener('keydown', function(event) {
        inputBuffer[event.key] = event.key;
    });

    requestAnimationFrame(gameLoop);
}

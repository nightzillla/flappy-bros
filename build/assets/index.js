const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext("2d");
const score = document.querySelector('.score');

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

// get RNG 
function getRandomInt(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

// Bro
const broImg = new Image ();
broImg.src = 'assets/img/potato.png';

let bro  = {
    x: 50,
    y: 150,
    w: 50,
    h: 35,
    dy: 2,
}
// Update Score 
let scoreValue = 0;

function updateScore(){
    score.innerHTML = scoreValue;
    for(let i in pipesArr){
        if(pipesArr[i].x === 0){
            scoreValue++
        }
    }
}
// Bro Move
document.addEventListener("keydown", (e) => {
    if(e.keyCode === 32){
        broMove();
    }
})

function broMove() {
    bro.y -= 50;
}

function broGravity() {
    bro.y += bro.dy;
}
// Bro Render

function renderBro() {
     ctx.drawImage(broImg, bro.x, bro.y, bro.w, bro.h);
}

// Pipes 
const pipe1Img = new Image ();
pipe1Img.src = 'assets/img/pipe1.png';

const pipe2Img = new Image ();
pipe2Img.src = 'assets/img/pipe2.png';

// Pipes Update 
let pipesArr = [];
let timer = 0; 

function renderPipes (){
    timer++;
    if(timer % 100 === 0){
        pipesArr.push({
            x: 650,
            y: getRandomInt(150, 300),
            w: 60,
            h: 200,
        })
    }
    for ( let i in pipesArr){
        ctx.drawImage(pipe1Img, pipesArr[i].x, pipesArr[i].y, pipesArr[i].w, pipesArr[i].h);
        ctx.drawImage(pipe2Img, pipesArr[i].x, pipesArr[i].y -350, pipesArr[i].w, pipesArr[i].h);
    }
    updatePipes();
    deletePipes();
    broCollision();
}

function updatePipes(){
    for ( let i in pipesArr){
        pipesArr[i].x -= 5;
    }
}

function deletePipes(){
    for ( let i in pipesArr){
        if(pipesArr[i].x <= -50){
            pipesArr.splice(i, 1);
        }
    }
}

function broCollision(){
    for ( let i in pipesArr){
        if (pipesArr[i].x <= bro.x + bro.w && pipesArr[i].y <= bro.y + bro.h) {
            location.reload();
        }
    }
}
function game(){
    update();
    render();
    requestAnimationFrame(game);
}
requestAnimationFrame(game);

function update(){
    broGravity();
    updateScore();
}

function render (){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    renderBro();
    renderPipes();
    ctx.closePath();
}
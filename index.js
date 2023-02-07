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
broImg.src = 'img/potato.png';

let bro  = {
    x: 50,
    y: 150,
    w: 50,
    h: 35,
    dy: 2,
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
pipe1Img.src = 'img/pipe1.png';

const pipe2Img = new Image ();
pipe1Img.src = 'img/pipe2.png';


function game(){
    update();
    render();
    requestAnimationFrame(game);
}
requestAnimationFrame(game);

function update(){
    broGravity();
}

function render (){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    renderBro();
    ctx.closePath();
}
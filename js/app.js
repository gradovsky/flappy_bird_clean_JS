let canvas = document.getElementById("canvas");
let brush = canvas.getContext("2d")

let bird = new Image();
let bg = new Image();
let fg = new Image();
let pipeUp = new Image();
let pipeBottom = new Image();

bird.src = "img/flappy_bird_bird.png"
bg.src = "img/flappy_bird_bg.png"
fg.src = "img/flappy_bird_fg.png"
pipeUp.src = "img/flappy_bird_pipeBottom.png"
pipeBottom.src = "img/flappy_bird_pipeUp.png"

// Звуковые файлы
var fly = new Audio();
var score_audio = new Audio();

fly.src = "audio/fly.mp3";
score_audio.src = "audio/score.mp3";

var gap = 100;

// Any button on push
document.addEventListener("keydown", moveUp);

function moveUp() {
    yPos -= 25;
    fly.play();
}

// Create pipe blocks
var pipe = [];

pipe[0] = {
    x : canvas.width,
    y : 0
}

var score = 0;
// Bird position
var xPos = 10;
var yPos = 150;
var grav = 1.5;

function draw() {
    brush.drawImage(bg, 0, 0);

    for(var i = 0; i < pipe.length; i++) {
        brush.drawImage(pipeUp, pipe[i].x, pipe[i].y);
        brush.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);

        pipe[i].x--;

        if(pipe[i].x == 125) {
            pipe.push({
                x : canvas.width,
                y : Math.floor(Math.random() * pipeUp.height) - pipeUp.height
            });
        }

        // Collision bird with pipe

        if(xPos + bird.width >= pipe[i].x && xPos <= pipe[i].x + pipeUp.width && (yPos <= pipe[i].y + pipeUp.height
                || yPos + bird.height >= pipe[i].y + pipeUp.height + gap)) {
            location.reload(); // Перезагрузка страницы
        }

        if(pipe[i].x == 5) {
            score++;
            score_audio.play();
        }
    }

    brush.drawImage(fg, 0, canvas.height - fg.height);
    brush.drawImage(bird, xPos, yPos);

    yPos += grav;

    brush.fillStyle = "#000";
    brush.font = "24px Verdana";
    brush.fillText("Счет: " + score, 10, canvas.height - 20);

    requestAnimationFrame(draw);
}

pipeBottom.onload = draw;
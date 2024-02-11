// Ausgangsversion von https://www.youtube.com/watch?v=YGlJsgdgHuw
const app = new PIXI.Application();
let ufos = [];
let bullets = [];

document.body.appendChild(app.view);
let hits = 0;
let points = 0;
let level = 1;
let gameRunningTicks = 0;

const difficultyIncreaseEveryTicks=15;
const increaseSpeed=1.1;

const hitsSpan = document.querySelector('.hits');
const pointsSpan = document.querySelector('.points');
const levelSpan = document.querySelector('.level');
const ufoSpeedSpan = document.querySelector('.ufoSpeed');

const xSpan = document.querySelector('.x');

let ufoSpeed = 0.7;
const rocket = PIXI.Sprite.from('assets/rocket.png');
rocket.x = 300;
rocket.y = 520;
rocket.scale.x = 0.05;
rocket.scale.y = 0.05;
app.stage.addChild(rocket);

function cleanUpUfos() {
    ufos = ufos.filter(el => el.y < app.view.height);
 }

function cleanUpBullets() {
    bullets = bullets.filter(el => el.y > -20);
}

gameInterval(function() {
    const ufoNr=random(1,2);
    const ufo = PIXI.Sprite.from(`assets/ufo${ufoNr}.png`);
    ufo.x = random(0,700);
    ufo.y = -15;
    ufo.scale.x = 0.1;
    ufo.scale.y = 0.1;
    app.stage.addChild(ufo);
    ufos.push(ufo);
    flyDown(ufo,ufoSpeed);
    waitForCollision(ufo,rocket).then(function() {
        app.stage.removeChild(rocket);
        stopGame();
    });
    gameRunningTicks++;
    if (gameRunningTicks % difficultyIncreaseEveryTicks === 0) {
        level++;
        levelSpan.innerText = level;
        ufoSpeed *= increaseSpeed;
        ufoSpeedSpan.innerText = Math.floor(Math.round(ufoSpeed*10))/10;
    }
    cleanUpUfos();
    cleanUpBullets();
},1000);

//const bullet = PIXI.Sprite.from('assets/bullet.png');

function leftKeyPressed() {
    rocket.x -= 5;
    if (rocket.x < 0) {rocket.x = 0; }
    xSpan.innerText = rocket.x;
}

function rightKeyPressed() {
    rocket.x += 5;
    if (rocket.x > app.view.width - 25) {rocket.x = app.view.width - 25; }
    xSpan.innerText = rocket.x;
}

 function spaceKeyPressed() {
    // feuer!
    const bullet=PIXI.Sprite.from('assets/bullet.png')
    bullet.x = rocket.x;
    bullet.y = rocket.y - 5 ;
    bullet.scale.x = 0.02;
    bullet.scale.y = 0.02;
    app.stage.addChild(bullet);
    bullets.push(bullet);
    flyUp(bullet,3);
    waitForCollision(bullet,ufos).then(function([bullet,ufo]) {
        app.stage.removeChild(ufo);
        app.stage.removeChild(bullet);
        hits++;
        points++;
        hitsSpan.innerText=hits; 
        pointsSpan.innerText=points;
    })
}

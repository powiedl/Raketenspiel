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

const spans = {
    hitsSpan : document.querySelector('.hits'),
    pointsSpan : document.querySelector('.points'),
    levelSpan : document.querySelector('.level'),
    ufoSpeedSpan : document.querySelector('.ufoSpeed'),
    xSpan : document.querySelector('.x')
}

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
    ufo = new Ufo(app,spans,level,ufoSpeed);
    ufos.push(ufo.ufo);
    flyDown(ufo.ufo,ufoSpeed);
    waitForCollision(ufo.ufo,rocket).then(function() {
        app.stage.removeChild(rocket);
        stopGame();
    });
    gameRunningTicks++;
    if (gameRunningTicks % difficultyIncreaseEveryTicks === 0) {
        level++;
        spans.levelSpan.innerText = level;
        ufoSpeed *= increaseSpeed;
        spans.ufoSpeedSpan.innerText = Math.floor(Math.round(ufoSpeed*10))/10;
    }
    cleanUpUfos();
    cleanUpBullets();
},1000);

//const bullet = PIXI.Sprite.from('assets/bullet.png');

function leftKeyPressed() {
    rocket.x -= 5;
    if (rocket.x < 0) {rocket.x = 0; }
    spans.xSpan.innerText = rocket.x;
}

function rightKeyPressed() {
    rocket.x += 5;
    if (rocket.x > app.view.width - 25) {rocket.x = app.view.width - 25; }
    spans.xSpan.innerText = rocket.x;
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
        ufo.hit();
        app.stage.removeChild(bullet);
        spanhitsSpan.innerText=hits; 
        pointsSpan.innerText=points;
    })
}

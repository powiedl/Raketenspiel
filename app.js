// Ausgangsversion von https://www.youtube.com/watch?v=YGlJsgdgHuw
const app = new PIXI.Application();
const ufos = [];
document.body.appendChild(app.view);

let ufoSpeed = 0.7;
const rocket = PIXI.Sprite.from('assets/rocket.png');
rocket.x = 300;
rocket.y = 520;
rocket.scale.x = 0.05;
rocket.scale.y = 0.05;
app.stage.addChild(rocket);

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
},1000);

//const bullet = PIXI.Sprite.from('assets/bullet.png');

function leftKeyPressed() {
    rocket.x -= 5;
}

function rightKeyPressed() {
    rocket.x += 5;
}

 function spaceKeyPressed() {
    // feuer!
    const bullet=PIXI.Sprite.from('assets/bullet.png')
    bullet.x = rocket.x;
    bullet.y = rocket.y - 5 ;
    bullet.scale.x = 0.02;
    bullet.scale.y = 0.02;
    app.stage.addChild(bullet);
    flyUp(bullet,3);
    waitForCollision(bullet,ufos).then(function([bullet,ufo]) {
        app.stage.removeChild(ufo);
        app.stage.removeChild(bullet);
    })
}

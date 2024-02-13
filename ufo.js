// Das habe ich nicht zum Laufen gebracht (this.from(...))
// class Ufo extends PIXI.Sprite {
//     constructor(speed,lives) {
//         super();
//         const ufoNr=random(1,2);
//         this.from(`assets/ufo${ufoNr}.png`);
//         this.x = random(0,700);
//         this.y = -15;
//         this.scale.x = 0.1;
//         this.scale.y = 0.1;
//         this.speed = speed;
//         this.lives = lives;
//         this.points = lives;
//     }
// }

class Ufo  {
    constructor(app,spans,level,speed) {
        this.app = app;
        this.spans = spans;
        const ufoNr=random(1,2);
        if (level > 5) {
            this.lives = Math.floor((level+ufoNr)/10)+1;
        } else {
            this.lives = 1;
        }
        this.ufo = PIXI.Sprite.from(`assets/ufo${ufoNr}.png`);
        this.ufo.x = random(0,700);
        this.ufo.y = -15;
        this.ufo.scale.x = 0.1;
        this.ufo.scale.y = 0.1;
        this.speed = speed;
        this.points = this.lives;
    }
    hit(strength) {
        this.lives -= strength
        hits++;
        this.spans.hitsSpan.innerText=hits; 
        if (this.lives <= 0) {
            this.killed();
        }
    }

    killed() {
        app.stage.removeChild(ufo);
        points += this.points;
        this.spans.pointsSpan.innerText=points;
    }
}

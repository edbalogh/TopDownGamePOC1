import Particle from "./particle.js";

export default class Projectile {
    active = true;

    constructor(game, options) {
        this.game = game;

        // pull options
        this.position = options.position;
        this.velocity = options.velocity;
        this.width = options.width || 10;
        this.height = options.height || 10;
        this.speed = options.speed || 100;

        // adjusts speed
        this.velocity.x *= this.speed;
        this.velocity.y *= this.speed;

        this.game.objects.push(this);
    }

    update(delta) {
        this.position.x += this.velocity.x / delta;
        this.position.y += this.velocity.y / delta;
        
        for(let i = 0; i< Math.random() * this.width + 1; i++) {
            new Particle(this.game, { 
                position: {...this.position},
                size: this.width
            });
            if (i%3 === 0) {
                new Particle(this.game, { 
                    position: {...this.position},
                    size: this.width,
                    duration: 400, smoke: true
                });
            }
        }
        
        // deactivate if off screen
        if (this.position.x > this.game.canvas.width) this.active = false;
        if (this.position.x < 0) this.active = false;
        if (this.position.y > this.game.canvas.height) this.active = false;
        if (this.position.y < 0) this.active = false;
    };

    draw() {};
}
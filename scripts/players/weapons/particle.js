export default class Particle {
    active = true;

    constructor(game, options) {
        this.game = game;
        this.position = options.position;
        this.baseSize = options.size || 5;
        this.baseDuration = options.duration || 100;
        this.isSmoke = options.smoke || false;
        
        this.velocity = {
            x: Math.random() * 10 - 5,
            y: Math.random() * 10 - 5
        }

        if (this.isSmoke) {
            this.hue = Math.random() * 10 + 30;
            this.saturation = Math.random() * 10;
            this.lightness = 50 + Math.random() * 20;
            this.delay = Math.random() * 50;

        } else {
            this.hue = Math.random() * 10 + 30;
            this.saturation = 75 + Math.random() * 10;
            this.lightness = 75 + Math.random() * 15;
        }

        this.size = Math.random() * this.baseSize + 1;
        this.duration = Math.random() * this.baseDuration + 25;

        this.game.objects.push(this);
    }

    update(delta) {
        this.position.x += this.velocity.x / delta;
        this.position.y += this.velocity.y / delta;

        if (this.isSmoke) {
            this.delay -= delta;
            this.lightness += 1;
            this.size += 0.25;
        }

        // keep track of time to live
        this.duration -= delta;
        if (this.duration < 0) this.active = false;
        
        // deactivate if off screen
        if (this.position.x > this.game.canvas.width) this.active = false;
        if (this.position.x < 0) this.active = false;
        if (this.position.y > this.game.canvas.height) this.active = false;
        if (this.position.y < 0) this.active = false;
    };

    draw() {
        if (this.isSmoke && this.delay > 0) return;
        this.game.context.beginPath();
        this.game.context.fillStyle = `hsl(${this.hue}, ${this.saturation}%, ${this.lightness}%)`;
        this.game.context.arc(this.position.x, this.position.y, this.size, 0, Math.PI * 2)
        this.game.context.fill();
    };
}
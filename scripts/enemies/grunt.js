export default class Grunt {
    maxSpeed = 25;
    maxHP = 100;
    active = true;
    width = 15;
    height = 15;

    constructor(game, options) {
        this.game = game;
        this.position = options.position;

        this.velocity = { x: Math.random() * this.maxSpeed, y: Math.random() * this.maxSpeed }
        this.hp = this.maxHP;
        this.game.objects.push(this);
    }

    update(delta) {
        this.position.x += this.velocity.x / delta;
        this.position.y += this.velocity.y / delta;

        if (this.position.x < 0 || this.position.x + this.width > this.game.canvas.width) this.velocity.x *= -1;
        if (this.position.y < 0 || this.position.y + this.height > this.game.canvas.height) this.velocity.y *= -1
    }

    draw() {
        this.game.context.fillStyle = "brown";
        this.game.context.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    processDamage(damage) {
        this.hp -= damage;
        this.active = this.hp > 0;
    }
}
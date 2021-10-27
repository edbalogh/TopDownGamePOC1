import Projectile from "./weapons/projectile.js";

export default class Archer {
    maxVelocity = { x: 25, y: 25 }
    defaultStartingPosition = { x: 30, y: 30 }
    size = 32;
    minShotDelay = 250;
    nextShot = 0;
    active = true;
    isCharging = false;
    currentCharge = 0;
    
    constructor(game, options) {
        this.game = game
        this.position = options.position || this.defaultStartingPosition;
        this.velocity = { x: 0, y: 0 };
        this.setControlEvents();
        this.game.objects.push(this);
    };

    update(delta) {
        if (this.nextShot > 0) this.nextShot -= delta;
        if (this.isCharging) this.currentCharge += delta;
        this.currentCharge = Math.min(this.currentCharge, 2000);

        this.nextShot = Math.max(0, this.nextShot)
        this.position.x += this.velocity.x / delta;
        this.position.y += this.velocity.y / delta;

        this.game.context.fillFont = "14px Arial";
        this.game.context.fillStyle = "black";
        this.game.context.fillText(`ls: ${Math.round(this.nextShot) / 1000}`, this.game.canvas.width - 50, this.game.canvas.height - 10);
    };

    draw() {
        this.game.context.beginPath();
        this.game.context.fillStyle = "green";
        this.game.context.arc(this.position.x, this.position.y, this.size / 2, 0, Math.PI * 2)
        this.game.context.fill()
    };

    setControlEvents() {
        // adding event listeners
        addEventListener('keydown', (event) => {
            // console.log(event);
            // move right/left based on arrow keys
            if(event.key === 'd') this.velocity.x = this.maxVelocity.x;
            if(event.key === 'a') this.velocity.x = -this.maxVelocity.x;
            if(event.key === 's') this.velocity.y = this.maxVelocity.y;
            if(event.key === 'w') this.velocity.y = -this.maxVelocity.y;

            if(['1', '2', '3', '4', '6', '7', '8', '9'].includes(event.key)) this.isCharging = true;
        });
        
        addEventListener('keyup', (event) => {
            // console.log(event);
            if(event.key === 'd' && this.velocity.x > 0) this.velocity.x = 0;
            if(event.key === 'a' && this.velocity.x < 0) this.velocity.x = 0;
            if(event.key === 's' && this.velocity.y > 0) this.velocity.y = 0;
            if(event.key === 'w' && this.velocity.y < 0) this.velocity.y = 0;

            if (this.nextShot === 0) {
                const chargePct = this.currentCharge / 1000;
                let projectile = {
                    position: {...this.position},
                    velocity: { x: 0, y: 0 },
                    width: 2 + 3 * chargePct,
                    height: 2 + 3 * chargePct,
                    speed: 100 + 50 * chargePct
                }

                switch(event.key) {
                    case '4': 
                        projectile.velocity.x = -1;
                        projectile.position.x -= this.size / 2;
                        break;
                    case '6': 
                        projectile.velocity.x = 1;
                        projectile.position.x += this.size / 2;
                        break;
                    case '8':
                        projectile.velocity.y = -1;
                        projectile.position.y -= this.size / 2;
                        break;
                    case '2':
                        projectile.velocity.y = 1;
                        projectile.position.y += this.size / 2;
                        break;
                    case '7': 
                        projectile.velocity = { x: -0.5, y: -0.5 };
                        projectile.position.x -= this.size / 2 - 5;
                        projectile.position.y -= this.size / 2 - 5;
                        break;
                    case '9':
                        projectile.velocity = { x: 0.5, y: -0.5 };
                        projectile.position.x += this.size / 2 - 5;
                        projectile.position.y -= this.size / 2 - 5;
                        break;
                    case '1':
                        projectile.velocity = { x: -0.5, y: 0.5 };
                        projectile.position.x -= this.size / 2 - 5;
                        projectile.position.y += this.size / 2 - 5;
                        break;
                    case '3':
                        projectile.velocity = { x: 0.5, y: 0.5 };
                        projectile.position.x += this.size / 2 - 5;
                        projectile.position.y += this.size / 2 - 5;
                        break;
                }

                if(projectile.velocity.x !== 0 || projectile.velocity.y !== 0) {
                    this.isCharging = false;
                    this.currentCharge = 0;
                    this.nextShot = this.minShotDelay;
                    new Projectile(this.game, projectile);
                }
            }
        });
    }
}
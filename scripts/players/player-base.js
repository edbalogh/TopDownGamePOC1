export default class PlayerBase {
    maxVelocity = { x: 25, y: 25 }
    width = 32;
    height = 32;
    
    constructor(game, options) {
        this.game = game
        this.position = options.position;
        this.velocity = options.velocity;
    };

    update(delta) {
        this.position.x += this.velocity.x / delta;
        this.position.y += this.velocity.y / delta;
    };
    draw() {
        this.game.context.fillStyle = "#green";
        this.game.context.fillRect(position.x, position.y, this.width, this.height)
    };

    setControlEvents() {
        // adding event listeners
        addEventListener('keydown', (event) => {
            // move right/left based on arrow keys
            if(event.keyCode === 39) this.velocity.x = this.maxVelocity.x;
            if(event.keyCode === 37) this.velocity.x = -this.maxVelocity.x;
            if(event.keyCode === 38) this.velocity.y = this.maxVelocity.y;
            if(event.keyCode === 40) this.velocity.y = -this.maxVelocity.y;
        
            alert(`you pressed ${JSON.stringify(event)}`);
        });
        
        addEventListener('keyup', (event) => {
            if(event.keyCode === 39 && this.velocity.x > 0) this.velocity.x = 0;
            if(event.keyCode === 37 && this.velocity.x < 0) this.velocity.x = 0;
            if(event.keyCode === 38 && this.velocity.y > 0) this.velocity.y = 0;
            if(event.keyCode === 40 && this.velocity.y < 0) this.velocity.y = 0;
        });
    }
    
}
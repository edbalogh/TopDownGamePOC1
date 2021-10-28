export default class Spawner {
    hp = 10000;
    active = true;

    constructor(game, options) {
        this.game = game

        this.position = options.position;
        this.mob = options.mobClass

        this.spawnDelay = 10000;
        this.nextSpawnTime = this.spawnDelay;

        this.width = 25;
        this.height = 25;

        this.game.objects.push(this);
    }

    update(delta) {
        this.nextSpawnTime -= delta;
        if (this.nextSpawnTime < 0) {
            console.log('creating Grunt')
            this.nextSpawnTime = this.spawnDelay;
            new this.mob(this.game, { position: {...this.position} });
        }
    }

    draw() {
        this.game.context.fillStyle = "#444";
        this.game.context.fillRect(this.position.x, this.position.y, this.height, this.width);
    }

    processDamage(damage) {
        this.hp -= damage;
        this.active = this.hp > 0;
    }
}
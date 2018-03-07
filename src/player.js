import game from './game';
import Defs from './defs';

const MAX_SPEED = Defs.GAME_HEIGHT / 3;
const TARGET_Y = 200;

export default class Player {
    constructor(x, y) {
        this.sprite = game.add.sprite(x, y, 'player');
        this.sprite.anchor.y = 0.5;
        this.sprite.anchor.x = 0.5;
    }

    update() {
        let pointerX = game.input.activePointer.x;
        if (pointerX === -1) pointerX = Defs.GAME_WIDTH / 2;

        let speedFac = (pointerX - Defs.GAME_WIDTH / 2) * 3 / Defs.GAME_WIDTH;
        let speedXFac = Math.sign(speedFac) * Math.min(Math.abs(speedFac), 0.95);
        let speedYFac = -Math.sqrt(1 - Math.pow(speedXFac, 2)) * 0.80;
        this.sprite.position.x += game.time.elapsed / 1000 * speedXFac * MAX_SPEED;
        this.sprite.position.y += game.time.elapsed / 1000 * speedYFac * MAX_SPEED;
    }
}
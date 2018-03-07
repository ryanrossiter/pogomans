import game from './game';
import State from './state';
import Defs from './defs';
import Player from './player';

const RUN_DELAY = 600;
const THROW_DELAY = 1500;
const AFTER_DELAY = 2000;
const THROW_RANGE_X = 700;
const THROW_RANGE_Y = 200;

let player;
let ball;
let ballTween;
let target;
let targetTween;
let qb;
let throwTimer;
let thrown;
let rangeRect;
let caughtCounter;

export default {
    preload: () => {

    },

    create: () => {
        game.stage.backgroundColor = "#60B55A";
        rangeRect = game.add.graphics(Defs.GAME_WIDTH / 2 - THROW_RANGE_X / 2, THROW_RANGE_Y / 2);
        rangeRect.beginFill(0x65C55F);
        rangeRect.drawRect(0, 0, THROW_RANGE_X, THROW_RANGE_Y);
        rangeRect.endFill();

        player = new Player(Defs.GAME_WIDTH / 2, Defs.GAME_HEIGHT - 300);

        let targetX = Math.random() * THROW_RANGE_X + Defs.GAME_WIDTH / 2 - THROW_RANGE_X / 2;
        let targetY = 100 + Math.random() * THROW_RANGE_Y;
        target = game.add.sprite(
            State.lastTargetPos? State.lastTargetPos.x : targetX,
            State.lastTargetPos? State.lastTargetPos.y : targetY,
            'target'
        );
        target.anchor.x = target.anchor.y = 0.5;

        if (State.lastTargetPos) {
            game.add.tween(target).to({ x: targetX, y: targetY }, 300).start().onComplete.add(() => {
                if (State.caught >= 5) {
                    targetTween = game.add.tween(target).to({
                        x: Math.random() * THROW_RANGE_X + Defs.GAME_WIDTH / 2 - THROW_RANGE_X / 2,
                        y: 100 + Math.random() * THROW_RANGE_Y
                    }, 3500).start();
                }
            });
        }

        qb = game.add.sprite(Defs.GAME_WIDTH / 2, Defs.GAME_HEIGHT - 120, 'qb');
        qb.anchor.x = qb.anchor.y = 0.5;

        ball = game.add.sprite(Defs.GAME_WIDTH / 2 + 30, Defs.GAME_HEIGHT - 120, 'ball');
        ball.anchor.x = ball.anchor.y = 0.5;
        ball.rotation = Math.PI * 0.6;

        caughtCounter = game.add.text(50, 50, State.caught, {
            "font": "Courier New",
            fill: "#FFF",
            fontSize: "70px",
            fontWeight: "bold"
        });

        throwTimer = THROW_DELAY + RUN_DELAY;
        thrown = false;
    },

    update: () => {
        throwTimer -= game.time.elapsed;
        if (throwTimer - THROW_DELAY <= 0) {
            player.update();
        }

        if (throwTimer <= 0 && !thrown) {
            // throw
            thrown = true;
            if (targetTween) targetTween.stop();
            State.lastTargetPos = target.position;

            ballTween = game.add.tween(ball).to(target.position).start();
            ballTween.onComplete.add(() => {
                let dist = Phaser.Math.distance(player.sprite.x, player.sprite.y, target.x, target.y);
                let caught = false;
                let msgText = "WHAT";
                let msgColor = "#000";
                if (dist < 70) {
                    caught = true;
                    if (dist < 15) {
                        msgText = "Perfect! +3";
                        msgColor = "#68ebf9";
                        State.caught += 3;
                    } else if (dist < 50) {
                        msgText = "Great! +2";
                        msgColor = "#f78018";
                        State.caught += 2;
                    } else if (dist < 70) {
                        msgText = "+1";
                        msgColor = "#FFF";
                        State.caught++;
                    }
                } else {
                    msgText = "Miss";
                    State.caught = 0;
                }

                caughtCounter.text = State.caught;
                let message = game.add.text(ball.x - 15, ball.y - 40, msgText, {
                    "font": "Courier New",
                    fill: msgColor,
                    fontSize: "35px",
                    fontWeight: "bold"
                });
                game.add.tween(message).to({ alpha: 0, y: '-50' }).start();
                if (caught) {
                    ball.position = { x: 30, y: 0 };
                    player.sprite.addChild(ball);
                }
            });
        } else if (throwTimer <= -AFTER_DELAY) {
            game.state.restart();
        }
    },
}
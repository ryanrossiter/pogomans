import game from './game';
import Defs from './defs';

let loadPromises = [];
export default {
    preload: () => {
        for (const spriteName in Defs.PIXEL_SPRITES) {
            loadPromises.push(new Promise((resolve) => {
                let bmd = game.create.texture(spriteName, Defs.PIXEL_SPRITES[spriteName], Defs.PIXEL_SIZE, Defs.PIXEL_SIZE, 0, false);
                let i = new Image();
                i.onload = () => {
                    game.cache.addImage(spriteName, null, i);

                    if (spriteName in Defs.SPRITESHEETS) {
                        let data = Defs.SPRITESHEETS[spriteName];
                        game.cache.addSpriteSheet(data.key, null, i,
                            data.frameWidth * Defs.PIXEL_SIZE, data.frameHeight * Defs.PIXEL_SIZE
                        );
                    }

                    i.onload = null;
                    resolve();
                }

                i.src = bmd.canvas.toDataURL("image/png");
            }));
        }

        for (const spriteName in Defs.SPRITES) {
            game.load.image(spriteName, Defs.SPRITES[spriteName]);
        }

        loadPromises.push(new Promise((resolve) => game.load.onLoadComplete.add(resolve)));

        Promise.all(loadPromises).then(() => {
            // switch to next state
            game.state.start("Main");
        });
    },
}

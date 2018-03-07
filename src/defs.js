export default {
    GAME_WIDTH: window.innerWidth,
    GAME_HEIGHT: window.innerHeight,
    PIXEL_SIZE: 1,
    TILE_SIZE: 1,


    SPRITESHEETS: {
        '_test_spritesheet': {
            key: 'test_spritesheet',
            frameWidth: 26,
            frameHeight: 1
        },
    },

    SPRITES: {
        'player': 'assets/sprites/player.png',
        'target': 'assets/sprites/target.png',
        'qb': 'assets/sprites/qb.png',
        'ball': 'assets/sprites/ball.png',
    },

    PIXEL_SPRITES: {
        'test': [ '0123456789................', 'abcefghijklmnopqrstuvwxyz', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' ],
        '_test_spritesheet': [ '0123456789................' + 'abcefghijklmnopqrstuvwxyz' + 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' ],
    }
};
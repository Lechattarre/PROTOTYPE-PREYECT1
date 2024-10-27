const Game = {
    name: 'Videogame 1',
    author: 'john & ivan',
    version: '1.0',
    license: undefined,
    framesCounter: 0,

    gameSize: {
        width: 1500,
        height: 700
    },

    keys: {
        LEFT: 'KeyA',
        RIGHT: 'KeyD',
        TOP: 'KeyW',
        BOTTOM: 'KeyS',
        SHOOTLEFT: 'ArrowLeft',
        SHOOTRIGHT: 'ArrowRight',
        SHOOTTOP: 'ArrowUp',
        SHOOTBOTTOM: 'ArrowDown'
    },

    smallEnemies: [], // Array to store small enemies

    init() {
        this.setDimensions();
        this.start();
    },

    start() {
        this.createElements();
        this.setEventListener();
        this.startGameLoop();
    },

    setDimensions() {
        document.querySelector('#game-screen').style.width = `${this.gameSize.width}px`;
        document.querySelector('#game-screen').style.height = `${this.gameSize.height}px`;
    },

    createElements() {
        this.player = new Player(this.gameSize);
        this.enemy = new Enemy(this.gameSize);

        // Crear múltiples pequeños enemigos
        for (let i = 0; i < 5; i++) {
            this.smallEnemies.push(new SmallEnemy(this.player)); // Pasamos el objeto player
        }
    },

    startGameLoop() {
        setInterval(() => {
            this.moveAll();
        }, 1000 / 60); // 60 FPS
    },

    setEventListener() {
        document.onkeydown = event => {
            switch (event.code) {
                case this.keys.LEFT:
                    this.player.moveLeft();
                    break;
                case this.keys.RIGHT:
                    this.player.moveRight();
                    break;
                case this.keys.TOP:
                    this.player.moveTop();
                    break;
                case this.keys.BOTTOM:
                    this.player.moveBottom();
                    break;
                case this.keys.SHOOTLEFT:
                    this.player.shoot('left');
                    break;
                case this.keys.SHOOTRIGHT:
                    this.player.shoot('right');
                    break;
                case this.keys.SHOOTTOP:
                    this.player.shoot('top');
                    break;
                case this.keys.SHOOTBOTTOM:
                    this.player.shoot('bottom');
                    break;
            }
        };
    },

    moveAll() {
        this.player.move();
        this.player.bullets.forEach(bullet => bullet.move());
        this.player.clearBullets();
        this.enemy.move();

        // Mover todos los pequeños enemigos
        this.smallEnemies.forEach(smallEnemy => smallEnemy.move());
    }
};

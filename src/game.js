const Game = {
    name: 'Videogame 1',
    author: 'john & ivan',
    version: '1.0',
    license: undefined,
    framesCounter: 0,

    gameSize: { width: 1500, height: 700 },

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

    init() {
        this.setDimensions();
        this.createElements();
        this.setEventListener();
        this.startGameLoop();
    },

    setDimensions() {
        const gameScreen = document.querySelector('#game-screen');
        gameScreen.style.width = `${this.gameSize.width}px`;
        gameScreen.style.height = `${this.gameSize.height}px`;
    },

    createElements() {
        this.player = new Player(this.gameSize);
        this.enemigo = new Enemigo(this.gameSize);
    },

    setEventListener() {
        document.onkeydown = ({ code }) => {
            switch (code) {
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

    startGameLoop() {
        const gameLoop = () => {
            this.framesCounter++;
            if (this.framesCounter > 10000)
                this.framesCounter = 0;

            this.moveAll();

            requestAnimationFrame(gameLoop);
        };
        gameLoop();
    },

    moveAll() {
        this.player.move();
        this.updateBullets();
        this.enemigo.move()
    },

    updateBullets() {
        this.player.bullets.forEach(bullet => bullet.move());
        this.player.clearBullets();
    }
};

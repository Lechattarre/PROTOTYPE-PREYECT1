const Game = {
    name: 'Killer teacher',
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

    smallEnemies: [],


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

        for (let i = 0; i < 5; i++) {
            this.smallEnemies.push(new SmallEnemy(this.player));
        }

    },

    startGameLoop() {
        setInterval(() => {

            this.moveAll()

            if (this.detectCollision()) this.gameOver()
            this.detectBulletImpact()
            this.eliminateEnemy()

        }, 1000 / 60);
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
        this.enemy.move();


        this.smallEnemies.forEach(smallEnemy => smallEnemy.move());
    },

    detectCollision() {
        const playerBounds = this.player.getPlayerLimits();
        const enemyBounds = this.enemy.getEnemyLimits();
        if (
            playerBounds.left < enemyBounds.right &&
            playerBounds.right > enemyBounds.left &&
            playerBounds.top < enemyBounds.bottom &&
            playerBounds.bottom > enemyBounds.top

        ) {
            return true
        }
    },




    detectBulletImpact() {

        this.player.bullets.forEach((bullet, idx) => {
            const enemyBounds = this.enemy.getEnemyLimits();
            const bulletBounds = bullet.getBulletLimits();

            if (
                bulletBounds.left < enemyBounds.right &&
                bulletBounds.right > enemyBounds.left &&
                bulletBounds.top < enemyBounds.bottom &&
                bulletBounds.bottom > enemyBounds.top
            ) {

                this.player.bullets.splice(idx, 1)
                bullet.bulletElement.remove()
                this.enemy.healthPoints--
                console.log(this.enemy.healthPoints)
            }

        })

    },

    eliminateEnemy() {
        if (this.enemy.healthPoints === 0) {
            this.enemy.element.remove();

        }


    },

    gameOver() {

    }
};

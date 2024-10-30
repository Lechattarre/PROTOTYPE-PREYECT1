const Game = {
    name: 'Killer teacher',
    author: 'john & ivan',
    version: '1.0',
    license: undefined,
    framesCounter: 0,

    gameSize: {
        width: window.innerWidth,
        height: window.innerHeight
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
    smallEnemiesQuantity: 5,
    waveCounter: 0,

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
        this.createSmallEnemies();
    },

    createSmallEnemies() {
        this.smallEnemies = [];
        for (let i = 0; i < this.smallEnemiesQuantity; i++) {
            this.smallEnemies.push(new SmallEnemy(this.gameSize));
        }
    },

    startGameLoop() {
        setInterval(() => {
            this.moveAll();

            this.detectCollision()
            if (this.player.healthPoints === 0) {
                this.gameOver()
            }

            this.detectBulletImpact();
            this.eliminateEnemy();
            this.checkWin();

        }, 1000 / 60);
    },

    setEventListener() {
        document.addEventListener('keydown', event => this.handleKeyDown(event));
        document.addEventListener('keyup', event => this.handleKeyUp(event));
    },

    handleKeyDown(event) {
        switch (event.code) {
            case this.keys.LEFT:
                this.player.moveFlags.left = true;
                break;
            case this.keys.RIGHT:
                this.player.moveFlags.right = true;
                break;
            case this.keys.TOP:
                this.player.moveFlags.up = true;
                break;
            case this.keys.BOTTOM:
                this.player.moveFlags.down = true;
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
    },

    handleKeyUp(event) {
        switch (event.code) {
            case this.keys.LEFT:
                this.player.moveFlags.left = false;
                break;
            case this.keys.RIGHT:
                this.player.moveFlags.right = false;
                break;
            case this.keys.TOP:
                this.player.moveFlags.up = false;
                break;
            case this.keys.BOTTOM:
                this.player.moveFlags.down = false;
                break;
            case 'Space':
                this.player.flash(this.player.moveFlags);
                break;
        }
    },

    moveAll() {
        this.player.move();
        this.player.bullets.forEach(bullet => bullet.move());
        this.enemy?.move();
        this.smallEnemies.forEach(smallEnemy => smallEnemy.move());
    },

    detectCollision() {
        const playerBounds = this.player.getPlayerLimits();

        if (this.enemy) {
            const enemyBounds = this.enemy.getEnemyLimits();
            if (
                playerBounds.left < enemyBounds.right &&
                playerBounds.right > enemyBounds.left &&
                playerBounds.top < enemyBounds.bottom &&
                playerBounds.bottom > enemyBounds.top
            ) {
                this.player.healthPoints--
                console.log(this.player.healthPoints)
                return true;
            }
        }

        for (let i = 0; i < this.smallEnemies.length; i++) {
            const smallEnemiesBounds = this.smallEnemies[i].getSmallEnemiesLimits();
            if (
                playerBounds.left < smallEnemiesBounds.right &&
                playerBounds.right > smallEnemiesBounds.left &&
                playerBounds.top < smallEnemiesBounds.bottom &&
                playerBounds.bottom > smallEnemiesBounds.top
            ) {
                this.player.healthPoints--
                console.log(this.player.healthPoints)
                return true;
            }
        }

        return false;
    },

    detectBulletImpact() {
        this.player.bullets.forEach((bullet, idx) => {
            if (this.enemy) {
                const enemyBounds = this.enemy.getEnemyLimits();
                const bulletBounds = bullet.getBulletLimits();

                if (
                    bulletBounds.left < enemyBounds.right &&
                    bulletBounds.right > enemyBounds.left &&
                    bulletBounds.top < enemyBounds.bottom &&
                    bulletBounds.bottom > enemyBounds.top
                ) {
                    this.player.bullets.splice(idx, 1);
                    bullet.bulletElement.remove();
                    this.enemy.healthPoints--;
                }
            }

            this.smallEnemies.forEach((smallEnemy, enemyidx) => {
                const smallEnemiesBounds = smallEnemy.getSmallEnemiesLimits();
                const bulletBounds = bullet.getBulletLimits();
                if (
                    bulletBounds.left < smallEnemiesBounds.right &&
                    bulletBounds.right > smallEnemiesBounds.left &&
                    bulletBounds.top < smallEnemiesBounds.bottom &&
                    bulletBounds.bottom > smallEnemiesBounds.top
                ) {
                    this.smallEnemies.splice(enemyidx, 1);
                    bullet.bulletElement.remove();
                    this.player.bullets.splice(idx, 1);
                    smallEnemy.element.remove();
                    console.log("HIT");
                }
            });
        });
    },

    eliminateEnemy() {
        if (this.enemy && this.enemy.healthPoints === 0) {
            this.enemy.element.remove();
            this.enemy = null;
        }


        if (this.smallEnemies.length === 0) {
            this.waveCounter++;
            if (this.waveCounter < 3) {
                this.createSmallEnemies();
                console.log(`¡Oleada ${this.waveCounter + 1} iniciada!`);

            }
        }
    },

    gameOver() {
        alert("Perdiste por malo");
    },

    checkWin() {
        if (!this.enemy && this.smallEnemies.length === 0) {
            return alert("GANASTE");
        }
    }
};

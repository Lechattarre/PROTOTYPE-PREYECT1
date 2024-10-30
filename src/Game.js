const Game = {
    name: 'Killer teacher',
    author: 'john & ivan',
    version: '1.0',
    license: undefined,
    framesCounter: 0,
    backgroundMusic: new Audio('sounds/soundtrack.mp3'),




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
        this.backgroundMusic.loop = true;
        this.backgroundMusic.volume = 0.2;
        this.backgroundMusic.play();

        this.createElements();
        this.setEventListener();
        this.startGameLoop();
    },

    setDimensions() {
        document.querySelector('#game-screen').style.width = `${this.gameSize.width}px`;
        document.querySelector('#game-screen').style.height = `${this.gameSize.height}px`;
    },

    createElements() {
        this.player = new Player(this.gameSize)
        this.enemy = new Enemy(this.gameSize)
        this.medicKit = new MedicKit(this.gameSize)
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
            this.pickHealth()
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
                this.player.receiveDamage(1)
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
                this.player.receiveDamage(1)
                console.log(this.player.healthPoints)
                return true;
            }


        }

        return false;
    },

    detectBulletImpact() {
        this.player.bullets.forEach((bullet, bulletIdx) => {
            if (this.enemy) {
                const enemyBounds = this.enemy.getEnemyLimits();
                const bulletBounds = bullet.getBulletLimits();

                if (
                    bulletBounds.left < enemyBounds.right &&
                    bulletBounds.right > enemyBounds.left &&
                    bulletBounds.top < enemyBounds.bottom &&
                    bulletBounds.bottom > enemyBounds.top
                ) {
                    this.player.bullets.splice(bulletIdx, 1);
                    bullet.bulletElement.remove();
                    this.enemy.healthPoints--;
                }
            }

            this.smallEnemies.forEach((smallEnemy, smallEnemyIdx) => {
                const smallEnemyBounds = smallEnemy.getSmallEnemiesLimits();
                const bulletBounds = bullet.getBulletLimits();

                if (
                    bulletBounds.left < smallEnemyBounds.right &&
                    bulletBounds.right > smallEnemyBounds.left &&
                    bulletBounds.top < smallEnemyBounds.bottom &&
                    bulletBounds.bottom > smallEnemyBounds.top
                ) {



                    smallEnemy.element.remove();
                    bullet.bulletElement.remove();
                    this.smallEnemies.splice(smallEnemyIdx, 1);
                    this.player.bullets.splice(bulletIdx, 1);


                }


            });

        });
    },

    pickHealth() {
        if (this.medicKit && this.player.healthPoints <= this.player.maxHealth - 10) {
            const playerBounds = this.player.getPlayerLimits()
            const medicKitBounds = this.medicKit.getMedicKitLimits()
            if (playerBounds.left < medicKitBounds.right &&
                playerBounds.right > medicKitBounds.left &&
                playerBounds.top < medicKitBounds.bottom &&
                playerBounds.bottom > medicKitBounds.top) {

                this.medicKit.element.remove()
                this.medicKit = null
                this.player.healDamage(10)

            }
            return false
        }
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

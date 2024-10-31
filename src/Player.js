class Player {

    constructor(gameSize) {

        this.gameSize = gameSize

        this.bullets = []

        this.playerSize = {
            width: 100,
            height: 100
        }

        this.playerPos = {
            left: gameSize.width - this.playerSize.width,
            top: gameSize.height - this.playerSize.height
        }


        this.playerPhysics = {
            speed: {
                left: 50,
                top: 50

            }
        }
        this.moveFlags = {
            left: false,
            right: false,
            up: false,
            down: false
        }

        this.speed = 9

        this.healthPoints = 33
        this.maxHealth = 33

        this.flashCount = 3

        this.flashSound = new Audio('sounds/flash.wav')

        this.shootSound = new Audio('sounds/shoot.mp3')

        this.healthBar = {
            width: 450,
            height: 30
        }

        this.imageRight = "imgs/Player.png"
        this.imageLeft = "imgs/PlayerLeft.png"
        this.currentDirection = "right"

        this.createFlashCounter()
        this.createHealthBar()
        this.init()
    }

    init() {

        this.playerElement = document.createElement('div')
        this.playerElement = document.createElement('img')
        this.playerElement.src = this.imageRight


        this.playerElement.style.position = "absolute"
        this.playerElement.style.width = `${this.playerSize.width}px`
        this.playerElement.style.height = `${this.playerSize.height}px`
        this.playerElement.style.left = `${this.playerPos.left}px`
        this.playerElement.style.top = `${this.playerPos.top}px`


        document.querySelector('#game-screen').appendChild(this.playerElement)
    }

    move() {
        let oldDirection = this.currentDirection
        if (this.moveFlags.left && this.playerPos.left > 0) {
            this.playerPos.left -= this.speed;
            this.currentDirection = "left"
        }
        if (this.moveFlags.right && this.playerPos.left + this.playerSize.width < this.gameSize.width) {
            this.playerPos.left += this.speed;
            this.currentDirection = "right"
        }
        if (this.moveFlags.up && this.playerPos.top > 0) {
            this.playerPos.top -= this.speed;
        }
        if (this.moveFlags.down && this.playerPos.top + this.playerSize.height < this.gameSize.height) {
            this.playerPos.top += this.speed;
        }

        this.playerElement.style.left = `${this.playerPos.left}px`;
        this.playerElement.style.top = `${this.playerPos.top}px`;

        if (oldDirection !== this.currentDirection) {
            this.playerElement.src = this.currentDirection === 'right' ? this.imageRight : this.imageLeft;
        }

        this.bullets.forEach(bullet => bullet.move());
        this.clearBullets();
    }

    flash(moveFlags) {
        if (this.flashCount > 0) {
            const flashDistance = 300;

            if (moveFlags.left) {
                this.playerPos.left = Math.max(0, this.playerPos.left - flashDistance);
            }
            if (moveFlags.right) {
                this.playerPos.left = Math.min(this.gameSize.width - this.playerSize.width, this.playerPos.left + flashDistance);
            }
            if (moveFlags.up) {
                this.playerPos.top = Math.max(0, this.playerPos.top - flashDistance);
            }
            if (moveFlags.down) {
                this.playerPos.top = Math.min(this.gameSize.height - this.playerSize.height, this.playerPos.top + flashDistance);
            }
            this.flashCount--
            this.updateFlashCounter()

            this.playerElement.style.left = `${this.playerPos.left}px`
            this.playerElement.style.top = `${this.playerPos.top}px`

            this.flashSound.currentTime = 0
            this.flashSound.volume = 0.2
            this.flashSound.play()
        }
    }


    shoot(direction) {
        this.shootSound.currentTime = 0
        this.shootSound.volume = 0.5
        this.shootSound.play()

        this.bullets.push(new Bullets(this.playerPos, this.playerSize, direction, this.gameSize));
    }

    clearBullets() {
        this.bullets.forEach((bullet, idx) => {
            if (
                bullet.bulletPos.left < 0 ||
                bullet.bulletPos.left > this.gameSize.width ||
                bullet.bulletPos.top < 0 ||
                bullet.bulletPos.top > this.gameSize.height
            ) {
                bullet.bulletElement.remove()
                this.bullets.splice(idx, 1)
            }
        });
    }

    getPlayerLimits() {
        return {
            left: this.playerPos.left,
            top: this.playerPos.top,
            right: this.playerPos.left + this.playerSize.width,
            bottom: this.playerPos.top + this.playerSize.height,
            width: this.playerSize.width,
            height: this.playerSize.height
        }
    }

    createHealthBar() {
        this.healthBarElement = document.createElement("div")

        this.healthBarElement.style.position = "absolute"
        this.healthBarElement.style.width = `${this.healthBar.width}px`
        this.healthBarElement.style.height = `${this.healthBar.height}px`
        this.healthBarElement.style.top = "40px"
        this.healthBarElement.style.left = "30px"
        this.healthBarElement.style.backgroundColor = "gray"

        this.barFillElement = document.createElement("div")
        this.barFillElement.style.width = "100%"
        this.barFillElement.style.height = "100%"
        this.barFillElement.style.backgroundColor = "yellow"

        this.healthBarElement.appendChild(this.barFillElement)
        document.querySelector('#game-screen').appendChild(this.healthBarElement)
    }

    updateHealthBar() {
        const currentHealth = (this.healthPoints / this.maxHealth) * 100
        this.barFillElement.style.width = `${currentHealth}%`
    }

    receiveDamage(amount) {
        this.healthPoints = Math.max(0, this.healthPoints - amount)
        this.updateHealthBar()
    }

    healDamage(amount) {
        if (this.maxHealth <= this.healthPoints + amount) {
            return this.healthPoints = this.maxHealth
        }
        this.healthPoints = Math.min(this.healthPoints + amount)
        this.updateHealthBar()
    }

    createFlashCounter() {
        this.flashCounterElement = document.createElement('div')

        this.flashCounterElement.style.position = "absolute"
        this.flashCounterElement.style.top = "80px"
        this.flashCounterElement.style.left = "30px"
        this.flashCounterElement.style.fontSize = "24px"
        this.flashCounterElement.style.color = "yellow"
        this.flashCounterElement.style.fontFamily = "Tiny5, sans-serif"

        this.updateFlashCounter()

        document.querySelector('#game-screen').appendChild(this.flashCounterElement)
    }

    updateFlashCounter() {
        this.flashCounterElement.textContent = `Flash available: ${this.flashCount}`

    }
}
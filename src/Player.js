class Player {

    constructor(gameSize) {

        this.gameSize = gameSize

        this.bullets = []

        this.playerSize = {
            width: 70,
            height: 70
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

        this.init()
    }

    init() {

        this.playerElement = document.createElement('div')
        this.playerElement = document.createElement('img')
        this.playerElement.src = "imgs/Player.png"


        this.playerElement.style.position = "absolute"
        this.playerElement.style.width = `${this.playerSize.width}px`
        this.playerElement.style.height = `${this.playerSize.height}px`
        this.playerElement.style.left = `${this.playerPos.left}px`
        this.playerElement.style.top = `${this.playerPos.top}px`


        document.querySelector('#game-screen').appendChild(this.playerElement)
    }

    move() {
        this.playerElement.style.top = `${this.playerPos.top}px`
        this.playerElement.style.left = `${this.playerPos.left}px`

        this.bullets.forEach(bullet => bullet.move())
        this.clearBullets()
    }


    moveLeft() {
        if (this.playerPos.left > 0) {
            this.playerPos.left -= this.playerPhysics.speed.left
            this.move()
        }
    }

    moveRight() {
        if (this.playerPos.left + this.playerSize.width < this.gameSize.width) {
            this.playerPos.left += this.playerPhysics.speed.left
            this.move()
        }
    }

    moveTop() {
        if (this.playerPos.top > 0) {
            this.playerPos.top -= this.playerPhysics.speed.top
            this.move()
        }
    }

    moveBottom() {
        if (this.playerPos.top + this.playerSize.height < this.gameSize.height) {
            this.playerPos.top += this.playerPhysics.speed.top
            this.move()
        }
    }

    shoot(direction) {
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
}
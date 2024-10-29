class Bullets {

    constructor(playerPos, playerSize, direction, gameSize) {

        this.playerPos = playerPos
        this.playerSize = playerSize
        this.gameSize = gameSize

        this.bulletPos = {
            left: playerPos.left + playerSize.width / 2,
            top: playerPos.top + playerSize.height / 2
        }

        this.bulletSize = {
            width: 30,
            height: 30
        }
        this.setVelocity(direction)

        this.init()
    }

    setVelocity(direction) {

        this.bulletVel = {
            left: 0,
            top: 0
        }

        switch (direction) {
            case 'left':
                this.bulletVel.left = -10
                break
            case 'right':
                this.bulletVel.left = 10
                break
            case 'top':
                this.bulletVel.top = -10
                break
            case 'bottom':
                this.bulletVel.top = 10
                break
        }
    }

    init() {
        this.bulletElement = document.createElement('div')

        this.bulletElement.style.position = "absolute"
        this.bulletElement.style.borderRadius = `50%`
        this.bulletElement.style.backgroundColor = `red`
        this.bulletElement.style.width = `${this.bulletSize.width}px`
        this.bulletElement.style.height = `${this.bulletSize.height}px`
        this.bulletElement.style.left = `${this.bulletPos.left}px`
        this.bulletElement.style.top = `${this.bulletPos.top}px`

        document.querySelector('#game-screen').appendChild(this.bulletElement)
    }

    move() {
        this.bulletPos.left += this.bulletVel.left
        this.bulletPos.top += this.bulletVel.top

        this.updatePosition();
    }

    updatePosition() {
        this.bulletElement.style.left = `${this.bulletPos.left}px`
        this.bulletElement.style.top = `${this.bulletPos.top}px`
    }

    getBulletLimits() {

        return {
            left: this.bulletPos.left,
            top: this.bulletPos.top,
            right: this.bulletPos.left + this.bulletSize.width,
            bottom: this.bulletPos.top + this.bulletSize.height,
            width: this.bulletSize.width,
            height: this.bulletSize.height
        }
    }
}
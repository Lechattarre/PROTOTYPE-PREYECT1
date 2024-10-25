class Player {

    constructor(gameSize) {

        this.gameSize = gameSize

        this.playerSize = {
            width: 50,
            height: 50
        }
        this.playerPos = {
            left: gameSize.width / 2 - this.playerSize.width,
            top: gameSize.height / 2 - this.playerSize.height
        }

        this.player = {
            left: 10,
            top: this.playerSize.height - this.gameSize.height
        }

        this.playerSpecs = {
            color: 'yellow',

        }

        this.playerPhysics = {
            speed: {
                left: 10,
                top: 10
            }
        }
    }

    init() {
        this.playerElement = document.createElement('div')

        this.playerElement.style.position = "absolute"
        this.playerElement.style.width = `${this.playerSize.width}px`
        this.playerElement.style.height = `${this.playerSize.height}px`
        this.playerElement.style.left = `${this.playerPos.left}px`
        this.playerElement.style.top = `${this.playerPos.top}px`
        this.playerElement.style.backgroundColor = `black`

        document.querySelector('#game-screen').appendChild(this.playerElement)
    }

    move() {
        this.playerElement.style.top = `${this.playerPos.top}px`
        this.playerElement.style.left = `${this.playerPos.left}px`
    }

    moveLeft() {
        this.playerPos.left += this.playerPhysics.speed.left
    }

    moveRight() {
        this.playerPos.left -= this.playerPhysics.speed.left
    }
    moveBottom() {
        this.playerPos.top += this.playerPhysics.speed.top
    }
    moveTop() {
        this.playerPos.top -= this.playerPhysics.speed.top
    }
}
class Enemy {
    constructor(gameSize) {
        this.gameSize = gameSize

        this.enemySize = {
            width: 250,
            height: 250
        };

        this.position = {
            left: Math.random() * (gameSize.width - this.enemySize.width),
            top: Math.random() * (gameSize.height - this.enemySize.height)
        };

        this.physics = {
            speed: {
                left: 2,
                top: 2
            }
        }

        this.healthPoints = 50

        this.init()
    }

    init() {
        this.element = document.createElement('div')
        this.element.style.position = "absolute"
        this.element.style.width = `${this.enemySize.width}px`
        this.element.style.height = `${this.enemySize.height}px`
        this.element.style.left = `${this.position.left}px`
        this.element.style.top = `${this.position.top}px`
        this.element.style.backgroundColor = 'yellow'

        document.querySelector('#game-screen').appendChild(this.element)
    }

    move() {

        if (this.position.left >= this.gameSize.width - this.enemySize.width || this.position.left <= 0) {
            this.physics.speed.left *= -1
        }

        if (this.position.top >= this.gameSize.height - this.enemySize.height || this.position.top <= 0) {
            this.physics.speed.top *= -1
        }

        this.position.left += this.physics.speed.left
        this.position.top += this.physics.speed.top

        this.element.style.left = `${this.position.left}px`
        this.element.style.top = `${this.position.top}px`
    }

    getEnemyLimits() {
        return {
            left: this.position.left,
            top: this.position.top,
            right: this.position.left + this.enemySize.width,
            bottom: this.position.top + this.enemySize.height,
            width: this.enemySize.width,
            height: this.enemySize.height
        }
    }
}

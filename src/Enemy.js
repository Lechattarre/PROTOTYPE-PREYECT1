class Enemy {
    constructor(gameSize) {
        this.gameSize = gameSize

        this.enemySize = {
            width: 280,
            height: 280
        };

        this.position = {
            left: Math.random() * (gameSize.width - this.enemySize.width),
            top: Math.random() * (gameSize.height - this.enemySize.height)
        };

        this.physics = {
            speed: {
                left: 5.5,
                top: 5
            }
        }
        this.diesound = new Audio('sound/blood.wav')

        this.healthPoints = 100
        this.maxHealth = 100

        this.healthBar = {
            width: 450,
            height: 30
        }

        this.imageRight = "imgs/BossRight.png"
        this.imageLeft = "imgs/Boss.png"
        this.currentDirection = 'right'


        this.createHealthBar()
        this.init()
    }

    init() {
        this.element = document.createElement('div')
        this.element = document.createElement('img')
        this.element.src = this.imageRight


        this.element.style.position = "absolute"
        this.element.style.width = `${this.enemySize.width}px`
        this.element.style.height = `${this.enemySize.height}px`
        this.element.style.left = `${this.position.left}px`
        this.element.style.top = `${this.position.top}px`



        document.querySelector('#game-screen').appendChild(this.element)
    }

    move() {
        let oldDirection = this.currentDirection

        if (this.position.left >= this.gameSize.width - this.enemySize.width || this.position.left <= 0) {
            this.physics.speed.left *= -1
            this.currentDirection = this.physics.speed.left > 0 ? 'right' : 'left'
        }

        if (this.position.top >= this.gameSize.height - this.enemySize.height || this.position.top <= 0) {
            this.physics.speed.top *= -1
        }

        this.position.left += this.physics.speed.left
        this.position.top += this.physics.speed.top

        this.element.style.left = `${this.position.left}px`
        this.element.style.top = `${this.position.top}px`

        if (oldDirection !== this.currentDirection) {
            this.element.src = this.currentDirection === 'right' ? this.imageRight : this.imageLeft
        }
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

    createHealthBar() {
        this.healthBarElement = document.createElement("div")

        this.healthBarElement.style.position = "absolute"
        this.healthBarElement.style.width = `${this.healthBar.width}px`
        this.healthBarElement.style.height = `${this.healthBar.height}px`
        this.healthBarElement.style.top = "40px"
        this.healthBarElement.style.left = "1000px"
        this.healthBarElement.style.backgroundColor = "gray"

        this.barFillElement = document.createElement("div")
        this.barFillElement.style.width = "100%"
        this.barFillElement.style.height = "100%"
        this.barFillElement.style.backgroundColor = "red"

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


}

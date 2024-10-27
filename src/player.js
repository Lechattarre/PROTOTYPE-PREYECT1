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

        this.playerElement.style.position = "absolute"
        this.playerElement.style.width = `${this.playerSize.width}px`
        this.playerElement.style.height = `${this.playerSize.height}px`
        this.playerElement.style.left = `${this.playerPos.left}px`
        this.playerElement.style.top = `${this.playerPos.top}px`
        this.playerElement.style.backgroundColor = `black`

        document.querySelector('#game-screen').appendChild(this.playerElement)
    }

    move() {
        this.playerElement.style.top = `${this.playerPos.top}px`;
        this.playerElement.style.left = `${this.playerPos.left}px`;
    }


    moveLeft() {
        if (this.playerPos.left > 0) {
            this.playerPos.left -= this.playerPhysics.speed.left;
            this.move();
        }
    }

    moveRight() {
        if (this.playerPos.left + this.playerSize.width < this.gameSize.width) {  // Limita el movimiento al borde derecho
            this.playerPos.left += this.playerPhysics.speed.left;  // Mueve hacia la derecha
            this.move();  // Actualiza la posición visual
        }
    }

    moveTop() {
        if (this.playerPos.top > 0) {                   // Limita el movimiento al borde superior
            this.playerPos.top -= this.playerPhysics.speed.top;
            this.move();
        }
    }

    moveBottom() {
        if (this.playerPos.top + this.playerSize.height < this.gameSize.height) { // Limita al borde inferior
            this.playerPos.top += this.playerPhysics.speed.top;
            this.move();
        }
    }


    // denyMoveLeft() {
    //     if (this.playerPos.left + this.playerSize.width < this.gameSize.width) {
    //         this.moveLeft.disable = true
    //     }
    // }
}
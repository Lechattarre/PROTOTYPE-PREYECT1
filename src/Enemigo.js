class Enemigo {
    constructor(gameSize) {
        this.gameSize = gameSize;

        this.enemigoSize = {
            width: 250,
            height: 250
        };

        this.enemigoPos = {
            left: 100,
            top: 100
        };

        this.enemigoPhysics = {
            speed: {
                left: 10,
                top: 5
            }
        };

        this.init();
    }

    init() {
        this.enemigoElement = document.createElement('div');
        this.enemigoElement.style.position = "absolute";
        this.enemigoElement.style.width = `${this.enemigoSize.width}px`;
        this.enemigoElement.style.height = `${this.enemigoSize.height}px`;
        this.enemigoElement.style.left = `${this.enemigoPos.left}px`;
        this.enemigoElement.style.top = `${this.enemigoPos.top}px`;
        this.enemigoElement.style.backgroundColor = `yellow`;
        this.enemigoElement.style.borderRadius = '50%';

        document.querySelector('#game-screen').appendChild(this.enemigoElement);
    }

    move() {
        // Rebote en los límites de la pantalla
        if (this.enemigoPos.left >= this.gameSize.width - this.enemigoSize.width || this.enemigoPos.left <= 0) {
            this.turnHorizontal();
        }
        if (this.enemigoPos.top >= this.gameSize.height - this.enemigoSize.height || this.enemigoPos.top <= 0) {
            this.turnVertical();
        }

        // Actualiza la posición del enemigo
        this.enemigoPos.left += this.enemigoPhysics.speed.left;
        this.enemigoPos.top += this.enemigoPhysics.speed.top;

        // Actualiza la posición en el DOM
        this.enemigoElement.style.left = `${this.enemigoPos.left}px`;
        this.enemigoElement.style.top = `${this.enemigoPos.top}px`;
    }

    turnHorizontal() {
        this.enemigoPhysics.speed.left *= -1;
    }

    turnVertical() {
        this.enemigoPhysics.speed.top *= -1;
    }
}

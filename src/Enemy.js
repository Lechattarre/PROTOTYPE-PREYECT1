class Enemy {
    constructor(gameSize) {
        this.gameSize = gameSize;

        this.size = {
            width: 250,
            height: 250
        };

        this.position = {
            left: Math.random() * (gameSize.width - this.size.width), // Posición aleatoria dentro del área del juego
            top: Math.random() * (gameSize.height - this.size.height)
        };

        this.physics = {
            speed: {
                left: 2,
                top: 2
            }
        };

        this.init();
    }

    init() {
        this.element = document.createElement('div');
        this.element.style.position = "absolute";
        this.element.style.width = `${this.size.width}px`;
        this.element.style.height = `${this.size.height}px`;
        this.element.style.left = `${this.position.left}px`;
        this.element.style.top = `${this.position.top}px`;
        this.element.style.backgroundColor = 'yellow';

        document.querySelector('#game-screen').appendChild(this.element);
    }

    move() {
        // Mover enemigo y comprobar colisiones con los bordes
        if (this.position.left >= this.gameSize.width - this.size.width || this.position.left <= 0) {
            this.physics.speed.left *= -1; // Rebotar horizontalmente
        }

        if (this.position.top >= this.gameSize.height - this.size.height || this.position.top <= 0) {
            this.physics.speed.top *= -1; // Rebotar verticalmente
        }

        this.position.left += this.physics.speed.left;
        this.position.top += this.physics.speed.top;

        this.element.style.left = `${this.position.left}px`;
        this.element.style.top = `${this.position.top}px`;
    }
}

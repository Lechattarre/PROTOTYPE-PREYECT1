class SmallEnemy {
    constructor(player) {
        this.size = {
            width: 30,
            height: 30
        };

        this.position = {
            left: Math.random() * (1500 - this.size.width),
            top: Math.random() * (700 - this.size.height)
        };

        this.speed = 1;
        this.player = player;

        this.init();
    }

    init() {
        this.element = document.createElement('div');
        this.element.style.position = "absolute";
        this.element.style.width = `${this.size.width}px`;
        this.element.style.height = `${this.size.height}px`;
        this.element.style.left = `${this.position.left}px`;
        this.element.style.top = `${this.position.top}px`;
        this.element.style.backgroundColor = 'green';

        document.querySelector('#game-screen').appendChild(this.element);
    }

    move() {
        // Asegúrate de que la posición del jugador se esté actualizando correctamente
        const dx = this.player.playerPos.left - this.position.left;
        const dy = this.player.playerPos.top - this.position.top;

        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 5) {
            const angle = Math.atan2(dy, dx);

            this.position.left += Math.cos(angle) * this.speed;
            this.position.top += Math.sin(angle) * this.speed;

            this.updatePosition();
        }
    }

    updatePosition() {
        this.element.style.left = `${this.position.left}px`;
        this.element.style.top = `${this.position.top}px`;
    }
}

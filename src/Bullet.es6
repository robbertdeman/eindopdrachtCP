class Bullet {
    constructor(player){
        this.width = 1;
        this.height = 1;
        this.x = player.x+(player.width/2);
        this.y = player.y+(player.height);
        this.ySpeed = -5;
        this.color = "#00f";
        this.isDead = false;
    }

    move(canvas) {
        this.height += this.ySpeed;

        if (Math.abs(this.height) >= canvas.height) {
            this.isDead = true;
        }
    }

    hit(particle) {
        if (!particle) return;
        if ((particle.x + particle.width >= this.x)
            && (particle.x <= this.x)
            && (particle.y + particle.height >= this.y + this.height)) {
            this.isDead = true;
            return true;
        }
        return false;
    }

    get bullet() {
        return { x: this.x, y: this.y, width: this.width, height: this.height, color: this.color };
    }

}

module.exports = Bullet;
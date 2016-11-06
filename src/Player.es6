class Player {
    constructor() {
        this.width = 20;
        this.height = 20;
        this.xPos = 0;
        this.life = 1;
        this.alive = true;
        this.speed = 2;
        this.color = "rgba(67,234,12,1)";
        this.shooted = false;
        this.weapon = "normal";
        this.level = 0;
        this.score = 0;
    }

    area(canvas) {
        this.canvasWidth = canvas.width;
        this.canvasHeight = canvas.height;

        this.yPos = this.canvasHeight-this.height;
    }

    key(value) {
        if (value.left || value.right) {
            this.move(value);
        }

        if (value.space) {
            this.shooted = true;
        }
        return this.shooted;
    }

    move(key) {
        if (key.left && !key.right) this.xPos -= this.speed;
        if (key.right && !key.left) this.xPos += this.speed;

        this.outline();
        this.hit();
    }

    outline() {
        this.xPos <= 0 ? this.xPos = 0 : void 0; //linker lijn
        this.xPos >= this.canvasWidth-this.width ? this.xPos = this.canvasWidth-this.width : void 0; //rechter lijn
    }

    hit(particle) {

        if (!particle) return;
        if ((particle.x + particle.width >= this.xPos)
            && (particle.x <= this.xPos + this.width)
            && (particle.y + particle.height >= this.yPos)
            && (particle.y <= this.yPos + this.height)) {

            this.life = this.life - 1;
            this.color = "rgba(255,0,0,1)";
            setTimeout(()=>{ this.color = "rgba(0,254,0,1)";}, 100);
            return true;
        }
        return false;
    }

    scoreTotal() {
        document.getElementById("score").innerHTML = "Jouw score: "+this.score;
    }

    getLife() {
        this.life += 3;
    }

    get player() {
        return {
            width: this.width,
            height: this.height,
            x: this.xPos,
            y: this.yPos,
            color: this.color,
            life: this.life,
            weapon: this.weapon,
            level: this.level
        };
    }
}

module.exports = Player;
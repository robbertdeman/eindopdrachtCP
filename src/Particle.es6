class Particle {
    constructor(multiplier, xSpeed, ySpeed, x, y) {
        this.widthStandard = 10;
        this.heightStandard = 10;
        this.multiplier = multiplier;
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
        this.isDead = false;
        this.color = "rgba(23,44,56,1)";
        this.gravity = -1.001;
        this.width = this.widthStandard*this.multiplier;
        this.height = this.heightStandard*this.multiplier;
        this.x = x;
        this.y = y;
    }

    area(canvas) {
        this.canvasWidth = canvas.width;
        this.canvasHeight = canvas.height;
    }

    move() {
        this.ySpeed += 0.1;
        this.y += this.ySpeed;
        this.x += this.xSpeed;
        if (this.y >= this.canvasHeight-this.height) {
            this.y = this.canvasHeight-this.height;
            this.ySpeed *= this.gravity;
        }
        if (this.x >= this.canvasWidth-this.width) {
            this.x = this.canvasWidth-this.width;
            this.xSpeed *= this.gravity;
        }
        if (this.x <= 0) {
            this.x = 0;
            this.xSpeed = 1;
        }
    }

    hitted() {
        if (this.multiplier <= 1) {
            this.isDead = true;
        }
        else {
            this.multiplier = this.multiplier/2;
            this.width = this.widthStandard*this.multiplier;
            this.height = this.heightStandard*this.multiplier;
            this.ySpeed *= this.gravity;
            return true
        }
        return false;
    }

    get posPart() {
        return {width: this.width, height: this.height, x: this.x, y: this.y, color: this.color};
    }
}

module.exports = Particle;
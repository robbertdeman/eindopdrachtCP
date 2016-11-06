class CanvasView {
    constructor() {
        this.c = document.getElementById("myCanvas");
        this.ctx = this.c.getContext("2d");
    }

    clear() {
        this.ctx.clearRect(0, 0, this.c.width, this.c.height);
    }

    draw(char) {
        this.ctx.fillStyle = char.color;
        this.ctx.fillRect(char.x, char.y, char.width, char.height);
    }

    drawStart(start, level) {
        this.ctx.fillStyle = start.background;
        this.ctx.fillRect(0, 0, this.c.width, this.c.height);
        this.ctx.font = start.font;
        this.ctx.fillStyle = start.color;
        this.ctx.textAlign = start.align;
        this.ctx.strokeText("Druk op enter om Level "+level+" te starten",this.c.width/2,start.y);
        this.ctx.strokeText("Schieten: spatie. Lopen: Pijltoetsen",this.c.width/2,50);
    }

    drawEnd (gameResult, score, end) {
        this.ctx.fillStyle = end.background;
        this.ctx.fillRect(0, 0, this.c.width, this.c.height);
        this.ctx.font = end.font;
        this.ctx.fillStyle = end.color;
        this.ctx.textAlign = end.align;
        this.ctx.strokeText(gameResult+" Score: "+score,this.c.width/2,end.y);
    }

    get canvasValues() {
        return { width: this.c.width, height: this.c.height };
    }
}

module.exports = CanvasView;
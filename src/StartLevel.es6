class StartLevel {
    constructor() {
        this.backgroundColor = "#ff0"
        this.x = 50;
        this.y = 250;
        this.font = "20px Arial";
        this.color = "#000";
        this.align = "center";
        this.startGame = false;
    }

    get startValues() {
        return {
            background: this.backgroundColor,
            y: this.y,
            font: this.font,
            color: this.color,
            align: this.align
        };
    }
}

module.exports = StartLevel;
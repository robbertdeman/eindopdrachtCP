class KeyView {
    constructor(){
        this.left  = false;
        this.right = false;
        this.space = false;
        this.enter = false;

        document.addEventListener("keydown", (keyBoardDown) => {
            this.right = keyBoardDown.keyCode == 39;
            this.left = keyBoardDown.keyCode == 37;
            this.space = keyBoardDown.keyCode == 32;
            this.enter = keyBoardDown.keyCode == 13;
        });

        document.addEventListener("keyup", (keyBoardUp) => {
            if (keyBoardUp.keyCode == 39) { this.right = false; }
            else if (keyBoardUp.keyCode == 37) { this.left = false; }
            else if (keyBoardUp.keyCode == 32) { this.space = false; }
            else if (keyBoardUp.keyCode == 32) { this.enter = false; }
        });
    }

    get pressed() {
        return { left: this.left, right: this.right, space: this.space, enter: this.enter };
    }
}

module.exports = KeyView;
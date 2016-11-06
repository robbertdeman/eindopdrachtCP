//requires module
const Player = require("./Player.es6");
const KeyView = require("./KeyView.es6");
const CanvasView = require("./CanvasView.es6");
const Particle = require("./Particle.es6");
const Bullet = require("./Bullet.es6");
const StartLevel = require("./StartLevel.es6");

class Controller {
    constructor() {
        this.player = new Player();
        this.key = new KeyView();
        this.canvas = new CanvasView();
        this.start = new StartLevel(this.player.level);
        this.part = [];
        this.bullets = [];
        this.player.area(this.canvas.canvasValues);
        this.levels = require("./levels.json");
        this.highscores = require("./highscores.json");

        this.showHighscores();
        this.gameSetup();
    }

    loadDoc(score, name) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("demo").innerHTML = this.responseText;
            }
        };
        xhttp.open("GET", "http://localhost:4000/getHighscores?highscore="+ score +"&name="+ name, true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send();
    }

    showHighscores() {
        let showScores = document.getElementById("highscores");

        //sorteert de scores op hoogste score
        let sortedScores = this.sortResults("highscore", true);

        //loopen door de gesorteerde scores
        sortedScores.forEach((o) => {
            //maakt een div
            let savedScore = document.createElement("div");
            savedScore.className = "score";
            savedScore.innerHTML = o.name+": "+o.highscore;

            //voegt alles toe aan de class highscores
            showScores.appendChild(savedScore);
        });
    }

    sortResults() {
        return this.highscores.highscores.sort(function(a, b) {
            return b.highscore - a.highscore;

        });
    }

    gameSetup() {
        //kiest level van json
        let levelObj = this.levels["level"+this.player.level];

        //maakt particles aan
        levelObj.forEach((o) => {
            this.part.push(new Particle(o.multiplier, o.xSpeed, o.ySpeed, o.x, o.y));
        });

        //tekent de startpagina
        this.canvas.drawStart(this.start.startValues, this.player.level);

        //de game begint na het drukken op de enterknop
        document.addEventListener("keydown", (keyBoardDown) => {
            if (this.key.pressed.enter && !this.start.startGame) {
                this.start.startGame = true;
                this.loop();
            }
        });
    }

    totalScore() {
        let message;

        // bekijkt of de speler nog leeft
        if (this.player.alive) {
            message = "Uitgespeeld!";
        }
        else {
            message = "Game Over!"
        }

        //tekent de score
        this.canvas.drawEnd(message, this.player.score, this.start.startValues);

        //spel begint opnieuw na het drukken op de enter
        document.addEventListener("keydown", (keyBoardDown) => {
            if (this.key.pressed.enter) {
                let name = prompt("Wat is je naam?");

                //De score en naam wordt toegevoegd
                this.loadDoc(this.player.score, name);
            }
        });
    }

    loop() {
        //maakt de canvas schoon
        this.canvas.clear();

        //foreach voor elke particle
        this.part.forEach((p) => {
            p.area(this.canvas.canvasValues);
            p.move();
            this.canvas.draw(p.posPart);

            //bepaalt of de particle de speler heeft geraakt
            let hitByPlayer = this.player.hit(p.posPart);
            let xSpeed = p.xSpeed;

            //bekijkt of de particle de bullet heeft geraakt
            this.bullets.forEach((b) => {
                if (b.hit(p.posPart)) {
                    this.player.score += 50*p.multiplier;
                    if (p.hitted()) {
                        //zorgt ervoor dat er een kopie komt die de andere kant op springt
                        if (p.xSpeed >= 0) {
                            xSpeed = -Math.abs(p.xSpeed);
                        }
                        else {
                            xSpeed = Math.abs(p.xSpeed);
                        }
                        //maakt een kopie aan
                        this.part.push(new Particle(p.multiplier, xSpeed, p.ySpeed, p.x, p.y));
                    }
                }
            });

            //het gedrag van de particle als die de speler heeft geraakt
            if (hitByPlayer) {
                if (p.hitted()) {
                    if (p.xSpeed >= 0) {
                        xSpeed = -Math.abs(p.xSpeed);
                    }
                    else {
                        xSpeed = Math.abs(p.xSpeed);
                    }
                    this.part.push(new Particle(p.multiplier, xSpeed, p.ySpeed, p.x, p.y));
                }
            }
        });


        //filter de particles die niet meer bruikbaar zijn
        this.part = this.part.filter (function(p) {
            return p.isDead == false;
        });

        //waardes van de key worden doorgestuurd en de speler beweegt
        this.player.key(this.key.pressed);

        //wanneer de speler schiet
        if (this.player.shooted) {
            //kijkt of de kogel geschoten mag worden en checkt het wapen
            if (this.player.weapon == "normal" && this.bullets.length < 1 ) {
                this.bullets.push(new Bullet(this.player.player));
            }
            //er mag nu geen kogel meer afgevuurd worden
            this.player.shooted = false;
        }

        //loopt door de kogels heen
        this.bullets.forEach((b) => {
            b.move(this.canvas.canvasValues);
            this.canvas.draw(b.bullet);
        });

        //kogels filteren
        this.bullets = this.bullets.filter (function(b) {
            return b.isDead == false;
        });

        //speler tekenen
        this.canvas.draw(this.player.player);

        //score weergeven
        this.player.scoreTotal();

        // regelt de timing
        if (this.player.life <= 0) {
            this.player.alive = false;
            this.totalScore();
            return false;
        }

        //controlleert of alle particles weg zijn
        if (this.part.length <= 0) {
            //checkt of de speler in het laatste level zit
            if (this.player.level >= Object.keys(this.levels).length-1) {
                this.totalScore();
                return false;
            }

            //alles wordt gereset voor het volgende level
            this.player.level++;
            this.player.score += 200;
            this.player.xPos = 0;
            this.bullets = [];
            this.start.startGame = false;
            this.gameSetup();
        }

        //laat het spel lopen als de speler nog steeds bezig is met het level
        if (this.start.startGame) {
            window.requestAnimationFrame(() => {
                this.loop();
            });
        }
    }
}

new Controller();
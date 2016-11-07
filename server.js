const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

app.use('/dist', express.static(__dirname + '/dist'));

// Allow Cross-Origin requests, just leave this as is
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get('/', function(req, res){
    res.sendfile(__dirname + '/index.html');
});

app.get('/getHighscores', function(req, res){
    //haalt de highscore.json op en voegt de query eraan toe
    var obj = JSON.parse(fs.readFileSync('src/highscores.json', 'utf8'));
    if (req.query.onlyShow == "false") {
        var score = req.query;
        delete score.onlyShow;
        console.log(score);
        obj.highscores.push(score);
    }
    fs.writeFile('src/highscores.json', JSON.stringify(obj), function (err) {
        console.log(err);
    });
    if (req.query.onlyShow == "true") {
        res.send(obj);
    }
});

app.listen(4000, function () {
    console.log('Example app listening on port 3000!');
});

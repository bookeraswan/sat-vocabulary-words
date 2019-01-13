var express = require("express"),
    app     = express(),
    bodyParser  = require("body-parser"),
    satWordList = require("./assets/sat-word-list"),
    allSatWords = require("./assets/all-sat-words");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/views"));
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/assets"));

app.get("/api", function(req, res){
  res.json(allSatWords);
});

app.post("/api", function(req, res){
  console.log(req.body);
});

app.get("/all", function(req, res){
  res.sendFile(__dirname + "/views/all-words.html");
});

app.get("/api/word", function(req, res){
  var randomIndex = Math.floor(Math.random() * satWordList.length);
  var randomWord = satWordList[randomIndex];
  res.json(randomWord);
});

app.listen(process.env.PORT, process.env.IP, () => {console.log("api test app server started...")});

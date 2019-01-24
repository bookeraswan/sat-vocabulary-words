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
  var arrOfWords = satWordList.reduce(function(acc, val){
    acc.push(val.word);
    return acc;
  }, []);
  var wordIndex = arrOfWords.indexOf(req.body.word);
  if(wordIndex != -1){
    if(wordIndex == 0){
      satWordList.splice(0, 1);
    }
    else{
      satWordList.splice(wordIndex, 1);
    }
  }
    res.json({list: satWordList});
});

app.get("/all", function(req, res){
  res.sendFile(__dirname + "/views/all-words.html");
});

app.get("/api/word", function(req, res){
  if(satWordList.length > 0){
    var randomIndex = Math.floor(Math.random() * satWordList.length);
    var randomWord = satWordList[randomIndex];
    res.json(randomWord);
  }
  else{
    res.json({word: "You finnished the list!!!", definition: "Your done with this list!!!"});
  }
});

app.listen(process.env.PORT, process.env.IP, () => {console.log("api test app server started...")});

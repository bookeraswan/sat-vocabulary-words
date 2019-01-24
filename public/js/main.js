var currentWord;

getWord();

S("#show-definition-btn").addEventListener("click", showDefinition);
S("#next").addEventListener("click", getWord);
S("#checkbox").addEventListener("click", removeFromSession);

function getWord(){
  addWordLoader();
  Ajax("GET", "/api/word")
  .then(addWordToPage)
  .catch(displayError);
}

function addWordLoader(){
  S("#word").textContent = "";
  S("#word").classList.add("word-loader");
  S("#checkbox i").style.opacity = 0;
}

function addWordToPage(res){
  if(S("#word").style.color = "#f00"){
    S("#word").style.color = "#0a0";
  }
  S("#word").classList.remove("word-loader");
  S("#word").textContent = res.word;
  currentWord = res;
  S("#definition").textContent = res.definition;
  S("#definition").style.opacity = 0;
}

function displayError(){
  S("#word").classList.remove("word-loader");
  S("#word").style.color = "#f00";
  S("#word").textContent = err;
}

function showDefinition(){
  S("#definition").style.opacity = 1;
}

function removeFromSession(){
  var currentWordToJson = JSON.stringify(currentWord);
  Ajax("POST", "/api", currentWordToJson)
  .then(checkBox)
  .catch(function(err){
    console.log(err);
  });
}

function checkBox(res){
  S("#checkbox i").style.opacity = 1;
  new Howl({src: ['sounds/wipe.mp3']}).play();
  console.log(res);
}

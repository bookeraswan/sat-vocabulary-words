getWord();

S("#show-definition-btn").addEventListener("click", function(){
    S("#definition").style.opacity = 1;
});

S("#next").addEventListener("click", getWord);

function getWord(){
  Ajax("GET", "/api/word")
  .then(function(res) {
    S("#word").textContent = res.word;
    S("#definition").textContent = res.definition;
    S("#definition").style.opacity = 0;
  })
  .catch(function(err){
    console.error(`There was a problem!!! ${err}`);
  });
}

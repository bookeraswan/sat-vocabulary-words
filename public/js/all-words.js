Ajax("GET", "/api")
.then(function(res){
  S(".list-length").textContent = res.length;
  res.forEach(function(wordObj){
      var div = document.createElement("div");
      var span = document.createElement("span");
      var aside = document.createElement("aside");
      var hr = document.createElement("hr");
      span.textContent = `${wordObj.word}: `;
      span.classList.add("word");
      aside.textContent = wordObj.definition;
      div.append(hr);
      div.append(span);
      div.append(aside);
      S("table").append(div);
  });
})
.catch(function(err){
  console.error(err);
});

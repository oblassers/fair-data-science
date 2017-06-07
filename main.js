d3.json("model.json", function(data) {
  console.log(data);

  d3.select("#plan").text(JSON.stringify(data, null, '\t'));

});

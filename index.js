

for (var i =0; i <blog.rawData.length; i++){
  var article = new Article(blog.rawData[i],i);
  article.toHTML();
}

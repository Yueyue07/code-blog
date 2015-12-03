
blog.sortRawData = function(){
<<<<<<< HEAD
  blog.rawData.sort(function(a,b) {
=======
  this.rawData.sort(function(a,b) {
>>>>>>> class-02
        if(a.publishedOn > b.publishedOn){
          return -1;
        }

        if(a.publishedOn < b.publishedOn) {
          return 1;
        }

        return 0;
      }
  );

}

<<<<<<< HEAD
blog.createArticles = function(){

    for (var i =0; i <blog.rawData.length; i++){
      var article = new Article(blog.rawData[i],i);
      article.toHTML();
    }

}

$(document).ready(function(){
  blog.sortRawData();
  blog.createArticles();
});
=======
blog.createContent = function(){

    for (var i =0; i <blog.rawData.length; i++){
      var article = new Article(this.rawData[i],i);
      article.toHTML();

      var filterlist = new Filterlist(this.rawData[i]);
      filterlist.toHTML();
    }

}
>>>>>>> class-02

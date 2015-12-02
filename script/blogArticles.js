
blog.sortRawData = function(){
  this.rawData.sort(function(a,b) {
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

blog.createContent = function(){

    for (var i =0; i <blog.rawData.length; i++){
      var article = new Article(this.rawData[i],i);
      article.toHTML();

      var filterlist = new Filterlist(this.rawData[i]);
      filterlist.toHTML();
    }

}




$(document).ready(function(){
  blog.sortRawData();
  blog.createContent();


});

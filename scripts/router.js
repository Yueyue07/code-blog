// router index

page('/',articlesController.index);

//router about
page('/about',aboutController.index);

//page/articles/id
page('/articles/:id', function(id){
  var ID = id.params.id;
  console.log(ID);
  articlesController.Byid(ID);
});

page.start(); // don't go to browser; get content from the callback function

// router root
page('/',articlesController.index);

// rout about page from github api
page('/about',reposController.index);

// rout articles/id
page('/articles/:id', function(id){
  var ID = id.params.id;
  console.log(ID);
  articlesController.Byid(ID);
});

// page('/category/:category',function(data){
//   console.log(data);
//   console.log(data.params.category);
//   var category = data.params.category;
//   articlesController
// })

page('/category/:category',
   articlesController.category,
   articlesController.show
);

page.start(); // don't go to browser; get content from the callback function

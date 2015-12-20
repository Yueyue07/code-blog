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

page('/category/:category',
   articlesController.category,
   articlesController.show
);

page('/author/:author',
   articlesController.author,
   articlesController.show
);

page('/author/:author',
function(data){console.log(data);}
);
// page('/category/:category',function(data){
//   console.log(data);
//   console.log(data.params.category);
//   var category = data.params.category;
//   articlesController
// })



// $('#author-filter').on(function(e){
//   page('/user/12')
//   e.preventDefault()
// })

// $('#author-filter').on('change',function(e){
//   e.preventDefault();
//   var author = $(this).val();
//   console.log(author);
//   page('/author/' + author);
// });
//
// var author = 'AmaraLarkin';
// page('/author/' + ':' + author, function(data){
//   console.log(data.params[author]);
// });


// $('.author').click(function(event){
//   event.preventDefault();
//   page('/catgory')
// })

page.start(); // don't go to browser; get content from the callback function

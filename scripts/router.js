// Page Router Example
// page('/',function(){
//   console.log('Hey, you are at app roo!');
//   var $a = $('<a href="/aboutus">about US</a>');
//   $('#articles').append($a);
//   $('#spinner').hide();
//   $('#about').hide();
//   $('#artilces').show();
// }); // we could manipulate the address bar in html history without server requesting
//page('/',function(){console.log('You got it!');}
//);
// page('/about',function(){console.log('You got about!');});
// page.start('/about',function(){
//   $('#about').show();
// });



// router index

page('/',articlesController.index);

// router about
page('/about',aboutController.index);

// page('/articles/:id', function(id){
//   // var userId = context.id;
//   console.log('Loading details for articles id', id); // id is an object; id.params.id
// });
page('/articles/:id', function(id){
  var ID = id.params.id;
  console.log(ID);
  articlesController.Byid(ID);
});

page.start(); // don't go to browser; get content from the callback function

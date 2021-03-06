var articleView = {};

articleView.loadTemplate = function(articles) {
  $.get('/templates/article.html',function(data, msg, xhr) {
    articleView.template = Handlebars.compile(data);
    articleView.renderGroup(articles);
  });
};

articleView.renderGroup = function(articleList) {
  $('#spinner').hide();
  $('#articles')
  .fadeIn()
  .append(
    articleList.map(function(article) {
      return articleView.render(article);
    })
  )
  .siblings().hide();

};

articleView.render = function(article) {
  article.daysAgo =
    parseInt((new Date() - new Date(article.publishedOn))/60/60/24/1000);

  article.publishStatus = article.publishedOn ? 'published ' + article.daysAgo + ' days ago' : '(draft)';
  article.authorSlug = util.slug(article.author);
  article.categorySlug = util.slug(article.category);
  return articleView.template(article);
};

articleView.index = function () {
  articleView.loadTemplate(Article.all);
};

articleView.Byid = function(data){
  var article = data [0];
  articleView.loadTemplate(article);
};

// articleView.index = function() {
//   var _renderAll = function() {
//     $articles = $('#articles');
//     $articles.show().siblings().hide();
//     $('#spinner').hide();
//     Article.all.forEach(function(article) {
//       $articles.append(articleView.render(article));
//     });
//   }; //Define _renderAll function() {}
//
//   if (articleView.template) { // if htere is articleView.template
//     _renderAll(); // run _renderAll() function
//   } else {
//     $.get('/templates/article.html', function(data, msg, xhr) {
//       articleView.template = Handlebars.compile(data);
//       _renderAll();
//     });
//   }
// };
//
// articleView.render = function(article) {
//   // if (!blog.isAdmin() && !this.publishedOn) {
//   //   return '';
//   // }
//   article.daysAgo =
//     parseInt((new Date() - new Date(article.publishedOn))/60/60/24/1000);
//
//   article.publishStatus = article.publishedOn ? 'published ' + article.daysAgo + ' days ago' : '(draft)';
//   article.authorSlug = util.slug(article.author);
//   article.categorySlug = util.slug(article.category);
//
//   return articleView.template(article);
// };
//
// articleView.Byid = function(data){
//   console.log(data[0]);
//   console.log(data);
//   var article = data[0];
//   var _renderByid = function() {
//     $articles = $('#articles');
//     $articles.show().siblings().hide();
//     $articles.children().hide();
//     $('#spinner').hide();
//     $articles.append(articleView.render(article));
//   }; //Define _renderAll function() {}
//
//   if (articleView.template) { // if htere is articleView.template
//     _renderByid(); // run _renderAll() function
//   } else {
//     $.get('/templates/article.html', function(data, msg, xhr) {
//       articleView.template = Handlebars.compile(data);
//       _renderByid();
//     });
//   }
//
// };
//
//
// articleView.show = function(articles) {
//
//   var _renderAll = function() {
//     $articles = $('#articles');
//     $articles.hide().fadeIn().siblings().hide();
//     $articles.children().hide();
//     $('#spinner').hide();
//     articles.forEach(function(article) {
//       $articles.append(articleView.render(article));
//     });
//   };
//
//   if (articleView.template) { // if htere is articleView.template
//     _renderAll(); // run _renderAll() function
//   } else {
//     $.get('/templates/article.html', function(data, msg, xhr) {
//       articleView.template = Handlebars.compile(data);
//       _renderAll();
//     });
//   }
// };

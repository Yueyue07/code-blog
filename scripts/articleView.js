var articleView = {};

articleView.show = function(articles) {
  articleView.loadTemplate(articles);
  articleView.categoryUrl();
  articleView.authorUrl();

};

articleView.loadTemplate = function(articles) {
  if (articleView.template){
    articleView.renderGroup(articles);
    articleView.categoryUrl();
  }else{
    $.get('/templates/article.html',function(data, msg, xhr) {
      articleView.template = Handlebars.compile(data);
      articleView.renderGroup(articles);
      articleView.categoryUrl();
    });
  }
};

articleView.renderGroup = function(articleList) {
  $('#spinner').hide();
  $('#author-filter').fadeIn();
  $('#category-filter').fadeIn();
  $('#articles')
  .empty()
  .fadeIn()
  .append(
    articleList.map(function(article) {
      return articleView.render(article);
    })
  )
  .siblings().hide();

  articleView.teaser();

  if($('#author-filter').children().length === 1 && $('#category-filter').children().length === 1){
    articleView.Filter();
  }

};

articleView.render = function(article) {
  article.daysAgo =
    parseInt((new Date() - new Date(article.publishedOn))/60/60/24/1000);

  article.publishStatus = article.publishedOn ? 'published ' + article.daysAgo + ' days ago' : '(draft)';
  article.authorSlug = util.slug(article.author);
  article.categorySlug = util.slug(article.category);
  return articleView.template(article);
};

articleView.teaser = function() {
  $('.article-body').children(':nth-child(n+2)').hide();
  $('#articles').on('click','a.read-on',function(event){
    event.preventDefault();
    $(this).prev('.article-body').children().fadeIn();
    $(this).parent().find('.edit-btn').show();
    $(this).hide();
  });
};

articleView.index = function () {
  articleView.loadTemplate(Article.all);
};


articleView.Byid = function(data){
  var article = data [0];
  articleView.loadTemplate(article);
};

articleView.Filter = function(){
  $('article').each(function() {
    if (!$(this).hasClass('draft')) {
      var val = $(this).find('address a').text();
      if ($('#author-filter option[value="' + val + '"]').length === 0) {
        var option = '<option value="' + val + '">' + val + '</option>';
        $('#author-filter').append(option);
      }

      val = $(this).data('category');
      if ($('#category-filter option[value="' + val + '"]').length === 0) {
        option = '<option value="' + val + '">' + val + '</option>';
        $('#category-filter').append(option);
      }
    }
  });
};

articleView.categoryUrl = function() {
  $('#category-filter').on('change', function() {
    if ($(this).val()) {
      page('/category/' + $(this).val());
    } else {
      page('/');
    }
    console.log('url done');
    $('#author-filter').val('');
  });
};

articleView.authorUrl = function() {
  $('#author-filter').on('change', function() {
    if ($(this).val()) {
      page('/author/' + $(this).val());
    } else {
      page('/');
    }
    console.log('url done');
    $('#category-filter').val('');
  });
};

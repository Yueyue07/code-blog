var blog = {};

blog.watchNewArticle = function() {
  $('#new-form').on('change','input','textarea',blog.triggerPreview);
};

blog.triggerPreview = function() {
  $('#articles').empty();

  var article = blog.constructArticle();
  blog.appendArticle(article);

  $('pre code').each(function(i, block) {
    hljs.highlightBlock(block);
  });

  blog.exportJSON();
};

blog.constructArticle = function() {
  return new Article({
    title: $('#article-title').val(),
    author: $('#article-author').val(),
    authorUrl: $('#article-author-url').val(),
    category: $('#article-category').val(),
    markdown: $('#article-body').val(),
    publishedOn: $('#article-published:checked').length ? util.today() : null
  });
};

blog.appendArticle = function(a) {
  $('#articles').append(a.toHtml());
};

blog.exportJSON = function() {
  $('#export-field').show();
  $('#article-json').val(JSON.stringify(blog.constructArticle()) + ',');
};

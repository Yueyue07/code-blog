var blog = {};
blog.articles = [];

blog.loadArticles = function() {
  $.get('templates/article.handlebars', function(data, message, xhr) {
    Article.prototype.template = Handlebars.compile(data);
    $.ajax({
      type: 'HEAD',
      url: 'scripts/hackerIpsum.json',
      success: blog.fetchArticles
    });
  });
};

blog.fetchArticles = function(data, message, xhr) {
  var eTag = xhr.getResponseHeader('eTag');
  if (typeof localStorage.articlesEtag == 'undefined' || localStorage.articlesEtag != eTag) {
    console.log('cache miss!');
    localStorage.articlesEtag = eTag;

    // Remove all prior articles from the DB, and from blog:
    blog.articles = [];
    webDB.execute(
      // TODO: Add SQL here...
      'DELETE FROM articles;'
      , blog.fetchJSON);
  } else {
    console.log('cache hit!');
    blog.articles = [];
    blog.fetchFromDB();
  }
};

blog.fetchJSON = function() {
  $.getJSON('scripts/hackerIpsum.json', blog.updateFromJSON);
};

// Drop old records and insert new into db and blog object:
blog.updateFromJSON = function (data) {
  // Iterate over new article JSON:
  data.forEach(function(item) {
    // Instantiate an article based on item from JSON:
    var article = new Article(item);

    // Add the article to blog.articles
    blog.articles.push(article);

    article.insertRecord();

  });
  blog.sortArticles();
  blog.initArticles();
};

blog.fetchFromDB = function(callback) {
  callback = callback || function() {};

  // Fetch all articles from db.
  webDB.execute(
    'SELECT * FROM articles ORDER BY publishedOn DESC;',
    function (resultArray) {
      resultArray.forEach(function(ele) {
        blog.articles.push(new Article(ele));
      });

    }
  );
  blog.initArticles();
  callback();
};

blog.initArticles = function() {
  // Only render if the current page has somewhere to put all the articles
  if ($('#articles').length) {
    blog.render();
  }
};

blog.sortArticles = function() {
  blog.articles.sort(function(a,b) {
    return a.publishedOn < b.publishedOn;
  });
};

blog.render = function() {

  // Get all articles from the DB to render:
  webDB.execute(
    // TODO: Add SQL here...
    'SELECT * FROM articles ORDER BY publishedOn DESC;',
    function(results) {
      results.forEach(function(ele) { blog.appendArticle(ele); });
    });

  $('pre code').each(function(i, block) {
    hljs.highlightBlock(block);
  });

  blog.setTeasers();
  blog.populateFilters();
};

blog.appendArticle = function(a) {
  $('#articles').append((new Article(a)).toHtml());
};

blog.isAdmin = function () {
  var admin = util.getParameterByKey('admin');
  if (admin === 'true') {
    return true;
  }
  return false;
};

blog.setTeasers = function() {
  $('.article-body').children(':nth-child(n+2)').hide();
  $('#articles').on('click', 'a.read-on', function(e) {
    e.preventDefault();
    $(this).parent().find('.edit-btn').show();
    $(this).prev('.article-body').children().show();
    $(this).hide();
  });
};

blog.populateFilters = function() {
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

blog.handleAuthorFilter = function() {
  $('#author-filter').on('change', function() {
    if ($(this).val()) {
      $('article').hide();
      $('article[data-author="' + util.slug($(this).val()) + '"]').fadeIn();
    } else {
      $('article').fadeIn();
      $('article.draft').hide();
    }
    $('#category-filter').val('');
  });
};

blog.handleCategoryFilter = function() {
  $('#category-filter').on('change', function() {
    if ($(this).val()) {
      $('article').hide();
      $('article[data-category="' + util.slug($(this).val()) + '"]').fadeIn();
    } else {
      $('article').fadeIn();
      $('article.draft').hide();
    }
    $('#author-filter').val('');
  });
};

blog.handleMainNav = function() {
  $('.main-nav').on('click', '.tab', function() {
    $('.tab-content').hide();
    $('#' + $(this).data('content')).fadeIn();
  });
  $('.main-nav .tab:first').click();
};

blog.initNewArticlePage = function() {
  $.get('templates/article.handlebars', function(data, msg, xhr) {
    Article.prototype.template = Handlebars.compile(data);
  }).done(function(){
    $('.tab-content').show();
    $('#export-field').hide();
    $('#article-json').on('focus', function(){
      this.select();
    });
    blog.checkForEditArticle();
    blog.watchNewForm();
    /////
  });

};

blog.initArticleEditorPage = function() {
  $.get('../templates/article.handlebars', function(data, msg, xhr) {
    Article.prototype.template = Handlebars.compile(data);
    $('.tab-content').show();
    $('#export-field').hide();
    $('#article-json').on('focus', function(){
      this.select();
    });
    blog.checkForEditArticle();
    blog.watchNewForm();
  });

};

blog.checkForEditArticle = function () {
  if (util.getParameterByKey('id')) {
    var id = util.getParameterByKey('id');
    blog.loadArticleById(id);
    $('#add-article-btn').hide();
    $('#update-article-btn').show().data('article-id', id);
    $('#delete-article-btn').show().data('article-id', id);
    console.log('Found article to edit.');
  } else {
    console.log('No article to edit.');
  }
};

blog.loadArticleById = function (id) {
  // Grab just the one article from the DB
  webDB.execute(
    // TODO: Add SQL here...
    [
      {
        'sql':'SELECT * FROM articles WHERE id = ?',
        'data':[id],
        'success': function(){
          console.log('success select article by ID');}
      }
    ],
    function (resultArray) {
      if (resultArray.length === 1) {
        blog.fillFormWithArticle(resultArray[0]);
      }
    }
  );
};

blog.fillFormWithArticle = function (a) {
  var checked = a.publishedOn ? true : false;
  $('#preview').empty();
  $('#article-title').val(a.title);
  $('#article-author').val(a.author);
  $('#article-author-url').val(a.authorUrl);
  $('#article-category').val(a.category);
  $('#article-body').val(a.markdown);
  $('#article-published').attr('checked', checked);
  blog.buildPreview(); // Show the initial preview
};

blog.watchNewForm = function() {
  $('#new-form').on('change', 'input, textarea', blog.buildPreview);
};

blog.buildPreview = function() {
  var article = blog.buildArticle();
  $('#preview').html(article.toHtml());

  $('pre code').each(function(i, block) {
    hljs.highlightBlock(block);
  });
};

blog.buildArticle = function() {
  return new Article({
    title: $('#article-title').val(),
    author: $('#article-author').val(),
    authorUrl: $('#article-author-url').val(),
    category: $('#article-category').val(),
    markdown: $('#article-body').val(),
    publishedOn: $('#article-published:checked').length ? util.today() : null
  });
};

blog.exportJSON = function() {
  console.log('exportJSON');
  $('#export-field').show();
  var output = '';
  blog.articles.forEach(function(article) {
    output += JSON.stringify(article) + ',\n';
  });
  $('#article-json').val('[' + output + '{"markdown":""}]');
};

blog.clearNewForm = function () {
  $('#articles').empty();
  $('#article-title').val('');
  $('#article-author').val('');
  $('#article-author-url').val('');
  $('#article-category').val('');
  $('#article-body').val('');
  $('#article-published').attr('checked', false);
  $('#add-article-btn').show();
  $('#update-article-btn').hide();
  $('#delete-article-btn').hide();
};

blog.clearAndFetch = function () {
  blog.articles = [];
  blog.fetchFromDB(blog.exportJSON);
};

blog.handleAddButton = function () {
  $('#add-article-btn').on('click', function (e) {
    var article = blog.buildArticle();
    // Insert this new record into the DB, then callback to blog.clearAndFetch
    // TODO: Trigger SQL here...
    article.insertRecord();

  });
};

blog.handleUpdateButton = function () {
  $('#update-article-btn').on('click', function () {
    var id = $(this).data('article-id');
    var article = blog.buildArticle();
    article.id = id;

    // Save changes to the DB:
    // TODO: Trigger SQL here...
    article.updateRecord();
    blog.clearAndFetch();
  });
};

blog.handleDeleteButton = function () {
  $('#delete-article-btn').on('click', function () {
    var id = $(this).data('article-id');
    // Remove this record from the DB:
    webDB.execute(
      [
        {
          'sql':'DELETE FROM articles WHERE id = ?',
          'data':[id],
          'success': function(){
            console.log('success delete article from WebDB');}
        }
      ],
      blog.clearAndFetch);
    blog.clearNewForm();
  });
};

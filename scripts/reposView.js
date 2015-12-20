var reposView = {};

reposView.ui = function() {
  var $about = $('#about');
  $('#articles').hide();
  $('#spinner').hide();
  $('#author-filter').hide();
  $('#category-filter').hide();
  $('#repos').empty();
  $about.fadeIn().siblings().hide();
};

reposView.index = function() {
  reposView.ui();

  var _appendAll = function() {
    repos.all.forEach(function(repo){
      $('tbody#repos').append(reposView.template(repo));
    });
  };

  if (reposView.template) {
    _appendAll();
  } else {
    $.get('/templates/repo.html', function(data, msg, xhr) {
      reposView.template = Handlebars.compile(data);
      _appendAll();
    });
  }
  console.log('render table rows!');
};

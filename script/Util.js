var util = {};
util.truncateArticles = function() {

  $('div.content p:not(:first-child)').hide();
  $('main').on('click','.read-more', function(event){
     event.preventDefault();
    $(this).parent().find('p').fadeIn('slow');
    $(this).hide();

  })

}


util.findAuthorArticleList=function() {
  $('.authorList').change(function(){
        var name = $(this).html();
        console.log(typeof(name));
        console.log(name);
        $('main').find('article[data-author!="'+name+'"]').hide();
  });

}


util.about = function() {
  $('#about').on('click', function(event){
    console.log(event);

    event.preventDefault();
    $('main').hide();
    $('section').show();
  });
}

$(document).ready(function(){
  blog.sortRawData();
  blog.createContent();
  util.truncateArticles();
  util.findAuthorArticleList();
  util.about();

});

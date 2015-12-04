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
  $('select.authorList').click(function(event){
    event.preventDefault();
    $('article').show();
  });
  $('.authorList').change(function(){
        var str = "";
        // $('select.authorList option:selected').each(
        //   function(){
        //     str += $(this).text();
        //      console.log(str);
        //      $('main').find('article[data-author!="'+str+'"]').hide();
        //   }
        // );
        str = $('select.authorList option:selected').text();
        $('main').find('article[data-author!="'+str+'"]').hide();

    });

}

util.findCategoryList = function() {
  $('select.catList').click(function(event){
    event.preventDefault();
    $('article').show();
  });
  $('select.catList').change(function(){
    var str='';
    var str = $('select.catList option:selected').text();
    $('main').find('article[data-category!="'+str+'"]').hide();
  });
}

util.about = function() {
  $('#about').on('click', function(event){
    console.log(event);

    event.preventDefault();
    $('main').hide();
    $('select').hide();
    $('section').show();
  });
}

util.hambMenu = function() {
  $('button').click(function(){

    $('nav').toggle()
    $('div.container h1').css('text-align','center');
  });

}

$(document).ready(function(){
  blog.sortRawData();
  blog.createContent();
  util.about();
  util.truncateArticles();
  util.findAuthorArticleList();
  util.findCategoryList();
  util.hambMenu();
});

var util = {};
util.truncateArticles = function() {

  $('div.content p:not(:first-child)').hide();
  $('main').on('click','.read-more', function(event){
    event.preventDefault();
    $(this).parent().find('p').fadeIn('slow');
    $(this).hide();

  });

};


util.findAuthorArticleList=function() {
  $('select.authorList').click(function(event){
    event.preventDefault();
    $('article').show();
  });
  $('.authorList').change(function(){
    var str = '';
    str = $('select.authorList option:selected').text();
    if (str === '--Filter By Author--'){
      $('main').fadeIn('slow');
    }else{
      $('main').find('article[data-author!="'+str+'"]').hide();
      $('select.catList option').first().attr('selected','selected');
    }
  });

};

util.findCategoryList = function() {
  $('select.catList').click(function(event){
    event.preventDefault();
    $('article').show();
  });
  $('select.catList').change(function(){
    var str='';
    var str = $('select.catList option:selected').text();
    if (str === '--Filter By Category--'){
      $('main').fadeIn('slow');
    }else{
      $('main').find('article[data-category!="'+str+'"]').hide();
      $('select.authorList option').first().attr('selected','selected');
    }

  });
};

util.about = function() {
  $('#about').on('click', function(event){
    console.log(event);

    event.preventDefault();
    $('main').hide();
    $('select').hide();
    $('section').show();
  });
};

util.stat = function() {
  $('#statusHome').on('click', function(event){
    console.log(event);

    event.preventDefault();
    $('main').hide();
    $('.bio').hide();
    $('select').hide();
    $('.status').show();
  });
};


util.hambMenu = function() {
  $('button').click(function(){

    $('nav').toggle();
    $('div.container h1').css('text-align','center');
  });

};

util.fetchArticles = function(data, message, xhr) {

  var eTag = xhr.getResponseHeader('eTag');
  if (typeof localStorage.articlesEtag == 'undefined' || localStorage.articlesEtag != eTag) {
    console.log('cache miss!');
    localStorage.articlesEtag = eTag;
    blog.rawData = [];
    util.fetchJSON();
  }
};

util.fetchJSON = function() {
  $.getJSON('js/hackerIpsum.json', util.updateFromJSON);
};


// $.getJSON('js/hackerIpsum.json',function (data) {
//   // Iterate over new article JSON:
// //   data.forEach(function(item) {
// //     // blog.rawData.push(item);});
// //     console.log(item);
// // }
//  console.log(typeof data[0]);})



util.updateFromJSON = function (data) {
  // Iterate over new article JSON:
  data.forEach(function(item) {
    // Instantiate an article based on item from JSON:
    // blog.rawData=[];
    // Add the article to blog.articles
    var article = new Article(item);
    blog.rawData.push(article);

  });
  util.initArticles();
};

util.initArticles = function() {
  util.sortArticles();

  // Only render if the current page has somewhere to put all the articles
  if ($('#articles').length) {
    util.render();
  }
};

util.sortArticles = function() {
  blog.rawData.sort(function(a,b) {
    return a.publishedOn < b.publishedOn;
  });
};


$(document).ready(function(){
  $.get('js/template.handlebars',function(data,message,xhr){
    articleTempl.handlerTempScrip = Handlebars.compile(data);
    console.log(message);
    $.ajax({
      type: 'HEAD',
      url: 'js/hackerIpsum.json',
      success: util.fetchArticles
    });
  }).done(function() {
    // checkForNewArticles
    // blog.sortRawData();
    // blog.createContent();
    articleTempl.JSONformat();
    articleTempl.handlerTemplate();

    util.about();
    util.truncateArticles();
    util.findAuthorArticleList();
    util.findCategoryList();
    util.hambMenu();
    util.stat();
    console.log('success');
  });
});

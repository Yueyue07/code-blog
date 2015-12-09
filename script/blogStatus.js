function arthORartic_Arry(ArryObj,property) {  // property: 'author' or 'body'
  var arry = ArryObj.map(function(item){
    	return item[property];});

  return arry;
}; // array of article or artic
// arthOrartic_Arry(ArryObj,'body').length // # of articles;

function auth_artic_Arry(ArryObj) { // property = ['author', 'body']
  var articleArry = ArryObj.map(function(item){
    var array ={};
    array.author = item.author;
    array.markdown = item.markdown;
    return array;});

  return articleArry;
}; // array of author and body objects

function articLength() {
  var articArr = arthORartic_Arry(blogData,'markdown');
  var artLegArr = articArr.map(function(item) {return item.replace(/[#,\n]/g,'').length;});
  return artLegArr;

}//length of each article in array

function authrList() {
  var authorsFilter = [];
  var authors = arthORartic_Arry(blogData,'author');
  authors.forEach(function(item){
    if(authorsFilter.indexOf(item) < 0){
      authorsFilter.push(item);
    }
  });
  return authorsFilter;

};

function articsByAuthor() {
  var auth_articsPair = [];

  var auth_artics = auth_artic_Arry(blogData);

  var authrlist = authrList();

  authrlist.forEach(function(auth){

    var author = auth;
    var artics = [];

    auth_artics.forEach(function(item){


      if(item.author.indexOf(author) >= 0){

        artics.push(item.markdown);
      }
    });

    var objPair = {};
    objPair.author = author;
    objPair.markdown = artics;

    auth_articsPair.push(objPair);

  });
  return auth_articsPair;
};

function stat () {
  var artNum = arthORartic_Arry(blogData,'markdown').length; //numArc
  var autNum = authrList().length;
  var marTotLen = articLength()
                 .reduce(function(sum,num){return sum+num;},0);
  var marAveLen = marTotLen/artNum;
  var artByAut = articsByAuthor()
                 .map(function(item){
                   var artByAutLen = item.markdown
                                     .reduce(function(sum,num){return sum + num.replace(/[#,\n]/g,'').length;},0);
                   var art  = item.author;
                   var artByAut = {};
                   artByAut.author = art;
                   artByAut.markLen = artByAutLen/item.markdown.length;
                   return artByAut;
                 });
  $('.status').find('.numArt').html('Total Number of Articles:  ' + artNum);
  $('.status').find('.numAut').html('Total Number of Authors:  ' + autNum);
  $('.status').find('.numWords').html('Total Number of Words:  ' + marTotLen);
  $('.status').find('.aveLe').html('Average Post Length across All Articles : ' + marAveLen);
  artByAut.forEach(function(item) {
    $('.status').find('.lenByAut').append('<li>Author:    ' + item.author + ';       Posts Average Length: ' + item.markLen + '</li>');
  });




};

var blogData;
$.getJSON( 'js/hackerIpsum.json', function(data) {
  blogData = data;
}).done( function(){
  stat();
}

);

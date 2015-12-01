function Article(props,i) {
  this.title = props.title;
  this.category = props.category;
  this.author = props.author;
  this.authorUrl = props.authorUrl;
  this.publishedOn = props.publishedOn;
  this.body = props.body;
  this.i = i;
}


Article.prototype.toHTML = function () {
   //Copy #template artible with clone
   var $articleTemplate = $('#template').clone().attr('id',   'template' + '_' + this.i);
  //insert title
   $articleTemplate.find('.title').html(this.title);
  // insert author
   $articleTemplate.find('.author').html(this.author);

    //past date
    var pastdate = new Date(this.publishedOn);
    var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
    //current date
    var currentdate = new Date();
    var diffDays = Math.round(Math.abs((currentdate - pastdate )/(oneDay)-1));
  //insert post days
    $articleTemplate.find('.postDays').html(diffDays);

   $articleTemplate.find('a.author').attr("href",this.authorUrl);
  // insert body
   $articleTemplate.find('.body').html(this.body);
   $articleTemplate.appendTo('main');

}

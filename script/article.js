function Article(props,i) {
    this.title = props.title;
    this.category = props.category;
    this.author = props.author;
    this.authorUrl = props.authorUrl;
    this.publishedOn = props.publishedOn;
    this.body = props.body;
<<<<<<< HEAD
=======
    this.author = props.author;
    this.category = props.category;
>>>>>>> class-02
    this.i = i;
}


Article.prototype.toHTML = function () {
    //Copy #template artible with clone
<<<<<<< HEAD
    var $articleTemplate = $('#template').clone().attr('id',   'template' + '_' + this.i);
=======
    var $articleTemplate = $('#template').clone().attr('id','template' + '_' + this.i);

        $articleTemplate.attr('data-author',this.author);

        $articleTemplate.attr('data-category',this.category);

>>>>>>> class-02
    //insert title
    $articleTemplate.find('.title').html(this.title);
    // insert author
    $articleTemplate.find('.author').html(this.author);
<<<<<<< HEAD

=======
    //insert category
    $articleTemplate.find('.cat').html(this.category);
>>>>>>> class-02
    //past date
    var pastdate = new Date(this.publishedOn);
    var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
    //current date
    var currentdate = new Date();
    var diffDays = Math.round(Math.abs((currentdate - pastdate )/(oneDay)-1));
    //insert post days
    $articleTemplate.find('.postDays').html(diffDays);
    //insert link to author
    $articleTemplate.find('a.author').attr("href",this.authorUrl);
    // insert body
<<<<<<< HEAD
    $articleTemplate.find('.body').html(this.body);
=======
    $articleTemplate.find('.content').prepend(this.body);
    //insert read me link
>>>>>>> class-02
    //append to main tag
    $articleTemplate.appendTo('main');

}

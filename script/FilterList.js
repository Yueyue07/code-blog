function Filterlist(props) {
    this.author = props.author;
    this.category = props.category;

}


Filterlist.prototype.toHTML = function () {
    //Copy option with clone
     var $listAthTemplate = $('.authorList').find('option').first().clone();
      /* The similar method used to clone option element tag*/
     //var $listTemplate = $('.authorList option').first().clone();
     //var $listTemplate = $('.authorList').children().first().clone();


    if($('select.authorList').find('option[value="'+this.author+'"]').length === 0)
    {
      $listAthTemplate.html(this.author);
      $listAthTemplate.attr('value',this.author);
      // $listAthTemplate..removeAttr('selected');
      $listAthTemplate.appendTo('select.authorList');
    }

    var $listCatTemplate = $('.catList').children().first().clone();

    if($('.catList').find('option[value="'+this.category+'"]').length === 0){
        $listCatTemplate.html(this.category);
        $listCatTemplate.attr('value',this.category);
        // $listAthTemplate..removeAttr('selected');
        $listCatTemplate.appendTo('.catList');

    }
}

//select body box element, listen for user input, move to preview box
// $('#body').on('change', ).html();
var preview = function() {
  $('input#title').on('change', function(event){
    event.preventDefault();
    var titlevalue = marked($(this).val());
    $('#preview').append('title: ' + titlevalue);
  });

  $('input#name').on('change', function(event){
      event.preventDefault();
      var namevalue = marked($(this).val());
      $('#preview').append('name: ' + namevalue);
    });

  $('input#authorUrl').on('change', function(event){
      event.preventDefault();
      var authorUrlvalue = marked($(this).val());
      $('#preview').append('authorUrl' + authorUrlvalue);
    });

  $('textarea#body').on('change', function(event){
      event.preventDefault();
      var bodyvalue = marked($(this).val());
      $('#preview').append('body: ' + bodyvalue);
    });

    // var JSONdata = $("form#article").serialize();
    // console.log(JSONdata);
  //
  // $('#submitbutton').click(function(){
  //     $('#jsondata').append(JSONdata);
  // });

}

$(function(){
    preview();
});


//
// $('#body').bind('textarea', function() {
//     $(this).next().stop(true, true).fadeIn(0).html('[input event fired!]: ' + $(this).val());
// });

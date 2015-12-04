//select body box element, listen for user input, move to preview box
// $('#body').on('change', ).html();
$('textarea#body').on('change', function(event){
    event.preventDefault();
    var content = marked($(this).val());
    $('#preview').html(content);
  });


//
// $('#body').bind('textarea', function() {
//     $(this).next().stop(true, true).fadeIn(0).html('[input event fired!]: ' + $(this).val());
// });

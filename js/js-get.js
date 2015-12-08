
$('#home').on('click', function(e){
  e.preventDefault();
  $.get('js/template.handlebar.js',function(data){
  console.log(data);
  articleTempl.handlerTempScrip = Handlebars.compile(data);
  });
});

var articleTempl = {};

articleTempl.diffDays = function (publish) {
    //past date
    var pastdate = new Date(publish);
    var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
    //current date
    var currentdate = new Date();
    var diffDays = Math.round(Math.abs((currentdate - pastdate )/(oneDay)-1));

    return diffDays;
  };


  articleTempl.JSONformat = function() {
  var JSONdata = [];
  for (var i=0; i < blog.rawData.length; i++){
    blog.rawData[i].diffDays=articleTempl.diffDays(blog.rawData[i].publishedOn);
    JSONdata.push(JSON.parse(JSON.stringify(blog.rawData[i])));
  }

  return JSONdata;
  }



articleTempl.handlerTemplate = function() {
  var theTemplateScript = $("#address-template").html();

  // Compile the template
  var theTemplate = Handlebars.compile(theTemplateScript);

  // Define our data object
  var context = {};
  context.Data = [];
  context.Data = articleTempl.JSONformat(blog.rawData);


  // Pass our data to the template
  var theCompiledHtml = theTemplate(context);

  // Add the compiled html to the page
  $('main').html(theCompiledHtml);

};

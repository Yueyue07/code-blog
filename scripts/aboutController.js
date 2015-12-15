var aboutController = {};

aboutController.index = function() {
  aboutView.render();
};

var aboutView = {};
aboutView.render = function() {
  $('#articles').hide();
  $('.throbber-loader').hide();
  
  $('#about').fadeIn();
};

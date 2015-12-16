var reposController = {};

reposController.index = function() {
  repos.requestAll(reposView.index);//aboutView.index callback
};

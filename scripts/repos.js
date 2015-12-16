var repos = {};

repos.all = [];

repos.requestAll = function(callback){
  $.ajax({
    url: '/github/users/Yueyue07/repos',
    type: 'GET',
    // url:'https://api.github.com/users/Yueyue07/repos?sort=pushed',
    // headers: { Authorization: 'token ' + githubToken} // '/github/users/yueyue07/repos'
    success: function(data,message,xhr) {
      data.forEach(function(item){
        item['pushed_at'] = item['pushed_at'].slice(0,10);
      });
      repos.all=data;
    }
  }).done(callback);
};

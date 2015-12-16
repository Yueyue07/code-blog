var repos = {};

repos.all = [];

repos.requestAll = function(callback){
  $.ajax({
    type: 'GET',
    url:'https://api.github.com/users/Yueyue07/repos?sort=pushed',
    headers: { Authorization: 'token ' + githubToken}
  }).done(function(data){
    console.log(data[0]);
    data.forEach(function(item){
      item['pushed_at'] = item['pushed_at'].slice(0,10);
    });
    repos.all = data;
    console.log(repos.all);
  }).done(callback);
};

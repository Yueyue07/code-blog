/*global Handlebars */

function Article (opts) {
  Object.keys(opts).forEach(function(e, index, keys) {
    this[e] = opts[e];
  },this);

  this.body = opts.body || marked(this.markdown);
}

Article.prototype.template = '';

Article.prototype.toHtml = function() {
  if (!blog.isAdmin() && !this.publishedOn) {
    return '';
  }
  this.daysAgo =
    parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);

  this.publishStatus = this.publishedOn ? 'published ' + this.daysAgo + ' days ago' : '(draft)';
  this.authorSlug = util.slug(this.author);
  this.categorySlug = util.slug(this.category);

  return this.template(this);
};


Article.prototype.insertRecord = function(callback) {
  // insert article record into database
  callback = callback || function(){};
  webDB.execute(
    // TODO: Add SQL here...
    [
      {
        'sql':'INSERT INTO articles(title,category,author,authorUrl,publishedOn,markdown) VALUES (?,?,?,?,?,?)',
        'data':[this.title,this.category,this.author,this.authorUrl,this.publishedOn,this.markdown],
        'success': function(){
          console.log('success insert new article into WebDB');}
      }
    ]

    ,
    callback
  );
};

Article.prototype.updateRecord = function(callback) {
  //update article record in databse
  webDB.execute(
    // TODO: Add SQL here...
    [
      {
        'sql':'UPDATE articles SET title=?,category=?,author=?,authorUrl=?,publishedOn=?,markdown=? WHERE id=?',
        'data':[this.title,this.category,this.author,this.authorUrl,this.publishedOn,this.markdown,this.id],
        'success': function(){
          console.log('success update article into WebDB');}
      }
    ],

    callback
  );
};

Article.prototype.deleteRecord = function(callback) {
  // Delete article record in database
  webDB.execute(
    // TODO: Add SQL here...
    [
      {
        'sql':'DELETE FROM articles WHERE id = ?',
        'data':[this.id],
        'success': function(){
          console.log('success delete article from WebDB');}
      }
    ],

    callback
  );
};

Article.prototype.truncateTable = function(callback) {
  // Delete all records from given table.
  webDB.execute('DELETE FROM articles;',callback);
};

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
  webDB.execute(
    [
      {
        'sql': 'INSERT INTO articles (title, author, authorUrl, category, publishedOn, markdown) VALUES (?, ?, ?, ?, ?, ?);',
        'data': [this.title, this.author, this.authorUrl, this.category, this.publishedOn, this.markdown],
      }
    ],
    callback
  );
};

Article.prototype.updateRecord = function(callback) {
  //update article record in databse
  webDB.execute(
    [
      {
        'sql': 'UPDATE articles SET(title, author, authorUrl, category, publishedOn, markdown) VALUES (?, ?, ?, ?, ?, ?) WHERE id = this.id ;',
        'data': [this.title, this.author, this.authorUrl, this.category, this.publishedOn, this.markdown],
      }
    ]// TODO: Add SQL here...
    ,
    callback
  );
};

Article.prototype.deleteRecord = function(callback) {
  // Delete article record in database
  webDB.execute(
    'DELETE FROM articles WHERE id = this.id'// TODO: Add SQL here...
    ,
    callback
  );
};

Article.prototype.truncateTable = function(callback) {
  // Delete all records from given table.
  webDB.execute(
    'DELETE * FROM articles'
    ,
    callback
  );
};

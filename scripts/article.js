/*global Handlebars */

function Article (opts) {
  // shortcut to show off if requested - show on a later date
  // Object.keys(opts).forEach(function(e, index, keys) {
  //   this[e] = opts[e];
  // },this);
  this.author = opts.author;
  this.authorUrl = opts.authorUrl;
  this.title = opts.title;
  this.category = opts.category;
  this.markdown = opts.markdown;
  this.body = opts.body || marked(this.markdown);
  this.publishedOn = opts.publishedOn;
  this.daysAgo =
   parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000); 
}
Article.prototype.template = '';
Article.prototype.toHtml = function() {
  // var sourceText = $('#article-template').text();// handlebar script Template
  // var template = Handlebars.compile(sourceText);
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

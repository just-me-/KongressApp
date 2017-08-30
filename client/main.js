Meteor.startup(function(){

  // general
  Router.configure({
    notFoundTemplate: "404_notfound"
  });

  // tmp home
  Router.route('/', function () {
    this.render('home');
  });

  // user sites
  Router.route('/ask', function () {
    this.layout('layout_user');
    this.render('layout_user_menu', {to: 'menu'});
    this.render('layout_user_footer', {to: 'footer'});
    this.render('user_addQuestion');
  });
  Router.route('/program', function () {
    this.layout('layout_user');
    this.render('layout_user_menu', {to: 'menu'});
    this.render('layout_user_footer', {to: 'footer'});
    this.render('user_program');
  });

  // admin sites
  Router.route('/login', function () {
    this.layout('layout_admin');
    this.render('layout_admin_menu', {to: 'menu'});
    this.render('admin_login');
  });
  Router.route('/admin_program', function () {
    this.layout('layout_admin');
    this.render('layout_admin_menu', {to: 'menu'});
    this.render('admin_program');
  });
  Router.route('/admin_speaker', function () {
    this.layout('layout_admin');
    this.render('layout_admin_menu', {to: 'menu'});
    this.render('admin_speaker');
  });
  Router.route('/admin_sponsor', function () {
    this.layout('layout_admin');
    this.render('layout_admin_menu', {to: 'menu'});
    this.render('admin_sponsor');
  });

  // keynote sites
  Router.route('/keynote');
  Router.route('/keynote_login', function () {
    this.render('keynote_login');
  });
  Router.route('/keynote_mod', function () {
    this.render('keynote_mod');
  });
  Router.route('/keynote_answers', function () {
    this.render('keynote_answers');
  });

  // tmp
  Router.route('/tutorial', function () {
    this.render('tutorial');
  });

});

Meteor.startup(function(){

  Router.configure({
    notFoundTemplate: "404_notfound"
  });

  Router.route('/home', function () {
    this.layout('layout_user');
    this.render('layout_user_menu', {to: 'menu'});
    this.render('layout_user_footer', {to: 'footer'});
    this.render('homeTemplate');
  });

  Router.route('/tutorial', function () {
    this.render('tutorial');
  });

});

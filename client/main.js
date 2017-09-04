import { Programs } from '../imports/collections/programs.js';

Meteor.startup(function(){

  // general
  Router.configure({
    notFoundTemplate: "404_notfound"
  });

  // backend pw protected
  var myAdminHookFunction = function () {
    // if (!Meteor.userId()) {
    if (false) {
      this.layout('layout_admin');
      this.render('layout_admin_menu', {to: 'menu'});
      this.render('admin_login');
    } else {
      this.next();
    }
  };
  Router.onBeforeAction(myAdminHookFunction, {
    only: ['admin_program', 'admin_speaker', 'admin_sponsor'],
  });

  // tmp home
  Router.route('/', function () {
    this.render('home');
  });

  // user sites
  Router.route('/ask/:program', function () {
    this.layout('layout_user');
    this.render('layout_user_menu', {to: 'menu'});
    this.render('layout_user_footer', {to: 'footer'});
    this.render('user_addQuestion', {
      waitOn: function() {
        return [
          Meteor.subscribe('questions'),
          Meteor.subscribe('programs')
        ];
      },
      data: function () {
        return Programs.findOne({shortlink: this.params.program});
      }
    });
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
  Router.route('/keynote/:program', function () {
    this.render('keynote', {
      waitOn: function() {
        return [
          Meteor.subscribe('questions'),
          Meteor.subscribe('programs')
        ];
      },
      data: function () {
        return Programs.findOne({shortlink: this.params.program});
      }
    });
  });
  Router.route('/keynote_login', function () {
    this.render('keynote_login');
  });
  Router.route('/keynote_mod/:program', function () {
    this.render('keynote_mod', {
      waitOn: function() {
        return [
          Meteor.subscribe('questions'),
          Meteor.subscribe('programs')
        ];
      },
      data: function () {
        return Programs.findOne({shortlink: this.params.program});
      }
    });
  });
  Router.route('/keynote_answers/:program', function () {
    this.render('keynote_answers', {
      waitOn: function() {
        return [
          Meteor.subscribe('questions'),
          Meteor.subscribe('programs')
        ];
      },
      data: function () {
        return Programs.findOne({shortlink: this.params.program});
      }
    });
  });

  // tmp
  Router.route('/tutorial', function () {
    this.render('tutorial');
  });

});

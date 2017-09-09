import { Programs } from '../imports/collections/programs.js';

// just for routing
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
  Router.route('/details/:program', function () {
    this.layout('layout_user');
    this.render('layout_user_menu', {to: 'menu'});
    this.render('layout_user_footer', {to: 'footer'});
    this.render('user_programDetails', {
      waitOn: function() {
        return [
          Meteor.subscribe('questions'),
          Meteor.subscribe('speakers'),
          Meteor.subscribe('programs')
        ];
      },
      data: function () {
        return Programs.findOne({shortlink: this.params.program});
      }
    });
  });
  Router.route('/whatslive', function () {
    this.layout('layout_user');
    this.render('layout_user_menu', {to: 'menu'});
    this.render('layout_user_footer', {to: 'footer'});
    this.render('user_whatslive');
  });
  Router.route('/speakers', function () {
    this.layout('layout_user');
    this.render('layout_user_menu', {to: 'menu'});
    this.render('layout_user_footer', {to: 'footer'});
    this.render('user_speakers');
  });
  Router.route('/sponsors', function () {
    this.layout('layout_user');
    this.render('layout_user_menu', {to: 'menu'});
    this.render('layout_user_footer', {to: 'footer'});
    this.render('user_sponsors');
  });

  // admin sites
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

});

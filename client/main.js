import angular from 'angular';
import angularMeteor from 'angular-meteor';
import todosList from '../imports/components/todosList/todosList';
import '../imports/startup/accounts-config.js';


Meteor.startup(function(){

  Router.route('/home', function () {
    this.render('homeTemplate');
  });

  /*
  Router.configure({
    notFoundTemplate: "404_notfound"
  });
  */

});

angular.module('simple-todos', [
  angularMeteor,
  todosList.name,
  'accounts.ui'
]);

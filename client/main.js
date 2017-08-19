import '../imports/startup/accounts-config.js';
import '../imports/ui/body.js';

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

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { PW } from '../../../../imports/pw.js';

Template.admin_login.events({
  'click h1': function(event){
    var user = "bla";
    var password = "lol";
    Meteor.call('pw.login', user, password);
  }
});

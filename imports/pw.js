import { Meteor } from 'meteor/meteor';


// check if pw is right
// set settion
// destroy session

Meteor.methods({
  'pw.login'(user, password) {

    console.log("Hallo Test PW :) ");


    if (Meteor.isServer) {
      // console.log("Hallo Test PW :) " + test2);

      // Session.set('currentRoomId', 'home');
      // Session.get('currentRoomId');
      // console.log(Session.get('currentRoomId'));
    }
  }
});

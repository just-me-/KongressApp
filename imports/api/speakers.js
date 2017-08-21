import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Speakers = new Mongo.Collection('speakers');

if (Meteor.isServer) {
  Meteor.publish('speakers', function tasksPublication() {
    return Speakers.find({});
  });
}

Meteor.methods({
  'speakers.insert'(speakerData) {
    // check handels String, Number, Boolean, undefined, null
    var stringInputs = ['name', 'firstname', 'login', 'password', 'description'];
    for (input of stringInputs) {
      check(speakerData[input], String);
    }

    Speakers.insert({
      name: speakerData['name'],
      firstname: speakerData['firstname'],
      login: speakerData['login'],
      password: speakerData['password'],
      description: speakerData['description'],
      createdAt: new Date(),
    });
  },
  'speakers.update'(taskId, speakerData) {
    check(taskId, String);

    const speaker = Speakers.findOne(taskId);

    // check handels String, Number, Boolean, undefined, null
    var stringInputs = ['name', 'firstname', 'login', 'password', 'description'];
    for (input of stringInputs) {
      check(speakerData[input], String);
    }
    
    Speakers.update(taskId, {
      $set: {
        name: speakerData['name'],
        firstname: speakerData['firstname'],
        login: speakerData['login'],
        password: speakerData['password'],
        description: speakerData['description'],
        lastChange: new Date(),
      },
    });
  },
  'speakers.remove'(taskId) {
    check(taskId, String);

    const speaker = Speakers.findOne(taskId);

    Speakers.remove(taskId);
  },
  'speakers.checkPassword'(password) {
    return true;
  },
});

import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Speakers = new Mongo.Collection('speakers');
var Schema =  new SimpleSchema({
  name: {
    type: String
  },
  firstname: {
    type: String
  },
  login: {
    type: String,
    optional: true
  },
  password: {
    type: String,
    optional: true
  },
  description: {
    type: String,
    optional: true
  },
  createdAt: {
    type: Date
  },
  lastChange: {
    type: Date,
    optional: true
  }
});
Speakers.attachSchema(Schema);

if (Meteor.isServer) {
  Meteor.publish('speakers', function tasksPublication() {
    return Speakers.find({});
  });
}

Meteor.methods({
  'speakers.insert'(speakerData) {
    Speakers.insert({
      name: speakerData['name'],
      firstname: speakerData['firstname'],
      login: speakerData['login'],
      password: encrypt(speakerData['password']),
      description: speakerData['description'],
      createdAt: new Date(),
    });
  },
  'speakers.update'(taskId, speakerData) {
    check(taskId, String);

    const speaker = Speakers.findOne(taskId);

    // only update pw if changed
    if(speakerData['password'] != ""){
      Speakers.update(taskId, {
        $set: {
          password: encrypt(speakerData['password']),
        },
      });
    }

    Speakers.update(taskId, {
      $set: {
        name: speakerData['name'],
        firstname: speakerData['firstname'],
        login: speakerData['login'],
        description: speakerData['description'],
        lastChange: new Date(),
      },
    });
  },
  'speakers.remove'(taskId) {
    check(taskId, String);
    
    Speakers.remove(taskId);
  },
  'speakers.checkPassword'(password) {
    var cryptedPW = encrypt(password);
    // ...
    // 2Do for login mechanism
    return true;
  },
});

function encrypt(string) {
  return CryptoJS.SHA256(string).toString();
}

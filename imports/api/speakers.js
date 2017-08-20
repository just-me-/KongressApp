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
  'speakers.insert'(text) {
    check(text, String);

    Speakers.insert({
      text,
      createdAt: new Date(),
    });
  },
  'speakers.remove'(taskId) {
    check(taskId, String);

    const speaker = Speakers.findOne(taskId);

    Speakers.remove(taskId);
  },
});

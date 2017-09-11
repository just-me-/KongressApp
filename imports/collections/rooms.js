import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Rooms = new Mongo.Collection('rooms');
var Schema =  new SimpleSchema({
  name: {
    type: String
  },
  createdAt: {
    type: Date
  },
  lastChange: {
    type: Date,
    optional: true
  }
});
Rooms.attachSchema(Schema);

if (Meteor.isServer) {
  Meteor.publish('rooms', function tasksPublication() {
    return Rooms.find({});
  });
}

Meteor.methods({
  'rooms.insert'(roomData) {
    Rooms.insert({
      name: roomData['name'],
      createdAt: new Date(),
    });
  },
  'rooms.update'(taskId, roomData) {
    check(taskId, String);

    Rooms.update(taskId, {
      $set: {
        name: roomData['name'],
        lastChange: new Date(),
      },
    });
  },
  'rooms.remove'(taskId) {
    check(taskId, String);

    Rooms.remove(taskId);
  },
});

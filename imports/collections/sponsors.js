import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Sponsors = new Mongo.Collection('sponsors');
var Schema =  new SimpleSchema({
  name: {
    type: String
  },
  url: {
    type: String
  },
  website: {
    type: String,
    optional: true,
  },
  time: {
    type: Number,
    optional: true,
    min: 0,
    max: 3600
  },
  createdAt: {
    type: Date
  },
  lastChange: {
    type: Date,
    optional: true
  }
});
Sponsors.attachSchema(Schema);

if (Meteor.isServer) {
  Meteor.publish('sponsors', function tasksPublication() {
    return Sponsors.find({});
  });
}

Meteor.methods({
  'sponsors.insert'(sponsorData) {
    Sponsors.insert({
      name: sponsorData['name'],
      url: sponsorData['url'],
      time: sponsorData['time'],
      website: sponsorData['website'],
      createdAt: new Date(),
    });
  },
  'sponsors.update'(taskId, sponsorData) {
    check(taskId, String);

    Sponsors.update(taskId, {
      $set: {
        name: sponsorData['name'],
        url: sponsorData['url'],
        time: sponsorData['time'],
        website: sponsorData['website'],
        lastChange: new Date(),
      },
    });
  },
  'sponsors.remove'(taskId) {
    check(taskId, String);

    Sponsors.remove(taskId);
  },
});

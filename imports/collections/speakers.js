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
  description: {
    type: String,
    optional: true
  },
  email: {
    type: String,
    optional: true
  },
  phone: {
    type: String,
    optional: true
  },
  website: {
    type: String,
    optional: true
  },
  img_url: {
    type: String,
    optional: true
  },
  address: {
    type: String,
    optional: true
  },
  zip: {
    type: String,
    optional: true
  },
  city: {
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
      description: speakerData['description'],
      email: speakerData['email'],
      phone: speakerData['phone'],
      website: speakerData['website'],
      address: speakerData['address'],
      img_url: speakerData['img_url'],
      zip: speakerData['zip'],
      city: speakerData['city'],
      createdAt: new Date(),
    });
  },
  'speakers.update'(taskId, speakerData) {
    check(taskId, String);

    Speakers.update(taskId, {
      $set: {
        name: speakerData['name'],
        firstname: speakerData['firstname'],
        description: speakerData['description'],
        email: speakerData['email'],
        phone: speakerData['phone'],
        website: speakerData['website'],
        address: speakerData['address'],
        img_url: speakerData['img_url'],
        zip: speakerData['zip'],
        city: speakerData['city'],
        lastChange: new Date(),
      },
    });
  },
  'speakers.remove'(taskId) {
    check(taskId, String);

    Speakers.remove(taskId);
  },
});

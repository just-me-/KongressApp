import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { publishComposite } from 'meteor/reywood:publish-composite';

import { Speakers } from './speakers.js';

export const Programs = new Mongo.Collection('programs');
var Schema =  new SimpleSchema({
  title: {
    type: String
  },
  description: {
    type: String,
    optional: true
  },
  speaker: {
    type: String
  },
  startTime: {
    type: Date,
  },
  endTime: {
    type: Date,
  },
  isLive: {
    type: Boolean,
    optional: true
  },
  createdAt: {
    type: Date
  },
  lastChange: {
    type: Date,
    optional: true
  }
  // short link ?
});
Programs.attachSchema(Schema);

if (Meteor.isServer) {
  Meteor.publishComposite('programs', {
      find() {
          return Programs.find({});
      },
      children: [
          {
              find(program) {
                  return Speakers.find({ _id: program.speaker });
              }
          }
      ]
  });
}

Meteor.methods({
  'programs.insert'(programData) {
    Programs.insert({
      title: programData['title'],
      description: programData['description'],
      speaker: programData['speaker'],
      startTime: new Date(programData['startTime']),
      endTime: new Date(programData['endTime']),
      createdAt: new Date(),
    });
  },
  'programs.update'(taskId, programData) {
    check(taskId, String);

    const program = Programs.findOne(taskId);

    Programs.update(taskId, {
      $set: {
        title: programData['title'],
        description: programData['description'],
        speaker: programData['speaker'],
        startTime: new Date(programData['startTime']),
        endTime: new Date(programData['endTime']),
        lastChange: new Date(),
      },
    });
  },
  'programs.remove'(taskId) {
    check(taskId, String);

    Programs.remove(taskId);
  },
});

import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Questions = new Mongo.Collection('questions');
var Schema =  new SimpleSchema({
  question: {
    type: String
  },
  program: {
    type: String
  },
  ip: {
    type: String,
    optional: true
  },
  status: {
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
Questions.attachSchema(Schema);

if (Meteor.isServer) {
  Meteor.publish('questions', function tasksPublication() {
    return Questions.find({});
  });
}

Meteor.methods({
  'questions.insert'(questionData) {
    Questions.insert({
      question: questionData['question'],
      program: questionData['program'],
      ip: this.connection.clientAddress,
      status: "new",
      createdAt: new Date(),
    });
  },
  'questions.update'(taskId, questionData) {
    check(taskId, String);

    const sponsor = Sponsors.findOne(taskId);

    Questions.update(taskId, {
      $set: {
        question: questionData['question'],
        lastChange: new Date(),
      },
    });
  },
  'questions.remove'(taskId) {
    check(taskId, String);

    Questions.remove(taskId);
  },
});

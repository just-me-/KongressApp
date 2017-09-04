import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Questions = new Mongo.Collection('questions');
var Schema =  new SimpleSchema({
  question: {
    type: String
  },
  answer: {
    type: String,
    optional: true
  },
  program: {
    type: String
  },
  ip: {
    type: String,
    optional: true
  },
  status: {
    type: String // new nice live crap
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
  'questions.saveAnswer'(taskId, questionData) {
    check(taskId, String);

    Questions.update(taskId, {
      $set: {
        question: questionData['question'],
        answer: questionData['answer']
      },
    });
  },
  'questions.changeStatus'(taskId, status) {
    check(taskId, String);

    if (status.match(/^(new|nice|live|crap)$/)) {
      Questions.update(taskId, {
        $set: {
          status: status,
          lastChange: new Date(),
        },
      });
    }
  }
});

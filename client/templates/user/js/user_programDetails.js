import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Questions } from '../../../../imports/collections/questions.js';
import { Programs } from '../../../../imports/collections/programs.js';
import { Speakers } from '../../../../imports/collections/speakers.js';

Template.user_programDetails.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe('questions');
  Meteor.subscribe('speakers');
  Meteor.subscribe('programs');
});

Template.user_programDetails.helpers({
  speakerName(id) {
    var speaker = Speakers.findOne(id);
    return speaker.name + " " + speaker.firstname;
  },
  speakerDescription(id) {
    var speaker = Speakers.findOne(id);
    return speaker.description;
  },
  answeredQuestions(id) {
    return Questions.find({program: id, answer: {"$exists" : true, "$ne" : ""}}, {lastChange: -1});
  },
  hasAnsweredQuestions(id) {
    var int = Questions.find({program: id, answer: {"$exists" : true, "$ne" : ""}}, {lastChange: -1}).count();
    return int >= 1 ? true : false;
  },
  dateHelper: function (dateTime) {
    return moment(dateTime).format('DD.MM.YYYY HH:mm');
  }
});

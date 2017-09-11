import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Questions } from '../../../../imports/collections/questions.js';
import { Programs } from '../../../../imports/collections/programs.js';
import { Speakers } from '../../../../imports/collections/speakers.js';
import { Rooms } from '../../../../imports/collections/rooms.js';

Template.user_programDetails.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe('questions');
  Meteor.subscribe('speakers');
  Meteor.subscribe('programs');
  Meteor.subscribe('rooms');
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
  roomname(id) {
    var room = Rooms.findOne(id);
    return room.name;
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

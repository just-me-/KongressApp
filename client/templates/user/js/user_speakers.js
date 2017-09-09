import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Session } from 'meteor/session'

import { Programs } from '../../../../imports/collections/programs.js';
import { Speakers } from '../../../../imports/collections/speakers.js';

Template.user_speakers.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe('programs');
  Meteor.subscribe('speakers');
});

Template.user_speakers.helpers({
  speakers() {
    return Speakers.find({}, { sort: { name: 1 } });
  },
  speaker_events(id) {
    return Programs.find({speaker: id}, {sort: {startTime: -1} });
  },
  has_speaker_events(id) {
    var int = Programs.find({speaker: id}, {}).count();
    return int >= 1 ? true : false;
  }
});

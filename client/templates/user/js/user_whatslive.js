import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Session } from 'meteor/session'

import { Programs } from '../../../../imports/collections/programs.js';
import { Speakers } from '../../../../imports/collections/speakers.js';
import { Rooms } from '../../../../imports/collections/rooms.js';

Template.user_whatslive.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe('programs');
  Meteor.subscribe('speakers');
  Meteor.subscribe('rooms');
});

Template.user_whatslive.helpers({
  programs() {
    return Programs.find({isLive: true}, { sort: { startTime: -1 } });
  },
  speakername(id) {
    var speaker = Speakers.findOne(id);
    return speaker.firstname + " " + speaker.name;
  },
  roomname(id) {
    var room = Rooms.findOne(id);
    return room.name;
  },
  dateHelper: function (dateTime) {
    return moment(dateTime).format('DD.MM.YYYY HH:mm');
  }
});

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Rooms } from '../../../../imports/collections/rooms.js';

Template.keynote_room.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe('rooms');
});

Template.keynote_room.helpers({
  rooms() {
    return Rooms.find({}, { sort: { name: 1 } });
  },
});

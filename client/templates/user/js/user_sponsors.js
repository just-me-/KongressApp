import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Sponsors } from '../../../../imports/collections/sponsors.js';

Template.user_sponsors.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe('sponsors');
});

Template.user_sponsors.helpers({
  sponsors() {
    return Sponsors.find({}, { sort: { createdAt: -1 } });
  },
});

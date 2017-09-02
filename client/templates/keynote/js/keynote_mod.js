import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Questions } from '../../../../imports/collections/questions.js';
import { Programs } from '../../../../imports/collections/programs.js';

Template.keynote_mod.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe('questions');
  Meteor.subscribe('programs');
});

Template.keynote_mod.helpers({
  questions() {
    return Questions.find({program: Template.instance().data._id}, { sort: { createdAt: -1 } });
  },
});

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Questions } from '../../../../imports/collections/questions.js';
import { Programs } from '../../../../imports/collections/programs.js';

Template.keynote.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe('questions');
  Meteor.subscribe('programs');
});

Template.keynote.helpers({
  questions() {
    return Questions.find({program: Template.instance().data._id, status: "live"}, { sort: { lastChange: -1 } });
  },
  currentURL() {
    var link = Meteor.absoluteUrl().replace(/^https?\:\/\//i, "")+Iron.Location.get().path;;
    return link.replace(/\/keynote/i, 'ask');
  }
});
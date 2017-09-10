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

Template.keynote_mod.onRendered(function(){
});

Template.keynote_mod.helpers({
  new_questions() {
    return Questions.find({program: Template.instance().data._id, status: "new"}, { sort: { createdAt: -1 } });
  },
  nice_questions() {
    return Questions.find({program: Template.instance().data._id, status: "nice"}, { sort: { lastChange: -1 } });
  },
  live_questions() {
    return Questions.find({program: Template.instance().data._id, status: "live"}, { sort: { lastChange: -1 } });
  },
  crap_questions() {
    return Questions.find({program: Template.instance().data._id, status: "crap"}, { sort: { lastChange: -1 } });
  },
});


Template.keynote_mod.events({
  // menu bar
  'click #button_group #start_session': function(){
    Meteor.call('programs.changeStatus', Template.instance().data._id, true);
  },
  'click #button_group #stop_session': function(){
    Meteor.call('programs.changeStatus', Template.instance().data._id, false);
  },
  // move questions
  'click .question i.add_nice': function(){
    Meteor.call('questions.changeStatus', this._id, 'nice');
  },
  'click .question i.add_live': function(){
    Meteor.call('questions.changeStatus', this._id, 'live');
  },
  'click .question i.add_crap': function(){
    Meteor.call('questions.changeStatus', this._id, 'crap');
  },
  // drag n drop events
  'mousedown .question': function(){
    $('#movingQuestionId').val(this._id);
    $('#movingQuestionStatus').val(this.status);
  },
  'mouseup #nice': function(){
    var id = $('#movingQuestionId').val();
    var status = $('#movingQuestionStatus').val();
    if(id && status != 'nice') {
      Meteor.call('questions.changeStatus', id, "nice");
    }
  },
  'mouseup #live': function(){
    var id = $('#movingQuestionId').val();
    var status = $('#movingQuestionStatus').val();
    if(id && status != 'live') {
      Meteor.call('questions.changeStatus', id, "live");
    }
  },
  'mouseup #crap': function(){
    var id = $('#movingQuestionId').val();
    var status = $('#movingQuestionStatus').val();
    if(id && status != 'crap') {
      Meteor.call('questions.changeStatus', id, "crap");
    }
  },
  // fallback mouse up - trigger delay just in case
  'mouseup': function(){
    setTimeout( function(){
      $('#movingQuestionId').val("");
      $('#movingQuestionStatus').val("");
    }  , 100 );
  },
});

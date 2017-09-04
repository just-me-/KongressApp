import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Questions } from '../../../../imports/collections/questions.js';
import { Programs } from '../../../../imports/collections/programs.js';

Template.keynote_answers.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe('questions');
  Meteor.subscribe('programs');
});

Template.keynote_answers.onRendered(function(){
  // template logic needs a delay
  setTimeout( function(){
    autosize($('textarea'));
  }  , 500 );
});

Template.keynote_answers.helpers({
  questions() {
    return Questions.find({program: Template.instance().data._id, status: "nice"}, { sort: { lastChange: -1 } });
  },
});

Template.keynote_answers.events({
  'click .answer_questions .save': function(){

    $('#'+this._id+" .question").val($('#'+this._id+" .question").val().replace(/\s\s+/g, ' ').replace(/^\s+|\s+$/gm,''));
    $('#'+this._id+" .answer").val($('#'+this._id+" .answer").val().replace(/\s\s+/g, ' ').replace(/^\s+|\s+$/gm,''));

    if($('#'+this._id+" .question").val().length < 1) {
      swal("Oops...", "Die Frage muss bestehen bleiben!", "error");
    } else {
      var answerData = {
      	'question': $('#'+this._id+" .question").val(),
        'answer': $('#'+this._id+" .answer").val(),
      }
      Meteor.call('questions.saveAnswer', this._id, answerData);
      swal("Gespeichert!", "Der Eintrag wurde erfolgreich gespeichert.", "success")
    }
  }
});

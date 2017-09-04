import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Questions } from '../../../../imports/collections/questions.js';
import { Programs } from '../../../../imports/collections/programs.js';

Template.user_addQuestion.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe('questions');
  Meteor.subscribe('programs');
});

Template.user_addQuestion.onRendered(function(){
  // template logic needs a delay
  setTimeout( function(){
    autosize($('textarea'));
  }  , 500 );
});


Template.user_addQuestion.events({
  'submit form#save-question'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;

    // Validation
    // strip double spaces & leading + ending spaces
    $('#question').val($('#question').val().replace(/\s\s+/g, ' ').replace(/^\s+|\s+$/gm,''));
    $('#question').removeClass('error');
    if($('#question').val().length < 1){
        // failed => css class + error alert
        $('#question').addClass('error');
        swal("Oops...", "Bitte stellen Sie eine Frage!", "error");
        return;
    }

    // Insert a sponsor into the collection
    var questionData = {
    	'question': target.question.value,
      'program': target.program.value
    }
    Meteor.call('questions.insert', questionData);

    // show saved alert for x secounds
    swal("Gespeichert!", "Deine Frage wurde erfolgreich als Eintrag gespeichert.", "success")

    // Clear form
    target.question.value = '';
  }
});

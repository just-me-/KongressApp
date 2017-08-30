import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Speakers } from '../../imports/api/speakers.js';

Template.admin_speaker.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe('speakers');
});

Template.admin_speaker.onRendered(function(){
  autosize($('textarea'));
});

Template.admin_speaker.helpers({
  speakers() {
    return Speakers.find({}, { sort: { createdAt: -1 } });
  },
});

Template.admin_speaker.events({
  'submit form#save-speaker'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;

    // Validation
    var failed = false;
    $('form#save-speaker').find('input').each(function(){
      // strip double spaces & leading + ending spaces
      $(this).val($(this).val().replace(/\s\s+/g, ' ').replace(/^\s+|\s+$/gm,''));

      $(this).removeClass('error');
      if($(this).prop('required') && $(this).val().length < 1){
        // failed => css class + error alert
        $(this).addClass('error');
        failed = true;
      }
    });
    if(failed == true){
      swal("Oops...", "Einige Angaben fehlen oder sind nicht korrekt!", "error");
      return;
    }

    // Insert a speaker into the collection
    var speakerData = {
    	'name': target.name.value,
      'firstname': target.firstname.value,
      'login': target.login.value,
      'password': target.password.value,
      'description': target.description.value
    }
    // should there be an id => update; else => insert a new one
    if(target.id.value != ""){
      Meteor.call('speakers.update', target.id.value, speakerData);
    } else {
      Meteor.call('speakers.insert', speakerData);
    }

    // show saved alert for x secounds
    swal("Gespeichert!", target.firstname.value + " " + target.name.value + " wurde erfolgreich als Eintrag gespeichert.", "success")

    // Clear form
    for (var key in speakerData){
      eval("target." + key + ".value = ''");
    }
    target.id.value="";
  },
  'click #reset': function(){
    // remove id => the rest will handel html reset input
    $('#save-speaker #id').val("");
  },
  'click td.edit': function(){
    // copy inputs & id for db => but not pw
    var copyInputs = ['name', 'firstname', 'login', 'description'];
    for (input of copyInputs) {
      console.log(input);
      eval(`$('#save-speaker #`+input+`').val(this.`+input+`)`);
    }
    $('#save-speaker #password').val("");
    $('#save-speaker #id').val(this._id);
  },
  'click td.delete': function(){
    Meteor.call('speakers.remove', this._id);
  }
});

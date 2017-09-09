import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Speakers } from '../../../../imports/collections/speakers.js';
import { Programs } from '../../../../imports/collections/programs.js';

Template.admin_program.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe('speakers');
  Meteor.subscribe('programs');
});

Template.admin_program.onRendered(function() {
  autosize($('textarea'));
  $('.datetimepicker').datetimepicker({
    //format:'DD.MM.YYYY H:mm',
    format:'MMMM DD, YYYY H:mm',
    formatDate:'DD.MM.YYYY',
    formatTime:'H:mm',
    // inline:true,
    lang:'de',
    step: 30
  });
});

Template.admin_program.helpers({
  speakers() {
    return Speakers.find({}, { sort: { createdAt: -1 } });
  },
  programs() {
    return Programs.find({}, { sort: { createdAt: -1 } });
  },
  programSpeaker() {
    return Speakers.findOne(this.speaker);
  },
  dateHelper: function (dateTime) {
    return moment(dateTime).format('MMMM DD, YYYY HH:mm');
  }
});

Template.admin_program.events({
  'submit form#save-program'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;

    // Validation
    var failed = false;
    $('form#save-program').find('input').each(function(){
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

    // Insert a program into the collection
    var programData = {
    	'title': target.title.value,
      'shortlink': target.shortlink.value,
      'description': target.description.value,
      'speaker': target.speaker.value,
      'room': target.room.value,
      'startTime': target.startTime.value,
      'endTime': target.endTime.value,
    }
    // should there be an id => update; else => insert a new one
    if(target.id.value != ""){
      Meteor.call('programs.update', target.id.value, programData);
    } else {
      Meteor.call('programs.insert', programData);
    }

    // show saved alert for x secounds
    swal("Gespeichert!", target.title.value + " wurde erfolgreich als Eintrag gespeichert.", "success")

    // Clear form
    for (var key in programData){
      eval("target." + key + ".value = ''");
    }
    target.id.value="";
  },
  'click #reset': function(){
    // remove id => the rest will handel html reset input
    $('#save-program #id').val("");
  },
  'click td.edit': function(){
    // copy inputs & id for db => but not pw
    var copyInputs = ['title', 'shortlink', 'description', 'speaker', 'room'];
    for (input of copyInputs) {
      eval(`$('#save-program #`+input+`').val(this.`+input+`)`);
    }
    // date fields for calender tool
    $('#save-program #startTime').val(moment(this.startTime).format('MMMM DD, YYYY HH:mm'));
    $('#save-program #endTime').val(moment(this.endTime).format('MMMM DD, YYYY HH:mm'));
    // id as hidden value 
    $('#save-program #id').val(this._id);
  },
  'click td.delete': function(){
    Meteor.call('programs.remove', this._id);
  }
});

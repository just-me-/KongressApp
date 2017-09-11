import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Rooms } from '../../../../imports/collections/rooms.js';
import { Programs } from '../../../../imports/collections/programs.js';

Template.admin_room.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe('rooms');
  Meteor.subscribe('programs');
});

Template.admin_room.helpers({
  rooms() {
    return Rooms.find({}, { sort: { createdAt: -1 } });
  },
});

Template.admin_room.events({
  'submit form#save-room'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;

    // Validation
    var failed = false;
    $('form#save-room').find('input').each(function(){
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

    // Insert a room into the collection
    var roomData = {
    	'name': target.name.value,
    }
    // should there be an id => update; else => insert a new one
    if(target.id.value != ""){
      Meteor.call('rooms.update', target.id.value, roomData);
    } else {
      Meteor.call('rooms.insert', roomData);
    }

    // show saved alert for x secounds
    swal("Gespeichert!", target.name.value + " wurde erfolgreich als Eintrag gespeichert.", "success")

    // Clear form
    for (var key in roomData){
      eval("target." + key + ".value = ''");
    }
    target.id.value="";
  },
  'click #reset': function(){
    // remove id => the rest will handel html reset input
    $('#save-room #id').val("");
  },
  'click td.edit': function(){
    // copy inputs & id for db
    var copyInputs = ['name'];
    for (input of copyInputs) {
      eval(`$('#save-room #`+input+`').val(this.`+input+`)`);
    }
    $('#save-room #id').val(this._id);
  },
  'click td.delete': function(){
    // check if speaker is in use
    var int = Programs.find({room: this._id}).count();
    if(int == 0) {
      Meteor.call('rooms.remove', this._id);
    } else {
      swal("Fehler!", "Dieser Raum ist noch in Verwendung.", "error");
    }
  }
});

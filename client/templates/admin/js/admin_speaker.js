import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Speakers } from '../../../../imports/collections/speakers.js';

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
    // check mail
    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if($('#save-speaker #email').val().length != 0 && !regex.test($('#save-speaker #email').val())) {
      $('#save-speaker #email').addClass('error');
      failed = true;
    }

    if(failed == true){
      swal("Oops...", "Einige Angaben fehlen oder sind nicht korrekt!", "error");
      return;
    }

    // Insert a speaker into the collection
    var speakerData = {
    	'name': target.name.value,
      'firstname': target.firstname.value,
      'description': target.description.value,
      'email': target.email.value,
      'phone': target.phone.value,
      'website': target.website.value,
      'address': target.address.value,
      'img_url': target.img_url.value,
      'zip': target.zip.value,
      'city': target.city.value
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
    var copyInputs = ['name', 'firstname', 'description', 'email', 'phone', 'description', 'website', 'address', 'img_url', 'zip', 'city'];
    for (input of copyInputs) {
      eval(`$('#save-speaker #`+input+`').val(this.`+input+`)`);
    }
    $('#save-speaker #id').val(this._id);
  },
  'click td.delete': function(){
    Meteor.call('speakers.remove', this._id);
  }
});

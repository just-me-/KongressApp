import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Sponsors } from '../../../../imports/collections/sponsors.js';

Template.admin_sponsor.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe('sponsors');
});

Template.admin_sponsor.helpers({
  sponsors() {
    return Sponsors.find({}, { sort: { createdAt: -1 } });
  },
});

Template.admin_sponsor.events({
  'submit form#save-sponsor'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;

    // Validation
    var failed = false;
    $('form#save-sponsor').find('input').each(function(){
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
    // time allows only numbers
    $('#save-sponsor #time').val($('#save-sponsor #time').val().replace(/[^0-9.]/g, ""));

    // Insert a sponsor into the collection
    var sponsorData = {
    	'name': target.name.value,
      'url': target.url.value,
      'time': target.time.value,
      'website': target.website.value,
    }
    // should there be an id => update; else => insert a new one
    if(target.id.value != ""){
      Meteor.call('sponsors.update', target.id.value, sponsorData);
    } else {
      Meteor.call('sponsors.insert', sponsorData);
    }

    // show saved alert for x secounds
    swal("Gespeichert!", target.name.value + " wurde erfolgreich als Eintrag gespeichert.", "success")

    // Clear form
    for (var key in sponsorData){
      eval("target." + key + ".value = ''");
    }
    target.id.value="";
  },
  'click #reset': function(){
    // remove id => the rest will handel html reset input
    $('#save-sponsor #id').val("");
  },
  'click td.edit': function(){
    // copy inputs & id for db => but not pw
    var copyInputs = ['name', 'url', 'time', 'website'];
    for (input of copyInputs) {
      eval(`$('#save-sponsor #`+input+`').val(this.`+input+`)`);
    }
    $('#save-sponsor #id').val(this._id);
  },
  'click td.delete': function(){
    Meteor.call('sponsors.remove', this._id);
  }
});

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

Template.layout_admin_menu.onRendered(function() {
  document.title = document.title+" - Administration";
});

Template.layout_admin_menu.events({
  'click .menu-element': function(event){
    $('.menu-element').removeClass('active');
    $(event.target).closest('.menu-element').addClass('active');
  }
});

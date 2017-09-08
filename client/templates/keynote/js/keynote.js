import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Questions } from '../../../../imports/collections/questions.js';
import { Programs } from '../../../../imports/collections/programs.js';
import { Sponsors } from '../../../../imports/collections/sponsors.js';

Template.keynote.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe('questions');
  Meteor.subscribe('programs');
  Meteor.subscribe('sponsors');
});

Template.keynote.onRendered(function(){
  // template logic needs a delay
  setTimeout( function(){
    var swiper1 = new Swiper('#left.swiper-container', {
        pagination: '.swiper-pagination',
        loop: true,
        effect: 'flip',
        grabCursor: true,
        autoplayDisableOnInteraction: false,
        autoplay: 3000,
        speed: 1000
    });
    var swiper2 = new Swiper('#middle.swiper-container', {
        pagination: '.swiper-pagination',
        loop: true,
        effect: 'flip',
        grabCursor: true,
        autoplayDisableOnInteraction: false,
        autoplay: 3000,
        speed: 1000,
        initialSlide: 1
    });
    var swiper3 = new Swiper('#right.swiper-container', {
        pagination: '.swiper-pagination',
        loop: true,
        effect: 'flip',
        grabCursor: true,
        autoplayDisableOnInteraction: false,
        autoplay: 3000,
        speed: 1000,
        initialSlide: 2
    });
  }  , 500 );
});

Template.keynote.helpers({
  questions() {
    return Questions.find({program: Template.instance().data._id, status: "live"}, { sort: { lastChange: -1 } });
  },
  sponsors() {
    return Sponsors.find({}, { sort: { createdAt: -1 } });
  },
  currentURL() {
    var link = Meteor.absoluteUrl().replace(/^https?\:\/\//i, "")+Iron.Location.get().path;;
    return link.replace(/\/keynote/i, 'ask');
  }
});

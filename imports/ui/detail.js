import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Concerts } from '../api/main.js';


import './detail.html';

Template.AppDetail.onCreated(function AppDetailOnCreated() {
  this.state = new ReactiveVar();
  Meteor.subscribe('Concerts');

});



Template.AppDetail.helpers({
  concert() {

    return Concerts.findOne({_id : this.id});
  },
  comments() {
    return Concerts.findOne({_id : this.id}).comments;
  },
});



Template.AppDetail.events({
  'click #btnOrder'(event) {

    var selectValue = $("#slctv").val();
    let concert = Concerts.findOne({_id : this.id});

    let remainingTickets = concert.number;

    if(remainingTickets >= selectValue){
      Meteor.call('concerts.update', this.id, remainingTickets - selectValue);
    }else if(remainingTickets == 0){
        new Confirmation({
        // message: "Oops, no more ticket left.",
        title: "Oops, no more ticket left.",
        cancelText: "Cancel",
        okText: "Ok",
        success: true, // whether the button should be green or red
        focus: "cancel" // which button to autofocus, "cancel" (default) or "ok", or "none"
      }, function (ok) {
        // ok is true if the user clicked on "ok", false otherwise
      })
    }else{
        new Confirmation({
          message: "Please modify the order quantity and have another try.",
          title: "Oops, only "+remainingTickets+" ticket available.",
          cancelText: "Cancel",
          okText: "Ok",
          success: true, // whether the button should be green or red
          focus: "cancel" // which button to autofocus, "cancel" (default) or "ok", or "none"
        }, function (ok) {
          // ok is true if the user clicked on "ok", false otherwise
        })
    }
  },
  'submit .new-task'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    var target = event.target;
    var text  = target[0].value;
    var comment = {
      username : Meteor.user().username,
      comment : text,
      time : new Date()
    };
    // Insert a task into the collection
    Meteor.call('concerts.insertcomments', this.id, comment);

    // Clear form
    target[0].value = '';
  },
});

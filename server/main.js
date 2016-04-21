import { Meteor } from 'meteor/meteor';
import '../imports/startup/route_controllers.js';

import { Concerts } from '../imports/api/main.js';
var concerts = [
      {
        name : 'Piano Concert',
        location : 'Shenzhen Concert Hall',
        time : "2016-03-22 10:00:00",
        price : 280,
        number : 20,
        image : "book1.jpg",
        comments : [{username : 'xiaoming', comment : 'good', time : '2016-03-22 11:00:00'}]
      },
      {
        name : 'Guitar Concert',
        location : 'Beijing Concert Hall',
        time : "2016-03-22 11:00:00",
        price : 180,
        number : 30,
        image : "book2.jpg",
        comments : [{username : 'xiaohong', comment : 'good', time : '2016-03-22 11:00:00'}]
      },
      {
        name : 'Drum Concert',
        location : 'Shanghai Concert Hall',
        time : "2016-03-22 12:00:00",
        price : 380,
        number : 40,
        image : "book3.jpg",
        comments : [{username : 'xiaofang', comment : 'good', time : '2016-03-22 11:00:00'}]
      },
      {
        name : 'Erhu Concert',
        location : 'Guangzhou Concert Hall',
        time : "2016-03-22 13:00:00",
        price : 680,
        number : 50,
        image : "book4.jpg",
        comments : [{username : 'xiaoli', comment : 'good', time : '2016-03-22 11:00:00'}]
      }
    ];

Meteor.startup(() => {
  // code to run on server at startup
  if (Concerts.find().count() === 0) {
    _.each(concerts, function(concert){
      Concerts.insert({
        name : concert.name,
        location : concert.location,
        time : concert.time,
        price : concert.price,
        image : concert.image,
        number : concert.number,
        comments : concert.comments
      });
    });
  };
});

Meteor.publish('Concerts', function(){
  return Concerts.find({});
})

Meteor.methods({

  'concerts.update'(id, ell){

      Concerts.update({_id: id}, {$set:{ number : ell }});

  },
  'concerts.find'(id){
      let concert = Concerts.findOne({_id : id});

      return concert;
  },
  'concerts.findAll'(){
      let concerts = Concerts.find({}).fetch();
      console.log("findAll*************************** ", concerts);
      return concerts;
  },
  'concerts.insertcomments'(id, comment){
      let update = {};
      let origin_comments = Concerts.findOne({_id : id}).comments;
      origin_comments.unshift(comment);
      update.comments = origin_comments;
      Concerts.update({_id : id}, {$set : update});
  },
})

Router.configure({
  layoutTemplate: 'layout'
});
Router.route('/',{name:'AppBody'});
Router.route('/concerts/:_id', {
  name:'AppDetail',
  template:'AppDetail',
  data: function(){
    return {id : this.params._id}
  }
})

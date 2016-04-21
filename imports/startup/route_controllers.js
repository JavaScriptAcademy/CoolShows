Router.configure({
  layoutTemplate: 'layout'
});
Router.route('/',{name:'AppBody'});
Router.route('/concerts/:_id', {
  name:'AppDetail',
  template:'AppDetail',
  data: function(){
    // console.log('router:', this.params._id);
    return {id : this.params._id}
  }
})

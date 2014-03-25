App.AskQuestionController = Ember.ArrayController.extend({
  needs: ['application'],
  sortProperties: ['date'],
  sortAscending: true,

  latestQuestions: function() {
    return this.slice(0,3);
  }.property('@each'),

  actions: {
    askQuestion: function() {
      console.log(this.get('controllers.application.signedInUser'));
      var question = this.store.createRecord('question', {
        title: this.get('title'),
        question: this.get('question'),
        author: this.get('controllers.application.signedInUser'),
        date: new Date()
      });

      this.get('controllers.application.signedInUser').then(function(user){
        question.set('author', user);
      });

      var controller = this;

      question.save().then(function(question) {
        controller.setProperties({
          title: '',
          question: ''
        });
      });
    }
  }
});

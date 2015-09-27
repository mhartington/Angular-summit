// Ionic Starter App
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputjs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })
  .config(function($stateProvider, $urlRouterProvider){
      $stateProvider

      .state('master', {
        url: '/',
        templateUrl: 'templates/master.html',
        controller: 'MyCtrl as master'
      })

      .state('newItem', {
        url: '/new',
        templateUrl: 'templates/newitem.html',
        controller: 'NewItemCtrl as newitem'
      });
      $urlRouterProvider.otherwise('/');

  })
  .service('MyService', function() {
    var items = [
      {name: 'item1'},
      {name: 'item2'},
      {name: 'item3'}
    ];
    return {
      all: function() {
        return items
      },
      newItem: function(newItem) {
        items.unshift({
          name: newItem
        })
      }

    }

  })
  .controller('MyCtrl', function(MyService) {
    var master = this;
    master.items = MyService.all();
  })
  .controller('NewItemCtrl', function(MyService){
    this.addNewItem = function(newItem){
      MyService.newItem(newItem)
    }
  })
//this.todos.splice(this.todos.indexOf(todo), 1);

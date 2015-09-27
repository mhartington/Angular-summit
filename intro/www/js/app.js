// Ionic Starter App
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngCordova'])

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
  .config(function($stateProvider, $urlRouterProvider) {
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
      })
      .state('itemDetail', {
        url: '/detail/:itemId',
        templateUrl: 'templates/itemdetail.html',
        controller: 'ItemCtrl as item'
      });

    $urlRouterProvider.otherwise('/');

  })
  .service('MyService', function() {
    var items = [{
      name: 'item1',
      id: 0
    }, {
      name: 'item2',
      id: 1
    }, {
      name: 'item3',
      id: 2
    }];
    return {
      all: function() {
        return items
      },
      newItem: function(newItem) {
        items.unshift({
          name: newItem,
          id: items.length + 1
        })
      },
      remove: function(completedItem) {
        items.splice(items.indexOf(completedItem), 1);
      },
      getItem: function(itemId) {
        for (var i = 0; i < items.length; i++)
          if (items[i].id === parseInt(itemId)) {
            return items[i];
          }
        return null
      }
    }
  })
  .controller('MyCtrl', function(MyService) {
    var master = this;
    master.test = function(){
      alert('you swiped');
    }
    master.items = MyService.all();
    master.remove = function(completedItem) {
      MyService.remove(completedItem);
    }
  })

.controller('ItemCtrl', function(MyService, $stateParams) {
    var item = this;
    item.currentItem = MyService.getItem($stateParams.itemId);

  })
  .controller('NewItemCtrl', function(MyService, $ionicHistory, $ionicPlatform, $cordovaGeolocation) {
    var newitem = this;
    newitem.addNewItem = function(newItem, newImg) {
      MyService.newItem(newItem, newImg);
      $ionicHistory.goBack();
    }
    newitem.lat = '';
    newitem.long = '';
    $ionicPlatform.ready(function() {
        newitem.getLocation = function(){
          var posOptions = {timeout: 10000, enableHighAccuracy: false};
          $cordovaGeolocation
          .getCurrentPosition(posOptions)
          .then(function (position) {
            newitem.lat  = position.coords.latitude
            newitem.long = position.coords.longitude
          }, function(err) {
            console.log(err);
          });
        }
    })
  })

var myApp = angular.module('app', ['ui.router']);


myApp.config(function($stateProvider,$urlRouterProvider) {
  

  var homeState = {
    name: 'home',
    url: '/home',
    component: 'home'
  }

  var aboutState = {
    name: 'about',
    url: '/about',
    component: 'about'
  }

  $stateProvider.state(homeState)
  $stateProvider.state(aboutState);
  $urlRouterProvider.otherwise('/home');
});
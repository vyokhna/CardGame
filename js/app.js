//main application file

var cardApp = angular.module('cardApp', ['ui.router']);

cardApp.config(function($stateProvider, $urlRouterProvider) {

    // Now set up the states
    $stateProvider

        .state('/game', {
            url: '/game',
            templateUrl: "partials/main.html",
            controller: 'mainCtrl'
        });

        $urlRouterProvider.otherwise('/game');
});

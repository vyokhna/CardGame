//main application file

var cardApp = angular.module('cardApp', ['ngRoute']);

cardApp.config(function($routeProvider) {

    // Now set up the states
    $routeProvider

        .when('/', {
            templateUrl: "partials/main.html",
            controller: 'mainCtrl'
        })

        .otherwise({ redirectTo: '/' })
});

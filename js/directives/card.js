//card directive
cardApp.directive('card', function(){
   return{
       templateUrl: 'partials/directives/card.html',
       replace: true,
       restrict: 'E'
   }
});
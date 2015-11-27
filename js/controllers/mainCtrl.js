//a controller for the game itself
cardApp.controller('mainCtrl', ['$scope', '$timeout', function($scope, $timeout){

    $scope.deckArray = [];
    $scope.cardPair = [];
    $scope.moveMade = false;
    $scope.movesCount = 0;
    $scope.gameOver = false;

    $scope.createDeck = function () {

        //declaring arrays of available suits and values
        var suits = ['♠', '♥', '♦', '♣'],
            values = ['2','3','4','5','6','7','8','9','10','J','Q','K','A'],
            halfDeck = [];

        //creating random cards and pushing them to halfDeck array
        for(var i=1; i<=2; i++){
            var item = (_.sample(values)) + (_.sample(suits));
            halfDeck.push(item)
        }

        //creating a full deck and shuffling it
        var deck = _.shuffle(halfDeck.concat(halfDeck));

        for(var i=0; i<=deck.length-1; i++){
            $scope.deckArray[i] = {id: i, value: deck[i], revealed: false, matched: false};
        }
    };

    $scope.revealCard = function(card){

        //exit function if the player is making a move
        if($scope.moveMade) return;

        //event fires only on unmatched cards
        if(!card.matched){

            //we reveal clicked card
            $scope.deckArray[card.id].revealed = true;

            //check if we can add a card to current move
            if($scope.cardPair.length < 2){
                $scope.cardPair.push(card);

                if(($scope.cardPair.length == 2) &&
                    ($scope.cardPair[0].value == $scope.cardPair[1].value) &&
                    ($scope.cardPair[0].id != $scope.cardPair[1].id)){
                    _.each($scope.cardPair, function(el){
                        $scope.deckArray[el.id].matched = true;
                    });
                    $scope.cardPair = [];
                    $scope.movesCount++;

                    var arr = [];
                    _.each($scope.deckArray, function(el){

                            arr.push(el.matched);
                    });

                    $scope.gameOver = _.every(arr, function(el2) {
                        return el2 === true
                    })




                } else if($scope.cardPair.length == 2){
                    $scope.moveMade = true;
                    $timeout(function(){
                        _.each($scope.cardPair, function(el){
                            $scope.deckArray[el.id].revealed = false;
                        });
                        $scope.cardPair = [];
                        $scope.movesCount++;
                        $scope.moveMade = false;
                    },1000)

                }
            }
        }
    };

    $scope.startOver = function(){
        $scope.gameOver = false;
        $scope.movesCount = 0;
        $scope.createDeck()
    }
}]);
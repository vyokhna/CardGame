//a controller for the game itself
cardApp.controller('mainCtrl', ['$scope', '$timeout', function($scope, $timeout){

    $scope.cardPair = [];
    $scope.deckArray = [];
    $scope.gameOver = false;
    $scope.moveMade = false;
    $scope.movesCount = 0;
    $scope.matchedPairs = 0;

    //number of cards in half of deck
    $scope.halfDeckVolume = 26;

    $scope.createDeck = function () {
        $scope.gameOver = false;
        $scope.movesCount = 0;
        $scope.matchedPairs = 0;

        //declaring arrays of available suits and values
        var suits = ['♠', '♥', '♦', '♣'],
            values = ['2','3','4','5','6','7','8','9','10','J','Q','K','A'],
            halfDeck = [];

        //creating random cards and pushing them to halfDeck array
        for(var i=1; i<=$scope.halfDeckVolume; i++){
            var item = (_.sample(values)) + (_.sample(suits));
            halfDeck.push(item)
        }

        //creating a full deck and shuffling it
        var deck = _.shuffle(halfDeck.concat(halfDeck));
        for(var i=0; i<=deck.length-1; i++){
            $scope.deckArray[i] = {
                id: i,
                value: deck[i],
                revealed: false,
                matched: false,
                color: 'black'
            };
            if($scope.deckArray[i].value[1] == '♥' || $scope.deckArray[i].value[1] == '♦'){
                $scope.deckArray[i].color = 'red'
            }
        }
    };

    $scope.revealCard = function(card){

        //exit function if the player is making a move or clicking on revealed card
        if($scope.moveMade || card.revealed) return;

        //we reveal clicked card
        $scope.deckArray[card.id].revealed = true;

        //check if we can add a card to current move
        if($scope.cardPair.length < 2) $scope.cardPair.push(card);

        //if cards match
        if($scope.cardPair.length == 2 && $scope.cardPair[0].value == $scope.cardPair[1].value && $scope.cardPair[0].id != $scope.cardPair[1].id){
            _.each($scope.cardPair, function(el){
                $scope.deckArray[el.id].matched = true;
            });
            $scope.cardPair = [];
            $scope.movesCount++;

            //incrementing the value of matched pairs
            $scope.matchedPairs++;

            //checking if this turn is the last one and finishing the game if it is so
            $scope.gameOver = ($scope.deckArray.length / $scope.matchedPairs == 2);

        //if cards don't match
        }else if($scope.cardPair.length == 2 && $scope.cardPair[0].value != $scope.cardPair[1].value && $scope.cardPair[0].id != $scope.cardPair[1].id){
            $scope.moveMade = true;
            $scope.movesCount++;
            $timeout(function(){
                _.each($scope.cardPair, function(el){
                    $scope.deckArray[el.id].revealed = false;
                });
                $scope.cardPair = [];
                $scope.moveMade = false;
            },1000)
        }
    };
}]);
var HumanPlayer = function (name, ui_div) {

  var match = null;
  var position = null;
  var current_game = null;
  var player_key = null;
  var score = null;
  var boardScore = 0;
  //var gameNum = 0;

  this.setupMatch = function (hearts_match, pos) {
    match = hearts_match;
    position = pos;
  }

  this.getName = function () {
    return name;
  }

  this.setupNextGame = function (game_of_hearts, pkey) {
    current_game = game_of_hearts;
    player_key = pkey;

    current_game.registerEventHandler(Hearts.GAME_STARTED_EVENT, function (e) {
      if(e.getPassType() != Hearts.PASS_NONE) {
          document.getElementById("directions").innerHTML = "Your turn to pass! Click 3 cards that you'd like to pass. Any 3!";
          current_game.getHand(player_key).getUnplayedCards(player_key).forEach(function(element) {
            var node = document.createElement("il");
            var tempCard = makeGraphicCard(element.getRank(), element.getSuit());
            var temp = document.createTextNode(tempCard + " ");
            node.appendChild(temp);
            node.setAttribute("id", tempCard);
            current_game.getHand(player_key).getPlayableCards(player_key).forEach(function(c) {
              if(c.getRank() == element.getRank() && c.getSuit() == element.getSuit()) {
                node.setAttribute("class", "playable");
              }
            });
            document.getElementById("human_cards").appendChild(node);
            document.getElementById(tempCard).addEventListener("click", function(){ pass(element.getRank(), element.getSuit()); });
          })
      } else {
        console.log("was here");
        repopulate();
      }

      //gameNum++;
    });

    current_game.registerEventHandler(Hearts.TRICK_START_EVENT, function (e) {
      if (e.getStartPos() == position) {
        current_game.getHand(player_key).getUnplayedCards(player_key).forEach(function(element) {
          current_game.getHand(player_key).getPlayableCards(player_key).forEach(function(c) {
            var tempCard = makeGraphicCard(element.getRank(), element.getSuit());
            if(c.getRank() == element.getRank() && c.getSuit() == element.getSuit()) {
              document.getElementById(tempCard).setAttribute("class", "playable");
            }
          });
        });
        document.getElementById("directions").innerHTML = "Your turn to play! Click a card to play!";
      }
    })
    current_game.registerEventHandler(Hearts.TRICK_CONTINUE_EVENT, function (e) {
      if (e.getNextPos() == position) {
        current_game.getHand(player_key).getUnplayedCards(player_key).forEach(function(element) {
          current_game.getHand(player_key).getPlayableCards(player_key).forEach(function(c) {
            var tempCard = makeGraphicCard(element.getRank(), element.getSuit());
            if(c.getRank() == element.getRank() && c.getSuit() == element.getSuit()) {
              document.getElementById(tempCard).setAttribute("class", "playable");
            }
          });
        });
        document.getElementById("directions").innerHTML = "Your turn to play! Click a card to play!";
      }
    })
    current_game.registerEventHandler(Hearts.TRICK_COMPLETE_EVENT, function (e) {
      if(e.getTrick().getWinner() == "South") {
        alert("You won this trick! Click OK to start the next trick!");
        if(e.getTrick().getPoints() > 0) {
          score += e.getTrick().getPoints();
          document.getElementById("south_score").innerHTML = "YOU: " + score;
        }
      }
      document.getElementById("south_play").innerHTML = "";
      document.getElementById("west_play").innerHTML = "";
      document.getElementById("east_play").innerHTML = "";
      document.getElementById("north_play").innerHTML = "";
    })
    current_game.registerEventHandler(Hearts.GAME_OVER_EVENT, function (e) {
      boardScore += current_game.getScore(Hearts.SOUTH);
      document.getElementById("south_score").innerHTML = "YOU: " + boardScore;
      score = boardScore;
    })
  }


  var cards = [];

  var pass = function(rank, suit) {
    cards.push(new Card(rank, suit));
    if (cards.length == 3) {
      current_game.passCards(cards, player_key);
      repopulate();
      cards = [];
      document.getElementById("directions").innerHTML = "";
    }
  }

  var repopulate = function() {
    var oldCards = document.getElementById("human_cards");
    while (oldCards.firstChild) {
      oldCards.removeChild(oldCards.firstChild);
    }
    current_game.getHand(player_key).getUnplayedCards(player_key).forEach(function(element) {

      var node = document.createElement("il");
      var tempCard = makeGraphicCard(element.getRank(), element.getSuit());
      var temp = document.createTextNode(tempCard + " ");
      node.appendChild(temp);
      node.setAttribute("id", tempCard);

      document.getElementById("human_cards").appendChild(node);
      document.getElementById(tempCard).addEventListener("click", function(){ play(element.getRank(), element.getSuit())});
    })
  }

  var play = function(rank, suit) {
    var card_to_play = new Card(rank, suit);
    if (!current_game.playCard(card_to_play, player_key)) {
      alert("Attempt to play " + card_to_play.toString() + " failed!");
    } else {
      var playedCard = makeGraphicCard(card_to_play.getRank(), card_to_play.getSuit());
      document.getElementById("south_play").innerHTML = playedCard;
      repopulate();
      document.getElementById("directions").innerHTML = "";
    }
  }

  var makeGraphicCard = function(rank, suit) {
    if (suit == 0) {
      if (rank == 2) {return "2H";}
      else if (rank == 3) {return "3H";}
      else if (rank == 4) {return "4H";}
      else if (rank == 5) {return "5H";}
      else if (rank == 6) {return "6H";}
      else if (rank == 7) {return "7H";}
      else if (rank == 8) {return "8H";}
      else if (rank == 9) {return "9H";}
      else if (rank == 10) {return "10H";}
      else if (rank == 11) {return "JH";}
      else if (rank == 12) {return "QH";}
      else if (rank == 13) {return "KH";}
      else if (rank == 14) {return "AH";}
    } else if (suit == 1) {
      if (rank == 2) {return "2S";}
      else if (rank == 3) {return "3S";}
      else if (rank == 4) {return "4S";}
      else if (rank == 5) {return "5S";}
      else if (rank == 6) {return "6S";}
      else if (rank == 7) {return "7S";}
      else if (rank == 8) {return "8S";}
      else if (rank == 9) {return "9S";}
      else if (rank == 10) {return "10S";}
      else if (rank == 11) {return "JS";}
      else if (rank == 12) {return "QS";}
      else if (rank == 13) {return "KS";}
      else if (rank == 14) {return "AS";}
    } else if (suit == 2) {
      if (rank == 2) {return "2D";}
      else if (rank == 3) {return "3D";}
      else if (rank == 4) {return "4D";}
      else if (rank == 5) {return "5D";}
      else if (rank == 6) {return "6D";}
      else if (rank == 7) {return "7D";}
      else if (rank == 8) {return "8D";}
      else if (rank == 9) {return "9D";}
      else if (rank == 10) {return "10D";}
      else if (rank == 11) {return "JD";}
      else if (rank == 12) {return "QD";}
      else if (rank == 13) {return "KD";}
      else if (rank == 14) {return "AD";}
    } else if (suit == 3) {
      if (rank == 2) {return "2C";}
      else if (rank == 3) {return "3C";}
      else if (rank == 4) {return "4C";}
      else if (rank == 5) {return "5C";}
      else if (rank == 6) {return "6C";}
      else if (rank == 7) {return "7C";}
      else if (rank == 8) {return "8C";}
      else if (rank == 9) {return "9C";}
      else if (rank == 10) {return "10C";}
      else if (rank == 11) {return "JC";}
      else if (rank == 12) {return "QC";}
      else if (rank == 13) {return "KC";}
      else if (rank == 14) {return "AC";}
    }
  }
}

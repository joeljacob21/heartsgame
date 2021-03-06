var DumbAI = function (name) {

  var match = null;
  var position = null;
  var current_game = null;
  var player_key = null;
  var id = null;
  var playedCardPos = null;
  var playedCard = null;
  var score = null;
  var boardScore = 0;
  var scorePos = null;

  this.setupMatch = function (hearts_match, pos) {
    match = hearts_match;
    position = pos;
    if (position == Hearts.NORTH) { id = "north_cards"; playedCardPos = "north_play"; scorePos = "north_score"; }
    else if (position == Hearts.WEST) { id = "west_cards"; playedCardPos = "west_play"; scorePos = "west_score"; }
    else { id = "east_cards"; playedCardPos = "east_play"; scorePos = "east_score"; }
  }

  this.getName = function () {
    return name;
  }

  this.setupNextGame = function (game_of_hearts, pkey) {
    current_game = game_of_hearts;
    player_key = pkey;

    current_game.registerEventHandler(Hearts.GAME_STARTED_EVENT, function (e) {
      var cards = current_game.getHand(player_key).getDealtCards(player_key);
      current_game.getHand(player_key).getUnplayedCards(player_key).forEach(function(element) {
        var node = document.createElement("il");
        var temp = document.createTextNode("O ");
        node.appendChild(temp);
        document.getElementById(id).appendChild(node);
      });
      if (e.getPassType() != Hearts.PASS_NONE) {
        current_game.passCards(cards.splice(0,3), player_key);
      }
    });

    current_game.registerEventHandler(Hearts.TRICK_START_EVENT, function (e) {
      if (e.getStartPos() == position) {
        var playable_cards = current_game.getHand(player_key).getPlayableCards(player_key);
        playedCard = makeGraphicCard(playable_cards[0].getRank(), playable_cards[0].getSuit());
        document.getElementById(playedCardPos).innerHTML = playedCard;

        current_game.playCard(playable_cards[0], player_key);
        var list = document.getElementById(id);
        list.removeChild(list.childNodes[0]);
      }
    });

    current_game.registerEventHandler(Hearts.TRICK_CONTINUE_EVENT, function (e) {
      if (e.getNextPos() == position) {
        var playable_cards = current_game.getHand(player_key).getPlayableCards(player_key);
        playedCard = makeGraphicCard(playable_cards[0].getRank(), playable_cards[0].getSuit());
        document.getElementById(playedCardPos).innerHTML = playedCard;
        current_game.playCard(playable_cards[0], player_key);
        var list = document.getElementById(id);
        list.removeChild(list.childNodes[0]);
      }
    });
    current_game.registerEventHandler(Hearts.TRICK_COMPLETE_EVENT, function (e) {
        if(e.getTrick().getWinner() == position && position == "North") {
          alert("Pink has won! Click OK to start the next trick!");
          if(e.getTrick().getPoints() > 0) {
            score += e.getTrick().getPoints();
            document.getElementById("north_score").innerHTML = "PINK: " + score;
          }
      }
        else if(e.getTrick().getWinner() == position && position == "West") {
          alert("Blue has won! Click OK to start the next trick!");
          if(e.getTrick().getPoints() > 0) {
            score += e.getTrick().getPoints();
            document.getElementById("west_score").innerHTML = "BLUE: " + score;
          }
      }
        else if(e.getTrick().getWinner() == position && position == "East") {
          alert("Black has won! Click OK to start the next trick!");
          if(e.getTrick().getPoints() > 0) {
            score += e.getTrick().getPoints();
            document.getElementById("east_score").innerHTML = "BLACK: " + score;
          }
      }

        document.getElementById("south_play").innerHTML = "";
        document.getElementById("west_play").innerHTML = "";
        document.getElementById("east_play").innerHTML = "";
        document.getElementById("north_play").innerHTML = "";



    })
    current_game.registerEventHandler(Hearts.GAME_OVER_EVENT, function (e) {
      boardScore += current_game.getScore(position);
      if(position == Hearts.NORTH) {
        document.getElementById(scorePos).innerHTML = "PINK: " + boardScore;
      } else if(position == Hearts.WEST) {
        document.getElementById(scorePos).innerHTML = "BLUE: " + boardScore;
      } else {
        document.getElementById(scorePos).innerHTML = "BLACK: " + boardScore;
      }
      score = boardScore;
    })
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

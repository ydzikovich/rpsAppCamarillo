function Requests(){
    this.playRound = function(player1Throw, player2Throw, ui){
        new PlayRoundRequest(player1Throw, player2Throw, ui).process()
    }
}

function PlayRoundRequest(player1Throw, player2Throw, ui){
    this.process = function(){
        if(this.invalidThrow(player1Throw) || this.invalidThrow(player2Throw)) {
            ui.invalid()
        }else if(this.isTie()) {
            ui.tie()
        } else if(this.p1Wins())   {
            ui.p1_wins()
        } else {
            ui.p2_wins()
        }
    }

    this.isTie = function() {
        return player1Throw == player2Throw;
    }

    this.p1Wins = function() {
        return (player1Throw == ROCK && player2Throw == SCISSORS) ||
            (player1Throw == SCISSORS && player2Throw == PAPER) ||
            (player1Throw == PAPER && player2Throw == ROCK);
    }

    this.invalidThrow = function(aThrow) {
        return !validThrows.includes(aThrow);
    }

    const ROCK = "rock"
    const SCISSORS = "scissors"
    const PAPER = "paper"
    const validThrows = [ROCK, PAPER, SCISSORS];
}

module.exports = {
    Requests
}
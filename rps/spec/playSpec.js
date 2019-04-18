
function Requests(){
     this.playRound = function(playerOne, playerTwo, ui){
       new PlayRoundRequest(playerOne, playerTwo, ui).process()
    }
}

function PlayRoundRequest(p1, p2, ui){
    this.process = function(){
        if(!this.validShape(p1) || !this.validShape(p2)) {
            ui.invalid()
        }else if(this.isDraw()) {
            ui.tie()
        } else if(this.p1Wins())   {
            ui.p1_wins()
        } else {
            ui.p2_wins()
        }
    }

    this.isDraw = function() {
        return p1 == p2;
    }

    this.p1Wins = function() {
        return (p1 == ROCK && p2 == SCISSORS) ||
            (p1 == SCISSORS && p2 == PAPER) ||
            (p1 == PAPER && p2 == ROCK);
    }

    this.validShape = function(input) {
        return validShapes.includes(input);
    }

    const ROCK = "rock"
    const SCISSORS = "scissors"
    const PAPER = "paper"
    const validShapes = [ROCK, PAPER, SCISSORS];
}

describe("playRoundSpecs", function () {
    let uiSpy

    describe("P1 wins cases", function () {
        beforeEach(() => {
            uiSpy = jasmine.createSpyObj("uiSpy", ["p1_wins"])
        })

        it('rock vs scissors', function () {
            play("rock", "scissors", uiSpy)

            expect(uiSpy.p1_wins).toHaveBeenCalled()
        });
        it('scissors vs paper', function () {
            play("scissors", "paper", uiSpy)

            expect(uiSpy.p1_wins).toHaveBeenCalled()
        });
        it('paper vs rock', function () {
            play("paper", "rock", uiSpy)

            expect(uiSpy.p1_wins).toHaveBeenCalled()
        });
    });

    describe("P2 wins cases", function () {
        beforeEach(() => {
            uiSpy = jasmine.createSpyObj("uiSpy", ["p2_wins"])
        })

        it('scissors vs rock', function () {
            play("scissors", "rock", uiSpy)

            expect(uiSpy.p2_wins).toHaveBeenCalled()
        });
        it('rock vs paper', function () {
            play("rock", "paper", uiSpy)

            expect(uiSpy.p2_wins).toHaveBeenCalled()
        });
        it('paper vs scissors', function () {
            play("paper", "scissors", uiSpy)

            expect(uiSpy.p2_wins).toHaveBeenCalled()
        });
    });

    describe("tie cases", function () {
        beforeEach(() => {
            uiSpy = jasmine.createSpyObj("uiSpy", ["tie"])
        })

        it('paper vs paper', function () {
            play("paper", "paper", uiSpy)

            expect(uiSpy.tie).toHaveBeenCalled()
        });
        it('rock vs rock', function () {
            play("rock", "rock", uiSpy)

            expect(uiSpy.tie).toHaveBeenCalled()
        });
        it('scissors vs scissors', function () {
            play("scissors", "scissors", uiSpy)

            expect(uiSpy.tie).toHaveBeenCalled()
        });
    });

    describe("invalid cases", function () {
        beforeEach(() => {
            uiSpy = jasmine.createSpyObj("uiSpy", ["invalid"])
        })

        it('paper vs sailboat', function () {
            play("paper", "sailboat", uiSpy)

            expect(uiSpy.invalid).toHaveBeenCalled()
        });
        it('sailboat vs rock', function () {
            play("sailboat", "rock", uiSpy)

            expect(uiSpy.invalid).toHaveBeenCalled()
        });
        it('sailboat vs sailboat', function () {
            play("sailbo", "sailboat", uiSpy)

            expect(uiSpy.invalid).toHaveBeenCalled()
        });
    });

    function play(p1, p2, ui){
        new Requests().playRound(p1, p2, ui)
    }

});


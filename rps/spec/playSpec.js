
function Requests(){
     this.play = function(p1Throw, p2Throw, ui){
       new PlayRoundRequest(p1Throw, p2Throw, ui).process()
    }
}

function PlayRoundRequest(p1Throw, p2Throw, ui){
    this.process = function(){
        if(this.invalidInput(p1Throw) || this.invalidInput(p2Throw)) {
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
        return p1Throw == p2Throw;
    }

    this.p1Wins = function() {
        return (p1Throw == ROCK && p2Throw == SCISSORS) ||
            (p1Throw == SCISSORS && p2Throw == PAPER) ||
            (p1Throw == PAPER && p2Throw == ROCK);
    }

    this.invalidInput = function(input) {
        return !validInputs.includes(input);
    }

    const ROCK = "rock"
    const SCISSORS = "scissors"
    const PAPER = "paper"
    const validInputs = [ROCK, PAPER, SCISSORS];
}

describe("rps", function () {
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
        new Requests().play(p1, p2, ui)
    }

});


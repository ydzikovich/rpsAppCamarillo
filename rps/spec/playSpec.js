const {Requests} = require("../src/rps")

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


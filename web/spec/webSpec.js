const React = require("react")
const ReactDOM = require("react-dom")
const ReactTestUtils = require("react-dom/test-utils")

// React cheat sheet https://gist.github.com/moonmaster9000/941b619d6b25cc740aad5f7e926a5150

const PlayForm = require("./../src/PlayForm")

describe("PlayForm", function () {
    beforeEach(function(){
        setupDOM()
    })

    afterEach(function(){
        cleanUpDOM();
    })

    describe("when receives the input", function () {
        it("passes the correct input to the rps module", function () {
            let playRoundSpy = jasmine.createSpy()
            let requests = {
                playRound: playRoundSpy
            }

            renderPlayForm(requests);

            fillIn("p1Throw", "rock")
            fillIn("p2Throw", "sailboat")

            submitForm();

            expect(playRoundSpy).toHaveBeenCalledWith("rock", "sailboat", jasmine.any(Object))
        });

    });

    describe("when the rps module determines that the input is invalid", function () {
        it('displays Invalid', function () {
            let requests = {
                playRound: function(p1Throw, p2Throw, ui) {ui.invalid()}
            }

            renderPlayForm(requests);

            expect(page()).not.toContain("Invalid")
            submitForm();
            expect(page()).toContain("Invalid")
        });
    });

    describe("when the rps module determines a tie", function () {
        it('displays Tie', function () {
            let requests = {
                playRound: function(p1Throw, p2Throw, ui) {ui.tie()}
            }

            renderPlayForm(requests)

            expect(page()).not.toContain("Tie")
            submitForm()
            expect(page()).toContain("Tie")
        });
    });

    describe("when the rps module determines that player 1 wins", function () {
        it('displays Player 1 Wins', function () {
            let requests = {
                playRound: function (p1Throw, p2Throw, ui) {
                    ui.p1_wins()
                }
            }

            renderPlayForm(requests)

            expect(page()).not.toContain("Player 1")
            submitForm()
            expect(page()).toContain("Player 1 wins!")
        });
    });

    describe("when the rps module determines that player 2 wins", function () {
        it('displays Player 2 Wins', function () {
            let requests = {
                playRound: function(p1Throw, p2Throw, ui) {ui.p2_wins()}
            }

            renderPlayForm(requests)

            expect(page()).not.toContain("Player 2")
            submitForm()
            expect(page()).toContain("Player 2 wins!")
        });
    });

    let domFixture;

    function setupDOM() {
        domFixture = document.createElement("div")
        domFixture.id = "hello"
        document.body.appendChild(domFixture)
    }

    function cleanUpDOM(){
        domFixture.remove()
    }

    function renderPlayForm(requests) {
        ReactDOM.render(<PlayForm requests={requests}></PlayForm>, domFixture)
    }

    function page() {
        return domFixture.innerText;
    }

    function submitForm() {
        document.querySelector("button").click()
    }

    function fillIn(inputName, value) {
        let input = domFixture.querySelector(`[name='${inputName}']`)
        input.value = value
        ReactTestUtils.Simulate.change(input)
    }
})









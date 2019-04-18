const React = require("react")
const ReactDOM = require("react-dom")
const ReactTestUtils = require("react-dom/test-utils")

// React cheat sheet https://gist.github.com/moonmaster9000/941b619d6b25cc740aad5f7e926a5150

class PlayForm extends React.Component {
    constructor(){
        super()
        this.state = {message: ""}
    }

    handlePlay(){
        this.props.requests.play("input 1 placeholder", "input 2 placeholder", this)
    }

    tie(){
        this.setState({message: "Tie"})
    }

    invalid(){
        this.setState({message: "Invalid"})
    }

    p1_wins(){
        this.setState({message: "Player 1 wins!"})
    }

    p2_wins(){
        this.setState({message: "Player 2 wins!"})
    }

    render(){
        return (
            <div>
                <div>{this.state.message}</div>
                <button onClick={this.handlePlay.bind(this)}>Submit</button>
            </div>
        )
    }
}

describe("PlayForm", function () {
    beforeEach(function(){
        setupDOM()
    })

    afterEach(function(){
        cleanUpDOM();
    })

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
})









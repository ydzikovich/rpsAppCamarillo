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
        this.setState({message: "Invalid"})
    }

    render(){
        return <div>
            <div>{this.state.message}</div>
            <button onClick={this.handlePlay.bind(this)}>Play</button>
        </div>
    }
}

describe("play form", function () {
    describe("when rps module tells the UI that the result is tie", function () {
        it("tells the user that it's a tie", function () {
            let domFixture = document.createElement("div")
            domFixture.id = "hello"
            document.querySelector("body").appendChild(domFixture)

            const requests = {
                play: function(p1, p2, ui){
                    ui.tie()
                }
            }

            ReactDOM.render(
            <PlayForm requests={requests}/>,
            domFixture
        )

            expect(domFixture.innerText).not.toContain("Tie")
            expect(domFixture.innerText).not.toContain("Invalid")

            document.querySelector("button").click()

            expect(domFixture.innerText).toContain("Tie")
            expect(domFixture.innerText).not.toContain("Invalid")
        })
    })

    describe("when rps module tells the UI that the input is invalid", function () {
        it("tells the user that their input is invalid", function () {
            let domFixture = document.createElement("div")
            domFixture.id = "hello"
            document.querySelector("body").appendChild(domFixture)

            const requests = {
                play: function(p1, p2, ui){
                    ui.invalid()
                }
            }

            ReactDOM.render(
                <PlayForm requests={requests}/>,
                domFixture
            )

            expect(domFixture.innerText).not.toContain("Invalid")

            document.querySelector("button").click()

            expect(domFixture.innerText).toContain("Invalid")
        })
    })
})













const React = require("react")
const ReactDOM = require("react-dom")
const ReactTestUtils = require("react-dom/test-utils")

// React cheat sheet https://gist.github.com/moonmaster9000/941b619d6b25cc740aad5f7e926a5150

class PlayForm extends React.Component {
    constructor(){
        super()
    }

    render(){
        return <div></div>
    }
}

describe("play form", function () {
    describe("when the play use case tells the UI that the input is invalid", function () {
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

            document.querySelector("button").click()

            expect(domFixture.innerText).toContain("Invalid")
        })
    })
})

const React = require("react")
const ReactDOM = require("react-dom")

describe("play form", function () {
    describe("when the play use case tells the UI that the input is invalid", function () {
        it("tells the user that their input is invalid", function () {
            let domFixture = document.createElement("div")
            domFixture.id = "hello test world!"
            document.querySelector("body").appendChild(domFixture)

            const requests = {
                play: function(p1, p2, ui){
                    ui.invalid()
                }
            }

            ReactDOM.render(
            <RPSApp requests={requests}/>,
            domFixture
        )

            document.querySelector("button").click()

            expect(domFixture.innerText).toContain("INVALID")
        })
    })
})

const React    = require("react")
const ReactDOM = require("react-dom")

const {Requests} = require("rps")

const PlayForm = require("./src/PlayForm")

let requests = new Requests()

class App extends React.Component {
    render(){
        return <div>
            <PlayForm requests={requests}/>
        </div>
    }
}

ReactDOM.render(
    <App/>,
    document.querySelector("#app")
)
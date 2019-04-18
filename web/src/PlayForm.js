const React = require("react")

class PlayForm extends React.Component {
    constructor(){
        super()
        this.state = {message: "", p1Throw: "", p2Throw: ""}
    }

    handlePlay(){
        this.props.requests.playRound(this.state.p1Throw, this.state.p2Throw, this)
    }

    handleInput(e) {
        this.setState({[e.target.name]: e.target.value})
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
                <input onChange={this.handleInput.bind(this)} name="p1Throw"/>
                <input onChange={this.handleInput.bind(this)} name="p2Throw"/>
                <button onClick={this.handlePlay.bind(this)}>Submit</button>
            </div>
        )
    }
}

module.exports = PlayForm
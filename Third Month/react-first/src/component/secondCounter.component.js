import React, { Component } from "react";

class SecondCounter extends Component{
    constructor(props){
        super(props)

        this.state = {
            counter : props.counter + 1
        };

        this.AddCounter = this.AddCounter.bind(this);

    }

    render(){
        return(
        <div>
            <div>Second component count : { this.state.counter }</div>
            <button onClick={this.AddCounter}>+1</button>
        </div>
        
        );
    }

    AddCounter(){
        this.props.callback();
        this.setState({ counter : this.state.counter + 1 })
    }

    componentWillReceiveProps(props) {
        this.setState({ counter: props.counter + 1 })
    }
}

export default SecondCounter;
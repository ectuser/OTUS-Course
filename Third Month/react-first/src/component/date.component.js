import React, { Component } from "react";

class DateComponent extends Component{
    constructor(props){
        super(props)

        this.state = {
            date : new Date(),
            id : props.id
        }

        this.Tick = this.Tick.bind(this);
        this.Run = this.Run.bind(this);
    }

    render(){
        return(
            <div id={this.state.id}>
                {this.state.date.toString()}
            </div>
        )
    }

    Tick(){
        this.setState({ date : new Date() })
    }
    Run(){
        setInterval(() => {
            this.Tick();
        }, 1000);
    }
    componentDidMount(){
        this.Run();
    }
}

export default DateComponent

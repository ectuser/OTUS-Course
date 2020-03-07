import React, { Component } from "react";
import s from "./app.component.css";
import DateComponent from './date.component';
import SecondCounter from './secondCounter.component';
class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            date : new Date(),
            name : props.name,
            counter : 0
        }
        this.CounterAdd = this.CounterAdd.bind(this);
        this.Callback = this.Callback.bind(this);
    }
    render() {
        return (
        <div className={s.intro}>
            <div>Hello {this.state.name}</div>
            <div>First component count : {this.state.counter}</div>
            <button onClick={this.CounterAdd.bind(this)}>+1</button>
            <DateComponent id="date-component" />
            <SecondCounter counter={this.state.counter} callback={this.Callback} />
        </div>
            );
    }
    CounterAdd(){
        this.setState({ counter : this.state.counter + 1 }); 
    }
    Callback(){
        this.setState({ counter : this.state.counter + 1 });
    }

}
export default App;
import * as React from "react";
import "./City.scss";

interface ICityProps{
    name : string,
    key : number,
    selectedCityName : string,
    onClickCity : any
}

export default class City extends React.Component<ICityProps>{
    constructor(props : ICityProps){
        super(props)
        console.log(props);
    }
    public render(){
        if (this.props.selectedCityName === this.props.name){
            return <div onClick={this.CityClick} className="city active">{this.props.name}</div>
        }
        else{
            return <div onClick={this.CityClick} className="city">{this.props.name}</div>
        }
    }
    private CityClick = () =>{
        // console.log(this.props);
        this.props.onClickCity(this.props.name)
    }
}
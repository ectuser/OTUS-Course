import * as React from "react";
import "./MainContent.scss";
import CityModel from "../../models/CityModel";
import City from "../CitiesList/City/City";
import { WeatherStatus } from "../../models/WeatherStatus"

interface IMainContentProps{
    children : CityModel
}

export default class MainContent extends React.Component<IMainContentProps>{

    public render(){
        return(
            <div id="main-content">
                <div className="show-city">
                    <h2>{this.props.children.name}</h2>
                    <p>Current temperature: {this.props.children.temperature} C</p>
                    <p>Wind speed: {this.props.children.windSpeed}</p>
                    <p>Wind speed: {WeatherStatus[this.props.children.weatherStatus]}</p>
                </div>
            </div>
        )
    }


}
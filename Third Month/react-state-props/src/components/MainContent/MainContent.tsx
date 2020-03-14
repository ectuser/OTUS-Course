import * as React from "react";
import "./MainContent.scss";
import CityModel from "../../models/CityModel";
import City from "../CitiesList/City/City";

interface IMainContent{
    city : CityModel
}

export default class MainContent extends React.Component<IMainContent>{
    public render(){
        return(
            <div id="main-content">
                Name : {this.props.city.name}
            </div>
        )
    }
}
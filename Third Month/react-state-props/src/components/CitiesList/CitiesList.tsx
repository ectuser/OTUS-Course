import * as React from "react";
import "./CitiesList.scss";
import City from "./City/City";
import CityModel from "../../models/CityModel"

interface ICitiesListProps{
    cities : CityModel[],
    selectedCityName : string
}
interface ICitiesListState{
    cities : CityModel[]
}


export default class CitiesList extends React.Component<ICitiesListProps, ICitiesListState>{
    constructor(props : ICitiesListProps){
        super(props);
        this.state = {
            cities : props.cities
        }

    }
    public render(){
        return(
            <div className="cities-list">
                {/* { this.state.cities.map((item : CityModel, i : number) => <City selectedCityName={this.props.selectedCityName} name={item.name} key={i} />) } */}
            </div>
        )
    }
}
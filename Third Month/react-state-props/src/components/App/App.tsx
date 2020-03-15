import * as React from "react";
import "./App.scss";
import CitiesList from "../CitiesList/CitiesList";
import City from "../CitiesList/City/City";
import MainContent from "../MainContent/MainContent";
import CityModel from "../../models/CityModel"
import { WeatherStatus } from "../../models/WeatherStatus"
import "../CitiesList/CitiesList.scss";
import AddCity from "../AddCity/AddCity"

interface IAppProps{

}

interface IAppState{
    selectedCityName : string
}

export default class App extends React.Component<IAppProps, IAppState>{
    private cities : CityModel[];
    constructor(props : any){
        super(props)
        this.cities = this.InitCities();
        this.state={
            selectedCityName: "Moscow"
        }      
    }

    public render(){
        return(
            <div id="main">
                <div className="cities-list">
                    { this.cities.map((item : CityModel, i : number) => <City onClickCity={this.ChangeCity} selectedCityName={this.state.selectedCityName} name={item.name} key={i} />) }
                    <AddCity addCity={this.AddCity} />
                </div>
                <MainContent>
                    {this.SelectCityByName()}
                </MainContent>
            </div>
        )
    }
    public AddCity(){

    }
    public SelectCityByName = () => {
        for (let city of this.cities){
            if (city.name === this.state.selectedCityName){
                return city;
            }
        }
        throw new Error("not found");
    }

    public ChangeCity = (name : string) => {
        for (let city of this.cities){
            if (city.name === name){
                this.setState({selectedCityName : name});
                break;
            }
        }
    }

    private InitCities(){
        let cities : CityModel[] = [];
        cities.push(new CityModel("Moscow", 12, 5, WeatherStatus.Clear))
        cities.push(new CityModel("Tomsk", -2, 6, WeatherStatus.Cloudly))
        cities.push(new CityModel("London", 15, 2, WeatherStatus.Cloudly))
        cities.push(new CityModel("Paris", 13, 4, WeatherStatus.Rainy))
        cities.push(new CityModel("Helsinki", 4, 6, WeatherStatus.Clear))
        return cities;
    }
}
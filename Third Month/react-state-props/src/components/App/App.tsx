import * as React from "react";
import "./App.scss";
import City from "../CitiesList/City/City";
import MainContent from "../MainContent/MainContent";
import CityModel from "../../models/CityModel"
import { WeatherStatus } from "../../models/WeatherStatus"
import "../CitiesList/CitiesList.scss";
import AddCity from "../AddCity/AddCity"

interface IAppProps{

}

interface IAppState{
    selectedCityName : string,
    cities : CityModel[]
}

export default class App extends React.Component<IAppProps, IAppState>{
    constructor(props : any){
        super(props)
        let cities = this.InitCities();
        this.state={
            selectedCityName: "Moscow",
            cities : this.InitCities()
        }      
    }

    public render(){
        return(
            <div id="main">
                <div className="cities-list">
                    { this.state.cities.map((item : CityModel, i : number) => <City onClickCity={this.ChangeCity} selectedCityName={this.state.selectedCityName} name={item.name} key={i} />) }
                    <AddCity addCity={this.AddCity} />
                </div>
                <MainContent>
                    {this.SelectCityByName()}
                </MainContent>
            </div>
        )
    }
    public AddCity = (newCity : CityModel) =>{
        let cities = this.state.cities;
        for (let city of cities){
            if (city.name === newCity.name){
                alert("City with this name already exists");
                return;
            }
        }
        cities.push(newCity)
        this.setState({ cities : cities });
    }
    public SelectCityByName = () => {
        for (let city of this.state.cities){
            if (city.name === this.state.selectedCityName){
                return city;
            }
        }
        throw new Error("not found");
    }

    public ChangeCity = (name : string) => {
        for (let city of this.state.cities){
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
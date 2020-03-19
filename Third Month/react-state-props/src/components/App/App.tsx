import * as React from "react";
import "./App.scss";
import City from "../CitiesList/City/City";
import MainContent from "../MainContent/MainContent";
import CityModel from "../../models/CityModel"
import { WeatherStatus } from "../../models/WeatherStatus"
import "../CitiesList/CitiesList.scss";
import AddCity from "../AddCity/AddCity"
import { connect } from "react-redux"
import { createStore } from 'redux'
import { Provider } from "react-redux";

interface IAppProps{
    state : any
}

interface IAppState{
    selectedCityName : string,
    cities : CityModel[]
}


class App extends React.Component<IAppProps, IAppState>{
    constructor(props : any){
        super(props)  
    }

    public render(){
        return(
            <div id="main">
                <div className="cities-list">
        {this.props.state.cities.map((item : CityModel, i : number) => <City key={i}>{item.name}</City>)}
                    <AddCity />
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
        for (let city of this.props.state.cities){
            if (city.name === this.props.state.selectedCityName){
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
}


export default connect(
    state => ({
        state : state
    }),
    dispatch => ({
    })
)(App);
import * as React from "react";
import "./App.scss";
import { City } from "../CitiesList/City/City";
import { MainContent } from "../MainContent/MainContent";
import CityModel from "../../models/CityModel"
import { WeatherStatus } from "../../models/WeatherStatus"
import "../CitiesList/CitiesList.scss";
import { AddCity } from "../AddCity/AddCity"
import { connect, useSelector } from "react-redux"
import { createStore } from 'redux'
import { Provider } from "react-redux";
import { SearchCityForm } from "../SearchCityForm/SearchCityForm"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch
} from "react-router-dom";


export const App = () => {
    // @ts-ignore
    const cities = useSelector(state => state.cities);
    // @ts-ignore
    const citiyNamesToShow = useSelector(state => state.cityNamesToShow)
    let citiesToShow = [];
    for (let city of cities){
        if (citiyNamesToShow.includes(city.name)){
            citiesToShow.push(city);
        }
    }
    return(
        <div id="main">
            <Router>
                <div className="cities-list">
                    <SearchCityForm />
                    {citiesToShow.map((item : CityModel, i : number) =>(
                    <Link key={i} to={`/${item.name}`}>
                        <Switch>
                        <Route path="/:cityName">
                            <City>{item.name}</City>
                        </Route>
                        <Router>
                            <City>{item.name}</City>
                        </Router>
                        </Switch>
                    </Link>))}
                    <AddCity />
                </div>
                <Route path="/:cityName" component={MainContent} />
            </Router>
        </div>
    )
}
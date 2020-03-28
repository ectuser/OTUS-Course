import * as React from "react";
import * as ReactDOM from "react-dom";
import "./styles/global.scss";
import { App } from "./components/App/App"
import { connect } from "react-redux"
import { createStore } from 'redux'
import { Provider } from "react-redux";
import CityModel from "./models/CityModel"
import { WeatherStatus } from "./models/WeatherStatus"

const InitCities = () => {
	let cities : CityModel[] = [];
	cities.push(new CityModel("Moscow", 12, 5, WeatherStatus.Clear))
	cities.push(new CityModel("Tomsk", -2, 6, WeatherStatus.Cloudly))
	cities.push(new CityModel("London", 15, 2, WeatherStatus.Cloudly))
	cities.push(new CityModel("Paris", 13, 4, WeatherStatus.Rainy))
	cities.push(new CityModel("Helsinki", 4, 6, WeatherStatus.Clear))
	return cities;
}

const GetNameFromCities = (cities : CityModel[]) => {
	let cityNames = [];
	for (let city of cities){
		cityNames.push(city.name);
	}
	return cityNames;
}

const initialCities = InitCities();

const initialState = {
	cities : initialCities,
	cityNamesToShow : GetNameFromCities(initialCities)
}

const reducer = (state = initialState, action : any) => {
  	if (action.type === 'ADD_CITY'){
    	// console.log(state, action.payload);
    	return {
			cities : [...state.cities, action.payload],
			cityNamesToShow : [...state.cities, action.payload.name]
		}
	}
	if (action.type === 'SEARCH_CITY'){
		console.log(state.cityNamesToShow, action.payload)
		return {
			cities : [...state.cities],
			cityNamesToShow : [...action.payload]
		}
	}
  	return state;
}

// @ts-ignore
const store = createStore(reducer);

ReactDOM.render(
	<Provider store={store}>
		<App />
  	</Provider>,
  	document.getElementById("app"),
);
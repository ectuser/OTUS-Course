import React from "react";
import "./AddCity.scss";
import { WeatherStatus } from "../../models/WeatherStatus"
import CityModel from "../../models/CityModel"
import { connect, useDispatch } from "react-redux"


export const AddCity = () => {

    const dispatch = useDispatch();

    const addCity = () => {
        let form = document.querySelector(".add-city-container");
        let cityName = (form?.querySelector(".city-name") as HTMLInputElement).value;
        let temperature = (form?.querySelector(".city-temperature") as HTMLInputElement).value;
        let windSpeed = (form?.querySelector(".city-wind-speed") as HTMLInputElement).value;
        let weatherStatusElement = (form?.querySelector(".weather-status") as HTMLSelectElement);
        let weatherStatus = weatherStatusElement.options[weatherStatusElement.selectedIndex].value as string;

        if (cityName === "" || temperature === "" || windSpeed === "" || cityName.includes(" ")){
            alert("Type all fields and make sure that there're no spaces in city name");
            return;
        }
        // @ts-ignore
        let newCity = new CityModel(cityName, parseInt(temperature), parseInt(windSpeed), WeatherStatus[weatherStatus])
        dispatch({ type : 'ADD_CITY', payload : newCity });
    }

    return(
        <form className="add-city-container" name="addCityForm">
            <label htmlFor="cityName">Type city name</label>
            <input type="text" name="cityName" className="city-name" />
            <label htmlFor="temperature">Type current temperature</label>
            <input type="number" name="temperature" className="city-temperature" />
            <label htmlFor="windSpeed">Type current wind speed</label>
            <input type="number" name="windSpeed" className="city-wind-speed" />
            <label htmlFor="weatherStatus">Select current weather status</label>
            <select name="weatherStatus" className="weather-status">
                <option value={WeatherStatus[WeatherStatus.Clear]}>{WeatherStatus[WeatherStatus.Clear]}</option>
                <option value={WeatherStatus[WeatherStatus.Cloudly]}>{WeatherStatus[WeatherStatus.Cloudly]}</option>
                <option value={WeatherStatus[WeatherStatus.Rainy]}>{WeatherStatus[WeatherStatus.Rainy]}</option>
            </select>
            <div onClick={addCity} id="add-city">Add city</div>
        </form>
    )
}
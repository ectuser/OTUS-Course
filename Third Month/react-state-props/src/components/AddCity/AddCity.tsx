import React from "react";
import "./AddCity.scss";
import { WeatherStatus } from "../../models/WeatherStatus"
import CityModel from "../../models/CityModel"


interface IAddCityProps{
    addCity : any
}

export default class AddCity extends React.Component<IAddCityProps>{

    public render(){
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
                <div onClick={this.AddCity} id="add-city">Add city</div>
            </form>
        )
    }

    private AddCity = () => {
        let form = document.querySelector(".add-city-container");
        let cityName = (form?.querySelector(".city-name") as HTMLInputElement).value;
        let temperature = (form?.querySelector(".city-temperature") as HTMLInputElement).value;
        let windSpeed = (form?.querySelector(".city-wind-speed") as HTMLInputElement).value;
        let weatherStatusElement = (form?.querySelector(".weather-status") as HTMLSelectElement);
        let weatherStatus = weatherStatusElement.options[weatherStatusElement.selectedIndex].value as string;

        if (cityName === "" || temperature === "" || windSpeed === ""){
            alert("Type all fields");
            return;
        }
        // console.log(typeof(weatherStatus));
        // @ts-ignore
        let newCity = new CityModel(cityName, parseInt(temperature), parseInt(windSpeed), WeatherStatus[weatherStatus])
        this.props.addCity(newCity);
    }
}
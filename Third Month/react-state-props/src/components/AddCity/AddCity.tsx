import React from "react";
import "./AddCity.scss";
import { WeatherStatus } from "../../models/WeatherStatus"


interface IAddCityProps{
    addCity : any
}

export default class AddCity extends React.Component<IAddCityProps>{

    public render(){
        return(
            <form className="add-city-container">
                <label htmlFor="cityName">Type city name</label>
                <input type="text" name="cityName" />
                <label htmlFor="temperature">Type current temperature</label>
                <input type="number" name="temperature" />
                <label htmlFor="windSpeed">Type current wind speed</label>
                <input type="number" name="windSpeed" />
                <label htmlFor="weatherStatus">Select current weather status</label>
                <select name="weatherStatus" id="">
                    <option value={WeatherStatus.Clear}>{WeatherStatus[WeatherStatus.Clear]}</option>
                    <option value={WeatherStatus.Cloudly}>{WeatherStatus[WeatherStatus.Cloudly]}</option>
                    <option value={WeatherStatus.Rainy}>{WeatherStatus[WeatherStatus.Rainy]}</option>
                </select>
                <div onClick={this.AddCity} id="add-city">Add city</div>
            </form>
        )
    }

    private AddCity(){
        let formData = new FormData(document.querySelector(".add-city-container") as HTMLFormElement);
        console.log(formData);
    }
}
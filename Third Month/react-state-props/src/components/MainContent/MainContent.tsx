import React, { useState, useEffect } from "react";
import "./MainContent.scss";
import CityModel from "../../models/CityModel";
import { City } from "../CitiesList/City/City";
import { WeatherStatus } from "../../models/WeatherStatus"
import {
    BrowserRouter as Router,
    useParams
  } from "react-router-dom";
import { useSelector } from "react-redux";


export const MainContent = () =>{
    let { cityName } = useParams();
    // @ts-ignore
    const cities = useSelector(state => state.cities) as CityModel[];
    console.log(cityName);

    const findCity = () => {
        for (let city of cities){
            if (city.name === cityName ){
                return city;
            }
        }
        throw new Error("Couldn't find city");
    }
    try{
        let currentCity = findCity();
        return (
            <div id="main-content">
                <div className="show-city">
                    <h2>{currentCity.name}</h2>
                    <p>Current temperature: {currentCity.temperature} C</p>
                    <p>Wind speed: {currentCity.windSpeed}</p>
                    <p>Wind speed: {WeatherStatus[currentCity.weatherStatus]}</p>
                </div>
            </div>
        )

    } catch(e){
        return <div>Couldn't find the city</div>   
    }

}
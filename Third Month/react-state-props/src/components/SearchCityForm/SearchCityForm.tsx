import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import CityModel from "../../models/CityModel";

export const SearchCityForm = () => {
    let searchCityInput = useRef(null);
    const dispatch = useDispatch();
    // @ts-ignore
    const cities = useSelector(state => state.cities);

    const searchCity = () => {
        // @ts-ignore
        const searchValue = searchCityInput.current.value;
        console.log(searchValue);
        let newCities = cities.map((city : CityModel) => {
            if (city.name.includes(searchValue)){
                return city.name;
            }
        });
        dispatch({ type : 'SEARCH_CITY', payload : newCities });
    }

    const resetCity = () => {
        // @ts-ignore
        searchCityInput.current.value = "";
        let newCities = cities.map((city : CityModel) => city.name);
        dispatch({ type : 'SEARCH_CITY', payload : newCities });
    }

    return (
        <form>
            <input type="text" placeholder="City" ref={searchCityInput} />
            <button type="button" onClick={searchCity}>Search</button>
            <button type="button" onClick={resetCity}>Reset</button>
        </form>
    );
}
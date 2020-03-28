import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux"

export const SearchCityForm = () => {
    let searchCityInput = useRef(null);
    const dispatch = useDispatch();
    // @ts-ignore
    const cities = useSelector(state => state.cityNamesToShow);

    const searchCity = () => {
        // @ts-ignore
        const searchValue = searchCityInput.current.value;
        console.log(searchValue);
        let newCities = []
        for (let cityName of cities){
            if (cityName.includes(searchValue)){
                newCities.push(cityName);
            }
        }
        dispatch({ type : 'SEARCH_CITY', payload : newCities });
    }

    return (
        <form>
            <input type="text" placeholder="City" ref={searchCityInput} />
            <button type="button" onClick={searchCity}>Search</button>
        </form>
    );
}
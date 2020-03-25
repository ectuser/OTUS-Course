import * as React from "react";
import "./City.scss";
import { connect, useDispatch, useSelector } from "react-redux";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
  } from "react-router-dom";

interface ICityProps{
    children : string,
}

export const City = ({ children } : ICityProps) => {
    let { cityName } = useParams();

    if (cityName === children){
        return <div className="city active">{children}</div>
    }
    else{
        return <div className="city">{children}</div>
    }
}
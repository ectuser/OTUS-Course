import * as React from "react";
import "./City.scss";
import { connect } from "react-redux"

interface ICityProps{
    // name : string,
    // key : number,
    // selectedCityName : string,
    // onClickCity : any
    state : any,
    children : string,
    changeSelectedCity : any
}

class City extends React.Component<ICityProps>{
    constructor(props : ICityProps){
        super(props)
        console.log(props);
    }

    public render(){
        if (this.props.state.selectedCityName === this.props.children){
            return <div onClick={this.ChangeSelectedCity} className="city active">{this.props.children}</div>
        }
        else{
            return <div onClick={this.ChangeSelectedCity} className="city">{this.props.children}</div>
        }
    }

    private ChangeSelectedCity = () => {
        if (this.props.state.selectedCityName !== this.props.children){
            this.props.changeSelectedCity(this.props.children)
        }
    }
}

export default connect(
    state => ({
        state : state
    }),
    dispatch => ({
        changeSelectedCity : (cityName : string) => {
            dispatch({ type : 'CHANGE_SELECTED_CITY', payload : cityName })
        }
    })
)(City);
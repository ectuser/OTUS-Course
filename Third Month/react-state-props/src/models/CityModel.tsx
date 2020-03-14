import { WeatherStatus } from "./WeatherStatus"
export default class CityModel{
    public name : string;
    public temperature : number;
    public windSpeed : number;
    public temperatureHistory : number[];
    public weatherStatus : WeatherStatus;
    constructor(name : string, temperature : number, windSpeed : number, temperatureHistory : number[], weatherStatus : WeatherStatus){
        this.name = name;
        this.temperature = temperature;
        this.windSpeed = windSpeed;
        this.temperatureHistory = temperatureHistory;
        this.weatherStatus = weatherStatus;
    }
}
import React, { Component } from 'react';
import Form from './components/Form';
import Weather from './components/WeatherData';
import axios from 'axios';

import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

// git project https://github.com/erikflowers/weather-icons-git;
import "weather-icons/css/weather-icons.css";

// API from https://openweathermap.org
const API_KEY="a399e40025b9a42decd78d20ad5185f6";

const weatherIcon = {
  Thunderstorm: "wi-thunderstorm",
  Drizzle: "wi-sleet",
  Rain: "wi-storm-showers",
  Snow: "wi-snow",
  Atmosphere: "wi-fog",
  Clear: "wi-day-sunny",
  Clouds: "wi-day-fog"
};

class App extends Component {

  constructor(props){
    super(props)

    this.state= {
      country: '',
      city: '',
      temp: '',
      temp_max: '',
      temp_min: '',
      description: '',
      error: false
    }
  }

  calCelsius(temp) {
    let cell = Math.floor(temp - 273.15);
    return cell;
  }

  get_WeatherIcon(icons, rangeId) {
    switch (true) {
      case rangeId >= 200 && rangeId < 232:
        this.setState({ icon: icons.Thunderstorm });
        break;
      case rangeId >= 300 && rangeId <= 321:
        this.setState({ icon: icons.Drizzle });
        break;
      case rangeId >= 500 && rangeId <= 521:
        this.setState({ icon: icons.Rain });
        break;
      case rangeId >= 600 && rangeId <= 622:
        this.setState({ icon: icons.Snow });
        break;
      case rangeId >= 701 && rangeId <= 781:
        this.setState({ icon: icons.Atmosphere });
        break;
      case rangeId === 800:
        this.setState({ icon: icons.Clear });
        break;
      case rangeId >= 801 && rangeId <= 804:
        this.setState({ icon: icons.Clouds });
        break;
      default:
        this.setState({ icon: icons.Clouds });
    }
  }

  getWeatherInfo = async e => { 
    e.preventDefault();

    const country = e.target.elements.country.value;
    const city = e.target.elements.city.value;

    if ( country && city ){
      const response =  await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}`)

      this.setState({ 
        country: `${response.data.name}, ${response.data.sys.country}`,
        city: response.data.city,
        temp: this.calCelsius(response.data.main.temp),
        temp_max: this.calCelsius(response.data.main.temp_max),
        temp_min: this.calCelsius(response.data.main.temp_min),
        description: response.data.weather[0].description,
        error: false
      })

      this.get_WeatherIcon( weatherIcon , response.data.weather[0].id)
    } else {
      this.setState({
        error: true
      })
    }
  };

  render(){
    return(
      <div className="App">
          <Form onSubmit={this.getWeatherInfo} error={this.state.error} />
          <Weather 
            country={this.state.country}
            weatherIcon={this.state.icon}
            temp={this.state.temp}
            temp_max={this.state.temp_max}
            temp_min={this.state.temp_min}
            description={this.state.description}
          />
      </div>
    )
  }
}

export default App;

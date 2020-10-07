import React, { Component } from 'react';
import './Weather.css';
import "weather-icons/css/weather-icons.css";

export default class WeatherData extends Component {
    render() {
        return (
            <div className="container">
                <div className="Card">
                    {/* Country and City name */}
                    <h1 className="py-3">{this.props.country}</h1>
                    <h5 className="py-4">
                        {/* Weather Icon */}
                        <i className={`wi ${this.props.weatherIcon} display-1`} />
                    </h5>

                    {/* Weather Temp in Celsius */}
                    {this.props.temp ? (
                        <h1 className="py-2">{this.props.temp}&deg;</h1>
                    ) :
                    null }

                    {/* Min and Max Temp */}
                    {maxminTemp(this.props.temp_max,this.props.temp_min)}

                    {/* Weather Description */}
                    <h4 className="py-3">
                        {this.props.description}
                    </h4>
                </div>
            </div>
        )
    }
}

function maxminTemp(min, max) {
    if (max && min) {
      return (
        <h3>
          <span className="px-4">{min}&deg;</span>
          <span className="px-4">{max}&deg;</span>
        </h3>
      );
    }
  }
  
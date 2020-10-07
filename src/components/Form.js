import React, { Component } from 'react';
import './Form.css';

export default class Form extends Component {

    constructor(props){
        super(props);

        this.state = {
            country : '',
            city : ''
        }
    }  

    render() {
        return (
            <div>
                <div className="container h-100">
                    <form onSubmit={this.props.onSubmit}>
                        <div>{this.props.error ? error() : ""}</div>
                        <div className="row">
                            <div className="col-md-3 offset-md-2">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="City"
                                    name="city"
                                    autoComplete="off"
                                    onChange={e => this.setState({ city : e.target.value})}
                                /> 
                            </div>
                            <div className="col-md-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Country"
                                    name="country"
                                    autoComplete="off"
                                    onChange={e => this.setState({ country : e.target.value})}
                                />
                            </div>
                            <div className="col-md-3 mt-md-0 mt-2 text-md-left ">
                                <button className="btn btn-danger">Get Weather</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

const error = props => {
    return (
      <div className="alert alert-danger mx-5" role="alert">
        Please Enter City and Country...!
      </div>
    );
};

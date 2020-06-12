import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            country: null,
            info: null,
        };
    }

    handleClick() {
        const countryNameInput = this.state.country || '';
        fetch(`https://corona-virus-stats.herokuapp.com/api/v1/cases/countries-search?search=${countryNameInput}`)
            .then(res => res.json())
            .then(result => {
                this.setState({
                    info: result.data.rows
                });
            }
        )
    }

    handleChange(event) {
        this.setState({country: event.target.value});
    }

    render() {
        return (
            <div className="app-container">
                <Search
                    onClick={() => this.handleClick()}
                    onChange={(event) => this.handleChange(event)}
                />
                <Result value={this.state.info}/>
            </div>
        );
    }
}

function Search(props) {
    return (
        <div className="search">
            <input onChange={props.onChange} placeholder="Enter country name"/>
            <button onClick={props.onClick}>Search</button>
        </div>
    );
}

function Result(props) {
    if (props.value) {
        const results = props.value.map(country => {return <CountryInfo countryInfo={country} key={country.country_abbreviation}/>})
        
        return props.value.length ? 
            <div className="result-container">{results}</div> : <div className="result-container">No data</div>;
    }

    return null;

}

function CountryInfo(props) {
    const countryInfo = props.countryInfo;

    return (
        <div className='country-info'>
            <div className='country-info_header'>
                <img className='flag' alt='flag' src={countryInfo.flag} />
                {countryInfo.country}
            </div>
            <div className='country-body'>
                <ul>
                    <li><span>Total Cases: </span><span>{countryInfo.total_cases}</span></li>
                    <li><span>New Cases: </span><span>{countryInfo.new_cases}</span></li>
                    <li><span>Total Deaths: </span><span>{countryInfo.total_deaths}</span></li>
                    <li><span>New Deaths: </span><span>{countryInfo.new_deaths}</span></li>
                    <li><span>Total Recovered: </span><span>{countryInfo.total_recovered}</span></li>
                    <li><span>Active Cases: </span><span>{countryInfo.active_cases}</span></li>
                    <li><span>Serious Critical: </span><span>{countryInfo.serious_critical}</span></li>
                    <li><span>Cases Per Million: </span><span>{countryInfo.cases_per_mill_pop}</span></li> 
                </ul>
            </div>
        </div>
    );
}


ReactDOM.render(
    <App />,
    document.getElementById('root')
  );

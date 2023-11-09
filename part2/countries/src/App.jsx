import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [searchName, setSearchName] = useState('');
  const [displayState, setDisplayState] = useState(''); // this is what to display on the screen: 'keep typing' or 'display results' OR 'no results'
  const [countriesToShow, setCountriesToShow] = useState([]);
  const [fullInfo, setFullInfo] = useState({});

  const baseURL = 'https://studies.cs.helsinki.fi/restcountries/api/all/';
  // const api_key = import.meta.env.VITE_SOME_KEY;
  const api_key = 'caa077aa59564f6b981102425230911';
  const weatherBaseURL = `https://api.weatherapi.com/v1/forecast.json?key=${api_key}&q=`;


  const getCountries = () => {
    axios
      .get(baseURL)
      .then(response => {return response.data})
      .then(fetchedData => {        
        const allCountries = fetchedData.map(country => {
          return {
            name: country['name']['common'],
            capital: country['capital'] ? country['capital'][0] : 'N/A',
            area: `${country['area']} km^2`,
            languages: country['languages'] ? Object.values(country['languages']) : [],
            flag: country['flag'],
            // temp: 0
          }
        });

        const filteredCountries = allCountries.filter(country => country.name.toLowerCase().includes(searchName.toLowerCase()));

        if (filteredCountries.length === 1) {
          setDisplayState('display full info')
          const nameToSearch = filteredCountries[0]['name']
          const fullWeatherURL = weatherBaseURL + `${filteredCountries[0]['capital']}&days=1&aqi=no&alerts=no`;

          axios
            .get(fullWeatherURL)
            .then(response => {return response.data})
            .then(fetchedData => {
              const fullInfoCountry = {...filteredCountries[0],
                temp: fetchedData['current']['temp_c'],
                weather_pic: `https:${fetchedData['current']['condition']['icon']}`,
                wind: fetchedData['current']['wind_kph'],
              }
              setFullInfo(fullInfoCountry)
           })
           .catch(error => console.log('weather get request failed'))
        }
        else if (filteredCountries.length > 0 && filteredCountries.length <= 10) {
          setDisplayState('display results')
        }
        else if (filteredCountries.length <= 0) {
          setDisplayState('no results')
        }
        else if (filteredCountries.length > 10) {
          setDisplayState('keep typing')
        }
        else {
          setDisplayState('')
        }
        setCountriesToShow(filteredCountries)
      })
      .catch(error => console.log('get request failed'))
  };

  const handleSearchChange = (event) => {
    setSearchName(event.target.value)
  };

  const handleShowClick = (name) => {
    setSearchName(name)
    setDisplayState('display full info')
  };

  useEffect(() => {
    if (searchName) {
      getCountries()
    }
    // console.log(countriesToShow.length)
  }, [searchName]);

  return (
    <>
      find countries: 
        <input 
          value={searchName}
          onChange={handleSearchChange}
        />
        {
          displayState === 'keep typing' && 
          <h4>Too many search results, please keep typing to refine your search</h4>
        }
        {
          displayState === 'no results' &&
          <h4>No search results. Please check your spelling, it is possible country does not exist</h4>
        }
        {
          displayState === 'display results' &&
          <>
            {countriesToShow.map(c => <><li>{c.name}</li> <button onClick={() => handleShowClick(c.name)}>show</button></>)}
          </>
        }
        {
          displayState === 'display full info' && fullInfo ? (
          <>
            {/* Data is available, render it */}
            <h2>{fullInfo['name']}</h2>
            <br />
            <div>
              <strong>Capital:</strong> {fullInfo['capital']}
              <br />
              <strong>Area:</strong> {fullInfo['area']}
              <br /><br />
              <strong>Languages Spoken:</strong>
              {fullInfo['languages'] && fullInfo['languages'].map(lang => <li key={lang}>{lang}</li>)}
              <div className='flag'>
                {fullInfo['flag']}
              </div>
              <h4>Weather in {fullInfo['capital']}</h4>
              <p>temperature: {fullInfo['temp']} Celsius</p>
              <div>
                <img src={fullInfo['weather_pic']} alt="Weather Icon" />
              </div>
              <p>wind {fullInfo['wind']} km/h</p>
            </div>
          </>
        ) : (
          /* Data is not available, display loading message */
          <p>Loading...</p>
        )
      }

    </>
  )
};

export default App

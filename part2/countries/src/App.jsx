import { useState, useEffect } from 'react';
import axios from 'axios';
function App() {
  const [searchName, setSearchName] = useState('');
  const [displayState, setDisplayState] = useState(''); // this is what to display on the screen: 'keep typing' or 'display results' OR 'no results'
  const [countriesToShow, setCountriesToShow] = useState([]);

  const baseURL = 'https://studies.cs.helsinki.fi/restcountries/api/all/';

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
          }
        });

        const filteredCountries = allCountries.filter(country => country.name.toLowerCase().includes(searchName.toLowerCase()));

        // console.log(filteredCountries)

        if (filteredCountries.length === 1) {
          setDisplayState('display full info')
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
            {countriesToShow.map(c => <li>{c.name}</li>)}
          </>
        }
        {
          displayState === 'display full info' &&
          // <FullCountryInfo />
          <>
            <h2>{countriesToShow[0]['name']}</h2>
            <br />
            <div>
                <strong>Capital:</strong> {countriesToShow[0]['capital']}
                <br />
                <strong>Area:</strong> {countriesToShow[0]['area']}
                <br /><br />
                <strong>Languages Spoken:</strong>
                {countriesToShow[0]['languages'].map(lang => <li>{lang}</li>)}
                <div className='flag'>
                  {countriesToShow[0]['flag']}
                </div>
            </div>
          </>
        }
    </>
  )
};

export default App

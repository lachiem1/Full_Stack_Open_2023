import { useState, useEffect } from 'react'
import axios from 'axios';

const Persons = ({personsToShow}) => {
  return (
    <ul>
      {personsToShow.map(person =>
          <Info key={person.id} info={person} />
        )
      }
    </ul>
  )
};

const PersonForm = ({addPerson, newName, setNewName, newNumber, setNewNumber}) => {
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  };

  return (
    <form onSubmit={addPerson}>
      <div>
        name: 
        <input 
          value={newName}
          onChange={handleNameChange}
        />
      </div>
      <div>
        number:
        <input 
          value={newNumber}
          onChange={handleNumberChange}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
};

const Filter = ({searchName, setSearchName}) => {
  const handleSearchNameChange = (event) => {
    setSearchName(event.target.value)
  };

  return (
    <>
      Filter by name: 
      <input
        value={searchName}
        onChange={handleSearchNameChange}
      />
    </>
  )
};

const Info = ({info}) => {
  return (
    <ul>
      {info.name} {info.number}
    </ul>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, []);

  const addPerson = (event) => {
    event.preventDefault();

    const personObj = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }

    const newNameLowerCase = newName.toLowerCase();
    const personsLowerCase = persons.map(p => p.name.toLowerCase());

    if (personsLowerCase.includes(newNameLowerCase)) {
      alert(`${newName} already exists in phone book. Duplicates are not allowed!`)
    }
    else {
      setPersons(persons.concat(personObj))
      setNewName('')
      setNewNumber('')
    }
  };

  const personsToShow = searchName === '' ? persons : persons.filter(p => p.name.toLowerCase().includes(searchName.toLowerCase()));

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchName={searchName} setSearchName={setSearchName}/>
      <PersonForm addPerson={addPerson} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow}/>
    </div>
  )
}

export default App;
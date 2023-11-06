import { useState, useEffect } from 'react'
import axios from 'axios';

import Filter from './components/Filter';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import Services from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')


  useEffect(() => {
    Services
      .getAll()
      .then(existingPersons => setPersons(existingPersons))
      .catch(error => console.log('get request failed'))
  }, []);

  const addPerson = (event) => {
    event.preventDefault();

    // Find the max id that currently exists, and create the newID as maxID+1
    const newID = persons.reduce((max, p) => (p.id > max ? p.id : max), 0) + 1;

    const personObj = {
      name: newName,
      number: newNumber,
      id: newID,
    };

    const newNameLowerCase = newName.toLowerCase();
    const personsLowerCase = persons.map(p => p.name.toLowerCase());

    if (personsLowerCase.includes(newNameLowerCase)) {
      if (window.confirm(`${newName} already exists in phone book. Do you want to replace the old number with a new one?`)) {
        const existingPerson = persons.find(p => p.name.toLowerCase() === newName.toLowerCase());
        
        const updatedPerson = {
          name: existingPerson.name,
          number: newNumber,
          id: existingPerson.id,
        };

        Services
          .update(existingPerson.id, updatedPerson)
          .then(retrievedPerson => {
            setPersons(persons.map(p => p.id === existingPerson.id ? retrievedPerson : p))
            setNewName('')
            setNewNumber('')
          })
          .catch(error => console.log('put request failed'))
      }
    }
    else {
      Services
        .create(personObj)
        .then(newPerson => {
          setPersons(persons.concat(newPerson))
          setNewName('')
          setNewNumber('')
        })
        .catch(error => console.log('post request failed'))
    }
  };

  const personsToShow = searchName === '' ? persons : persons.filter(p => p.name.toLowerCase().includes(searchName.toLowerCase()));

  const handleDeletePerson = (id) => {
    const updatedPersons = persons.filter(p => p.id !== id);
    setPersons(updatedPersons)
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchName={searchName} setSearchName={setSearchName}/>
      <PersonForm addPerson={addPerson} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} onDeletePerson={handleDeletePerson}/>
    </div>
  )
}

export default App;
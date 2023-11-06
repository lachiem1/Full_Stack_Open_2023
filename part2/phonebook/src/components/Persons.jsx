import Services from '../services/persons';

const Persons = ({ personsToShow, onDeletePerson }) => {
    const deletePerson = (person) => {
        if (window.confirm(`Are you sure you want to delete ${person.name} from your phonebook?`)) {
            console.log('delete em m8 ,', 'id to delete: ', person.id)
            Services
                .remove(person.id)
                .then(deletedPerson => {
                    console.log('Delete request fulfilled')
                    onDeletePerson(person.id)
                })
                .catch(error => console.log('Delete request failed'))
        }
    };

    return (
        <ul>
            {
                personsToShow.map(person =>
                    <ul key={person.id}>
                        {person.name + ' '}
                        {person.number + ' '}
                        <button onClick={() => deletePerson(person)}>
                            delete
                        </button>
                    </ul>
                )
            }
        </ul>
    )
};
export default Persons;



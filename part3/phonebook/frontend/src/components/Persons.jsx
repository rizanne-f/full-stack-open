export default function Persons({filteredPersons, handleDeletePerson}) {
    return (
        filteredPersons.map(
            person => (
                <div key={person.name}>
                    {person.name} {person.number} <button onClick={handleDeletePerson(person)}>delete</button>
                </div>
            )
        )
    )
}
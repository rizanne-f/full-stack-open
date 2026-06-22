export default function Persons({filteredPersons}) {
    return (
        filteredPersons.map(person => <div key={person.name}>{person.name} {person.number}</div>)
    )
}
export default function PersonForm({newContact, addPerson, handleSetNewName, handleNewNumber}) {
    return (
    <form>
        <div>Name:
            <input value={newContact.name} onChange={handleSetNewName} />
        </div>
        <div>Number:
            <input type="tel" value={newContact.number} onChange={handleNewNumber} />
        </div>
        <div>
            <button type="submit" onClick={addPerson}>Add</button>
        </div>
    </form>
    )
}
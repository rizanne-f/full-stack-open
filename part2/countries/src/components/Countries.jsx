const Countries = ({ filteredResult, handleShowClicked }) => {
    return (
        filteredResult.map(res => (
            <div key={res.cca3}>
                {res.name.common} <button onClick={handleShowClicked(res.name.common)}>Show</button>
            </div>
        ))
    )
}

export default Countries
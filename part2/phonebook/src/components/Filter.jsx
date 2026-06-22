export default function Filter({handleSearch}) {
    return (
        <div>Filter shown with
            <input type="text" onChange={handleSearch} />
        </div>
    )
}
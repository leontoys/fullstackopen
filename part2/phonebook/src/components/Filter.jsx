//Filter
const Filter = ({ newFilter, handleFilterChange }) => {
    return (
        <div>
            filter shown with
            <input type="text" value={newFilter} onChange={handleFilterChange} />
        </div>
    )
}

export default Filter  
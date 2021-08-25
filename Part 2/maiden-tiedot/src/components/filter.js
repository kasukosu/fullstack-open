const Filter = ({newSearch, searchHandler}) => {
    return (
        <div>
            <input onChange={searchHandler} value={newSearch} />
        </div>
    );
}

export default Filter;
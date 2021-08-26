const Filter = ({newSearch, searchHandler}) => {
    return (
        <section className="filter">
            Filter numbers: <input onChange={searchHandler} value={newSearch} />
        </section>
    );
}

export default Filter;
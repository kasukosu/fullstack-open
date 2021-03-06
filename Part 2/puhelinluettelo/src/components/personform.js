const PersonForm = (props) => {
    const {addPerson, newName, newNumber, nameChangeHandler, numberChangeHandler} = props;
    return (
        <section className="form">
            <form onSubmit={addPerson}>
                <div>
                <div>
                    name: <input value={newName} onChange={nameChangeHandler}/>
                </div>
                <div>
                number: <input value={newNumber} onChange={numberChangeHandler}/>

                </div>
                </div>
                <div>
                <button type="submit">add</button>
                </div>
            </form>
        </section>
    );
}

export default PersonForm;
const Persons = (props) => {
    console.log(props);
    const {persons} = props;
    return (
        <section className="numbers">
            {persons && persons.map((person, index) => (
                <div>
                    <p key={index}>{person.name} {person.number}</p>
                    <button onClick={() => {props.removePerson(person)}}>remove</button>
                </div>
            ))}
        </section>

    );
}

export default Persons;
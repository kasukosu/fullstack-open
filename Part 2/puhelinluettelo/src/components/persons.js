const Persons = (props) => {
    console.log(props);
    const {persons} = props;
    return (
        <div>
            {persons && persons.map((person, index) => (
                <p key={index}>{person.name} {person.number}</p>
            ))}
        </div>

    );
}

export default Persons;
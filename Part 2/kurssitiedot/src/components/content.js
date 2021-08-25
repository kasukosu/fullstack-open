import Part from './part';

const Content = ({parts}) => {
    console.log(parts);
    return (
        <>
            {parts.map((item, index) => (
                <Part key={index} part={item.name} exercises={item.exercises}/>
            ))}
        </>
    );
}

export default Content;
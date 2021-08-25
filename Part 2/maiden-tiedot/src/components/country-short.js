const CountryShort = ({country, showCountry}) => {

    return (
        <div>
            <p>{country.name}</p>
            <button value={country.name} onClick={showCountry}>show</button>
        </div>

      );
}

export default CountryShort;
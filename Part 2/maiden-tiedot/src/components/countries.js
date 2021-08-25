import CountryLong from "./country-long";
import CountryShort from "./country-short";

const Countries = (props) => {
    console.log(props);
    const {countries} = props;


    return (
        <div>
            {countries.length > 1 ?
                countries.map((country, index) => (
                    <CountryShort key={index} api_key={props.api_key} country={country} showCountry={props.showCountry}/>
                ))
                :
                countries.map((country, index) => (

                    <CountryLong key={index} api_key={props.api_key} country={country}/>

                ))
            }
        </div>

    );
}

export default Countries;
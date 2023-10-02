export default function Country(props) {
  const country = props.details;

  return (
    <div className="country">
      <div className="country-image">
        <img src={country.image} alt={country.name} />
      </div>
      <div className="country-details">
        <h2>{country.name}</h2>
        <p>
          <span>Capital City</span>: <span>{country.capital}</span>
        </p>
        <p>
          <span>Population</span>:{" "}
          <span>{country.population.toLocaleString()}</span>
        </p>
        <p>
          <span>Continent</span>: <span>{country.continent}</span>
        </p>
      </div>
    </div>
  );
}

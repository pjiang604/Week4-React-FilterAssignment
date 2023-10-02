import "./styles.css";
import Country from "./components/Country";
import data from "./data/countries.json";
import { useState } from "react";

//SORT
//Compare alphabetically
function alphaCompare(a, b) {
  return a.name.localeCompare(b.name); //compares two objects by name
}

function alphaSort(list) {
  return list.sort(alphaCompare);
}

//Compare ascending
function lessThan(a, b) {
  return a.population - b.population;
}

function ascSort(list) {
  return list.sort(lessThan);
}

//Compare descending

function greaterThan(a, b) {
  return b.population - a.population;
}

function descSort(list) {
  return list.sort(greaterThan);
}

//Shuffle
function shuffle() {
  return 0.5 - Math.random();
}

function shuffleSort(list) {
  return list.sort(shuffle);
}

export default function App() {
  const [sortOrder, setSortOrder] = useState(">");
  const [filterOption, setFilterOption] = useState("all");

  function handleSort(e) {
    setSortOrder(e.target.value);
  }

  function handleFilter(e) {
    setFilterOption(e.target.value);
  }

  //FILTERS
  function filterByContinent(list, option) {
    return list.filter(function (item) {
      return item.continent.toLowerCase() === option.toLowerCase();
    });
  }

  function filterByPopulation(list, option) {
    return list.filter(function (item) {
      if (filterOption === "99999999") {
        return item.population <= option;
      } else if (filterOption >= "100000000") {
        return item.population >= option;
      }
    });
  }

  function sort(list) {
    if (sortOrder === "alpha") {
      return alphaSort(list);
    } else if (sortOrder === "<") {
      return ascSort(list);
    } else if (sortOrder === ">") {
      return descSort(list);
    } else if (sortOrder === "shuffle") {
      return shuffleSort(list);
    } else {
      return list;
    }
  }

  function filter(list) {
    if (filterOption === "all") {
      return list;
    } else if (filterOption > 1) {
      return filterByPopulation(list, filterOption);
    } else {
      return filterByContinent(list, filterOption);
    }
  }

  const sorted = sort(data.countries);
  const filtered = filter(sorted);

  //const sortedCountries = alphaSort(); //sort alphabetically
  //const sortedAscCountries = ascSort(); //sort ascending by population
  //const filteredCountries = filterByContinent(sortedCountries, "europe");

  return (
    <div className="App">
      <h1>World's Largest Countries by Population</h1>
      <div className="filters">
        <label>
          Sort by:
          <select value={sortOrder} onChange={handleSort}>
            <option value=">">Population Desc</option>
            <option value="<">Population Asc</option>
            <option value="alpha">Alphabetically</option>
            <option value="shuffle">Shuffle</option>
          </select>
        </label>

        <label>
          Filters:
          <select value={filterOption} onChange={handleFilter}>
            <optgroup value="by-continent" label="By Continent">
              <option value="all">All</option>
              <option value="asia">Asia</option>
              <option value="africa">Africa</option>
              <option value="europe">Europe</option>
              <option value="north-america">North america</option>
              <option value="south-america">South america</option>
            </optgroup>
            <optgroup value="by-population-size" label="By Population Size">
              <option value="99999999">Less than 100M</option>
              <option value="100000000">100M or more</option>
              <option value="200000000">200M or more</option>
              <option value="500000000">500M or more</option>
              <option value="1000000000">1B or more</option>
            </optgroup>
          </select>
        </label>
      </div>
      <div className="countries">
        {filtered.map(function (country) {
          //you can use data.countries.map if you just want it all to show not alphabetically
          return <Country details={country} key={country.id} />;
        })}
      </div>
    </div>
  );
}

/**
 *
 */

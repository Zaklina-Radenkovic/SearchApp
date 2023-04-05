import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  //     set search query to empty string
  const [q, setQ] = useState("");
  const [filterParam, setFilterParam] = useState(["All"]);

  //     set search parameters
  //     we only what to search countries by capital and name
  //     this list can be longer if you want
  //     you can search countries even by their population
  // just add it to this array
  const [searchParam] = useState(["capital", "name"]);

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/iamspruce/search-filter-painate-reactjs/main/data/countries.json"
    )
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          setIsLoading(true);
          setItems(result);
        },
        (error) => {
          setIsLoading(true);
          setError(error);
        }
      );
  }, []);

  const data = Object.values(items);

  /* here we create a function 
//     we filter the items
// use array property .some() to return an item even if other requirements didn't match
    */
  const handleSearch = (items) => {
    return items.filter((item) => {
      if (item.region == filterParam) {
        return searchParam.some((newItem) => {
          return (
            item[newItem].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
          );
        });
      } else if (filterParam == "All") {
        return searchParam.some((newItem) => {
          return (
            item[newItem].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
          );
        });
      }
    });
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoading) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="wrapper">
        <div className="search-wrapper">
          <label htmlFor="search-form">
            <input
              type="search"
              name="search-form"
              id="search-form"
              className="search-input"
              placeholder="Search for..."
              value={q}
              /*
                // set the value of our useState q
                //  anytime the user types in the search box
                */
              onChange={(e) => setQ(e.target.value)}
            />
            <span className="sr-only">Search countries here</span>
          </label>

          <div className="select">
            <select
              onChange={(e) => setFilterParam(e.target.value)}
              className="custom-select"
              aria-label="Filter Countries By Region"
            >
              <option value="All">Filter By Region</option>
              <option value="Africa">Africa</option>
              <option value="Americas">America</option>
              <option value="Asia">Asia</option>
              <option value="Europe">Europe</option>
              <option value="Oceania">Oceania</option>
            </select>
            <span className="focus"></span>
          </div>
        </div>

        <ul className="card-grid">
          {handleSearch(data).map((item) => (
            <li>
              <article className="card" key={item.alpha3Code}>
                <div className="card-image">
                  <img
                    src={item.flag.large}
                    width="20px"
                    height="auto"
                    alt={item.name}
                  />
                </div>
                <div className="card-content">
                  <h2 className="card-name">{item.name}</h2>
                  <ol className="card-list">
                    <li>
                      population: <span>{item.population}</span>
                    </li>
                    <li>
                      Region: <span>{item.region}</span>
                    </li>
                    <li>
                      Capital: <span>{item.capital}</span>
                    </li>
                  </ol>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;

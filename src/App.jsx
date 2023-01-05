import { useEffect, useState } from "react";
import { getAreaData } from "./api";
import PostcodeCard from "./components/PostcodeCard";

import "./App.css";

function App() {
  const [areas, setAreas] = useState([]);
  const [postcode, setPostcode] = useState("");
  const [input, setInput] = useState("");
  const [cache, setCache] = useState("");

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPostcode(input);
  };

  const load = async (postcode) => {
    try {
      if (cache[postcode]) {
        setAreas(cache[postcode]);
      } else {
        const areaData = await getAreaData(postcode);
        setCache((currCache) => {
          const newCache = { ...currCache };
          newCache[postcode] = areaData;
          return newCache;
        });
        setAreas(areaData);
      }
    } catch (error) {
      window.alert("Invalid Postcode");
    }
  };

  // if (postcode) added to prevent inital GET request errors when first opening the page

  useEffect(() => {
    if (postcode) load(postcode);
  }, [postcode]);

  return (
    <div className="App" style={{ height: "auto", minHeight: "50vh" }}>
      <h1>Postcoders</h1>
      <h2>{`Areas for ${postcode.toUpperCase()}: ${areas.length}`}</h2>
      <h3>
        Please enter only the first part of the postcode. For example SW1A
        rather than SW1A 1AA
      </h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="searchField"
          onChange={handleChange}
          value={input}
          maxLength={4}
        ></input>
      </form>

      <ul>
        {areas.map((area) => {
          return <PostcodeCard key={area["place name"]} area={area} />;
        })}
      </ul>
    </div>
  );
}

export default App;

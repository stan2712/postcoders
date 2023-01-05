import { useEffect, useState } from "react";
import { getAreaData } from "./api";

import "./App.css";

function App() {
  const [areas, setAreas] = useState([]);
  const [postcode, setPostcode] = useState("");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPostcode(input);
  };

  const load = async (postcode) => {
    try {
      const areaData = await getAreaData(postcode);
      setAreas(areaData);
    } catch (error) {
      window.alert("Invalid postcode");
    }
  };

  // if (postcode) added to prevent inital GET request errors when first opening the page 

  useEffect(() => {
    if (postcode) load(postcode)
    setLoading(false)
  }, [postcode]);

  return loading ? (
    <p> Loading results..</p>
  ) : (
    <div className="App">
      <h1>Postcoders</h1>
      <h2>{`Areas for ${postcode.toUpperCase()}: ${areas.length}`}</h2>
      <h3>Please enter only the first part of the postcode. For example SW1A rather than SW1A 1AA</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="searchField"
          onChange={handleChange}
          value={input}
          maxLength={4}
        ></input>
      </form>
    </div>
  );
}

export default App;

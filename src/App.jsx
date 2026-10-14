import { useState } from "react";

import "./App.css";
import CatResult from "./components/CatResult";

const API_KEY = import.meta.env.VITE_CAT_API_KEY;
const API_URL =
  "https://api.thecatapi.com/v1/images/search?has_breeds=1&limit=10";

function App() {
  const [cat, setCat] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCat = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(API_URL, {
        headers: { "x-api-key": API_KEY },
      });

      const data = await response.json();
      const result = data[0];
      const breed = result.breeds[0];

      setCat({
        image: result.url,
        breed: breed.name,
        origin: breed.origin,
        lifeSpan: breed.life_span,
      });
    } catch (err) {
      setError("Couldn't fetch a cat. Try again!");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="mainContainer">
        <div className="pictureContainer">
          <h1>Veni Vici!</h1>
          <p>Discover Cats from your wildest Dreams!</p>
          <CatResult cat={cat} />
          {error && <p>{error}</p>}
          <button className="discover" onClick={fetchCat} disabled={loading}>
            {loading ? "Loading..." : "Discover!"}
          </button>
        </div>
        <div className="banlist">
          <h1>Ban List</h1>
          <p>Select an attribute in your listing to ban it</p>
        </div>
      </div>
    </>
  );
}

export default App;

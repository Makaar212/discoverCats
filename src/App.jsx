import { useState } from "react";

import "./App.css";
import CatResult from "./components/CatResult";

const API_KEY = import.meta.env.VITE_CAT_API_KEY;
const API_URL =
  "https://api.thecatapi.com/v1/images/search?has_breeds=1&limit=10";
const MAX_ATTEMPTS = 5;

function App() {
  const [cat, setCat] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [banList, setBanList] = useState([]);

  const addToBanList = (value) => {
    if (!banList.includes(value)) setBanList([...banList, value]);
  };

  const removeFromBanList = (value) => {
    setBanList(banList.filter((item) => item !== value));
  };

  const fetchCat = async () => {
    setLoading(true);
    setError(null);

    try {
      for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
        const response = await fetch(API_URL, {
          headers: { "x-api-key": API_KEY },
        });

        const data = await response.json();
        const cats = data.map((result) => {
          const breed = result.breeds[0];
          return {
            image: result.url,
            breed: breed.name,
            origin: breed.origin,
            lifeSpan: `${breed.life_span} years`,
          };
        });

        // skip any cat with a banned attribute
        const allowed = cats.find(
          (c) => ![c.breed, c.origin, c.lifeSpan].some((v) => banList.includes(v))
        );

        if (allowed) {
          setCat(allowed);
          return;
        }
      }
      setError("Every cat we found was banned. Try removing something from the ban list!");
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
          <CatResult cat={cat} onBan={addToBanList} />
          {error && <p>{error}</p>}
          <button className="discover" onClick={fetchCat} disabled={loading}>
            {loading ? "Loading..." : "Discover!"}
          </button>
        </div>
        <div className="banlist">
          <h1>Ban List</h1>
          <p>Select an attribute in your listing to ban it</p>
          <div className="banItems">
            {banList.map((item) => (
              <button key={item} onClick={() => removeFromBanList(item)}>
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

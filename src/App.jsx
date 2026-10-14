import { useState } from "react";

import "./App.css";

function App() {
  return (
    <>
      <div className="mainContainer">
        <div className="pictureContainer">
          <h1>Veni Vici!</h1>
          <p>Discover Cats from your wildest Dreams!</p>
          <button className="discover">Discover!</button>
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

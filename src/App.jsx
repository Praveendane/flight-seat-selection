
import { useState } from "react";

import Header from "./components/Header";
import FlightInfo from "./components/FlightInfo";
import SeatMap from "./components/SeatMap";

import "./App.css";

function App() {
  // Store the currently selected aircraft configuration.
  const [layout, setLayout] = useState("3-2");

  return (
    <div className="app-container">
      <Header />

      <main className="main-content">
        <FlightInfo />

        <SeatMap
          layout={layout}
          onLayoutChange={setLayout}
        />
      </main>
    </div>
  );
}

export default App;

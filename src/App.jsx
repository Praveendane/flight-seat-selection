
import { useState } from "react";

import Header from "./components/Header";
import FlightInfo from "./components/FlightInfo";
import SeatMap from "./components/SeatMap";
import PassengerList from "./components/PassengerList";
import BookingSummary from "./components/BookingSummary";

import useSeatSelection from "./hooks/useSeatSelection";

import "./App.css";

function App() {
  // Store the aircraft configuration.
  const [layout, setLayout] = useState("3-2");

  // Get passenger and seat assignment functionality.
  const {
    passengers,
    activePassengerId,
    setActivePassengerId,
    assignments,
    updatePassengerCount,
    assignSeat,
    removeSeat,
    getPassengerSeat,
  } = useSeatSelection();

  return (
    <div className="app-container">
      <Header />

      <main className="main-content">
        <FlightInfo />

        <div className="booking-layout">
          <PassengerList
            passengers={passengers}
            activePassengerId={activePassengerId}
            onPassengerChange={setActivePassengerId}
            onPassengerCountChange={updatePassengerCount}
            getPassengerSeat={getPassengerSeat}
            onRemoveSeat={removeSeat}
          />

          <SeatMap
            layout={layout}
            onLayoutChange={setLayout}
            assignments={assignments}
            activePassengerId={activePassengerId}
            onSeatSelect={assignSeat}
          />
        </div>
        <BookingSummary
        passengers={passengers}
        getPassengerSeat={getPassengerSeat}/>
      </main>
    </div>
  );
}

export default App;

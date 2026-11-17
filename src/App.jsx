
import { useState } from "react";

import Header from "./components/Header";
import FlightInfo from "./components/FlightInfo";
import SeatMap from "./components/SeatMap";
import PassengerList from "./components/PassengerList";
import BookingSummary from "./components/BookingSummary";
import MealSelection from "./components/MealSelection";

import useSeatSelection from "./hooks/useSeatSelection";

import "./App.css";

function App() {
  // Store the aircraft configuration.
  const [layout, setLayout] = useState("3-2");

  // Get passenger, seat and meal management functionality.
  const {
    passengers,
    activePassengerId,
    setActivePassengerId,
    assignments,
    updatePassengerCount,
    assignSeat,
    removeSeat,
    getPassengerSeat,
    selectMeal,
    getPassengerMeal,
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

        <MealSelection
          activePassengerId={activePassengerId}
          getPassengerMeal={getPassengerMeal}
          onMealSelect={selectMeal}
        />

        <BookingSummary
          passengers={passengers}
          getPassengerSeat={getPassengerSeat}
          getPassengerMeal={getPassengerMeal}
        />
      </main>
    </div>
  );
}

export default App;

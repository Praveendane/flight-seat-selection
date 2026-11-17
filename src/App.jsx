
import { useState } from "react";
import {
  CheckCircle2,
  Plane,
  ArrowLeft,
  RotateCcw,
} from "lucide-react";

import Header from "./components/Header";
import FlightInfo from "./components/FlightInfo";
import SeatMap from "./components/SeatMap";
import PassengerList from "./components/PassengerList";
import MealSelection from "./components/MealSelection";
import BookingSummary from "./components/BookingSummary";

import useSeatSelection from "./hooks/useSeatSelection";

import "./App.css";

function App() {
  // Aircraft configuration.
  const [layout, setLayout] = useState("3-2");
  const [layoutNotice, setLayoutNotice] = useState("");

  // Booking confirmation state.
  const [booking, setBooking] = useState(null);
  const [bookingError, setBookingError] = useState("");

  // Passenger and seat management.
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

  // Handle aircraft layout changes safely.
  const handleLayoutChange = (newLayout) => {
    if (newLayout === layout) return;

    const validSeatLetters =
      newLayout === "3-2"
        ? ["A", "B", "C", "D", "E"]
        : ["A", "B", "D", "E", "F", "G", "H"];

    const affectedPassengers = passengers.filter((passenger) => {
      const seat = getPassengerSeat(passenger.id);

      return seat && !validSeatLetters.includes(seat.slice(-1));
    });

    // Remove only seats unavailable in the new layout.
    affectedPassengers.forEach((passenger) => {
      removeSeat(passenger.id);
    });

    setLayout(newLayout);

    setLayoutNotice(
      affectedPassengers.length > 0
        ? `Seat assignments cleared for ${affectedPassengers
            .map((passenger) => passenger.name)
            .join(", ")} because those seats are unavailable in the new layout.`
        : ""
    );

    setBookingError("");
  };

  // Validate and confirm booking.
  const handleConfirmBooking = () => {
    setBookingError("");

    const passengersWithoutSeats = passengers.filter(
      (passenger) => !getPassengerSeat(passenger.id)
    );

    if (passengersWithoutSeats.length > 0) {
      setBookingError(
        `Please select seats for: ${passengersWithoutSeats
          .map((passenger) => passenger.name)
          .join(", ")}`
      );

      return;
    }

    // Generate a mock booking reference.
    const bookingReference = `SKY${Date.now()
      .toString()
      .slice(-8)}`;

    // Save passenger booking details.
    const confirmedPassengers = passengers.map((passenger) => ({
      ...passenger,
      seat: getPassengerSeat(passenger.id),
      meal: getPassengerMeal(passenger.id),
    }));

    setBooking({
      reference: bookingReference,
      passengers: confirmedPassengers,
      confirmedAt: new Date().toLocaleString("en-IN"),
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Return to flight selection without losing current selections.
  const handleBackToFlights = () => {
    setBooking(null);
    setBookingError("");

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Start a completely new booking.
  const handleNewBooking = () => {
    window.location.reload();
  };

  // Meal display names.
  const getMealName = (meal) => {
    const mealNames = {
      vegetarian: "Vegetarian Meal",
      "non-vegetarian": "Non-Vegetarian Meal",
      none: "No Meal",
    };

    return mealNames[meal] || "No Meal";
  };

  // Booking confirmation screen.
  if (booking) {
    return (
      <div className="app-container">
        <Header />

        <main className="main-content">
          <section className="confirmation-card">
            <div className="confirmation-icon">
              <CheckCircle2 size={43} />
            </div>

            <p className="eyebrow">BOOKING CONFIRMED</p>

            <h1>Your flight is booked!</h1>

            <p className="confirmation-message">
              Your passenger, seat and meal selections
              have been successfully saved.
            </p>

            <div className="booking-reference">
              <span>BOOKING REFERENCE</span>
              <strong>{booking.reference}</strong>
            </div>

            <div className="confirmed-passengers">
              <h2>Passenger Details</h2>

              {booking.passengers.map((passenger) => (
                <div
                  className="confirmed-passenger"
                  key={passenger.id}
                >
                  <div>
                    <strong>{passenger.name}</strong>
                    <span>Seat {passenger.seat}</span>
                  </div>

                  <span>{getMealName(passenger.meal)}</span>
                </div>
              ))}
            </div>

            <p className="confirmation-date">
              Confirmed on: {booking.confirmedAt}
            </p>

            <div className="confirmation-actions">
              <button
                type="button"
                className="back-to-flights-button"
                onClick={handleBackToFlights}
              >
                <ArrowLeft size={17} />
                Back to Flights
              </button>

              <button
                type="button"
                className="new-booking-button"
                onClick={handleNewBooking}
              >
                <RotateCcw size={17} />
                Book Another Flight
              </button>
            </div>
          </section>
        </main>
      </div>
    );
  }

  // Main flight booking screen.
  return (
    <div className="app-container">
      <Header />

      <main className="main-content">
        <FlightInfo />

        {layoutNotice && (
          <div className="layout-notice" role="status">
            {layoutNotice}
          </div>
        )}

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
            onLayoutChange={handleLayoutChange}
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

        {bookingError && (
          <div className="booking-error" role="alert">
            {bookingError}
          </div>
        )}

        <button
          type="button"
          className="confirm-booking-button"
          onClick={handleConfirmBooking}
        >
          <Plane size={18} />
          Confirm Booking
        </button>
      </main>
    </div>
  );
}

export default App;

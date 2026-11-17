
import { Receipt, Armchair, Users, Utensils } from "lucide-react";
import { getSeatPrice } from "../data/seats";

const mealPrices = {
  vegetarian: 250,
  "non-vegetarian": 350,
  none: 0,
};

const mealNames = {
  vegetarian: "Vegetarian Meal",
  "non-vegetarian": "Non-Vegetarian Meal",
  none: "No Meal",
};

function BookingSummary({
  passengers,
  getPassengerSeat,
  getPassengerMeal,
}) {
  // Calculate seat and meal charges for every passenger.
  const passengerDetails = passengers.map((passenger) => {
    const seat = getPassengerSeat(passenger.id);
    const meal = getPassengerMeal(passenger.id);

    const row = seat ? Number.parseInt(seat, 10) : null;
    const letter = seat ? seat.replace(/[0-9]/g, "") : null;

    const seatPrice =
      seat && row && letter
        ? getSeatPrice(row, letter)
        : 0;

    const mealPrice = mealPrices[meal] ?? 0;

    return {
      ...passenger,
      seat,
      meal,
      seatPrice,
      mealPrice,
      total: seatPrice + mealPrice,
    };
  });

  // Calculate total seat charges.
  const totalSeatPrice = passengerDetails.reduce(
    (total, passenger) => total + passenger.seatPrice,
    0
  );

  // Calculate total meal charges.
  const totalMealPrice = passengerDetails.reduce(
    (total, passenger) => total + passenger.mealPrice,
    0
  );

  // Calculate the final booking total.
  const grandTotal = totalSeatPrice + totalMealPrice;

  const assignedCount = passengerDetails.filter(
    (passenger) => passenger.seat
  ).length;

  return (
    <section className="booking-summary">
      <div className="summary-heading">
        <div>
          <p className="eyebrow">YOUR BOOKING</p>
          <h2>Booking Summary</h2>
        </div>
        <Receipt size={22} />
      </div>

      <div className="summary-statistics">
        <div>
          <Users size={17} />
          <span>{passengers.length} Passengers</span>
        </div>

        <div>
          <Armchair size={17} />
          <span>
            {assignedCount} of {passengers.length} Seats Selected
          </span>
        </div>
      </div>

      <div className="summary-passengers">
        {passengerDetails.map((passenger) => (
          <div className="summary-passenger" key={passenger.id}>
            <div className="summary-passenger-info">
              <strong>{passenger.name}</strong>

              <span>
                Seat: {passenger.seat || "Not selected"}
              </span>

              <span>
                Meal: {mealNames[passenger.meal] || "No Meal"}
              </span>
            </div>

            <div className="summary-passenger-prices">
              <span>
                Seat: {passenger.seatPrice === 0
                  ? "Free"
                  : `₹${passenger.seatPrice}`}
              </span>

              <span>
                Meal: {passenger.mealPrice === 0
                  ? "Free"
                  : `₹${passenger.mealPrice}`}
              </span>

              <strong>
                ₹{passenger.total.toLocaleString("en-IN")}
              </strong>
            </div>
          </div>
        ))}
      </div>

      <div className="summary-breakdown">
        <div>
          <span>Seat Charges</span>
          <strong>₹{totalSeatPrice.toLocaleString("en-IN")}</strong>
        </div>

        <div>
          <span>Meal Charges</span>
          <strong>₹{totalMealPrice.toLocaleString("en-IN")}</strong>
        </div>
      </div>

      <div className="summary-total">
        <div>
          <span>Grand Total</span>
          <small>Including seats and meals</small>
        </div>

        <strong>
          ₹{grandTotal.toLocaleString("en-IN")}
        </strong>
      </div>
    </section>
  );
}

export default BookingSummary;


import { Receipt, Armchair, Users } from "lucide-react";
import { getSeatPrice } from "../data/seats";

const MEAL_OPTIONS = {
  vegetarian: {
    name: "Vegetarian Meal",
    price: 250,
  },
  "non-vegetarian": {
    name: "Non-Vegetarian Meal",
    price: 350,
  },
  none: {
    name: "No Meal",
    price: 0,
  },
};

const formatCurrency = (amount) =>
  `₹${amount.toLocaleString("en-IN")}`;

function getSeatDetails(seat) {
  if (!seat) {
    return { price: 0 };
  }

  // Accept seat labels from A to H.
  const match = /^([1-8])([A-H])$/.exec(seat);

  if (!match) {
    return { price: 0 };
  }

  const [, row, letter] = match;

  return {
    price: getSeatPrice(Number(row), letter),
  };
}

function BookingSummary({
  passengers,
  getPassengerSeat,
  getPassengerMeal,
}) {
  const passengerDetails = passengers.map((passenger) => {
    const seat = getPassengerSeat(passenger.id);
    const meal = getPassengerMeal(passenger.id);

    const seatDetails = getSeatDetails(seat);
    const mealDetails = MEAL_OPTIONS[meal] ?? MEAL_OPTIONS.none;

    const seatPrice = seatDetails.price;
    const mealPrice = mealDetails.price;

    return {
      ...passenger,
      seat,
      mealName: mealDetails.name,
      seatPrice,
      mealPrice,
      total: seatPrice + mealPrice,
    };
  });

  const totals = passengerDetails.reduce(
    (result, passenger) => ({
      seatCharges: result.seatCharges + passenger.seatPrice,
      mealCharges: result.mealCharges + passenger.mealPrice,
    }),
    {
      seatCharges: 0,
      mealCharges: 0,
    }
  );

  const grandTotal = totals.seatCharges + totals.mealCharges;

  const assignedCount = passengerDetails.filter(
    (passenger) => passenger.seat
  ).length;

  return (
    <section className="booking-summary" aria-labelledby="summary-title">
      <div className="summary-heading">
        <div>
          <p className="eyebrow">YOUR BOOKING</p>
          <h2 id="summary-title">Booking Summary</h2>
        </div>

        <Receipt size={22} aria-hidden="true" />
      </div>

      <div className="summary-statistics">
        <div>
          <Users size={17} aria-hidden="true" />
          <span>
            {passengers.length}{" "}
            {passengers.length === 1 ? "Passenger" : "Passengers"}
          </span>
        </div>

        <div>
          <Armchair size={17} aria-hidden="true" />
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
              <span>Seat: {passenger.seat || "Not selected"}</span>
              <span>Meal: {passenger.mealName}</span>
            </div>

            <div className="summary-passenger-prices">
              <span>
                Seat:{" "}
                {passenger.seatPrice === 0
                  ? "Free"
                  : formatCurrency(passenger.seatPrice)}
              </span>

              <span>
                Meal:{" "}
                {passenger.mealPrice === 0
                  ? "Free"
                  : formatCurrency(passenger.mealPrice)}
              </span>

              <strong>{formatCurrency(passenger.total)}</strong>
            </div>
          </div>
        ))}
      </div>

      <div className="summary-breakdown">
        <div>
          <span>Seat Charges</span>
          <strong>{formatCurrency(totals.seatCharges)}</strong>
        </div>

        <div>
          <span>Meal Charges</span>
          <strong>{formatCurrency(totals.mealCharges)}</strong>
        </div>
      </div>

      <div className="summary-total">
        <div>
          <span>Grand Total</span>
          <small>Including seats and meals</small>
        </div>

        <strong>{formatCurrency(grandTotal)}</strong>
      </div>
    </section>
  );
}

export default BookingSummary;


import { Receipt, Armchair, Users } from "lucide-react";
import { getSeatPrice } from "../data/seats";

function BookingSummary({ passengers, getPassengerSeat }) {
  // Calculate the price for each passenger.
  const passengerDetails = passengers.map((passenger) => {
    const seat = getPassengerSeat(passenger.id);

    // Convert seat ID such as "2A" into row and letter.
    const row = seat ? Number.parseInt(seat, 10) : null;
    const letter = seat ? seat.replace(/[0-9]/g, "") : null;

    const price =
      seat && row && letter
        ? getSeatPrice(row, letter)
        : 0;

    return {
      ...passenger,
      seat,
      price,
    };
  });

  // Calculate the total price of all assigned seats.
  const totalPrice = passengerDetails.reduce(
    (total, passenger) => total + passenger.price,
    0
  );

  // Count passengers who have selected seats.
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
          <span>
            {passengers.length} Passengers
          </span>
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
            <div>
              <strong>{passenger.name}</strong>
              <span>
                {passenger.seat
                  ? `Seat ${passenger.seat}`
                  : "No seat selected"}
              </span>
            </div>

            <strong>
              {passenger.seat
                ? passenger.price === 0
                  ? "Free"
                  : `₹${passenger.price}`
                : "—"}
            </strong>
          </div>
        ))}
      </div>

      <div className="summary-total">
        <div>
          <span>Total Seat Price</span>
          <small>Including all assigned seats</small>
        </div>

        <strong>₹{totalPrice.toLocaleString("en-IN")}</strong>
      </div>
    </section>
  );
}

export default BookingSummary;

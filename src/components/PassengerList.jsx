
import { Users, UserRound, Armchair, Trash2 } from "lucide-react";

function PassengerList({
  passengers,
  activePassengerId,
  onPassengerChange,
  onPassengerCountChange,
  getPassengerSeat,
  onRemoveSeat,
}) {
  return (
    <section className="passenger-panel">
      <div className="passenger-heading">
        <div>
          <p className="eyebrow">TRAVELERS</p>
          <h2>Passengers</h2>
        </div>

        <Users size={21} />
      </div>

      <label className="passenger-count-label">
        Number of passengers
      </label>

      <select
        className="passenger-count-select"
        value={passengers.length}
        onChange={(event) =>
          onPassengerCountChange(Number(event.target.value))
        }
      >
        {[1, 2, 3, 4, 5].map((count) => (
          <option key={count} value={count}>
            {count} {count === 1 ? "Passenger" : "Passengers"}
          </option>
        ))}
      </select>

      <div className="passenger-list">
        {passengers.map((passenger) => {
          const assignedSeat = getPassengerSeat(passenger.id);
          const isActive = activePassengerId === passenger.id;

          return (
            <div
              key={passenger.id}
              className={`passenger-item ${isActive ? "active" : ""}`}
            >
              <button
                className="passenger-select"
                onClick={() => onPassengerChange(passenger.id)}
              >
                <div className="passenger-avatar">
                  <UserRound size={19} />
                </div>

                <div className="passenger-details">
                  <strong>{passenger.name}</strong>

                  <span>
                    {assignedSeat
                      ? `Seat ${assignedSeat}`
                      : "Seat not selected"}
                  </span>
                </div>
              </button>

              {assignedSeat && (
                <button
                  className="remove-seat-button"
                  onClick={() => {
                    onPassengerChange(passenger.id);
                    onRemoveSeat(passenger.id);
                  }}
                  title="Remove assigned seat"
                  aria-label={`Remove seat ${assignedSeat} from ${passenger.name}`}
                >
                  <Trash2 size={16} />
                </button>
              )}

              {isActive && !assignedSeat && (
                <span className="active-indicator">ACTIVE</span>
              )}
            </div>
          );
        })}
      </div>

      <div className="assignment-instruction">
        <Armchair size={18} />
        <span>Select a passenger, then choose a seat.</span>
      </div>
    </section>
  );
}

export default PassengerList;


import {
  getSeatPrice,
  getSeatCategory,
  isSeatOccupied,
} from "../data/seats";

function SeatMap({
  layout,
  onLayoutChange,
  assignments,
  activePassengerId,
  onSeatSelect,
}) {
  // Define seat groups based on the aircraft configuration.
  const seatGroups =
    layout === "3-2"
      ? [["A", "B", "C"], ["D", "E"]]
      : [["A", "B"], ["D", "E", "F"], ["G", "H"]];

  // Generate eight rows.
  const rows = Array.from({ length: 8 }, (_, index) => index + 1);

  // Get the active passenger's assigned seat.
  const selectedSeat = assignments[activePassengerId];

  return (
    <section className="seat-map-section">
      <div className="seat-map-heading">
        <div>
          <p className="eyebrow">AIRCRAFT LAYOUT</p>
          <h2>Select your preferred seat</h2>
          <p className="subtitle">
            Selecting for {activePassengerId}
          </p>
        </div>

        <div className="layout-switch">
          <button
            className={layout === "3-2" ? "active" : ""}
            onClick={() => onLayoutChange("3-2")}
          >
            3–2
          </button>

          <button
            className={layout === "2-3-2" ? "active" : ""}
            onClick={() => onLayoutChange("2-3-2")}
          >
            2–3–2
          </button>
        </div>
      </div>

      <div className="seat-map-card">
        <div className="aircraft-label">FRONT OF AIRCRAFT</div>

        <div className="cockpit">
          <span>✈</span>
        </div>

        <div className="seat-column-labels">
          <span>ROW</span>

          {seatGroups.map((group, groupIndex) => (
            <div className="seat-group" key={groupIndex}>
              {group.map((letter) => (
                <span key={letter}>{letter}</span>
              ))}
            </div>
          ))}
        </div>

        <div className="aircraft-seats">
          {rows.map((row) => (
            <div className="seat-row" key={row}>
              <span className="row-number">{row}</span>

              {seatGroups.map((group, groupIndex) => (
                <div className="seat-group" key={groupIndex}>
                  {group.map((letter) => {
                    const seatId = `${row}${letter}`;
                    const price = getSeatPrice(row, letter);
                    const category = getSeatCategory(price);
                    const occupied = isSeatOccupied(seatId);

                    const assignedPassenger = Object.entries(
                      assignments
                    ).find(([, assignedSeat]) => assignedSeat === seatId)?.[0];

                    const assignedToOther =
                      assignedPassenger &&
                      assignedPassenger !== activePassengerId;

                    const isSelected = selectedSeat === seatId;

                    const isUnavailable =
                      occupied || Boolean(assignedToOther);

                    return (
                      <button
                        key={seatId}
                        className={`seat ${category} ${
                          occupied
                            ? "occupied"
                            : assignedToOther
                              ? "assigned"
                              : isSelected
                                ? "selected"
                                : "available"
                        }`}
                        disabled={isUnavailable}
                        onClick={() => onSeatSelect(seatId)}
                        title={`${seatId} - ₹${price}`}
                        aria-label={`${seatId}, ₹${price}`}
                      >
                        <span>{seatId}</span>
                        <small>₹{price}</small>
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="aircraft-label aircraft-rear">
          REAR OF AIRCRAFT
        </div>
      </div>
    </section>
  );
}

export default SeatMap;

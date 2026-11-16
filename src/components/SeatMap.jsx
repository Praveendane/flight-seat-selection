
import {
  getSeatPrice,
  getSeatCategory,
  isSeatOccupied,
} from "../data/seats";

function SeatMap({ layout, onLayoutChange }) {
  // Define the seating groups for each aircraft configuration.
  const seatGroups =
    layout === "3-2"
      ? [["A", "B", "C"], ["D", "E"]]
      : [["A", "B"], ["C", "D", "E"], ["F", "G"]];

  // Generate 8 rows of seats.
  const rows = Array.from({ length: 8 }, (_, index) => index + 1);

  return (
    <section className="seat-map-section">
      <div className="seat-map-heading">
        <div>
          <p className="eyebrow">AIRCRAFT LAYOUT</p>
          <h2>Select your preferred seat</h2>
          <p className="subtitle">
            Choose a seating configuration to explore available seats.
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

                    return (
                      <button
                        key={seatId}
                        className={`seat ${category} ${
                          occupied ? "occupied" : "available"
                        }`}
                        disabled={occupied}
                        title={`${seatId} - ₹${price}`}
                        aria-label={`${seatId}, ${
                          occupied ? "Occupied" : "Available"
                        }, ₹${price}`}
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

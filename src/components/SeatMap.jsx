import {
  getSeatPrice,
  getSeatCategory,
  isSeatOccupied,
} from "../data/seats";

function SeatMap({
  layout,
  onLayoutChange,
  passengers = [],
  activePassengerId,
  getPassengerSeat,
  assignSeat,
}) {
  // Aircraft seating configurations.
  const seatGroups =
    layout === "3-2"
      ? [["A", "B", "C"], ["D", "E"]]
      : [["A", "B"], ["D", "E", "F"], ["G", "H"]];

  // Generate eight seat rows.
  const rows = Array.from({ length: 8 }, (_, index) => index + 1);

  // Find the active passenger.
  const activePassenger = passengers.find(
    (passenger) => passenger.id === activePassengerId
  );

  // Get the active passenger's assigned seat.
  const activePassengerSeat = activePassenger
    ? getPassengerSeat(activePassenger.id)
    : null;

  // Handle seat selection.
  const handleSeatClick = (seatId) => {
    if (!activePassenger) return;

    if (isSeatOccupied(seatId)) return;

    // Prevent selecting a seat assigned to another passenger.
    const assignedToOther = passengers.some(
      (passenger) =>
        passenger.id !== activePassengerId &&
        getPassengerSeat(passenger.id) === seatId
    );

    if (assignedToOther) return;

    // Assign the seat to the active passenger.
    assignSeat(seatId);
  };

  // Determine the visual state of a seat.
  const getSeatState = (seatId) => {
    if (isSeatOccupied(seatId)) return "occupied";

    const assignedToOther = passengers.some(
      (passenger) =>
        passenger.id !== activePassengerId &&
        getPassengerSeat(passenger.id) === seatId
    );

    if (assignedToOther) return "assigned";

    if (activePassengerSeat === seatId) return "selected";

    const row = Number(seatId.slice(0, -1));
    const letter = seatId.slice(-1);
    const price = getSeatPrice(row, letter);

    return getSeatCategory(price);
  };

  return (
    <section className="seat-map-section">

      {/* Seat map heading and layout selector */}
      <div className="seat-map-header">
        <div>
          <h2>Select Your Seat</h2>
          <p>Choose a seat for{" "}
            <strong className="active-passenger-name">{activePassenger?.name || "Select a passenger"}</strong></p>
        </div>

        {/* Aircraft layout selector */}
        <div className="layout-selector">
          <span className="layout-selector-label">
            Aircraft Layout
          </span>

          <div className="layout-select-wrapper">
            <select
              className="layout-select"
              value={layout}
              onChange={(event) => onLayoutChange(event.target.value)}
              aria-label="Select aircraft seating configuration"
            >
              <option value="3-2">3–2 Configuration</option>
              <option value="2-3-2">2–3–2 Configuration</option>
            </select>

            <span className="layout-select-arrow"></span>
          </div>
        </div>
      </div>

      <div className="seat-map-content">

        {/* Aircraft seat map */}
        <div className="seat-map-card">
          <div className="aircraft-label">
            AIRCRAFT SEAT MAP
          </div>

          {/* Seat column labels */}
          <div className="seat-column-labels">
            <span className="row-number-label">Row</span>

            {seatGroups.map((group, groupIndex) => (
              <div className="seat-group" key={groupIndex}>
                {group.map((letter) => (
                  <span key={letter}>{letter}</span>
                ))}
              </div>
            ))}
          </div>

          {/* Seat rows */}
          <div className="aircraft-seats">
            {rows.map((row) => (
              <div className="seat-row" key={row}>
                <span className="row-number">{row}</span>

                {seatGroups.map((group, groupIndex) => (
                  <div className="seat-group" key={groupIndex}>
                    {group.map((letter) => {
                      const seatId = `${row}${letter}`;
                      const price = getSeatPrice(row, letter);
                      const state = getSeatState(seatId);

                      const unavailable =
                        state === "occupied" ||
                        state === "assigned";

                      const category = getSeatCategory(price);

                      return (
                        <button
                          key={seatId}
                          type="button"
                          className={`seat ${state}`}
                          disabled={unavailable || !activePassenger}
                          aria-label={`Seat ${seatId}, ${
                            unavailable
                              ? state
                              : state === "selected"
                                ? "selected"
                                : category
                          }, ${
                            unavailable
                              ? "unavailable"
                              : `₹${price}`
                          }`}
                          aria-pressed={state === "selected"}
                          title={
                            unavailable
                              ? `${seatId} - ${state}`
                              : `${seatId} - ₹${price}`
                          }
                          onClick={() => handleSeatClick(seatId)}
                        >
                          <span>{letter}</span>

                          {!unavailable && (
                            <small>
                              {price === 0 ? "Free" : `₹${price}`}
                            </small>
                          )}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Seat categories and pricing */}
        <aside className="seat-category-panel">

          <div className="seat-category-heading">
            <h3>Seat Categories & Pricing</h3>
            <p>Understand seat types and availability.</p>
          </div>

          <div className="seat-category-list">

            {/* Standard seats */}
            <div className="seat-category-item">
              <span className="category-color standard-color" />

              <div>
                <strong>Standard</strong>
                <small>Regular seating</small>
              </div>

              <strong>₹0</strong>
            </div>

            {/* Premium seats */}
            <div className="seat-category-item">
              <span className="category-color premium-color" />

              <div>
                <strong>Premium</strong>
                <small>Premium seating</small>
              </div>

              <strong>₹250</strong>
            </div>

            {/* Extra legroom seats */}
            <div className="seat-category-item">
              <span className="category-color legroom-color" />

              <div>
                <strong>Extra Legroom</strong>
                <small>Additional leg space</small>
              </div>

              <strong>₹350</strong>
            </div>

            {/* Occupied / unavailable seats */}
            <div className="seat-category-item">
              <span className="category-color occupied-color" />

              <div>
                <strong>Occupied / Unavailable</strong>
                <small>Cannot be selected</small>
              </div>
            </div>

          </div>
        </aside>
      </div>
    </section>
  );
}

export default SeatMap;
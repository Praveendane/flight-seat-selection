
// Occupied seats (mock data).
const OCCUPIED_SEATS = new Set([
  "1A",
  "2C",
  "3E",
  "4B",
  "5D",
  "6A",
  "7C",
  "8E",
]);

// Seat pricing categories.
const SEAT_PRICES = {
  EXTRA_LEGROOM: 350,
  PREMIUM: 250,
  STANDARD: 0,
};

// Distribute paid seats across different rows.
// Avoid assigning paid prices to occupied seats.
const PRICED_SEATS = {
  // Extra Legroom – ₹350
  "1C": 350,
  "2A": 350,
  "3B": 350,
  "4D": 350,
  "5A": 350,
  "6E": 350,
  "7B": 350,
  "8D": 350,

  // Premium – ₹250
  "1E": 250,
  "2D": 250,
  "3A": 250,
  "4E": 250,
  "5B": 250,
  "6D": 250,
  "7E": 250,
  "8B": 250,
};

// Calculate the price of a seat.
export const getSeatPrice = (row, letter) => {
  const validColumns = ["A", "B", "C", "D", "E", "F", "G", "H"];

  if (
    !Number.isInteger(row) ||
    row < 1 ||
    row > 8 ||
    !validColumns.includes(letter)
  ) {
    return 0;
  }

  const seatId = `${row}${letter}`;

  return PRICED_SEATS[seatId] ?? SEAT_PRICES.STANDARD;
};

// Identify the category of a seat.
export const getSeatCategory = (price) => {
  switch (price) {
    case SEAT_PRICES.EXTRA_LEGROOM:
      return "extra-legroom";

    case SEAT_PRICES.PREMIUM:
      return "premium";

    default:
      return "standard";
  }
};

// Check whether a seat is occupied.
export const isSeatOccupied = (seatId) => {
  return OCCUPIED_SEATS.has(seatId);
};

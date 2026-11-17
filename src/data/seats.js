
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

const SEAT_PRICES = {
  EXTRA_LEGROOM: 350,
  PREMIUM: 250,
  PREFERRED: 200,
  STANDARD: 0,
};

// Calculate the price of a valid seat.
export const getSeatPrice = (row, letter) => {
  const validColumns = ["A", "B", "C", "D", "E", "F", "G"];

  if (
    !Number.isInteger(row) ||
    row < 1 ||
    row > 8 ||
    !validColumns.includes(letter)
  ) {
    return 0;
  }

  if (letter === "C" && row <= 3) {
    return SEAT_PRICES.EXTRA_LEGROOM;
  }

  if (row === 1 && letter === "E") {
    return SEAT_PRICES.PREMIUM;
  }

  if (row >= 4 && letter === "A") {
    return SEAT_PRICES.PREFERRED;
  }

  return SEAT_PRICES.STANDARD;
};

// Identify the category of each seat.
export const getSeatCategory = (price) => {
  switch (price) {
    case SEAT_PRICES.EXTRA_LEGROOM:
      return "extra-legroom";

    case SEAT_PRICES.PREMIUM:
      return "premium";

    case SEAT_PRICES.PREFERRED:
      return "preferred";

    default:
      return "standard";
  }
};

// Check whether a seat is occupied.
export const isSeatOccupied = (seatId) => {
  return OCCUPIED_SEATS.has(seatId);
};

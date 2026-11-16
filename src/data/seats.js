
const occupiedSeats = [
  "1A", "2C", "3E", "4B", "5D",
  "6A", "7C", "8E"
];

// Define seat prices based on seat category.
export const getSeatPrice = (row, letter) => {
  if (letter === "C" && row <= 3) return 350;
  if (row === 1 && letter === "E") return 250;
  if (row >= 4 && letter === "A") return 200;

  return 0;
};

// Identify the category of each seat.
export const getSeatCategory = (price) => {
  if (price === 350) return "extra-legroom";
  if (price === 250) return "premium";
  if (price === 200) return "preferred";

  return "standard";
};

// Check whether a seat is occupied.
export const isSeatOccupied = (seatId) => {
  return occupiedSeats.includes(seatId);
};

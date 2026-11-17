
import { useState } from "react";
import { isSeatOccupied } from "../data/seats";

const MIN_PASSENGERS = 1;
const MAX_PASSENGERS = 5;
const VALID_MEALS = ["vegetarian", "non-vegetarian", "none"];

const createPassengers = (count) =>
  Array.from({ length: count }, (_, index) => ({
    id: `P${index + 1}`,
    name: `Passenger ${index + 1}`,
  }));

function isValidSeatId(seatId) {
  return typeof seatId === "string" && /^[1-8][A-H]$/.test(seatId);
}

function useSeatSelection() {
  const [passengers, setPassengers] = useState(() =>
    createPassengers(2)
  );

  const [activePassengerId, setActivePassengerId] = useState("P1");
  const [assignments, setAssignments] = useState({});
  const [mealSelections, setMealSelections] = useState({});

  // Update passenger count and remove data for deleted passengers.
  const updatePassengerCount = (count) => {
    if (
      !Number.isInteger(count) ||
      count < MIN_PASSENGERS ||
      count > MAX_PASSENGERS
    ) {
      return;
    }

    const newPassengers = createPassengers(count);
    const validIds = new Set(
      newPassengers.map((passenger) => passenger.id)
    );

    setPassengers(newPassengers);

    setAssignments((previous) =>
      Object.fromEntries(
        Object.entries(previous).filter(([id]) => validIds.has(id))
      )
    );

    setMealSelections((previous) =>
      Object.fromEntries(
        Object.entries(previous).filter(([id]) => validIds.has(id))
      )
    );

    setActivePassengerId((current) =>
      validIds.has(current) ? current : newPassengers[0].id
    );
  };

  // Change active passenger only when that passenger exists.
  const changeActivePassenger = (passengerId) => {
    const passengerExists = passengers.some(
      (passenger) => passenger.id === passengerId
    );

    if (passengerExists) {
      setActivePassengerId(passengerId);
    }
  };

  // Assign a valid, available seat to the active passenger.
  const assignSeat = (seatId) => {
    if (
      !isValidSeatId(seatId) ||
      isSeatOccupied(seatId) ||
      !passengers.some(
        (passenger) => passenger.id === activePassengerId
      )
    ) {
      return;
    }

    setAssignments((previous) => {
      const alreadyAssigned = Object.entries(previous).some(
        ([passengerId, assignedSeat]) =>
          assignedSeat === seatId &&
          passengerId !== activePassengerId
      );

      if (alreadyAssigned) {
        return previous;
      }

      if (previous[activePassengerId] === seatId) {
        return previous;
      }

      return {
        ...previous,
        [activePassengerId]: seatId,
      };
    });
  };

  // Remove a passenger's seat assignment.
  const removeSeat = (passengerId = activePassengerId) => {
    if (!passengers.some((passenger) => passenger.id === passengerId)) {
      return;
    }

    setAssignments((previous) => {
      if (!previous[passengerId]) {
        return previous;
      }

      const updated = { ...previous };
      delete updated[passengerId];

      return updated;
    });
  };

  // Get the assigned seat for a passenger.
  const getPassengerSeat = (passengerId) =>
    assignments[passengerId] || null;

  // Select a valid meal for the active passenger.
  const selectMeal = (mealId) => {
    if (
      !VALID_MEALS.includes(mealId) ||
      !passengers.some(
        (passenger) => passenger.id === activePassengerId
      )
    ) {
      return;
    }

    setMealSelections((previous) => ({
      ...previous,
      [activePassengerId]: mealId,
    }));
  };

  // Get a passenger's selected meal.
  const getPassengerMeal = (passengerId) =>
    mealSelections[passengerId] || "none";

  return {
    passengers,
    activePassengerId,
    setActivePassengerId: changeActivePassenger,
    assignments,
    mealSelections,
    updatePassengerCount,
    assignSeat,
    removeSeat,
    getPassengerSeat,
    selectMeal,
    getPassengerMeal,
  };
}

export default useSeatSelection;

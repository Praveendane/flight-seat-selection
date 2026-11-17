
import { useState } from "react";

function useSeatSelection() {
  // Store the passenger list.
  const [passengers, setPassengers] = useState([
    { id: "P1", name: "Passenger 1" },
    { id: "P2", name: "Passenger 2" },
  ]);

  // Store the currently active passenger.
  const [activePassengerId, setActivePassengerId] = useState("P1");

  // Store seat assignments using passenger IDs.
  const [assignments, setAssignments] = useState({});

  // Store meal selections using passenger IDs.
  const [mealSelections, setMealSelections] = useState({});

  // Change the number of passengers.
  const updatePassengerCount = (count) => {
    const newPassengers = Array.from(
      { length: count },
      (_, index) => ({
        id: `P${index + 1}`,
        name: `Passenger ${index + 1}`,
      })
    );

    setPassengers(newPassengers);

    // Remove seat assignments belonging to deleted passengers.
    setAssignments((previous) => {
      const validIds = newPassengers.map(
        (passenger) => passenger.id
      );

      return Object.fromEntries(
        Object.entries(previous).filter(([passengerId]) =>
          validIds.includes(passengerId)
        )
      );
    });

    // Remove meal selections belonging to deleted passengers.
    setMealSelections((previous) => {
      const validIds = newPassengers.map(
        (passenger) => passenger.id
      );

      return Object.fromEntries(
        Object.entries(previous).filter(([passengerId]) =>
          validIds.includes(passengerId)
        )
      );
    });

    // Keep the active passenger within the selected count.
    setActivePassengerId((current) =>
      newPassengers.some((passenger) => passenger.id === current)
        ? current
        : newPassengers[0].id
    );
  };

  // Assign a seat to the active passenger.
  const assignSeat = (seatId) => {
    setAssignments((previous) => {
      // Prevent selecting a seat assigned to another passenger.
      const isAlreadyAssigned = Object.entries(previous).some(
        ([passengerId, assignedSeat]) =>
          assignedSeat === seatId &&
          passengerId !== activePassengerId
      );

      if (isAlreadyAssigned) {
        return previous;
      }

      // Replace the active passenger's previous seat.
      return {
        ...previous,
        [activePassengerId]: seatId,
      };
    });
  };

  // Remove a passenger's assigned seat.
  const removeSeat = (passengerId = activePassengerId) => {
    setAssignments((previous) => {
      const updated = { ...previous };

      delete updated[passengerId];

      return updated;
    });
  };

  // Find the seat assigned to a passenger.
  const getPassengerSeat = (passengerId) => {
    return assignments[passengerId] || null;
  };

  // Select a meal for the active passenger.
  const selectMeal = (mealId) => {
    setMealSelections((previous) => ({
      ...previous,
      [activePassengerId]: mealId,
    }));
  };

  // Get the selected meal for a passenger.
  const getPassengerMeal = (passengerId) => {
    return mealSelections[passengerId] || "none";
  };

  return {
    passengers,
    activePassengerId,
    setActivePassengerId,
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

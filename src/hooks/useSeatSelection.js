
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

    // Remove assignments belonging to deleted passengers.
    setAssignments((previous) => {
      const validIds = newPassengers.map((passenger) => passenger.id);

      return Object.fromEntries(
        Object.entries(previous).filter(([passengerId]) =>
          validIds.includes(passengerId)
        )
      );
    });

    // Keep the active passenger within the selected passenger count.
    setActivePassengerId((current) =>
      newPassengers.some((passenger) => passenger.id === current)
        ? current
        : newPassengers[0].id
    );
  };

  // Assign a seat to the active passenger.
  
const assignSeat = (seatId) => {
  setAssignments((previous) => {
    // Prevent selecting a seat already assigned to another passenger.
    const isAlreadyAssigned = Object.entries(previous).some(
      ([passengerId, assignedSeat]) =>
        assignedSeat === seatId &&
        passengerId !== activePassengerId
    );

    if (isAlreadyAssigned) {
      return previous;
    }

    // Remove the active passenger's previous seat.
    return {
        ...previous,
        [activePassengerId]: seatId,
        };
    });
  };

  // Remove the active passenger's assigned seat.
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

  return {
    passengers,
    activePassengerId,
    setActivePassengerId,
    assignments,
    updatePassengerCount,
    assignSeat,
    removeSeat,
    getPassengerSeat,
  };
}

export default useSeatSelection;

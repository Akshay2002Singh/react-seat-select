import React from "react";
import { TheaterSeatSelect } from "./components/theater-seat-select/TheaterSeatSelect";
import type { Seat } from "./components/theater-seat-select/types";
import seatLayout from './layout.ts';

// const generateSeats = (): Record<string, Seat[]> => {
//   const rows = ["A", "B", "C", "D", "E", "F", "G","H","I","J","K","L","M"];
//   const columns = 24;

//   const seats: Record<string, Seat[]> = {};

//   for (const row of rows) {
//     seats[row] = [];
//     for (let col = 1; col <= columns; col++) {
//       const id = `${row}${col}`;
//       seats[row].push({ id, label: id, isBlank: false });
//     }
//   }

//   return seats;
// };

const App: React.FC = () => {
  // const seats = generateSeats();
  const seats = seatLayout;
  console.log(seats)

  const bookedSeats = ["A2", "B5"];
  const disabledSeats = ["A3", "C7"];
  const reservedSeats = ["D1", "D2"];

  const handleSelect = (seat: Seat) => {
    console.log("Seat selected:", seat);
  };

  const handleUnselect = (seat: Seat) => {
    console.log("Seat unselected:", seat);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Theater Seat Selection</h2>
      <TheaterSeatSelect
        seats={seats}
        bookedSeats={bookedSeats}
        disabledSeats={disabledSeats}
        reservedSeats={reservedSeats}
        onSelect={handleSelect}
        onUnselect={handleUnselect}
      />
    </div>
  );
};

export default App;

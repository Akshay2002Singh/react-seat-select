import React from "react";
import { TheaterSeatSelect } from "./components/theater-seat-select/TheaterSeatSelect";
import type { Seat, SeatConfig } from "./components/theater-seat-select/types";
import data from "./layout.ts";

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
  const config: SeatConfig = data;

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
        config={config}
        bookedSeats={bookedSeats}
        disabledSeats={disabledSeats}
        reservedSeats={reservedSeats}
        onSelect={handleSelect}
        onUnselect={handleUnselect}
        customStyles={[
          {
            rowGap: "12px",
            columnGap: "16px",
            headerStyles: {
              fontSize: "18px",
              fontWeight: 600,
              color: "#ffffffff",
              textTransform: "uppercase",
              marginBottom: "8px",
              padding: "4px 0",
            },
            seatStyles: {
              width: "36px",
              height: "36px",
              borderRadius: "6px",
              // backgroundColor: "#f9f9f9",
              border: "1px solid #cccccc",
              fontSize: "14px",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            },
            availableStyles: {
              // backgroundColor: "#d4fcd4",
              // color: "#155724",
              border: "1px solid #a4d7a4",
              backgroundImage : "url('https://img.icons8.com/?size=48&id=rI1co8lOfrTW&format=png')",
            },
            bookedStyles: {
              backgroundColor: "#f8d7da",
              color: "#721c24",
              border: "1px solid #f5c6cb",
            },
            disabledStyles: {
              backgroundColor: "#e0e0e0",
              color: "#9e9e9e",
              border: "1px dashed #bdbdbd",
              cursor: "not-allowed",
            },
            reservedStyles: {
              backgroundColor: "#fff3cd",
              color: "#856404",
              border: "1px solid #ffeeba",
            },
            selectedStyles: {
              backgroundColor: "#cce5ff",
              color: "#004085",
              border: "2px solid #004085",
            },
          },
          {
            rowGap: "8px",
            columnGap: "12px",
            headerStyles: {
              fontSize: "16px",
              fontWeight: "bold",
              color: "#333",
              padding: "8px 0",
              textAlign: "center",
            },
            seatStyles: {
              width: "30px",
              height: "30px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              display: "inline-flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "12px",
            },
            availableStyles: {
              // backgroundColor: "#d4edda",
              backgroundImage: "url('https://img.icons8.com/?size=40&id=53746&format=png')",
              color: "#155724",
            },
            bookedStyles: {
              backgroundColor: "#f8d7da",
              color: "#721c24",
              cursor: "not-allowed",
            },
            disabledStyles: {
              backgroundColor: "#e2e3e5",
              color: "#6c757d",
              cursor: "not-allowed",
              opacity: 0.6,
            },
            reservedStyles: {
              backgroundColor: "#fff3cd",
              color: "#856404",
            },
            selectedStyles: {
              backgroundColor: "#cce5ff",
              color: "#004085",
              border: "2px solid #004085",
            },
          },
        ]}
      />
    </div>
  );
};

export default App;

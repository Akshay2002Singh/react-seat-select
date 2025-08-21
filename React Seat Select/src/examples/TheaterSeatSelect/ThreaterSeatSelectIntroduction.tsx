import React, { useState } from "react";
import { TheaterSeatSelect } from "../../../../src/components/TheaterSeatSelect/TheaterSeatSelect";

export default function ThreaterSeatSelectIntroduction() {
  const config = [
    {
      title: "Section A",
      seats: {
        A: [
          { id: "A1", label: "A1" },
          { id: "A2", label: "A2" },
          { id: "A3", label: "A3" },
          { id: "A4", label: "A4" },
          { id: "A5", label: "A5" },
        ],
        B: [
          { id: "B1", label: "B1" },
          { id: "B2", label: "B2" },
          { id: "B3", label: "B3" },
          { id: "B4", label: "B4" },
          { id: "B5", label: "B5" },
        ],
        C: [
          { id: "C1", label: "C1" },
          { id: "C2", label: "C2" },
          { id: "C3", label: "C3" },
          { id: "C4", label: "C4" },
          { id: "C5", label: "C5" },
        ],
      },
    },
    {
      title: "Section B",
      seats: {
        D: [
          { id: "D1", label: "D1" },
          { id: "D2", label: "D2" },
          { id: "D3", label: "D3" },
          { id: "D4", label: "D4" },
          { id: "D5", label: "D5" },
          { id: "D6", label: "D6" },
        ],
        E: [
          { id: "E1", label: "E1" },
          { id: "E2", label: "E2" },
          { id: "E3", label: "E3" },
          { id: "E4", label: "E4" },
          { id: "E5", label: "E5" },
          { id: "E6", label: "E6" },
        ],
      },
    },
  ];

  const [selectedSeats, setSelectedSeats] = useState([]);

  return (
    <div>
      <TheaterSeatSelect
        config={config}
        onSelect={(seat) => setSelectedSeats((prev) => [...prev, seat.id])}
        onUnselect={(seat) =>
          setSelectedSeats((prev) => prev.filter((s) => s !== seat.id))
        }
        maxSelectedSeats={3}
      />
      <p style={{ marginTop: "1rem" }}>
        <strong>Selected Seats:</strong> {selectedSeats.join(", ") || "None"}
      </p>
    </div>
  );
}

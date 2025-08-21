import React, { useState } from "react";
import { TheaterSeatSelect } from "../../../../src/components/TheaterSeatSelect/TheaterSeatSelect";

export default function TheaterSeatSelectGettingStartedExample() {
  const config = [
    {
      title: "Section A",
      seats: {
        A: [
          { id: "A1", label: "A1" },
          { id: "A2", label: "A2" }
        ]
      }
    }
  ];

  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  return (
    <div>
      <TheaterSeatSelect
        config={config}
        onSelect={(seat) => setSelectedSeats((prev) => [...prev, seat.id])}
        onUnselect={(seat) =>
          setSelectedSeats((prev) => prev.filter((s) => s !== seat.id))
        }
      />
      <p style={{ marginTop: "1rem" }}>
        <strong>Selected Seats:</strong> {selectedSeats.join(", ") || "None"}
      </p>
    </div>
  );
}
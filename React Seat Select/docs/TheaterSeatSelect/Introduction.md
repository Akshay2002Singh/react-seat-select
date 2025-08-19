---
id: theater-seat-intro
title: 🎭 Introduction
sidebar_label: Introduction
---

import React, { useState } from "react";
import { TheaterSeatSelect } from "../../../src/components/TheaterSeatSelect/TheaterSeatSelect";

export function ThreaterSeatSelectIntroduction() {
  const config = {
    SectionA: [
      [
        { id: "A1", label: "A1" },
        { id: "A2", label: "A2" },
        { id: "A3", label: "A3" }
      ],
      [
        { id: "B1", label: "B1" },
        { id: "B2", label: "B2" },
        { id: "B3", label: "B3" }
      ]
    ]
  };

  const [selectedSeats, setSelectedSeats] = useState([]);

  return (
    <div>
      <TheaterSeatSelect
        config={config}
        onSelect={(seat) => setSelectedSeats((prev) => [...prev, seat.id])}
        onUnselect={(seat) => setSelectedSeats((prev) => prev.filter((s) => s !== seat.id))}
        maxSelectedSeats={3}
      />
      <p style={{ marginTop: "1rem" }}>
        <strong>Selected Seats:</strong> {selectedSeats.join(", ") || "None"}
      </p>
    </div>
  );
}

# 🎭 TheaterSeatSelect Introduction

The **TheaterSeatSelect** component lets you build **theater, cinema, or hall-style seat booking UIs** in React with ease.  
It supports booked, reserved, disabled seats, custom legends, row numbers, and fully customizable styles.

---

## 📌 When to Use
Use `TheaterSeatSelect` when you are building:
- 🎬 **Cinema / Movie Theater** seat booking
- 🎭 **Live Theater / Opera House** seating
- 🏟️ **Event Hall / Auditorium** reservations
- 🪑 Any grid-style seat reservation system

---

## 🔥 Quick Example

Here’s the **minimal setup** to get started:

```tsx live
function Example() {
  const config = {
    SectionA: [
      [
        { id: "A1", label: "A1" },
        { id: "A2", label: "A2" },
        { id: "A3", label: "A3" }
      ],
      [
        { id: "B1", label: "B1" },
        { id: "B2", label: "B2" },
        { id: "B3", label: "B3" }
      ]
    ]
  };

  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  return (
    <div>
      <TheaterSeatSelect
        config={config}
        onSelect={(seat) => setSelectedSeats((prev) => [...prev, seat.id])}
        onUnselect={(seat) => setSelectedSeats((prev) => prev.filter((s) => s !== seat.id))}
        maxSelectedSeats={3}
      />
      <p style={{ marginTop: "1rem" }}>
        <strong>Selected Seats:</strong> {selectedSeats.join(", ") || "None"}
      </p>
    </div>
  );
}
```

<ThreaterSeatSelectIntroduction/>
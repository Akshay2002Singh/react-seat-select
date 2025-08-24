---
id: bus-seat-select-introduction
title: 🚍 Introduction
sidebar_label: Introduction
sidebar_position: 1
---

# 🚍 BusSeatSelect Introduction

The **BusSeatSelect** component lets you build **bus and coach-style seat booking UIs** in React.  
It supports multiple layouts (2+2, 2+1, sleeper/seater), gender-based availability, booked seats, custom legends, seat prices, and fully customizable styles.

---

## 📌 When to Use

Use `BusSeatSelect` when you are building:

- 🚌 **Bus / Coach Seat Booking** (AC, Non-AC, Sleeper, Seater)
- 🚍 **Shuttle or Van Reservations**
- 🚐 **Tourist Vehicle or Travel Agency Booking**
- 🛏️ **Sleeper Berth Layouts** with upper and lower decks

---

## 🔥 Quick Example

Here’s the **minimal setup** to get started with a 1+2 style bus layout:

```tsx live
function Example() {
  const busConfig = {
    lowerDeck: {
      title: "Lower Deck",
      columns: [
        {
          id: "col1",
          seats: [
            { id: "L1", type: "seater", isBlank: false },
            { id: "L2", type: "seater", isBlank: false },
            { id: "L3", type: "seater", isBlank: false },
          ],
        },
        {
          id: "col2",
          seats: [
            { id: "gap1", type: "seater", isBlank: true },
            { id: "gap2", type: "seater", isBlank: true },
            { id: "gap3", type: "seater", isBlank: true },
          ],
        },
        {
          id: "col3",
          seats: [
            { id: "L4", type: "seater", isBlank: false },
            { id: "L5", type: "seater", isBlank: false },
            { id: "L6", type: "seater", isBlank: false },
          ],
        },
        {
          id: "col4",
          seats: [
            { id: "L7", type: "seater", isBlank: false },
            { id: "L8", type: "seater", isBlank: false },
            { id: "L9", type: "seater", isBlank: false },
          ],
        },
      ],
    },
  };

  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  return (
    <div>
      <BusSeatSelect
        config={busConfig}
        onSelect={(seat) => setSelectedSeats((prev) => [...prev, seat.id])}
        onUnselect={(seat) =>
          setSelectedSeats((prev) => prev.filter((s) => s !== seat.id))
        }
        maxSelectedSeats={3}
        bookedSeats={[]}
      />
      <p style={{ marginTop: "20px" }}>
        <strong>Selected Seats:</strong> {selectedSeats.join(", ") || "None"}
      </p>
    </div>
  );
}
```
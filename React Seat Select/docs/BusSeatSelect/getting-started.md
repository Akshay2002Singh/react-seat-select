---
id: bus-seat-getting-started
title: 🚍 Getting Started
sidebar_label: Getting Started
sidebar_position: 1
---

# 🚍 Getting Started with BusSeatSelect

The **BusSeatSelect** component requires a `config` that defines how your seats are structured.  
This config follows the **BusConfig** type.

---

## 🔑 Step 1 — Install

```bash
npm install react-seat-select
# or
yarn add react-seat-select
```

## 🔑 Step 2 — Define Your BusConfig

The BusConfig is a record of sections, where each section contains columns and seats.

Each seat has an `id`, `type` (`seater` or `sleeper`), and an `isBlank` flag to represent empty spaces.

```tsx
export type SeatType = "sleeper" | "seater";

export interface Seat {
  id: string;
  type: SeatType;
  isBlank: boolean;
}

export interface Column {
  id: string;
  seats: Seat[];
}

export interface Section {
  title?: string;
  columns: Column[];
}

export type BusConfig = Section[];
```

### ✅ Minimal Example Config

```tsx
const busConfig: BusConfig = [
    {
    title: "Lower Deck",
    columns: [
      {
        id: "col1",
        seats: [
          { id: "L1", type: "seater", isBlank: false },
          { id: "L2", type: "seater", isBlank: false },
        ],
      },
      {
        id: "col2",
        seats: [
          { id: "L3", type: "seater", isBlank: false },
          { id: "L4", type: "seater", isBlank: false },
        ],
      },
    ],
  },
];
```

## 🔑 Step 3 — Render the Component

Here’s a working example with a simple 2x2 bus layout:

```tsx live
function Example() {
  const busConfig = [
      {
      title: "Lower Deck",
      columns: [
        {
          id: "col1",
          seats: [
            { id: "L1", type: "seater", isBlank: false },
            { id: "L2", type: "seater", isBlank: false },
            { id: "L3", type: "seater", isBlank: false },
            { id: "L4", type: "seater", isBlank: false },
            { id: "L5", type: "seater", isBlank: false },
          ],
        },
        {
          id: "col2",
          seats: [
            { id: "L6", type: "seater", isBlank: false },
            { id: "L7", type: "seater", isBlank: false },
            { id: "L8", type: "seater", isBlank: false },
            { id: "L9", type: "seater", isBlank: false },
            { id: "L10", type: "seater", isBlank: false },
          ],
        },
        {
          id: "col3", // aisle
          seats: [
            { id: "gap1", type: "seater", isBlank: true },
            { id: "gap2", type: "seater", isBlank: true },
            { id: "gap3", type: "seater", isBlank: true },
            { id: "gap4", type: "seater", isBlank: true },
            { id: "gap5", type: "seater", isBlank: true },
          ],
        },
        {
          id: "col4",
          seats: [
            { id: "L11", type: "seater", isBlank: false },
            { id: "L12", type: "seater", isBlank: false },
            { id: "L13", type: "seater", isBlank: false },
            { id: "L14", type: "seater", isBlank: false },
            { id: "L15", type: "seater", isBlank: false },
          ],
        },
      ],
    },
  ];

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
        bookedSeats={["L2", "L13"]}
      />
      <p style={{ marginTop: "1rem" }}>
        <strong>Selected Seats:</strong> {selectedSeats.join(", ") || "None"}
      </p>
    </div>
  );
}
```

✅ You now have a working BusSeatSelect with your first config!

In the next section, we’ll explore props, legends, and custom styling.
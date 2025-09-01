---
id: theater-seat-getting-started
title: 🚀 Getting Started
sidebar_label: Getting Started
sidebar_position: 2
---


# 🚀 Getting Started with TheaterSeatSelect

The **TheaterSeatSelect** component requires a `config` that defines how your seats are structured.  
This config follows the **SeatConfig** type.

---

## 🔑 Step 1 — Install

```bash
npm install react-seat-select
# or
yarn add react-seat-select
```

## 🔑 Step 2 — Define Your SeatConfig

The **SeatConfig** is an array of sections, where each section contains rows and seats.

```tsx
type Seat = {
  id: string;
  isBlank?: boolean;
  label?: string;
};

type SeatRow = Seat[];

type SeatMap = Partial<Record<string, SeatRow>>;

type SeatSection = {
  title?: string;
  seats: SeatMap;
};

type SeatConfig = SeatSection[];
```

✅ Minimal Example Config

```tsx
[
  {
    title: "Section A",
    seats: {
      A: [
        { id: "A1", label: "A1" },
        { id: "A2", label: "A2" },
      ],
    },
  },
];
```

## 🔑 Step 3 — Render the Component

Here’s a working example with a small layout:

```tsx live scope={{TheaterSeatSelect}}
function Example() {
  const config = [
    {
      title: "Section A",
      seats: {
        A: [
          { id: "A1", label: "A1" },
          { id: "A2", label: "A2" },
        ],
      },
    },
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
```


✅ You now have a working TheaterSeatSelect with your first config!
In the next section, we’ll explore props and customizations.

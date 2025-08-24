---
id: bus-seat-select-configuration
title: ⚙️ Configuration Guide
sidebar_label: Configuration Guide
sidebar_position: 3
---

<!-- import BusSeatSelectConfiguration from "@site/src/examples/BusSeatSelect/BusSeatSelectConfiguration"; -->

import { BusSeatSelect } from "../../../src/components/BusSeatSelect/BusSeatSelect";

# ⚙️ Configuration Guide

The `config` prop defines your **bus layout**.  
It’s the **heart** of `BusSeatSelect`, allowing you to customize **columns, rows, decks, and blank spaces**.

---

## 📌 Structure of `config`

The `config` prop is an **object of bus sections** (e.g., `lowerDeck`, `upperDeck`).  
Each section includes:

- `title` → Section name (e.g., Lower Deck, Upper Deck).
- `columns` → Array of **columns** of seats.
- Each column has:
  - `id` → unique identifier for the column.
  - `seats` → array of seats in that column.
- Each seat is an object with:
  - `id` → unique identifier for the seat.
  - `type` → `"seater"` or `"sleeper"`.
  - `isBlank` → optional, makes the seat invisible (used for spacing).

---

## 🚌 Example Layout 1: Only Seater Seats

```tsx live scope={{BusSeatSelect}}
function ExampleSeaterOnly() {
  const busConfig = {
    lowerDeck: {
      title: "Lower Deck",
      columns: [
        {
          id: "col1",
          seats: [
            { id: "S1", type: "seater", isBlank: false },
            { id: "S2", type: "seater", isBlank: false },
            { id: "S3", type: "seater", isBlank: false },
            { id: "S4", type: "seater", isBlank: false },
          ],
        },
        {
          id: "col2",
          seats: [
            { id: "S5", type: "seater", isBlank: false },
            { id: "S6", type: "seater", isBlank: false },
            { id: "S7", type: "seater", isBlank: false },
            { id: "S8", type: "seater", isBlank: false },
          ],
        },
        {
          id: "colgap",
          seats: [{ id: "gap1", type: "seater", isBlank: true }],
        },
        {
          id: "col3",
          seats: [
            { id: "S9", type: "seater", isBlank: false },
            { id: "S10", type: "seater", isBlank: false },
            { id: "S11", type: "seater", isBlank: false },
            { id: "S12", type: "seater", isBlank: false },
          ],
        },
        {
          id: "col4",
          seats: [
            { id: "S13", type: "seater", isBlank: false },
            { id: "S14", type: "seater", isBlank: false },
            { id: "S15", type: "seater", isBlank: false },
            { id: "S16", type: "seater", isBlank: false },
          ],
        },
      ],
    },
  };

  return <BusSeatSelect config={busConfig} bookedSeats={["S2", "S10"]} />;
}
```

## 🚌 Example Layout 2: Only Sleeper Seats (2+2 Layout)

```tsx live scope={{BusSeatSelect}}
function ExampleSleeperOnly() {
  const busConfig = {
    lowerDeck: {
      title: "Lower Deck",
      columns: [
        {
          id: "col1",
          seats: [
            { id: "SL1", type: "sleeper", isBlank: false },
            { id: "SL2", type: "sleeper", isBlank: false },
          ],
        },
        {
          id: "col2",
          seats: [
            { id: "SL3", type: "sleeper", isBlank: false },
            { id: "SL4", type: "sleeper", isBlank: false },
          ],
        },
        {
          id: "colgap",
          seats: [{ id: "gap1", type: "seater", isBlank: true }],
        },
        {
          id: "col3",
          seats: [
            { id: "SL5", type: "sleeper", isBlank: false },
            { id: "SL6", type: "sleeper", isBlank: false },
          ],
        },
        {
          id: "col4",
          seats: [
            { id: "SL7", type: "sleeper", isBlank: false },
            { id: "SL8", type: "sleeper", isBlank: false },
          ],
        },
      ],
    },
  };

  return <BusSeatSelect config={busConfig} bookedSeats={["SL3", "SL6"]} />;
}
```

## 🚌 Example Layout 3: Mixed (Seater + Sleeper Seats)

```tsx live scope={{BusSeatSelect}}
function ExampleMixedSeats() {
  const busConfig = {
    lowerDeck: {
      title: "Lower Deck",
      columns: [
        {
          id: "col1",
          seats: [
            { id: "M1", type: "seater", isBlank: false },
            { id: "M2", type: "seater", isBlank: false },
            { id: "M3", type: "seater", isBlank: false },
            { id: "M4", type: "seater", isBlank: false },
          ],
        },
        {
          id: "col2",
          seats: [
            { id: "M5", type: "seater", isBlank: false },
            { id: "M6", type: "seater", isBlank: false },
            { id: "M7", type: "seater", isBlank: false },
            { id: "M8", type: "seater", isBlank: false },
          ],
        },
        {
          id: "colgap",
          seats: [{ id: "gap1", type: "seater", isBlank: true }],
        },
        {
          id: "col3",
          seats: [
            { id: "MS1", type: "sleeper", isBlank: false },
            { id: "MS2", type: "sleeper", isBlank: false },
          ],
        }
      ],
    },
  };

  return <BusSeatSelect config={busConfig} bookedSeats={["M2", "MS2"]} />;
}
```

---

## 📦 JSON-Based Config

You can also **import bus layouts** from JSON files or APIs.

```json title="busConfig.json"
{
  "lowerDeck": {
    "title": "Lower Deck",
    "columns": [
      {
        "id": "col1",
        "seats": [
          { "id": "L1", "type": "seater", "isBlank": false },
          { "id": "L2", "type": "seater", "isBlank": false }
        ]
      },
      {
        "id": "col2",
        "seats": [
          { "id": "L3", "type": "seater", "isBlank": false },
          { "id": "L4", "type": "seater", "isBlank": false }
        ]
      }
    ]
  }
}
```

```tsx
import busConfig from "./busConfig.json";

<BusSeatSelect config={busConfig} />;
```

---

## ✅ Best Practices

- Always provide a **unique `id`** for each seat.
- Use `type` to differentiate between **seaters** and **sleepers**.
- Use `isBlank: true` to maintain **aisle spacing** inside the layout.
- Group seats into **decks** (`lowerDeck`, `upperDeck`) for readability.
- Store large configurations in **JSON files** or fetch them via API.

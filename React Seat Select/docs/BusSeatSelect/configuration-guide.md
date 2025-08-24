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

## 🚌 Example Layout

```tsx live scope={{BusSeatSelect}}
function Example() {
  const config = {
    lowerDeck: {
      title: "Lower Deck",
      columns: [
        {
          id: "col1",
          seats: [
            { id: "L1", type: "seater", isBlank: false },
            { id: "L2", type: "seater", isBlank: false },
            { id: "L3", type: "seater", isBlank: false },
            { id: "L4", type: "seater", isBlank: false }
          ]
        },
        {
          id: "col2",
          seats: [
            { id: "L5", type: "seater", isBlank: false },
            { id: "L6", type: "seater", isBlank: false },
            { id: "L7", type: "seater", isBlank: false },
            { id: "L8", type: "seater", isBlank: false }
          ]
        },
        {
          id: "col3",
          seats: [
            { id: "BL1", type: "seater", isBlank: true },
            { id: "BL2", type: "seater", isBlank: true },
            { id: "BL3", type: "seater", isBlank: true },
            { id: "BL4", type: "seater", isBlank: true }
          ]
        },
        {
          id: "col4",
          seats: [
            { id: "L9", type: "seater", isBlank: false },
            { id: "L10", type: "seater", isBlank: false },
            { id: "L11", type: "seater", isBlank: false },
            { id: "L12", type: "seater", isBlank: false }
          ]
        }
      ]
    }
  };

  return <BusSeatSelect config={config} />;
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
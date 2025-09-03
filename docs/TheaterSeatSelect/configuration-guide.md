---
id: theater-seat-select-configuration
title: ⚙️ Configuration Guide
sidebar_label: Configuration Guide
sidebar_position: 3
---

# ⚙️ Configuration Guide

The `config` prop defines your **theater layout**.  
It’s the **heart** of `TheaterSeatSelect`, allowing you to customize **rows, seats, and sections**.

---

## 📌 Structure of `config`

The `config` prop is an **array of seat sections**.  
Each section can include:

- `title` → Section name (e.g., Balcony, VIP, Section A).  
- `seats` → Object where **row labels** (`A`, `B`, `C`) map to **arrays of seats**.  
- Each seat is an object with:
  - `id` → unique identifier for the seat.  
  - `label` → seat text displayed (defaults to `id`).  
  - `isBlank` → optional, makes the seat invisible but keeps spacing.  

---

## 🏟️ Example Layout

```tsx live scope={{TheaterSeatSelect}}
function Example() {
  const config = [
    {
      title: "Section A",
      seats: {
        A: [
          { id: "A1", label: "A1" },
          { id: "A2", label: "A2" },
          { id: "A3", label: "A3" },
          { id: "A4", label: "A4" }
        ],
        B: [
          { id: "B1", label: "B1" },
          { id: "B2", label: "B2" },
          { id: "B3", label: "B3" },
          { id: "B4", label: "B4" }
        ]
      }
    },
    {
      title: "Balcony",
      seats: {
        C: [
          { id: "C1", label: "C1" },
          { id: "C2", label: "C2" },
          { id: "C3", label: "C3" },
          { id: "C4", label: "C4", isBlank: true } // spacing only
        ]
      }
    }
  ];

  return <TheaterSeatSelect config={config} />;
}
```

## 📦 JSON-Based Config

You can also **import seat maps** from JSON files or APIs.

```json title="seatConfig.json"
[
  {
    "title": "Section A",
    "seats": {
      "A": [
        { "id": "A1", "label": "A1" },
        { "id": "A2", "label": "A2" }
      ],
      "B": [
        { "id": "B1", "label": "B1" },
        { "id": "B2", "label": "B2" }
      ]
    }
  }
]
```

```tsx
import seatConfig from "./seatConfig.json";

<TheaterSeatSelect config={seatConfig} />;
```

## ✅ Best Practices

- Always provide a **unique `id`** for each seat.  
- Use `label` for **display purposes** (it can be same as `id` or custom).  
- Use `isBlank: true` for **empty spacing** inside rows.  
- Group seats into **sections** (`VIP`, `Balcony`, etc.) for readability.  
- Store large configurations in **JSON files** or fetch them via API.  


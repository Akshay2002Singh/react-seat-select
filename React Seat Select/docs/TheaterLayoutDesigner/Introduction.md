---
id: theater-seat-layout-designer-introduction
title: 🎭 Introduction
sidebar_label: Introduction
sidebar_position: 1
---

# 🎭 Theater Seat Layout Designer

The **TheaterSeatLayoutDesigner** is a fully interactive React component for building and customizing theater or auditorium seat layouts.

---

## ✨ Features

- ➕ Add / remove **sections**  
- ➕ Add / remove **rows** and **columns**  
- 🪑 Define seat IDs and labels  
- 🎨 Apply **custom styles** to all UI elements  
- 🛠 Edit properties of sections, rows, and seats via the **Inspector**  
- ⬇️ **Export your configuration** as JSON for persistence   

---

## 🚀 Quick Example

```tsx live
function Example() {

  return (
        <TheaterSeatLayoutDesigner/>
  );
}
```

---

## 📤 Exporting JSON

You can click Export JSON at the bottom of the designer to download the current layout as `seat-layout.json`.

---

## 🚀 Tips

- Use `onChange` to persist the layout in a database or state manager.
- Apply `customStyles` to theme the designer according to your application.
- Seat IDs are auto-generated but can be edited from the Inspector.
- Use blank seats to create spacing or empty slots.
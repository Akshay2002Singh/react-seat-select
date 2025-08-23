---
id: theater-seat-select-customization
title: 🎨 Customization & Styling
sidebar_label: Customization
sidebar_position: 5
---

# 🎨 Customization & Styling

The `TheaterSeatSelect` component is highly customizable. You can style seats, rows, and entire sections using the `customStyles` prop.  
You can also replace built-in UI parts like the **screen** and **legend** with your own components.

---

## 🔹 `customStyles` for Section-Level Styling

The `customStyles` prop accepts an **array of objects**, where **each object corresponds to one section** in your `SeatConfig`.

This means you can give **different looks** to each section (e.g., VIP seats gold-colored, Balcony seats blue-colored).

### 🛠 Properties of `SectionStyle`

Each section style supports these keys:

- **`rowGap`** → Vertical spacing between rows.  
- **`columnGap`** → Horizontal spacing between seats in a row.  
- **`headerStyles`** → Styles for the section header (title).  
- **`seatStyles`** → Base styles for all seats in the section.  
- **State-specific styles**:  
  - `availableStyles` → Seats available for booking.  
  - `bookedStyles` → Already booked seats.  
  - `reservedStyles` → Temporarily held/reserved seats.  
  - `disabledStyles` → Seats not available for selection (e.g., blocked for maintenance).  
  - `selectedStyles` → Seats chosen by the current user.  

---

### ✨ Example: Styling Multiple Sections

```tsx live scope={{TheaterSeatSelect}}
function Example() {
const seatConfig = [
  {
    title: "VIP",
    seats: {
      A: [{ id: "A1" }, { id: "A2" }],
      B: [{ id: "B1" }, { id: "B2" }]
    }
  },
  {
    title: "Balcony",
    seats: {
      C: [{ id: "C1" }, { id: "C2" }],
      D: [{ id: "D1" }, { id: "D2" }]
    }
  }
];

const customStyles = [
  {
    rowGap: "20px",
    columnGap: "14px",
    headerStyles: { fontSize: "22px", fontWeight: "bold", color: "goldenrod" },
    seatStyles: { borderRadius: "8px", width: "50px", height: "50px" },
    availableStyles: { backgroundColor: "#fff4d6", border: "2px solid goldenrod" },
    bookedStyles: { backgroundColor: "#bfbfbf", color: "#fff" },
    reservedStyles: { backgroundColor: "#ff9800", color: "#fff" },
    disabledStyles: { backgroundColor: "#f5f5f5", color: "#ccc" },
    selectedStyles: { backgroundColor: "#ffd700", color: "#000" }
  },
  {
    rowGap: "12px",
    columnGap: "8px",
    headerStyles: { fontSize: "18px", fontWeight: "600", color: "#3f51b5" },
    seatStyles: { borderRadius: "4px", width: "40px", height: "40px" },
    availableStyles: { backgroundColor: "#e3f2fd", border: "1px solid #3f51b5" },
    bookedStyles: { backgroundColor: "#9e9e9e", color: "#fff" },
    reservedStyles: { backgroundColor: "#ff5722", color: "#fff" },
    disabledStyles: { backgroundColor: "#eeeeee", color: "#999" },
    selectedStyles: { backgroundColor: "#3f51b5", color: "#fff" }
  }
];

return <TheaterSeatSelect config={seatConfig} customStyles={customStyles} />
}
```

✅ **Here,**

- The **VIP section** has gold-themed seats with larger dimensions.  
- The **Balcony section** has smaller, blue-themed seats with tighter spacing.  

---

### 🔹 **Row & Column Spacing**

You can control spacing independently for each section:

- `rowGap` → Adds vertical space between rows.  
- `columnGap` → Adds horizontal space between seats in a row.  

**Example:**

```tsx
const customStyles = [
  {
    rowGap: "24px", // More space between rows
    columnGap: "16px" // Wider spacing between seats
  }
];
```

### 🔹 **Seat Styling by State**

Each seat state can be styled separately:

- **Available** → Neutral background (default state).  
- **Booked** → Typically red or grey (indicating not selectable).  
- **Reserved** → Orange/yellow (held temporarily).  
- **Disabled** → Greyed out (permanently unavailable).  
- **Selected** → Green/blue (highlighting user’s choice).  

**Example:**

```tsx
const customStyles = [
  {
    seatStyles: { borderRadius: "6px", width: "42px", height: "42px" },
    availableStyles: { backgroundColor: "#fafafa", border: "1px solid #ddd" },
    bookedStyles: { backgroundColor: "#e53935", color: "#fff" },
    reservedStyles: { backgroundColor: "#fbc02d", color: "#000" },
    disabledStyles: { backgroundColor: "#cfd8dc", color: "#757575" },
    selectedStyles: { backgroundColor: "#4caf50", color: "#fff" }
  }
];
```

✅ **Best Practices for `customStyles`**

- Keep seat dimensions consistent within a section for proper alignment.  
- Use contrasting colors to make seat states visually distinct.  
- Apply `rowGap` and `columnGap` for better readability in larger layouts.  
- If you have multiple categories (e.g., VIP, Balcony), give each section a unique theme.  
- Always test colors in both **dark mode** and **light mode** for accessibility.  


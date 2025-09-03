---
id: bus-seat-select-customization
title: 🎨 Customization & Styling
sidebar_label: Customization & Styling
sidebar_position: 5
---

# 🎨 Customization & Styling

The `BusSeatSelect` component is **highly customizable**.  
You can style seats, rows, and even entire bus layouts using the `customStyles` prop.  
You can also **replace built-in parts** like the **legend** with your own components.

---

## 🔹 `customStyles` for Layout-Level Styling

The `customStyles` prop accepts an **array of objects**, where each object corresponds to **one layout/section** in your `BusConfig`.

This means you can give **different looks** to different seat layouts (e.g., front seats bigger, sleeper seats styled differently, etc.).

### 🛠 Properties of `CustomStyles`

Each style object supports these keys:

- **`rowGap`** → Vertical spacing between seat rows.
- **`columnGap`** → Horizontal spacing between seats in a row.
- **`sectionStyle`** → Styles for a particular section i.e Lower Berth,Upper Berth etc.
- **`seatStyles`** → Base styles for all seats.
- **State-specific styles**:
  - `availableStyles` → Seats available for booking.
  - `bookedStyles` → Already booked seats.
  - `bookedByFemaleStyles` → Seats booked by female passengers.
  - `bookedByMaleStyles` → Seats booked by male passengers.
  - `availableForFemaleStyles` → Seats available only for female passengers.
  - `availableForMaleStyles` → Seats available only for male passengers.
  - `selectedStyles` → Seats chosen by the current user.

---

## ✨ Example: Styling Bus Layout

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
          ],
        },
        {
          id: "col2",
          seats: [
            { id: "L5", type: "seater", isBlank: false },
            { id: "L6", type: "seater", isBlank: false },
            { id: "L7", type: "seater", isBlank: false },
            { id: "L8", type: "seater", isBlank: false },
          ],
        },
        {
          id: "col3",
          seats: [
            { id: "gap", type: "seater", isBlank: true },
          ],
        },
        {
          id: "col4",
          seats: [
            { id: "L9", type: "seater", isBlank: false },
            { id: "L10", type: "seater", isBlank: false },
            { id: "L11", type: "seater", isBlank: false },
            { id: "L12", type: "seater", isBlank: false },
          ],
        },
      ],
    },
  ];

  const seatPriceMap = {
  // Column 1 → ₹500 each
  L1: 500,
  L2: 500,
  L3: 500,
  L4: 500,

  // Column 2 → ₹550 each
  L5: 550,
  L6: 550,
  L7: 550,
  L8: 550,

  // Column 3 → BL1–BL4 skipped (blanks)

  // Column 4 → ₹600 each
  L9: 600,
  L10: 600,
  L11: 600,
  L12: 600,
};


  const customStyles = [
    {
      rowGap: "18px",
      columnGap: "10px",
      seatStyles: { borderRadius: "6px", width: "42px", height: "42px" },
      availableStyles: {
        backgroundColor: "#e8f5e9",
        border: "1px solid #4caf50",
      },
      sectionStyle: {
        border: "1px solid white",
        padding: "4px 12px",
        borderTopLeftRadius: "22px",
        borderTopRightRadius: "22px",
      },
      bookedStyles: { backgroundColor: "#9e9e9e", color: "#fff" },
      bookedByFemaleStyles: { backgroundColor: "#f48fb1", color: "#fff" },
      bookedByMaleStyles: { backgroundColor: "#64b5f6", color: "#fff" },
      availableForFemaleStyles: {
        backgroundColor: "#fce4ec",
        border: "1px dashed #ec407a",
      },
      availableForMaleStyles: {
        backgroundColor: "#e3f2fd",
        border: "1px dashed #42a5f5",
      },
      selectedStyles: { backgroundColor: "#4caf50", color: "#fff" },
    },
  ];

  return (
    <BusSeatSelect
      config={busConfig}
      seatPriceMap={seatPriceMap}
      customStyles={customStyles}
      bookedSeats={["L6"]}
      customSectionWrapperStyle={{
        gap: "60px",
      }}
      SectionHeader={() => {
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "8px 16px",
              borderBottom: "1px solid #ccc",
              fontWeight: "bold",
              fontSize: "16px",
            }}
          >
            <span></span>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: "48px",
              }}
            >
              ☮
            </div>
          </div>
        );
      }}
    />
  );
}
```

✅ **Here,**

- Default available seats are **green-bordered**.
- Female-only available seats are **pink-dashed**.
- Male-only available seats are **blue-dashed**.
- Already booked seats are **greyed out**.
- Booked seats show **gender-specific colors**.

---

## 🔹 Row & Column Spacing

You can control spacing independently:

- `rowGap` → Adds vertical space between seat rows.
- `columnGap` → Adds horizontal space between seats in a row.

**Example:**

```tsx
const customStyles = [
  {
    rowGap: "20px", // More space between rows
    columnGap: "14px", // Wider spacing between seats
  },
];
```

---

## 🔹 Seat Styling by State

Each seat state can be styled separately:

- **Available** → Neutral background.
- **Booked** → Grey/Red, not selectable.
- **Booked by Female** → Pink.
- **Booked by Male** → Blue.
- **Available for Female** → Pink-bordered.
- **Available for Male** → Blue-bordered.
- **Selected** → Highlighted (Green).

**Example:**

```tsx
const customStyles = [
  {
    seatStyles: { borderRadius: "6px", width: "40px", height: "40px" },
    availableStyles: { backgroundColor: "#fafafa", border: "1px solid #ddd" },
    bookedStyles: { backgroundColor: "#e53935", color: "#fff" },
    bookedByFemaleStyles: { backgroundColor: "#d81b60", color: "#fff" },
    bookedByMaleStyles: { backgroundColor: "#1e88e5", color: "#fff" },
    availableForFemaleStyles: {
      backgroundColor: "#fce4ec",
      border: "1px dashed #f06292",
    },
    availableForMaleStyles: {
      backgroundColor: "#e3f2fd",
      border: "1px dashed #42a5f5",
    },
    selectedStyles: { backgroundColor: "#4caf50", color: "#fff" },
  },
];
```

---

## ✅ Best Practices

- Keep seat sizes consistent for alignment.
- Use **gender-specific colors** for clarity.
- Apply `rowGap` and `columnGap` for readability.
- Use **contrasting colors** for each state.
- Always check accessibility in light/dark themes.

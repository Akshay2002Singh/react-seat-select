---
id: bus-legend-customization
title: 🚌 Legend Customization
sidebar_label: Legend
sidebar_position: 6
---

# 🚌 Legend Customization

The `BusSeatSelect` component supports **legend configuration** to help users understand different seat states.

---

## 🎨 Legend Configuration

The `legendConfig` prop allows you to **customize the text labels** shown in the legend under your bus seating layout.  
It works together with `customStyles` (which handles the colors/styles of seats).

### Available Properties

- **`bookedSeatText`** → Text for seats that are already booked.
- **`bookedByFemaleSeatText`** → Text for seats booked by female passengers.
- **`bookedByMaleSeatText`** → Text for seats booked by male passengers.
- **`selectedSeatText`** → Text for seats the user has selected.
- **`availableSeatText`** → Text for seats available to everyone.
- **`availableForMaleSeatText`** → Text for seats available only to males.
- **`availableForFemaleSeatText`** → Text for seats available only to females.

---

### Example

```tsx live scope={{BusSeatSelect}}
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
            { id: "BL1", type: "seater", isBlank: true },
            { id: "BL2", type: "seater", isBlank: true },
            { id: "BL3", type: "seater", isBlank: true },
            { id: "BL4", type: "seater", isBlank: true },
          ],
        },
        {
          id: "col4",
          seats: [
            { id: "L9", type: "sleeper", isBlank: false },
            { id: "L10", type: "sleeper", isBlank: false },
          ],
        },
      ],
    },
  };

  const customStyles = [
    {
      rowGap: "10px",
      columnGap: "8px",
      seatStyles: {
        border: "1px solid #ccc",
        padding: "8px 12px",
        borderRadius: "6px",
      },
      selectedStyles: { backgroundColor: "#4caf50", color: "#fff" },
      bookedStyles: { backgroundColor: "#9e9e9e", color: "#fff" },
      maleBookedStyles: { backgroundColor: "#1565c0", color: "#fff" },
      femaleBookedStyles: { backgroundColor: "#d81b60", color: "#fff" },
    },
  ];

  const legendConfig = {
    bookedSeatText: "Booked",
    bookedByMaleSeatText: "Booked by Male",
    bookedByFemaleSeatText: "Booked by Female",
    selectedSeatText: "Your Selection",
    availableSeatText: "Available",
    availableForMaleSeatText: "Available (Males)",
    availableForFemaleSeatText: "Available (Females)",
  };

  return (
    <div
      style={{
        overflow: "auto",
      }}
    >
      <BusSeatSelect
        config={busConfig}
        bookedSeats={["A1", "B2"]}
        bookedByMaleSeats={["A2"]}
        bookedByFemaleSeats={["B3"]}
        customStyles={customStyles}
        legendConfig={legendConfig}
      />
    </div>
  );
}
```

✅ **Result:**

- The legend will clearly show what each seat color/style means.
- Fully customizable using `legendConfig` + `customStyles`.

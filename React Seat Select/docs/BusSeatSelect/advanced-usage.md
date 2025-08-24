---
id: bus-seat-advanced
title: 🚌 Advanced Usage
sidebar_label: Advanced Usage
sidebar_position: 7
---

# 🚌 Advanced Usage

Here’s a realistic **bus seat layout** example using `BusSeatSelect` with column-based configuration.  
It represents a **lower deck** layout with an **aisle** and supports different seat states.

---

## Example Layout

```tsx live scope={{BusSeatSelect}}
function BusAdvancedExample() {
  const config = [
    {
      title: "Lower Berth",
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
            { id: "L9", type: "seater", isBlank: false },
            { id: "L10", type: "seater", isBlank: false },
            { id: "L11", type: "seater", isBlank: false },
            { id: "L12", type: "seater", isBlank: false },
          ],
        },
      ],
    },
    {
      title: "Upper Berth",
      columns: [
        {
          id: "col1",
          seats: [
            { id: "U1", type: "sleeper", isBlank: false },
            { id: "U2", type: "sleeper", isBlank: false },
          ],
        },
        {
          id: "col2",
          seats: [
            { id: "U3", type: "sleeper", isBlank: false },
            { id: "U4", type: "sleeper", isBlank: false },
          ],
        },
        {
          id: "col3",
          seats: [{ id: "gap-2", type: "seater", isBlank: true }],
        },
        {
          id: "col4",
          seats: [
            { id: "U5", type: "sleeper", isBlank: false },
            { id: "U6", type: "sleeper", isBlank: false },
          ],
        },
      ],
    },
  ];

  const [selectedSeats, setSelectedSeats] = React.useState<string[]>([]);
  const bookedSeats = ["L2", "L7"];
  const bookedByMaleSeats = ["L5"];
  const bookedByFemaleSeats = ["L6"];
  const availableForMaleSeats = ["L10"];
  const availableForFemaleSeats = ["L12"];

  const handleSelect = (seat) => setSelectedSeats((prev) => [...prev, seat.id]);
  const handleUnselect = (seat) =>
    setSelectedSeats((prev) => prev.filter((s) => s !== seat.id));

  const customStyles = [
    {
      rowGap: "10px",
      columnGap: "12px",
      headerStyles: { fontSize: "16px", fontWeight: "600"},
      sectionStyle: {
        border: "1px solid white",
        padding: "4px 12px",
        borderTopLeftRadius: "22px",
        borderTopRightRadius: "22px",
      },
      seatStyles: {
        width: "40px",
        height: "40px",
        borderRadius: "6px",
        border: "1px solid #ccc",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
      availableStyles: {
        backgroundColor: "#e8f5e9",
        border: "1px solid #4caf50",
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

  const legendConfig = {
    bookedSeatText: "Booked",
    bookedByMaleSeatText: "Booked by Male",
    bookedByFemaleSeatText: "Booked by Female",
    selectedSeatText: "Your Selection",
    availableSeatText: "Available",
    availableForMaleSeatText: "Available (Males)",
    availableForFemaleSeatText: "Available (Females)",
  };

  const SectionHeader = () => {
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
          background: "#222",
          color: "#fff",
        }}
      >
        <span>Driver Section</span>
        <div style={{ fontSize: "32px" }}>☮</div>
      </div>
    );
  };

  return (
    <div>
      <BusSeatSelect
        config={config}
        bookedSeats={bookedSeats}
        bookedByMaleSeats={bookedByMaleSeats}
        bookedByFemaleSeats={bookedByFemaleSeats}
        availableForMaleSeats={availableForMaleSeats}
        availableForFemaleSeats={availableForFemaleSeats}
        onSelect={handleSelect}
        onUnselect={handleUnselect}
        customStyles={customStyles}
        maxSelectedSeats={4}
        showBookedSeatLabel={true}
        showSelectedSeatLabel={true}
        legendConfig={legendConfig}
        SectionHeader={SectionHeader}
      />
      <p style={{ marginTop: "1rem", fontSize: "14px" }}>
        🎟 <strong>Selected Seats:</strong> {selectedSeats.join(", ") || "None"}
      </p>
    </div>
  );
}
```

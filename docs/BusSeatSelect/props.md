---
id: bus-seat-select-props
title: 🚌 Props & API Reference
sidebar_label: Props & API
sidebar_position: 4
---

# 🚌 BusSeatSelect - Props & API Reference

The `BusSeatSelect` component provides a flexible and customizable way to build bus-style seat booking UIs in React.  
It supports gender-based booking, seat price mapping, and custom legends.

---

## 🔑 Props

### 1. `config` (required)  
**Type:** `BusConfig`  
**Default:** `[]`  

Defines the bus seat layout configuration.

**Example:**
```tsx
const config = [
  {
    title: "Lower Deck",
    columns: [
      {
        id: "col1",
        seats: [
          { id: "L1", type: "seater", isBlank: false },
          { id: "L2", type: "seater", isBlank: false }
        ]
      },
      {
        id: "col2",
        seats: [
          { id: "L3", type: "seater", isBlank: false },
          { id: "L4", type: "seater", isBlank: false }
        ]
      }
    ]
  }
];

<BusSeatSelect config={config} />;
```

---

### 2. `bookedSeats`  
**Type:** `string[]`  
**Default:** `[]`  

List of seats already booked and unavailable.  

```tsx
<BusSeatSelect
  config={config}
  bookedSeats={['L1', 'L3']}
/>
```

---

### 3. `bookedByFemaleSeats`  
**Type:** `string[]`  
**Default:** `[]`  

Seats booked by female passengers.  

```tsx
<BusSeatSelect
  config={config}
  bookedByFemaleSeats={['L2']}
/>
```

---

### 4. `bookedByMaleSeats`  
**Type:** `string[]`  
**Default:** `[]`  

Seats booked by male passengers.  

```tsx
<BusSeatSelect
  config={config}
  bookedByMaleSeats={['L4']}
/>
```

---

### 5. `availableForFemaleSeats`  
**Type:** `string[]`  
**Default:** `[]`  

Seats restricted for female passengers only.  

```tsx
<BusSeatSelect
  config={config}
  availableForFemaleSeats={['L5']}
/>
```

---

### 6. `availableForMaleSeats`  
**Type:** `string[]`  
**Default:** `[]`  

Seats restricted for male passengers only.  

```tsx
<BusSeatSelect
  config={config}
  availableForMaleSeats={['L6']}
/>
```

---

### 7. `onSelect`  
**Type:** `(seat: BusSeat) => void`  
**Default:** `() => {}`  

Callback when a seat is selected.  

```tsx
<BusSeatSelect
  config={config}
  onSelect={(seat) => console.log('Selected:', seat)}
/>
```

---

### 8. `onUnselect`  
**Type:** `(seat: BusSeat) => void`  
**Default:** `() => {}`  

Callback when a seat is deselected.  

```tsx
<BusSeatSelect
  config={config}
  onUnselect={(seat) => console.log('Unselected:', seat)}
/>
```

---

### 9. `maxSelectedSeats`  
**Type:** `number | null`  
**Default:** `null`  

Limits the number of seats a user can select.  

```tsx
<BusSeatSelect
  config={config}
  maxSelectedSeats={3}
/>
```

---

### 10. `customStyles`  
**Type:** `BusSeatSelectCustomStyles`  
**Default:** `[]`  

Customize bus seat UI (gaps, colors, borders, etc.).  

```tsx
const customStyles = [
  {
    rowGap: "10px",
    columnGap: "8px",
    seatStyles: { borderRadius: "6px" },
    bookedStyles: { backgroundColor: "gray" },
    selectedStyles: { backgroundColor: "green" }
  }
];

<BusSeatSelect
  config={config}
  customStyles={customStyles}
/>
```

### 11. `customSectionWrapperStyle`
**Type:** `React.CSSProperties`
**Default:** `{}`

Customize the wrapper around each section, such as spacing, alignment, or container styling.

```tsx
<BusSeatSelect
  config={config}
  customSectionWrapperStyle={{
    gap: "60px", // adds spacing between seat sections
    backgroundColor: "#f9f9f9",
    padding: "20px"
  }}
/>
```

### 12. `SectionHeader`

**Type:** `() => JSX.Element`
**Default:** `undefined`

Render a custom header above each section. Useful for adding labels, icons, or styled titles.

```tsx
<BusSeatSelect
  config={config}
  SectionHeader={() => (
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
        color: "#fff"
      }}
    >
      <span>Driver Section</span>
      <div style={{ fontSize: "32px" }}>☮</div>
    </div>
  )}
/>
```

---

### 13. `showBookedSeatLabel`  
**Type:** `boolean`  
**Default:** `false`  

Whether to display seat labels for booked seats.  

---

### 14. `showSelectedSeatLabel`  
**Type:** `boolean`  
**Default:** `false`  

Whether to display labels for selected seats.  

---

### 15. `seatPriceMap`  
**Type:** `Record<string, number>`  
**Default:** `{}`  

Maps seat IDs to their prices.  

```tsx
<BusSeatSelect
  config={config}
  seatPriceMap={{ L1: 500, L2: 600 }}
/>
```

---

### 16. `CustomLegendComponent`  
**Type:** `React.ComponentType`  
**Default:** `undefined`  

Custom component for legends.  

```tsx
const MyLegend = () => (
  <div>Legend: 🟢 Available 🔴 Booked 👩 Female 👨 Male</div>
);

<BusSeatSelect
  config={config}
  CustomLegendComponent={MyLegend}
/>
```

---

### 17. `showDefaultLegend`  
**Type:** `boolean`  
**Default:** `true`  

Show/hide the default legend.  

---

### 18. `legendConfig`  
**Type:**  

```ts
{
  bookedSeatText?: string;
  bookedByFemaleSeatText?: string;
  bookedByMaleSeatText?: string;
  selectedSeatText?: string;
  availableSeatText?: string;
  availableForMaleSeatText?: string;
  availableForFemaleSeatText?: string;
}
```

**Default:**  

```ts
{
  bookedSeatText: "Booked",
  bookedByFemaleSeatText: "Booked (Female)",
  bookedByMaleSeatText: "Booked (Male)",
  selectedSeatText: "Selected",
  availableSeatText: "Available",
  availableForMaleSeatText: "Available (Male Only)",
  availableForFemaleSeatText: "Available (Female Only)"
}
```

**Example:**  
```tsx
<BusSeatSelect
  config={config}
  legendConfig={{
    bookedSeatText: "Reserved",
    availableForFemaleSeatText: "Ladies Only"
  }}
/>
```
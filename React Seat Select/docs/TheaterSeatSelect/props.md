---
id: theater-seat-select-props
title: 📖 Props & API Reference
sidebar_label: Props & API
sidebar_position: 4
---

# 📖 Props & API Reference

The `TheaterSeatSelect` component exposes a number of props to customize seat layouts, styles, interactivity, and screen/legend rendering.

---

## 🔑 Props

### 1. `config` (required)
**Type:** `SeatConfig`  

Defines the seat map structure. It’s an array of **sections**, where each section contains rows, and each row contains `Seat` objects.

- Each seat needs a unique `id`.
- Use `label` for display purposes (text shown on the seat).
- Use `isBlank: true` to create spacing inside a row.
- Group seats by sections (VIP, Balcony, etc.) for readability.

**Example:**
```tsx
const config = [
  {
    title: "Balcony",
    seats: {
      A: [{ id: "A1", label: "A1" }, { id: "A2", label: "A2" }],
      B: [{ id: "B1", label: "B1" }, { id: "B2", label: "B2" }]
    }
  }
];

<TheaterSeatSelect config={config} />;
```

## 2. `bookedSeats`

**Type:** `string[]`  
**Default:** `[]`

List of seat IDs that are already booked. Booked seats are shown in the booked style and cannot be interacted with.

**Example:**
```tsx
<TheaterSeatSelect
  config={config}
  bookedSeats={["A1", "B2"]}
/>
```

### 3. `disabledSeats`

**Type:** `string[]`  
**Default:** `[]`

A list of seat IDs that are **disabled** (e.g., broken, blocked for safety, or reserved for technical reasons). These seats are visually distinct and cannot be selected by users.

**Example:**

```tsx
<TheaterSeatSelect
  config={config}
  disabledSeats={["B1"]}
/>
```

### 4. `reservedSeats`

**Type:** `string[]`  
**Default:** `[]`

A list of seat IDs that are **reserved** (i.e., special kind of booked seats). These seats are **unselectable** but appear visually distinct from booked or available ones.

**Example:**

```tsx
<TheaterSeatSelect
  config={config}
  reservedSeats={["A2"]}
/>
```

### 5. `onSelect`

**Type:** `(seat: Seat) => void`  
**Default:** `() => {}`

Callback function triggered when a user **selects a seat**. The function receives the full `Seat` object, allowing you to update state, display selected seats, or calculate pricing.

**Example:**

```tsx
<TheaterSeatSelect
  config={config}
  onSelect={(seat) => console.log("Seat selected:", seat)}
/>
```

### 6. `onUnselect`

**Type:** `(seat: Seat) => void`  
**Default:** `() => {}`

A callback function that fires when a user **unselects a seat**. This is helpful for updating the UI or internal state, such as removing the seat from a cart or selection list.

**Example:**

```tsx
<TheaterSeatSelect
  config={config}
  onUnselect={(seat) => console.log("Seat unselected:", seat)}
/>
```

### 7. `showRowNumbers`

**Type:** `boolean`  
**Default:** `true`

Controls whether **row labels** (like A, B, C, etc.) are displayed on the left side of each section. Disabling this can give a cleaner look if row labels are not needed.

**Example:**

```tsx
<TheaterSeatSelect
  config={config}
  showRowNumbers={false}
/>
```

### 8. `maxSelectedSeats`

**Type:** `number | null`  
**Default:** `null`

Limits the maximum number of seats a user can select.

```tsx
<TheaterSeatSelect
  config={config}
  maxSelectedSeats={4}
/>
```

### 9. `autoSeatExpansion`

**Type:** `boolean`  
**Default:** `true`

Automatically selects adjacent seats when a user selects one, up to the `maxSelectedSeats` limit.

```tsx
<TheaterSeatSelect
  config={config}
  maxSelectedSeats={3}
  autoSeatExpansion={true}
/>
```

### 10. `customStyles`

**Type:** `CustomStyles` (array of `SectionStyle`)  
**Default:** `[]`

Customizes layout and appearance of seats and sections.

```tsx
const customStyles = [
  {
    rowGap: "12px",
    columnGap: "8px",
    seatStyles: { borderRadius: "6px" },
    bookedStyles: { backgroundColor: "red" },
    selectedStyles: { backgroundColor: "green" }
  }
];

<TheaterSeatSelect
  config={config}
  customStyles={customStyles}
/>
```

### 11. `showBookedSeatLabel`, `showDisabledSeatLabel`, `showReservedSeatLabel`, `showBlankSeatLabel`, `showSelectedSeatLabel`

**Type:** `boolean`  
**Defaults:**  
- `showBookedSeatLabel`: `false`  
- `showDisabledSeatLabel`: `false`  
- `showReservedSeatLabel`: `false`  
- `showBlankSeatLabel`: `false`  
- `showSelectedSeatLabel`: `true`

Control visibility of seat label text for different seat states.

```tsx
<TheaterSeatSelect
  config={config}
  showBookedSeatLabel={true}
  showReservedSeatLabel={true}
/>
```

### 12. `showDefaultScreen`

**Type:** `boolean`  
**Default:** `true`

Show or hide the built-in theater screen SVG above the seats.

```tsx
<TheaterSeatSelect
  config={config}
  showDefaultScreen={false}
/>
```

### 13. `screenConfig`

**Type:**

```ts
{
  screenVariant: number;
  width: number;
  color?: string;
  screenText?: string;
}
```

**Default:**

```ts
{
  screenVariant: 3,
  width: 600,
  color: "#fff",
  screenText: "SCREEN"
}
```

```tsx
<TheaterSeatSelect
  config={config}
  screenConfig={{
    screenVariant: 2,
    width: 500,
    color: "#ccc",
    screenText: "IMAX SCREEN"
  }}
/>
```

**Example:**

```tsx
<TheaterSeatSelect
  config={config}
  screenConfig={{
    screenVariant: 2,
    width: 500,
    color: "#ccc",
    screenText: "IMAX SCREEN"
  }}
/>
```

### 14. `CustomScreenComponent`

**Type:** `React.ComponentType`  
**Default:** `undefined`

**Example:**

```tsx
const MyScreen = () => <div style={{ textAlign: "center" }}>🎥 Custom Screen</div>;

<TheaterSeatSelect
  config={config}
  CustomScreenComponent={MyScreen}
/>
```

### 15. `CustomLegendComponent`

**Type:** `React.ComponentType`  
**Default:** `undefined`

**Example:**

```tsx
const MyLegend = () => <div>Legend: 🟢 Available 🔴 Booked</div>;

<TheaterSeatSelect
  config={config}
  CustomLegendComponent={MyLegend}
/>
```

### 16. `showDefaultLegend`

**Type:** `boolean`  
**Default:** `true`

**Example:**

```tsx
<TheaterSeatSelect
  config={config}
  showDefaultLegend={false}
/>
```

### 17. `legendConfig`

**Type:**

```ts
{
  bookedSeatText?: string;
  selectedSeatText?: string;
  reservedSeatText?: string;
  disabledSeatText?: string;
  availableSeatText?: string;
}
```
**Default:**

```ts
{
  bookedSeatText: "Booked",
  selectedSeatText: "Selected",
  reservedSeatText: "Reserved",
  disabledSeatText: "Disabled",
  availableSeatText: "Available"
}
```

**Example:**

```tsx
<TheaterSeatSelect
  config={config}
  legendConfig={{
    bookedSeatText: "Sold",
    availableSeatText: "Open Seat"
  }}
/>
```






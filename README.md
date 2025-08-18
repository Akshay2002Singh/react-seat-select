# react-seat-select

`react-seat-select` is a customizable React component for seat selection in theatres, cinemas, and bus booking applications.  
It allows developers to easily configure seat layouts, customize styles, and control selection logic with simple props.

- **Currently available components** (support for more may be added in the future):  
  1. [TheaterSeatSelect](#theaterseatselect)  
  2. [BusSeatSelect](#busseatselect)  
 


## TheaterSeatSelect

**TheaterSeatSelect** is a fully customizable and interactive **theater-style seat selection** React component.  

---

## ✨ Features

- 🎨 **Highly Customizable** — adjust seat size, colors, spacing, and labels.
- 🎯 **Single & Multiple Seat Selection** — with optional auto-selection of adjacent seats.
- 🚫 Handles **Booked, Reserved, Disabled** states.
- 🖥 Built-in **Default Screen & Legend** (or bring your own).
- 📐 Flexible row/column gaps and labels.
- 🧩 Works with **custom layouts**.
- ⚡ Lightweight & Fast — powered by React hooks.

---

## 📦 Installation

```bash
npm install react-seat-select
# or
yarn add react-seat-select
```

## ⚙️ Props Documentation

| Prop                    | Type | Default | Description |
| ----------------------- | ---- | ------- | ----------- |
| `config` | `SeatConfig[]` | `[]` | Seat layout configuration (see below). |
| `bookedSeats` | `string[]` | `[]` | Array of seat IDs that are already booked. |
| `reservedSeats` | `string[]` | `[]` | Array of seat IDs that are reserved. |
| `disabledSeats` | `string[]` | `[]` | Array of seat IDs that are disabled/unavailable. |
| `onSelect` | `(seat: Seat) => void` | `() => {}` | Callback when a seat is selected. |
| `onUnselect` | `(seat: Seat) => void` | `() => {}` | Callback when a seat is unselected. |
| `maxSelectedSeats` | `number` | `null` | Maximum number of selectable seats. |
| `autoSeatExpansion` | `boolean` | `true` | Auto-selects adjacent seats until reaching `maxSelectedSeats`. |
| `showRowNumbers` | `boolean` | `true` | Whether to display row labels (A, B, C...). |
| `customStyles` | `CustomStyles[]` | `[]` | Array of style objects to override seat appearance. |
| `showBookedSeatLabel` | `boolean` | `false` | Show label text on booked seats. |
| `showReservedSeatLabel` | `boolean` | `false` | Show label text on reserved seats. |
| `showDisabledSeatLabel` | `boolean` | `false` | Show label text on disabled seats. |
| `showBlankSeatLabel` | `boolean` | `false` | Show label text for blank spaces. |
| `showSelectedSeatLabel` | `boolean` | `true` | Show label text on selected seats. |
| `showDefaultScreen` | `boolean` | `true` | Whether to render default screen SVG. |
| `screenConfig` | `{ screenVariant: number, width: number, color: string }` | `{ screenVariant: 3, width: 600, color: "#fff" }` | Config for built-in screen. |
| `CustomScreenComponent` | `React.ComponentType` | `undefined` | Your own screen component. |
| `CustomLegendComponent` | `React.ComponentType` | `undefined` | Your own legend component. |
| `showDefaultLegend` | `boolean` | `true` | Whether to show built-in legend. |
| `legendConfig` | `{ bookedSeatText: string, selectedSeatText: string, reservedSeatText: string, disabledSeatText: string, availableSeatText: string }` | `{ bookedSeatText, selectedSeatText, reservedSeatText, disabledSeatText, availableSeatText }` | Customize legend text. |


## 🚀 Basic Usage

```jsx
import React from "react";
import { TheaterSeatSelect } from "theater-seat-select";
import "theater-seat-select/dist/styles.css";

const seatConfig = [
  {
    title: "Section A",
    seats: {
      A: [{ id: "A1", label: "1" }, { id: "A2", label: "2" }],
      B: [{ id: "B1", label: "1" }, { id: "B2", label: "2" }],
    },
  },
];

export default function App() {
  return (
    <TheaterSeatSelect
      config={seatConfig}
      bookedSeats={["A1"]}
      reservedSeats={["B2"]}
      onSelect={(seat) => console.log("Selected:", seat)}
      onUnselect={(seat) => console.log("Unselected:", seat)}
      maxSelectedSeats={2}
      autoSeatExpansion={true}
    />
  );
}
```

## 🛠 SeatConfig Structure

```ts
export type Seat = {
  id: string;
  isBlank?: boolean;
  label?: string;
};

export type SeatRow = Seat[];

export type SeatMap = Partial<Record<string, SeatRow>>;

export type SeatSection = {
  title?: string;
  seats: SeatMap;
};

export type SeatConfig = SeatSection[];

export type SectionStyle = {
  rowGap?: string;
  columnGap?: string;
  headerStyles?: React.CSSProperties;
  seatStyles?: React.CSSProperties;
  availableStyles?: React.CSSProperties;
  bookedStyles?: React.CSSProperties;
  disabledStyles?: React.CSSProperties;
  reservedStyles?: React.CSSProperties;
  selectedStyles?: React.CSSProperties;
};

export type CustomStyles = SectionStyle[];

export type screenConfig = {
  screenVariant: number;
  width: number;
  color?: string;
  screenText?: string;
};

```

## 🛠 Example


```ts
const config = [
  {
    title: "VIP Section",
    seats: {
      A: [
        { id: "A1", label: "1" },
        { id: "A2", label: "2" },
      ],
      B: [
        { id: "B1", label: "1" },
        { id: "B2", label: "2" },
      ],
    },
  },
];
```

## 🎨 Custom Styles Example

```ts
const customStyles = [
  {
    seatStyles: { width: "40px", height: "40px", borderRadius: "6px" },
    availableStyles: { backgroundColor: "#4CAF50" },
    bookedStyles: { backgroundColor: "#F44336" },
    reservedStyles: { backgroundColor: "#FF9800" },
    selectedStyles: { backgroundColor: "#2196F3" },
    disabledStyles: { backgroundColor: "#9E9E9E" },
  },
];
```

## 🖥 Screens & Legends

### Default Screen

Rendered using built-in SVG via:
```ts
getScreenSVG(screenConfig);
```

### Custom Screen
```tsx
<TheaterSeatSelect CustomScreenComponent={() => <div>🎬 Custom Screen</div>} />
```

### Default Legend

Shows a color-coded seat status legend.

### Custom Legend

```tsx
<TheaterSeatSelect CustomLegendComponent={() => <div>Legend here</div>} />
```

## 📌 Advanced Features

### Auto Seat Expansion
If `autoSeatExpansion` is `true`, selecting one seat will try to select adjacent seats in the **right direction** first, then **left** if unavailable — until reaching `maxSelectedSeats`.

### Dynamic Layouts
`config` can be generated dynamically for varying seat patterns.

### Conditional Styling
Pass multiple objects in `customStyles` to apply different styles per section or row.



## BusSeatSelect

The **`BusSeatSelect`** component renders an interactive bus seat selection UI with customizable seat layouts, booking states, legends, and styles.  
It supports different availability types (male-only, female-only, general), booked seats, custom legends, and seat pricing.


## 📌 Usage

```jsx
import React from "react";
import BusSeatSelect from "./BusSeatSelect";

const busConfig = {
  section1: {
    title: "Lower Deck",
    columns: [
      {
        id: "col1",
        seats: [
          { id: "1A", type: "seater" },
          { id: "1B", type: "seater" },
        ],
      },
      {
        id: "col2",
        seats: [
          { id: "2A", type: "sleeper" },
          { id: "2B", type: "sleeper" },
        ],
      },
    ],
  },
};

export default function App() {
  return (
    <BusSeatSelect
      config={busConfig}
      bookedSeats={["1A"]}
      availableForFemaleSeats={["1B"]}
      seatPriceMap={{
        "1A": 500,
        "1B": 600,
      }}
      legendConfig={{
        availableSeatText: "Available",
        bookedSeatText: "Booked",
        availableForFemaleSeatText: "Female Only",
        selectedSeatText: "Selected",
      }}
      onSelect={(seat) => console.log("Selected:", seat)}
      onUnselect={(seat) => console.log("Unselected:", seat)}
    />
  );
}
```

| Prop                      | Type                                                                                                                                                                 | Default     | Description                                                          |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | -------------------------------------------------------------------- |
| `config`                  | `BusConfig`                                                                                                                                                          | `{}`        | Bus seat layout configuration.                                       |
| `bookedSeats`             | `string[]`                                                                                                                                                           | `[]`        | List of seat IDs that are fully booked.                              |
| `bookedByFemaleSeats`     | `string[]`                                                                                                                                                           | `[]`        | List of seat IDs booked by female passengers.                        |
| `bookedByMaleSeats`       | `string[]`                                                                                                                                                           | `[]`        | List of seat IDs booked by male passengers.                          |
| `availableForFemaleSeats` | `string[]`                                                                                                                                                           | `[]`        | Seats available only for female passengers.                          |
| `availableForMaleSeats`   | `string[]`                                                                                                                                                           | `[]`        | Seats available only for male passengers.                            |
| `onSelect`                | `(seat: Seat) => void`                                                                                                                                               | `() => {}`  | Callback when a seat is selected.                                    |
| `onUnselect`              | `(seat: Seat) => void`                                                                                                                                               | `() => {}`  | Callback when a seat is unselected.                                  |
| `maxSelectedSeats`        | `number \| null`                                                                                                                                                     | `null`      | Maximum number of seats allowed to be selected.                      |
| `customStyles`            | `CustomStyles[]`                                                                                                                                                     | `[]`        | Array of style objects for customizing seats, headers, legends, etc. |
| `showBookedSeatLabel`     | `boolean`                                                                                                                                                            | `false`     | Whether to show seat ID on booked seats.                             |
| `showSelectedSeatLabel`   | `boolean`                                                                                                                                                            | `false`     | Whether to show seat ID on selected seats.                           |
| `CustomLegendComponent`   | `React.ComponentType`                                                                                                                                                | `undefined` | Custom React component for rendering legend.                         |
| `showDefaultLegend`       | `boolean`                                                                                                                                                            | `true`      | Whether to render the default legend.                                |
| `seatPriceMap`            | `Record<string, number>`                                                                                                                                             | `{}`        | Map of seat IDs to prices.                                           |
| `legendConfig`            | `{ availableSeatText?, bookedSeatText?, bookedByFemaleSeatText?, bookedByMaleSeatText?, selectedSeatText?, availableForMaleSeatText?, availableForFemaleSeatText? }` | `{}`        | Text labels for legend items.      

## 🛠 BusConfig Structure
```ts
export type SeatType = "sleeper" | "seater";

export interface Seat {
  id: string;
  type: SeatType;
  isBlank: boolean;
}

export interface Column {
    id: string;
  seats: Seat[];
}

export interface Section {
    title?: string;
  columns: Column[];
}

export type BusConfig = Record<string, Section>;

export type SectionStyle = {
  rowGap?: string;
  columnGap?: string;
  headerStyles?: React.CSSProperties;
  seatStyles?: React.CSSProperties;
  availableStyles?: React.CSSProperties;
  availableForMaleStyles?: React.CSSProperties;
  availableForFemaleStyles?: React.CSSProperties;
  bookedStyles?: React.CSSProperties;
  bookedByMaleStyles?: React.CSSProperties;
  bookedByFemaleStyles?: React.CSSProperties;
  selectedStyles?: React.CSSProperties;
  seatPriceStyles?: React.CSSProperties;
};

export type CustomStyles = SectionStyle[];
```

## 🎨 Custom Styles

```ts
type CustomStyles = {
  rowGap?: string;
  columnGap?: string;
  headerStyles?: React.CSSProperties;
  seatStyles?: React.CSSProperties;
  availableStyles?: React.CSSProperties;
  availableForMaleStyles?: React.CSSProperties;
  availableForFemaleStyles?: React.CSSProperties;
  bookedStyles?: React.CSSProperties;
  bookedByMaleStyles?: React.CSSProperties;
  bookedByFemaleStyles?: React.CSSProperties;
  selectedStyles?: React.CSSProperties;
  seatPriceStyles?: React.CSSProperties;
};

## Example

const customStyles = [
  {
    seatStyles: { width: "40px", height: "40px", borderRadius: "4px" },
    availableStyles: { backgroundColor: "#4CAF50" },
    bookedStyles: { backgroundColor: "#F44336" },
    selectedStyles: { backgroundColor: "#2196F3" },
  },
];
```

## 🖥 Legend

### Default Legend
Renders seat statuses with colors from `customStyles`.

Controlled via `legendConfig`.

---

### Custom Legend
```jsx
<BusSeatSelect CustomLegendComponent={() => <div>My Custom Legend</div>} />
```



## 📌 Features

- **Multiple booking types**: general booked, male-only, female-only  
- **Seat pricing support** with `seatPriceMap`  
- **Customizable legend** with text & styles  
- **Custom styling per section** via `customStyles[]`  
- **Click handling** with `onSelect` & `onUnselect`  
- **Configurable max selection** with `maxSelectedSeats`  
- **Support for blank seats** (spacing layout)  
                                 |


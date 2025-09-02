# [`react-seat-select`](https://akshay2002singh.github.io/react-seat-select/docs/intro)

`react-seat-select` is a comprehensive React component library for building customizable seat selection UIs. It includes components for a wide range of applications, including theaters, cinemas, and buses. The library provides both interactive seat selection components (`*SeatSelect`) and visual layout design tools (`*LayoutDesigner`).

- **Currently available components** :  
  1. [TheaterSeatSelect](https://akshay2002singh.github.io/react-seat-select/docs/category/theater-seat-select) 
  2. [TheaterSeatLayoutDesigner](https://akshay2002singh.github.io/react-seat-select/docs/category/theater-layout-designer) 
  3. [BusSeatSelect](https://akshay2002singh.github.io/react-seat-select/docs/category/bus-seat-select)
  4. [BusSeatLayoutDesigner](https://akshay2002singh.github.io/react-seat-select/docs/category/bus-layout-designer)

---

## [Documentation](https://akshay2002singh.github.io/react-seat-select/docs/intro)

For a complete guide, including all props and advanced usage, refer to the [TheaterSeatSelect Docs](https://akshay2002singh.github.io/react-seat-select/docs/intro).

---

## 📦 Installation

```bash
npm install react-seat-select
# or
yarn add react-seat-select
```

---

## [`TheaterSeatSelect`](https://akshay2002singh.github.io/react-seat-select/docs/category/theater-seat-select)

The `TheaterSeatSelect` component is a highly customizable, interactive tool for seat selection in a theater or cinema setting. It supports various seat states (e.g., booked, reserved) and allows for both single and multiple seat selection.

* **Documentation**: For a complete guide, refer to the [TheaterSeatSelect Docs](https://akshay2002singh.github.io/react-seat-select/docs/category/theater-seat-select).
* **Basic Usage**:

```jsx
import React from "react";
import { TheaterSeatSelect } from "react-seat-select";

const seatConfig = [
  {
    title: "VIP Section",
    seats: {
      A: [
            { id: "A1", label: "1" }, 
            { id: "A2", label: "2" }
        ],
    },
  },
];

export default function App() {
  return (
    <TheaterSeatSelect
      config={seatConfig}
      bookedSeats={["A1"]}
      onSelect={(seat) => console.log("Selected:", seat)}
      maxSelectedSeats={2}
    />
  );
}
```

## [`TheaterSeatLayoutDesigner`](https://akshay2002singh.github.io/react-seat-select/docs/category/theater-layout-designer)

The `TheaterSeatLayoutDesigner` component is a visual tool that allows developers and admins to easily create and export custom theater seat layouts.

* **Documentation**: Find out how to use this designer in the [TheaterSeatLayoutDesigner Docs](https://akshay2002singh.github.io/react-seat-select/docs/category/theater-layout-designer).
* **Basic Usage**:

```jsx
import { TheaterSeatLayoutDesigner } from "react-seat-select";

function Example() {
  return <TheaterSeatLayoutDesigner />;
}
```

---


## [`BusSeatSelect`](https://akshay2002singh.github.io/react-seat-select/docs/category/bus-seat-select)

The `BusSeatSelect` component is designed to handle the unique complexities of bus seat booking, including support for sleeper vs. seater types, gender-specific bookings (male-only, female-only), and seat pricing.

* **Documentation**: For a detailed reference on props and advanced features, visit the [BusSeatSelect Docs](https://akshay2002singh.github.io/react-seat-select/docs/category/bus-seat-select).
* **Basic Usage**:

```jsx
import React from "react";
import { BusSeatSelect } from "react-seat-select";

const busConfig = {
  section1: {
    title: "Lower Deck",
    columns: [
      { id: "col1", seats: [{ id: "1A", type: "seater" }] },
    ],
  },
};

export default function App() {
  return (
    <BusSeatSelect
      config={busConfig}
      bookedSeats={["1A"]}
      onSelect={(seat) => console.log("Selected:", seat)}
    />
  );
}
```

## [`BusSeatLayoutDesigner`](https://akshay2002singh.github.io/react-seat-select/docs/category/bus-layout-designer)

The `BusSeatLayoutDesigner` component is a visual editor for creating and exporting bus seat layouts, supporting both sleeper and seater configurations.

* **Documentation**: Learn how to use this tool in the [BusSeatLayoutDesigner Docs](https://akshay2002singh.github.io/react-seat-select/docs/category/bus-layout-designer).
* **Basic Usage**:

```jsx
import { BusSeatLayoutDesigner } from "react-seat-select";

function Example() {
  return (
    <div style={{ overflow: "auto" }}>
      <BusSeatLayoutDesigner />
    </div>
  );
}
```

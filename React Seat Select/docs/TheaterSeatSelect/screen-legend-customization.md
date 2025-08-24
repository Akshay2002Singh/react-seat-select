---
id: screen-legend-customization
title: 🖥️ Screen & Legend Customization
sidebar_label: Screen & Legend Customization
sidebar_position: 6
---

# 🖥️ Screen & Legend Customization

The `TheaterSeatSelect` component supports **screen rendering** (to indicate where the screen/stage is) and **legend configuration** (to help users understand seat states).

---

## 🎬 Screen Configuration

The `screenConfig` prop allows you to define how the **screen** is displayed.

### Type Definition

```ts
export type screenConfig = {
  screenVariant: number; // Which screen design to render
  width: number;         // Width of the screen in px or %
  color?: string;        // Background color of the screen
  screenText?: string;   // Label displayed on the screen
};
```

### Example

```tsx live scope={{TheaterSeatSelect}}
function Example() {
const cinemaConfig = [
  {
    title: "Section A",
    seats: {
      A: [
        { id: "A1", label: "A1" },
        { id: "A2", label: "A2" },
        { id: "A3", label: "A3" }
      ],
      B: [
        { id: "B1", label: "B1" },
        { id: "B2", label: "B2" },
        { id: "B3", label: "B3" }
      ]
    }
  }
];

const screenConfig = {
  screenVariant: 4,
  width: 250,
  color: "#000",
  screenText: "CINEMA SCREEN"
};


const cinemaStyles = [
  {
    rowGap: "10px",
    columnGap: "8px",
    seatStyles: { border: "1px solid #ccc", padding: "8px 12px", borderRadius: "4px" },
    selectedStyles: { backgroundColor: "#0097a7", color: "#fff" },
    bookedStyles: { backgroundColor: "#9e9e9e", color: "#fff" }
  }
];

return <TheaterSeatSelect
  config={cinemaConfig}
  customStyles={cinemaStyles}
  screenConfig={screenConfig}
/>
}
```


✅ **Result:**

- A black bar at the top with **"CINEMA SCREEN"** text.  
- Can be placed at the **top or bottom** depending on requirement.  
- Fully styleable with **CSS**.  

##  🎬  Custom Screen

### Example – Custom Screen

You can override the default rendering by passing a CustomScreenComponent prop (function that returns JSX).

```tsx live scope={{TheaterSeatSelect}}
function Example() {
  const cinemaConfig = [
    {
      title: "Premium IMAX",
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
    }
  ];

  const cinemaStyles = [
    {
      rowGap: "12px",
      columnGap: "10px",
      seatStyles: { 
        border: "1px solid #ccc", 
        padding: "10px 14px", 
        borderRadius: "6px",
        fontSize: "14px" 
      },
      selectedStyles: { backgroundColor: "#1565c0", color: "#fff" },
      bookedStyles: { backgroundColor: "#9e9e9e", color: "#fff" }
    }
  ];

const CustomScreenComponent = () => {
  return (
    <div style={{ textAlign: "center", margin: "20px 0" }}>
      <div
        style={{
          background: "linear-gradient(to right, #000, #333, #000)",
          color: "white",
          fontWeight: "bold",
          padding: "10px",
          borderRadius: "50% / 20%", // creates a curved "screen" effect
          maxWidth: "400px",
          margin: "0 auto",
          boxShadow: "0px -2px 10px rgba(0,0,0,0.6)",
        }}
      >
        🎥 CINEMA SCREEN
      </div>
    </div>
  );
};

  return (
    <TheaterSeatSelect
      config={cinemaConfig}
      customStyles={cinemaStyles}
      CustomScreenComponent={CustomScreenComponent}
    />
  );
}
```

✅ This replaces the default screen with a custom gradient IMAX-style screen bar.

---

## 🎨 Legend Configuration

The `legendConfig` prop allows you to **customize the text labels** shown in the legend under your seating layout.  
It works together with `customStyles` (which handles the colors/styles of seats).

### Available Properties
- **`bookedSeatText`** → Text for seats that are already booked.  
- **`selectedSeatText`** → Text for seats that the user has selected.  
- **`reservedSeatText`** → Text for seats that are reserved but not selectable.  
- **`disabledSeatText`** → Text for seats that are disabled (e.g. maintenance/wheelchair space).  
- **`availableSeatText`** → Text for seats that are available to select.  

---

### Example

```tsx live scope={{TheaterSeatSelect}}
function Example() {
  const cinemaConfig = [
    {
      title: "Platinum",
      seats: {
        A: [
          { id: "A1", label: "A1" },
          { id: "A2", label: "A2" },
          { id: "A3", label: "A3" }
        ],
        B: [
          { id: "B1", label: "B1" },
          { id: "B2", label: "B2" },
          { id: "B3", label: "B3" }
        ]
      }
    }
  ];

  const cinemaStyles = [
    {
      rowGap: "10px",
      columnGap: "8px",
      seatStyles: { border: "1px solid #ccc", padding: "8px 12px", borderRadius: "6px" },
      selectedStyles: { backgroundColor: "#4caf50", color: "#fff" },
      bookedStyles: { backgroundColor: "#9e9e9e", color: "#fff" },
      reservedStyles: { backgroundColor: "#ff9800", color: "#fff" },
      disabledStyles: { backgroundColor: "#e0e0e0", border: "1px dashed #999" }
    }
  ];

  const legendConfig = {
    bookedSeatText: "Booked",
    selectedSeatText: "Your Selection",
    reservedSeatText: "Reserved (VIP)",
    disabledSeatText: "Not Available",
    availableSeatText: "Available"
  };

  return (
    <TheaterSeatSelect
      config={cinemaConfig}
      bookedSeats={["A1","A2"]}
      reservedSeats={["B1"]}
      customStyles={cinemaStyles}
      legendConfig={legendConfig}
    />
  );
}
```

### Custom Legend

If you need full control, you can pass a customLegend function.

**Example:**

```tsx live scope={{TheaterSeatSelect}}
function Example() {

const cinemaConfig = [
  {
    title: "Section A",
    seats: {
      A: [
        { id: "A1", label: "A1" },
        { id: "A2", label: "A2" },
        { id: "A3", label: "A3" }
      ],
      B: [
        { id: "B1", label: "B1" },
        { id: "B2", label: "B2" },
        { id: "B3", label: "B3" }
      ]
    }
  }
];

const cinemaStyles = [
  {
    seatStyles: { border: "1px solid #ccc", padding: "8px 12px", borderRadius: "4px" },
    selectedStyles: { backgroundColor: "#0097a7", color: "#fff" },
    bookedStyles: { backgroundColor: "#9e9e9e", color: "#fff" }
  }
];

const legendItems = [
  { label: "Available", style: { backgroundColor: "#e0f7fa", border: "1px solid #0097a7", width: "20px", height: "20px" } },
  { label: "Selected", style: { backgroundColor: "#0097a7", color: "#fff", width: "20px", height: "20px" } },
  { label: "Booked", style: { backgroundColor: "#9e9e9e", width: "20px", height: "20px" } },
  { label: "Disabled", style: { backgroundColor: "#eeeeee", color: "#aaa", width: "20px", height: "20px" } }
];

function Legend() {
  return (
    <div style={{ display: "flex", gap: "16px", marginTop: "20px" }}>
      {legendItems.map((item, index) => (
        <div key={index} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <div style={item.style}></div>
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
}

 return <TheaterSeatSelect config={cinemaConfig} customStyles={cinemaStyles} CustomLegendComponent={Legend}/>
}
```
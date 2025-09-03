---
id: theater-seat-layout-designer-props
title: 🎭 Props & API Reference
sidebar_label: Props & API
sidebar_position: 2
---

# ⚙️ Props & API

The **TheaterSeatLayoutDesigner** component exposes the following props:

### 1. `config`

- **Required:** `False`  
- **Type:** `SeatConfig`  
- **Default:** `[]`   

The current seating layout configuration. Pass your own configuration or let the component initialize with a default section.  

The **SeatConfig** is an array of sections, where each section contains rows and seats.

```tsx
type Seat = {
  id: string;
  isBlank?: boolean;
  label?: string;
};

type SeatRow = Seat[];

type SeatMap = Partial<Record<string, SeatRow>>;

type SeatSection = {
  title?: string;
  seats: SeatMap;
};

type SeatConfig = SeatSection[];
```

### 2. `onChange`

- **Required:** `False`  
- **Type:** `(config: BusConfig) => void`  
- **Default:** `undefined`  

Callback fired whenever the seating configuration changes. Use this to sync the state with your app or backend.  

### 3. `customStyles`

- **Required:** `False`  
- **Type:** `CustomStyles`  
- **Default:** `{}`  

An object to override the default styles of the component.  

```ts
interface CustomStyles {
  wrapper?: React.CSSProperties;
  sectionBox?: React.CSSProperties;
  sectionHeader?: React.CSSProperties;
  controlsBox?: React.CSSProperties;
  controlButton?: React.CSSProperties;
  deleteSectionBtn?: React.CSSProperties;
  seatGrid?: React.CSSProperties;
  row?: React.CSSProperties;
  rowLabel?: React.CSSProperties;
  seatGroup?: React.CSSProperties;
  seat?: React.CSSProperties;
  blankSeat?: React.CSSProperties;
  selectedSeat?: React.CSSProperties;
  inspectorBox?: React.CSSProperties;
  inspectorPlaceholder?: React.CSSProperties;
  inspectorHeader?: React.CSSProperties;
  inspectorLabel?: React.CSSProperties;
  inspectorInput?: React.CSSProperties;
  inspectorErrorMsg?: React.CSSProperties;
}
```


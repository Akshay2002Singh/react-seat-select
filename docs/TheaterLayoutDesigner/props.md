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
- **Type:** `TheaterSeatConfig`  
- **Default:** `[]`   

The current seating layout configuration. Pass your own configuration or let the component initialize with a default section.  

The **Config** is an array of sections, where each section contains rows and seats.

```tsx
type TheaterSeat = {
  id: string;
  isBlank?: boolean;
  label?: string;
};

type TheaterSeatRow = TheaterSeat[];

type TheaterSeatMap = Partial<Record<string, TheaterSeatRow>>;

type TheaterSeatSection = {
  title?: string;
  seats: TheaterSeatMap;
};

type TheaterSeatConfig = TheaterSeatSection[];
```

### 2. `onChange`

- **Required:** `False`  
- **Type:** `(config: TheaterSeatConfig) => void`  
- **Default:** `undefined`  

Callback fired whenever the seating configuration changes. Use this to sync the state with your app or backend.  

### 3. `customStyles`

- **Required:** `False`  
- **Type:** `TheaterSeatLayoutDesignerCustomStyles`  
- **Default:** `{}`  

An object to override the default styles of the component.  

```ts
interface TheaterSeatLayoutDesignerCustomStyles {
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


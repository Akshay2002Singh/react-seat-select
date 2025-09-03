---
id: bus-seat-layout-designer-props
title: 🚌 Props & API Reference
sidebar_label: Props & API
sidebar_position: 2
---

## ⚙️ Props

### 1. `config`

- **Required:** `False`  
- **Type:** `BusConfig`  
- **Default:** `[]`  

The initial bus layout configuration. A `BusConfig` is an array of sections, each containing columns and seats.

Each seat has an `id`, `type` (`seater` or `sleeper`), and an `isBlank` flag to represent empty spaces.

```tsx
type BusSeatType = "sleeper" | "seater";

interface BusSeat {
  id: string;
  type: BusSeatType;
  isBlank: boolean;
}

interface BusColumn {
  id: string;
  seats: BusSeat[];
}

interface BusSection {
  title?: string;
  columns: BusColumn[];
}

type BusConfig = BusSection[];
```

---

### 2. `onChange`

- **Required:** `False`  
- **Type:** `(config: BusConfig) => void`  
- **Default:** `undefined`  

Callback fired whenever the configuration changes (adding/removing seats, editing IDs, etc.).  
Use this to sync state with your application.

---

### 3. `customStyles`

- **Required:** `False`  
- **Type:** `BusSeatLayoutDesignerCustomStyles`  
- **Default:** `{}`  

Customize the look and feel of different parts of the designer UI.

```ts
interface BusSeatLayoutDesignerCustomStyles {
  root?: React.CSSProperties;
  workspace?: React.CSSProperties;
  canvas?: React.CSSProperties;

  section?: React.CSSProperties;
  sectionHeader?: React.CSSProperties;
  sectionTitle?: React.CSSProperties;
  deleteSectionBtn?: React.CSSProperties;

  columns?: React.CSSProperties;
  column?: React.CSSProperties;

  seats?: React.CSSProperties;
  seat?: React.CSSProperties;
  seaterSeat?: React.CSSProperties;
  sleeperSeat?: React.CSSProperties;
  blankSeat?: React.CSSProperties;
  selectedSeat?: React.CSSProperties;

  controls?: React.CSSProperties;
  controlsButton?: React.CSSProperties;
  addColumnCard?: React.CSSProperties;

  inspector?: React.CSSProperties;
  inspectorHeading?: React.CSSProperties;
  inspectorForm?: React.CSSProperties;
  inspectorLabel?: React.CSSProperties;
  inspectorInput?: React.CSSProperties;
  inspectorPlaceholder?: React.CSSProperties;
  inspectorErrorMsg?: React.CSSProperties;
}
```


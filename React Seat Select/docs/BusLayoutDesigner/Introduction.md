---
id: bus-seat-layout-designer-introduction
title: 🚌 Introduction
sidebar_label: Introduction
sidebar_position: 1
---

# 🚌 BusSeatLayoutDesigner

The `BusSeatLayoutDesigner` component provides an **interactive workspace** to design and configure bus seat layouts.  
It allows you to add sections, columns, seats (seater/sleeper), edit properties via an inspector, and export the configuration as JSON.

---


## ✨ Features
- Add/remove **sections**, **columns**, and **seats** dynamically.
- Support for **seater**, **sleeper**, and **blank seats** (for creating gaps).
- Editable **seat IDs** (with duplicate/invalid ID validation).
- **Inspector panel** to edit section titles and seat properties.
- Export the entire layout as a **JSON file**.
- Fully customizable via the `customStyles` prop.

---

## Basic Example

```tsx live
function Example(){
    return (
        <div style={{"overflow":"auto"}}> 
            <BusSeatLayoutDesigner/>
        </div>
    )
}
```


## 📤 Exporting JSON

You can click **Export JSON** at the bottom of the designer to download the current layout as `bus-layout.json`.


## 🚀 Tips

- Use **`onChange`** to persist the layout in a database or state manager.  
- Apply **`customStyles`** to theme the designer according to your application.  
- Seat IDs are auto-generated but can be edited from the **Inspector**.  
- Use **blank seats** to create spacing or empty slots.
---
id: bus-seat-layout-designer-custom-styling
title: 🚌 Custom Styling
sidebar_label: Custom Styling
sidebar_position: 3
---

## 🎨 customStyles – Customize the Designer UI

The customStyles prop allows you to override the look and feel of each part of the Bus Seat Layout Designer.
It accepts a map of style objects (based on React.CSSProperties) that apply directly to specific UI elements.

## 🔹 Root-Level Styling

- ``root`` – Styles applied to the outer container of the entire designer.  
- ``workspace`` – Controls the main working area where the seat layout is built.  
- ``canvas`` – Styles for the seat canvas where sections, rows, and seats are drawn.  

---

## 🗂 Section-Level Styling

- ``section`` – The container for each section of seats.  
- ``sectionHeader`` – Styles applied to the header of each section.  
- ``sectionTitle`` – Controls the title text of a section.  
- ``deleteSectionBtn`` – Styles for the delete button shown in the section header.  

---

## 🧩 Column & Row Styling

- ``columns`` – The wrapper that holds all columns within a section.  
- ``column`` – Styles applied to each individual column inside a section.  

---

## 💺 Seat Styling

- ``seats`` – Wrapper for all seats within a column.  
- ``seat`` – Base styling applied to every seat.  
- ``seaterSeat`` – Specific styles for seater-type seats.  
- ``sleeperSeat`` – Specific styles for sleeper-type seats.  
- ``blankSeat`` – Styles applied to placeholder/empty seats.  
- ``selectedSeat`` – Highlight styles when a seat is selected by the user.  

---

## ⚙️ Controls Styling

- ``controls`` – Container for interactive controls below each section.  
- ``controlsButton`` – Styles applied to action buttons (like “Add Row”, “Delete Row”, etc.).  
- ``addColumnCard`` – Customization for the "➕ Add Column" placeholder card at the end of rows.  

---

## 🛠 Inspector Panel Styling

- ``inspector`` – The side panel where seat/section properties are edited.  
- ``inspectorHeading`` – Heading text style for inspector sections.  
- ``inspectorForm`` – Container styling for the form inside the inspector.  
- ``inspectorLabel`` – Styles applied to form labels.  
- ``inspectorInput`` – Styles for input fields inside the inspector.  
- ``inspectorPlaceholder`` – Placeholder text styling for inputs.  
- ``inspectorErrorMsg`` – Error message text styling shown when validation fails.  


## 🔹 Usage Example

```tsx live
function Example() {
  const [config, setConfig] = useState([]);

  return (
    <div>
      <h2>🚌 Bus Layout Designer</h2>
      <BusSeatLayoutDesigner
        config={config}
        onChange={(updatedConfig) => setConfig(updatedConfig)}
        customStyles={{
        root: {
            backgroundColor: "#f9fafb",
            fontFamily: "Arial, sans-serif",
            padding: "16px",
        },
        workspace: {
            border: "2px dashed #ccc",
            borderRadius: "12px",
            padding: "12px",
            backgroundColor: "#fff",
        },
        canvas: {
            gap: "16px",
            backgroundColor: "#f0f4f8",
            padding: "20px",
            borderRadius: "8px",
        },

        section: {
            border: "1px solid #ddd",
            borderRadius: "10px",
            padding: "10px",
            backgroundColor: "#ffffff",
        },
        sectionHeader: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#f1f5f9",
            padding: "6px 10px",
            borderRadius: "6px",
        },
        sectionTitle: {
            fontWeight: "bold",
            fontSize: "16px",
            color: "#1e293b",
        },
        deleteSectionBtn: {
            cursor: "pointer",
            fontWeight: "bold",
            backgroundColor:"red",

        },

        columns: {
            display: "flex",
            gap: "12px",
            marginTop: "8px",
        },
        column: {
            display: "flex",
            flexDirection: "column",
            gap: "6px",
        },

        seats: {
            display: "flex",
            gap: "6px",
        },
        seat: {
            width: "40px",
            height: "40px",
            backgroundColor: "#e2e8f0",
            border: "2px solid #94a3b8",
            borderRadius: "6px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "12px",
            fontWeight: "bold",
            cursor: "pointer",
        },
        seaterSeat: {
            backgroundColor: "#bae6fd",
            border: "2px solid #0284c7",
        },
        sleeperSeat: {
            backgroundColor: "#c7d2fe",
            border: "2px solid #4f46e5",
            width: "40px",
            height: "80px",
        },
        blankSeat: {
            backgroundColor: "#f8fafc",
            border: "1px dashed #94a3b8",
        },
        selectedSeat: {
            backgroundColor: "#34d399",
            border: "2px solid #065f46",
            color: "#fff",
        },

        controls: {
            display: "flex",
            gap: "10px",
            marginTop: "12px",
        },
        controlsButton: {
            backgroundColor: "#3b82f6",
            color: "#fff",
            border: "none",
            padding: "6px 12px",
            borderRadius: "6px",
            cursor: "pointer",
        },
        addColumnCard: {
            border: "2px dashed #94a3b8",
            padding: "10px",
            borderRadius: "6px",
            textAlign: "center",
            cursor: "pointer",
            color: "#475569",
        },

        inspector: {
            borderLeft: "2px solid #e5e7eb",
            padding: "12px",
            backgroundColor: "#f8fafc",
        },
        inspectorHeading: {
            fontSize: "18px",
            fontWeight: "bold",
            marginBottom: "10px",
            color: "#111827",
        },
        inspectorForm: {
            display: "flex",
            flexDirection: "column",
            gap: "8px",
        },
        inspectorLabel: {
            fontSize: "14px",
            fontWeight: "500",
            color: "#374151",
        },
        inspectorInput: {
            padding: "6px 10px",
            borderRadius: "6px",
            border: "1px solid #d1d5db",
            fontSize: "14px",
        },
        inspectorPlaceholder: {
            fontStyle: "italic",
            color: "#9ca3af",
        },
        }}
      />
    </div>
  );
}
```


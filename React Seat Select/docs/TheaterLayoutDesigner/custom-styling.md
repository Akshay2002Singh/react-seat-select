---
id: theater-seat-layout-designer-custom-styling
title: 🎭 Custom Styling
sidebar_label: Custom Styling
sidebar_position: 3
---

# 🎨 Custom Styling

The **``customStyles``** prop lets you control the look & feel of every part of the `TheaterSeatLayoutDesigner`.  
Each property maps to a specific part of the UI, so you can match it with your app’s design system.

## 🎭 Wrapper

- ``wrapper`` – The outermost container that wraps the entire designer. Useful for setting padding, background, or max width.  


## 📦 Section

- ``sectionBox`` – Each section container (e.g., Balcony, VIP, Normal). Controls section-level borders, spacing, or background.  

- ``sectionHeader`` – The header area of a section that displays its title. Customize fonts, alignment, or header colors.  


## 🎛 Controls

- ``controlsBox`` – The box that holds *Add Row, Add Column, Delete Section* buttons. Use to adjust layout, spacing, or background of control tools.  

- ``controlButton`` – The buttons inside the controls box (➕ ➖ icons). Style with colors, padding, hover effects, and borders.  

- ``deleteSectionBtn`` – The delete button for removing an entire section. Customize its color, size, or hover behavior.  


## 🪑 Seats & Rows

- ``seatGrid`` – The grid layout holding all rows and seats of a section. Use for gap size, background, or seat arrangement alignment.  

- ``row`` – Each row wrapper inside the seat grid. Adjust row spacing, alignment, or borders.  

- ``rowLabel`` – The label (like *A, B, C*) displayed at the start of a row. Control font size, color, or alignment.  

- ``seatGroup`` – A grouping wrapper around multiple seats in a row. Can be styled for spacing or seat alignment adjustments.  

- ``seat`` – An individual seat box (default unselected seat). Customize with border radius, background, or seat size.  

- ``blankSeat`` – A placeholder seat representing an empty space (not a real seat). Useful for creating aisles or gaps in layouts. Style it differently to make it distinguishable.  

- ``selectedSeat`` – The seat style when selected in the designer. Apply highlight colors or bold borders to show active state.  


## 📋 Inspector

- ``inspectorBox`` – The right-side Inspector panel container. Use to control padding, width, and background of the panel.  

- ``inspectorPlaceholder`` – The placeholder message when no seat/section is selected. Style its text color, font style, or alignment.  

- ``inspectorHeader`` – The header title inside the Inspector (e.g., *"Seat Properties"*). Control typography, alignment, and header background.  

- ``inspectorLabel`` – Labels for form fields inside the Inspector (e.g., *"Seat ID"*). Style with font size, color, and spacing.  

- ``inspectorInput`` – Input fields in the Inspector (textboxes, etc.). Customize borders, padding, and focus styles.  

- ``inspectorErrorMsg`` – Error messages shown in the Inspector when validation fails. Style with red text, bold fonts, or small captions.  

## 🔹 Usage Example

```tsx live
function Example(){
    return (
    <div>
        <h2>🎭 Theater Layout Designer</h2>
        <TheaterSeatLayoutDesigner
        customStyles={{
          wrapper: { display: "flex", gap: "16px" },
          sectionBox: {
            border: "2px solid #993939ff",
            borderRadius: "8px",
            padding: "12px",
          },
          controlButton:{fontSize:"18px", fontWeight:"bold"},
          seat: {
            width: "32px",
            height: "32px",
            background: "#20487dff",
            margin: "4px",
            textAlign: "center",
            lineHeight: "32px",
            cursor: "pointer",
          },
          inspectorHeader:{fontSize:"40px"},
          inspectorPlaceholder:{fontSize:"24px", color:"gray"},
          inspectorLabel:{fontSize:"18px", fontWeight:"bold"},
          inspectorInput:{width:"200px", height:"20px", cursor:"pointer"},
          blankSeat: { background: "transparent" },
          selectedSeat: { background: "#fbbf24", fontWeight: "bold" },
          rowLabel: { color:"red",backgroundColor:"yellow", fontWeight: "bold", marginRight: "8px" },
        }}
      />
    </div>
    )
}
```

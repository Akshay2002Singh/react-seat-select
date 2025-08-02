import React, { useState } from "react";

const SeatLayoutDesigner = () => {
  const [sections, setSections] = useState([createEmptySection()]);

  function createEmptySection(title = "Section") {
    return {
      title,
      seats: {
        A: [{ id: "A1" }],
      },
    };
  }

  const addSection = (index) => {
    const newSections = [...sections];
    newSections.splice(index + 1, 0, createEmptySection(`Section ${index + 2}`));
    setSections(newSections);
  };

  const removeSection = (index) => {
    const newSections = [...sections];
    newSections.splice(index, 1);
    setSections(newSections);
  };

  const updateSectionTitle = (index, newTitle) => {
    const updated = [...sections];
    updated[index].title = newTitle;
    setSections(updated);
  };

  const updateRowLabel = (sectionIndex, oldLabel, newLabel) => {
    const updated = [...sections];
    const section = updated[sectionIndex];
    if (!newLabel || section.seats[newLabel]) return;
    section.seats[newLabel] = section.seats[oldLabel].map((seat) => ({
      ...seat,
      id: seat.id.replace(oldLabel, newLabel),
    }));
    delete section.seats[oldLabel];
    setSections(updated);
  };

  const updateSeatLabel = (sectionIndex, rowLabel, seatIndex, newLabel) => {
    const updated = [...sections];
    updated[sectionIndex].seats[rowLabel][seatIndex].label = newLabel;
    setSections(updated);
  };

  const addRow = (sectionIndex) => {
    const updated = [...sections];
    const rowKeys = Object.keys(updated[sectionIndex].seats);
    const nextRow = String.fromCharCode(
      rowKeys.length > 0 ? rowKeys[rowKeys.length - 1].charCodeAt(0) + 1 : 65
    );
    const cols = rowKeys[0] ? updated[sectionIndex].seats[rowKeys[0]].length : 1;
    updated[sectionIndex].seats[nextRow] = Array.from({ length: cols }, (_, i) => ({
      id: `${nextRow}${i + 1}`,
    }));
    setSections(updated);
  };

  const removeRow = (sectionIndex, rowLabel) => {
    const updated = [...sections];
    delete updated[sectionIndex].seats[rowLabel];
    setSections(updated);
  };

  const addColumn = (sectionIndex) => {
    const updated = [...sections];
    Object.entries(updated[sectionIndex].seats).forEach(([rowLabel, row]) => {
      row.push({ id: `${rowLabel}${row.length + 1}` });
    });
    setSections(updated);
  };

  const removeColumn = (sectionIndex, colIndex) => {
    const updated = [...sections];
    Object.entries(updated[sectionIndex].seats).forEach(([_, row]) => {
      row.splice(colIndex, 1);
    });
    setSections(updated);
  };

  const toggleSeat = (sectionIndex, rowLabel, seatIndex) => {
    const updated = [...sections];
    const seat = updated[sectionIndex].seats[rowLabel][seatIndex];
    seat.isBlank = !seat.isBlank;
    setSections(updated);
  };

  return (
    <div className="threater-seat-selection-wrapper">
      {sections.map((section, secIndex) => (
        <div key={secIndex} style={{ border: "1px solid #ccc", marginBottom: 16, paddingBottom: 8 }}>
          <div className="seat-section-header">
            <input
              value={section.title}
              onChange={(e) => updateSectionTitle(secIndex, e.target.value)}
              style={{ fontSize: 18, textAlign: "center" }}
            />
          </div>
          <div className="controls" style={{ textAlign: "center", marginBottom: 8 }}>
            <button onClick={() => addRow(secIndex)}>Add Row</button>
            <button onClick={() => addColumn(secIndex)}>Add Column</button>
            <button onClick={() => removeSection(secIndex)}>Delete Section</button>
          </div>
          <div className="seat-grid">
            {Object.entries(section.seats).map(([rowLabel, row], rowIndex) => (
              <div className="seat-row" key={rowLabel}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <input
                    value={rowLabel}
                    onChange={(e) => updateRowLabel(secIndex, rowLabel, e.target.value)}
                    style={{ width: 32, textAlign: "center" }}
                  />
                  <button
                    onClick={() => removeRow(secIndex, rowLabel)}
                    style={{ fontSize: 10, marginTop: 4 }}
                  >
                    ❌
                  </button>
                </div>
                <div className="seat-group">
                  {rowIndex === 0 && row.map((_, colIndex) => (
                    <button
                      key={`remove-col-${colIndex}`}
                      onClick={() => removeColumn(secIndex, colIndex)}
                      style={{ fontSize: 10, width: 40, margin: "0 4px" }}
                    >
                      🗑
                    </button>
                  ))}
                  {row.map((seat, colIndex) => (
                    <div
                      key={`${rowLabel}-${colIndex}`}
                      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
                    >
                      <div
                        className={seat?.isBlank ? "blankSeat" : "seat AVAILABLE"}
                        onClick={() => toggleSeat(secIndex, rowLabel, colIndex)}
                        title="Click to toggle visibility"
                      >
                        👁️ {seat?.id}
                      </div>
                      <input
                        value={seat?.label || ""}
                        onChange={(e) => updateSeatLabel(secIndex, rowLabel, colIndex, e.target.value)}
                        placeholder="Label"
                        style={{ width: 40, fontSize: 10, textAlign: "center", marginTop: 2 }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "center", marginTop: 10, marginBottom: 20 }}>
            <button onClick={() => addSection(secIndex)}>+ Add Section</button>
          </div>
        </div>
      ))}
      <div style={{ textAlign: "center", marginTop: 20 }}>
        <button
          onClick={() => console.log("Exported Config:", JSON.stringify(sections, null, 2))}
        >
          Export Config to Console
        </button>
      </div>
    </div>
  );
};


export default SeatLayoutDesigner;
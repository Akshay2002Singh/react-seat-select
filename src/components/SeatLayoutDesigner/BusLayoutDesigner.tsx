import React, { useState } from "react";

export default function SeatConfigGenerator() {
  const [sections, setSections] = useState({});

  const addSection = (key) => {
    setSections((prev) => ({
      ...prev,
      [key]: { title: "", columns: [] },
    }));
  };

  const updateSectionTitle = (key, title) => {
    setSections((prev) => ({
      ...prev,
      [key]: { ...prev[key], title },
    }));
  };

  const addColumn = (sectionKey) => {
    setSections((prev) => ({
      ...prev,
      [sectionKey]: {
        ...prev[sectionKey],
        columns: [
          ...prev[sectionKey].columns,
          { id: String(prev[sectionKey].columns.length + 1), seats: [] },
        ],
      },
    }));
  };

  const addSeat = (sectionKey, columnIndex) => {
    setSections((prev) => {
      const newCols = [...prev[sectionKey].columns];
      newCols[columnIndex].seats.push({
        id: "",
        type: "seater",
        isBlank: false,
      });
      return {
        ...prev,
        [sectionKey]: { ...prev[sectionKey], columns: newCols },
      };
    });
  };

  const updateSeat = (sectionKey, columnIndex, seatIndex, field, value) => {
    setSections((prev) => {
      const newCols = [...prev[sectionKey].columns];
      newCols[columnIndex].seats[seatIndex][field] = value;
      return {
        ...prev,
        [sectionKey]: { ...prev[sectionKey], columns: newCols },
      };
    });
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Seat Config Generator</h2>

      {/* Add Section */}
      <input
        placeholder="New Section Key (e.g., LB)"
        onKeyDown={(e) => {
          if (e.key === "Enter" && e.target.value.trim()) {
            addSection(e.target.value.trim());
            e.target.value = "";
          }
        }}
      />

      {/* Sections */}
      {Object.entries(sections).map(([key, section]) => (
        <div key={key} style={{ border: "1px solid #ccc", marginTop: 20, padding: 10 }}>
          <h3>{key}</h3>
          <input
            placeholder="Section Title"
            value={section.title}
            onChange={(e) => updateSectionTitle(key, e.target.value)}
          />
          <button onClick={() => addColumn(key)}>Add Column</button>

          {/* Columns */}
          {section.columns.map((col, colIndex) => (
            <div key={col.id} style={{ border: "1px dashed gray", margin: "10px 0", padding: 10 }}>
              <h4>Column {col.id}</h4>
              <button onClick={() => addSeat(key, colIndex)}>Add Seat</button>

              {/* Seats */}
              {col.seats.map((seat, seatIndex) => (
                <div key={seatIndex} style={{ display: "flex", gap: "10px", marginTop: 5 }}>
                  <input
                    placeholder="Seat ID"
                    value={seat.id}
                    onChange={(e) =>
                      updateSeat(key, colIndex, seatIndex, "id", e.target.value)
                    }
                  />
                  <select
                    value={seat.type}
                    onChange={(e) =>
                      updateSeat(key, colIndex, seatIndex, "type", e.target.value)
                    }
                  >
                    <option value="seater">Seater</option>
                    <option value="sleeper">Sleeper</option>
                  </select>
                  <label>
                    <input
                      type="checkbox"
                      checked={seat.isBlank}
                      onChange={(e) =>
                        updateSeat(key, colIndex, seatIndex, "isBlank", e.target.checked)
                      }
                    />
                    Blank
                  </label>
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}

      {/* Output */}
      <h3>Generated Config</h3>
      <pre style={{ background: "#f0f0f0", padding: 10 }}>
        export default {JSON.stringify(sections, null, 2)}
      </pre>
    </div>
  );
}

import { useState } from "react";
import type { Seat, Section } from "../BusSeatSelect/types";


type Sections = Record<string, Section & { blankColumns: Set<string> }>;

export default function BusLayoutDesigner() {
  const [sections, setSections] = useState<Sections>({});
  const [copied, setCopied] = useState(false);

  const addSection = (key: string) => {
    setSections((prev) => ({
      ...prev,
      [key]: { title: "", columns: [], blankColumns: new Set() },
    }));
  };

  const updateSectionTitle = (key: string, title: string) => {
    setSections((prev) => ({
      ...prev,
      [key]: { ...prev[key], title },
    }));
  };

  const addColumn = (sectionKey: string) => {
    setSections((prev) => {
      const newId = String(prev[sectionKey].columns.length + 1);
      return {
        ...prev,
        [sectionKey]: {
          ...prev[sectionKey],
          columns: [...prev[sectionKey].columns, { id: newId, seats: [] }],
        },
      };
    });
  };

  const removeColumn = (sectionKey: string, columnIndex: number) => {
    setSections((prev) => {
      const newCols = [...prev[sectionKey].columns];
      const removedCol = newCols[columnIndex].id;
      newCols.splice(columnIndex, 1);
      const newBlank = new Set(prev[sectionKey].blankColumns);
      newBlank.delete(removedCol);
      return {
        ...prev,
        [sectionKey]: {
          ...prev[sectionKey],
          columns: newCols,
          blankColumns: newBlank,
        },
      };
    });
  };

  const toggleColumnBlank = (sectionKey: string, columnId: string) => {
    setSections((prev) => {
      const newBlank = new Set(prev[sectionKey].blankColumns);
      if (newBlank.has(columnId)) newBlank.delete(columnId);
      else newBlank.add(columnId);
      return {
        ...prev,
        [sectionKey]: { ...prev[sectionKey], blankColumns: newBlank },
      };
    });
  };

  const addSeat = (sectionKey: string, columnIndex: number) => {
    setSections((prev) => {
      const newCols = prev[sectionKey].columns.map((col, idx) =>
        idx === columnIndex
          ? {
              ...col,
              seats: [
                ...col.seats,
                { id: "", type: "seater" as const, isBlank: false },
              ],
            }
          : col
      );
      return {
        ...prev,
        [sectionKey]: { ...prev[sectionKey], columns: newCols },
      };
    });
  };

  const updateSeat = (
    sectionKey: string,
    columnIndex: number,
    seatIndex: number,
    field: keyof Seat,
    value: string | boolean
  ) => {
    setSections((prev) => {
      const newCols = [...prev[sectionKey].columns];
      (newCols[columnIndex].seats[seatIndex] as any)[field] = value;
      return {
        ...prev,
        [sectionKey]: { ...prev[sectionKey], columns: newCols },
      };
    });
  };

  const removeSeat = (
    sectionKey: string,
    columnIndex: number,
    seatIndex: number
  ) => {
    setSections((prev) => {
      const newCols = [...prev[sectionKey].columns];
      newCols[columnIndex].seats.splice(seatIndex, 1);
      return {
        ...prev,
        [sectionKey]: { ...prev[sectionKey], columns: newCols },
      };
    });
  };

  const getExportConfig = () => {
    const clean: Record<string, Section> = {};
    for (const [key, sec] of Object.entries(sections)) {
      clean[key] = {
        title: sec.title,
        columns: sec.columns.map((col) =>
          sec.blankColumns.has(col.id) ? { ...col, seats: [] } : col
        ),
      };
    }
    return clean;
  };

  const copyToClipboard = () => {
    const text = `export default ${JSON.stringify(getExportConfig(), null, 2)}`;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h2>🚌 Bus Layout Designer</h2>

      {/* Add Section */}
      <input
        placeholder="New Section Key (e.g., LowerDeck)"
        onKeyDown={(e) => {
          if (e.key === "Enter" && e.currentTarget.value.trim()) {
            addSection(e.currentTarget.value.trim());
            e.currentTarget.value = "";
          }
        }}
      />

      {/* Sections */}
      {Object.entries(sections).map(([key, section]) => (
        <div
          key={key}
          style={{
            border: "1px solid #ccc",
            borderRadius: 8,
            marginTop: 20,
            padding: 15,
          }}
        >
          <h3>{key}</h3>
          <input
            placeholder="Section Title"
            value={section.title}
            onChange={(e) => updateSectionTitle(key, e.target.value)}
            style={{ marginBottom: 10 }}
          />
          <button onClick={() => addColumn(key)}>➕ Add Column</button>

          <div
            style={{
              display: "flex",
              gap: "20px",
              marginTop: 15,
              alignItems: "flex-start",
            }}
          >
            {section.columns.map((col, colIndex) => {
              const isBlank = section.blankColumns.has(col.id);
              return (
                <div
                  key={col.id}
                  style={{
                    border: "1px dashed gray",
                    borderRadius: 6,
                    padding: 10,
                    minWidth: 100,
                    position: "relative",
                  }}
                >
                  <h4 style={{ textAlign: "center" }}>Col {col.id}</h4>
                  <button
                    onClick={() => removeColumn(key, colIndex)}
                    style={{
                      position: "absolute",
                      top: "-10px",
                      right: "-10px",
                      padding: "2px 4px",
                      color: "red",
                      background: "white",
                      fontSize: 10,
                      border:"1px solid white",
                      borderRadius:"50%",
                      cursor: "pointer",
                    }}
                  >
                    ✖
                  </button>

                  {/* Blank toggle */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <input
                      type="checkbox"
                      id={`blank-${col.id}`}
                      checked={isBlank}
                      onChange={() => toggleColumnBlank(key, col.id)}
                    />
                    <label
                      style={{ fontSize: 12, marginLeft: 4 }}
                      htmlFor={`blank-${col.id}`}
                    >
                      Blank Column
                    </label>
                  </div>

                  {!isBlank && (
                    <>
                      <button
                        style={{ marginBottom: 10 }}
                        onClick={() => addSeat(key, colIndex)}
                      >
                        ➕ Seat
                      </button>
                      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                        {col.seats.map((seat, seatIndex) => {
                          const isSleeper = seat.type === "sleeper";
                          return (
                            <div
                              key={seatIndex}
                              style={{
                                border: "1px solid #999",
                                borderRadius: 4,
                                padding: "5px",
                                display: "flex",
                                flexDirection: "column",
                                background: "#f9f9f9",
                                width: 80,
                                height: isSleeper ? 156 : 70,
                                position: "relative",
                              }}
                            >
                              <button
                                onClick={() => removeSeat(key, colIndex, seatIndex)}
                                style={{
                                  position: "absolute",
                                  top: "-6px",
                                  right: "-6px",
                                  color: "red",
                                  background: "white",
                                  margin: 0,
                                  padding: "2px 4px",
                                  borderRadius: "50%",
                                  border: "1px solid white",
                                  cursor: "pointer",
                                  fontSize: 10,
                                }}
                              >
                                ✖
                              </button>
                              <input
                                placeholder="Seat ID"
                                value={seat.id}
                                onChange={(e) =>
                                  updateSeat(key, colIndex, seatIndex, "id", e.target.value)
                                }
                                style={{ marginBottom: 5 }}
                              />
                              <select
                                value={seat.type}
                                onChange={(e) =>
                                  updateSeat(key, colIndex, seatIndex, "type", e.target.value)
                                }
                                style={{ marginBottom: 5 }}
                              >
                                <option value="seater">Seater</option>
                                <option value="sleeper">Sleeper</option>
                              </select>
                              <div style={{ display: "flex", alignItems: "center" }}>
                                <input
                                  type="checkbox"
                                  checked={seat.isBlank}
                                  onChange={(e) =>
                                    updateSeat(key, colIndex, seatIndex, "isBlank", e.target.checked)
                                  }
                                />
                                <label style={{ fontSize: 12, marginLeft: 4 }}>Blank</label>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {/* Output */}
      <h3 style={{ marginTop: 30 }}>📦 Generated Config</h3>
      <pre
        style={{
          background: "#f0f0f0",
          padding: 10,
          borderRadius: 6,
          maxHeight: 400,
          overflow: "auto",
          position:"relative"
        }}
      >
        export default {JSON.stringify(getExportConfig(), null, 2)}

        <button
        onClick={copyToClipboard}
        style={{
          position:"absolute",
          top:0,
          right:5,
          marginTop: 10,
          padding: "6px 12px",
          borderRadius: 6,
          border: "1px solid #ccc",
          cursor: "pointer",
        }}
      >
          <span style={{ marginLeft: 10, color: "green" }}>{copied?"✅ Copied!" : "📋 Copy to Clipboard"}</span>
      </button>
      
      </pre>
      
    </div>
  );
}

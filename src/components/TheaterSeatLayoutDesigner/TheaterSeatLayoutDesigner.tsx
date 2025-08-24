import { useState, useEffect } from "react";
import type { SeatSection } from "../TheaterSeatSelect/types";
import "./styles.css";

type InspectorTarget =
  | { type: "section"; secIndex: number }
  | { type: "row"; secIndex: number; rowLabel: string }
  | { type: "seat"; secIndex: number; rowLabel: string; seatIndex: number }
  | null;

interface TheaterSeatLayoutDesignerProps {
  layout?: SeatSection[]; // initial layout
  onChange?: (layout: SeatSection[]) => void;
}

export const TheaterSeatLayoutDesigner = ({
  layout,
  onChange,
}: TheaterSeatLayoutDesignerProps) => {
  const [sections, setSections] = useState<SeatSection[]>(layout || [createEmptySection()]);
  const [selected, setSelected] = useState<InspectorTarget>(null);

  // Sync prop → state when layout changes externally
  useEffect(() => {
    if (layout) setSections(layout);
  }, [layout]);

  // Helper to update + propagate change
  const updateSections = (next: SeatSection[]) => {
    setSections(next);
    onChange?.(next);
  };

  // --- Helpers ---
  function createEmptySection(title = "Section"): SeatSection {
    return {
      title,
      seats: {
        A: [{ id: "A1", label: "A1" }],
      },
    };
  }

  const addSection = () => {
    updateSections([...sections, createEmptySection(`Section ${sections.length + 1}`)]);
  };

  const removeSection = (index: number) => {
    const updated = [...sections];
    updated.splice(index, 1);
    updateSections(updated);
    setSelected(null);
  };

  // --- Row + Seat ---
  const addRow = (secIndex: number) => {
    const updated = [...sections];
    const rowKeys = Object.keys(updated[secIndex].seats);
    const nextRow = String.fromCharCode(
      rowKeys.length > 0 ? rowKeys[rowKeys.length - 1].charCodeAt(0) + 1 : 65
    );
    const cols = updated[secIndex].seats[rowKeys[0] as string]?.length ?? 1;
    updated[secIndex].seats[nextRow] = Array.from({ length: cols }, (_, i) => ({
      id: `${nextRow}${i + 1}`,
      label: `${nextRow}${i + 1}`
    }));
    updateSections(updated);
  };

  const removeRow = (secIndex: number, rowLabel: string) => {
    const updated = [...sections];
    delete updated[secIndex].seats[rowLabel];
    updateSections(updated);
    setSelected(null);
  };

  const addColumn = (secIndex: number) => {
    const updated = [...sections];
    Object.entries(updated[secIndex].seats).forEach(([rowLabel, row]) => {
      row?.push({ id: `${rowLabel}${row.length + 1}`, label: `${rowLabel}${row.length + 1}` });
    });
    updateSections(updated);
  };

  const removeColumn = (secIndex: number) => {
    const updated = [...sections];
    Object.entries(updated[secIndex].seats).forEach(([_, row]) => {
      row?.splice(row.length - 1, 1);
    });
    updateSections(updated);
  };

  // --- Inspector Handlers ---
  const updateSectionTitle = (secIndex: number, newTitle: string) => {
    const updated = [...sections];
    updated[secIndex].title = newTitle;
    updateSections(updated);
  };

  const updateRowLabel = (secIndex: number, oldLabel: string, newLabel: string) => {
    const updated = [...sections];
    const section = updated[secIndex];
    if (!newLabel || section.seats[newLabel]) return;
    section.seats[newLabel] = section.seats[oldLabel]?.map((seat) => ({
      ...seat,
      id: seat.id.replace(oldLabel, newLabel),
    }));
    delete section.seats[oldLabel];
    updateSections(updated);
    setSelected({ type: "row", secIndex, rowLabel: newLabel });
  };

  const updateSeat = (
    secIndex: number,
    rowLabel: string,
    seatIndex: number,
    field: "id" | "label" | "isBlank",
    value: string | boolean
  ) => {
    const updated = [...sections];
    const seat = updated[secIndex].seats[rowLabel]?.[seatIndex];
    if (seat) {
      (seat as any)[field] = value;
      updateSections(updated);
    }
  };

  // --- Export to JSON ---
  const exportToJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(sections, null, 2));
    const downloadAnchorNode = document.createElement("a");
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "seat-layout.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <div className="theaterSeatLayoutDesigner-designer-wrapper">
      <div className="theaterSeatLayoutDesigner-designer-canvas">
        {sections.map((section, secIndex) => (
          <div key={secIndex} className="theaterSeatLayoutDesigner-section-box">
            {/* Section Header */}
            <div className="theaterSeatLayoutDesigner-section-header">
              <span
                className="theaterSeatLayoutDesigner-clickable-text"
                onClick={() => setSelected({ type: "section", secIndex })}
              >
                {section.title}
              </span>
            </div>

            {/* Controls */}
            <div className="theaterSeatLayoutDesigner-controls">
              <button onClick={() => addRow(secIndex)}>+ Row</button>
              <button onClick={() => addColumn(secIndex)}>+ Column</button>
              <button onClick={() => removeRow(secIndex, Object.keys(section.seats).slice(-1)[0])}>
                Delete Last Row
              </button>
              <button onClick={() => removeColumn(secIndex)}>Delete Last Column</button>
              <button
                className="theaterSeatLayoutDesigner-delete-section-btn"
                onClick={() => removeSection(secIndex)}
              >
                Delete Section
              </button>
            </div>

            {/* Seat Grid */}
            <div className="theaterSeatLayoutDesigner-seat-grid">
              {Object.entries(section.seats).map(([rowLabel, row]) => (
                <div className="theaterSeatLayoutDesigner-seat-row" key={rowLabel}>
                  {/* Row Label */}
                  <div
                    className="theaterSeatLayoutDesigner-row-label"
                    onClick={() => setSelected({ type: "row", secIndex, rowLabel })}
                  >
                    <span>{rowLabel}</span>
                  </div>

                  {/* Seats */}
                  <div className="theaterSeatLayoutDesigner-seat-group">
                    {row?.map((seat, colIndex) => (
                      <div
                        key={seat.id}
                        className={`theaterSeatLayoutDesigner-seat theaterSeatLayoutDesigner-${seat.isBlank ? "blankSeat" : "AVAILABLE"}`}
                        onClick={() =>
                          setSelected({
                            type: "seat",
                            secIndex,
                            rowLabel,
                            seatIndex: colIndex,
                          })
                        }
                      >
                        {seat.id}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="theaterSeatLayoutDesigner-bottom-btn-container">
        <div className="theaterSeatLayoutDesigner-add-section-box">
          <button onClick={addSection}>+ Add Section</button>
        </div>
        <div className="theaterSeatLayoutDesigner-add-section-box">
          <button onClick={exportToJSON}>Export to JSON</button>
        </div>
        </div>
      </div>

      {/* Inspector */}
      <div className="theaterSeatLayoutDesigner-inspector">
        <h3>Inspector</h3>
        {!selected && <p>Select a section title, row label, or seat</p>}

        {selected?.type === "section" && (
          <div>
            <label>Section Title</label>
            <input
              value={sections[selected.secIndex].title}
              onChange={(e) => updateSectionTitle(selected.secIndex, e.target.value)}
            />
          </div>
        )}

        {selected?.type === "row" && (
          <div>
            <label>Row label</label>
            <input
              value={selected.rowLabel}
              onChange={(e) => updateRowLabel(selected.secIndex, selected.rowLabel, e.target.value)}
            />
          </div>
        )}

        {selected?.type === "seat" && (
          <div>
            <label>Seat ID:</label>
            <input
              value={
                sections[selected.secIndex].seats[selected.rowLabel]?.[selected.seatIndex].id
              }
              onChange={(e) =>
                updateSeat(selected.secIndex, selected.rowLabel, selected.seatIndex, "id", e.target.value)
              }
            />
            <label>Seat Label:</label>
            <input
              value={
                sections[selected.secIndex].seats[selected.rowLabel]?.[selected.seatIndex].label || ""
              }
              onChange={(e) =>
                updateSeat(selected.secIndex, selected.rowLabel, selected.seatIndex, "label", e.target.value)
              }
            />
            <label className="theaterSeatLayoutDesigner-checkbox-label">
              <input
                type="checkbox"
                checked={
                  sections[selected.secIndex].seats[selected.rowLabel]?.[selected.seatIndex].isBlank || false
                }
                onChange={(e) =>
                  updateSeat(selected.secIndex, selected.rowLabel, selected.seatIndex, "isBlank", e.target.checked)
                }
              />
              <span>Is Blank</span>
            </label>
          </div>
        )}
      </div>
    </div>
  );
};

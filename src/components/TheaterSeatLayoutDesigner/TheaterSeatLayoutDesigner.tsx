import { useState, useEffect } from "react";
import type { SeatSection } from "../TheaterSeatSelect/types";
import "./styles.css";

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
}

interface TheaterSeatLayoutDesignerProps {
  config?: SeatSection[];
  onChange?: (config: SeatSection[]) => void;
  customStyles?: CustomStyles;
}

type InspectorTarget =
  | { type: "section"; secIndex: number }
  | {
      type: "row";
      secIndex: number;
      rowLabel: string;
      inspectorDisplayLabelValue: string;
    }
  | { type: "seat"; secIndex: number; rowLabel: string; seatIndex: number }
  | null;

export const TheaterSeatLayoutDesigner = ({
  config,
  onChange,
  customStyles = {},
}: TheaterSeatLayoutDesignerProps) => {
  const [sections, setSections] = useState<SeatSection[]>(
    config || [createEmptySection()]
  );
  const [selected, setSelected] = useState<InspectorTarget>(null);

  // Sync prop → state when config changes externally
  useEffect(() => {
    if (config) {
      setSections(config);
      onChange?.(config);
    }
  }, [config]);

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
    updateSections([
      ...sections,
      createEmptySection(`Section ${sections.length + 1}`),
    ]);
  };

  const removeSection = (index: number) => {
    const updated = [...sections];
    updated.splice(index, 1);
    updateSections(updated);
    setSelected(null);
  };

  const randomTwoChars = () => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return (
      letters[Math.floor(Math.random() * letters.length)] + letters[Math.floor(Math.random() * letters.length)]
    );
  };

  const generateNextRowId = (rowKeys: string[]): string => {
    if (rowKeys.length === 0) return "A";
    // take last row key
    const lastKey = rowKeys[rowKeys.length - 1];
    let nextKey: string;
    // case: single char like A, B, C
    if (lastKey.length === 1 && /[A-Z]/.test(lastKey)) {
      nextKey = String.fromCharCode(lastKey.charCodeAt(0) + 1);
    } else {
      // otherwise, fallback
      nextKey = randomTwoChars();
    }
    // ensure unique
    while (rowKeys.includes(nextKey)) {
      nextKey = randomTwoChars();
    }
    return nextKey;
  };

  // --- Row + Seat ---
  const addRow = (secIndex: number) => {
    const updated = [...sections];
    const rowKeys = Object.keys(updated[secIndex].seats);
    const nextRow = generateNextRowId(rowKeys);
    const cols = updated[secIndex].seats[rowKeys[0] as string]?.length ?? 1;
    updated[secIndex].seats[nextRow] = Array.from({ length: cols }, (_, i) => ({
      id: `${nextRow}${i + 1}`,
      label: `${nextRow}${i + 1}`,
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
      row?.push({
        id: `${rowLabel}${row.length + 1}`,
        label: `${rowLabel}${row.length + 1}`,
      });
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

  const updateRowLabel = (
    secIndex: number,
    oldLabel: string,
    newLabel: string
  ) => {
    const updated = [...sections];
    const section = updated[secIndex];
    if (!newLabel || section.seats[newLabel]) return;

    const orderedRowsSequence = Object.keys(section.seats);
    const newSeats: Record<string, (typeof section.seats)[string]> = {};
    for (const label of orderedRowsSequence) {
      if (label === oldLabel) {
        // put new label in same position
        const rowSeats = section.seats[oldLabel];
        if (!rowSeats) continue; // safeguard
        newSeats[newLabel] = rowSeats.map((seat) => ({
          ...seat,
          id: seat.id,
        }));
      } else {
        newSeats[label] = section.seats[label];
      }
    }
    section.seats = newSeats;
    updateSections(updated);
    setSelected({
      type: "row",
      secIndex,
      rowLabel: newLabel,
      inspectorDisplayLabelValue: newLabel,
    });
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
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(sections, null, 2));
    const downloadAnchorNode = document.createElement("a");
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "seat-layout.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <div
      className="theaterSeatLayoutDesigner-designer-wrapper"
      style={customStyles.wrapper}
    >
      <div className="theaterSeatLayoutDesigner-designer-canvas">
        {sections.map((section, secIndex) => (
          <div
            key={secIndex}
            className="theaterSeatLayoutDesigner-section-box"
            style={customStyles.sectionBox}
          >
            {/* Section Header */}
            <div
              className="theaterSeatLayoutDesigner-section-header"
              style={customStyles.sectionHeader}
            >
              <span
                className="theaterSeatLayoutDesigner-clickable-text"
                onClick={() => setSelected({ type: "section", secIndex })}
              >
                {section.title}
              </span>
            </div>

            {/* Controls */}
            <div
              className="theaterSeatLayoutDesigner-controls"
              style={customStyles.controlsBox}
            >
              <button
                style={customStyles?.controlButton}
                onClick={() => addRow(secIndex)}
              >
                + Row
              </button>
              <button
                style={customStyles?.controlButton}
                onClick={() => addColumn(secIndex)}
              >
                + Column
              </button>
              <button
                style={customStyles?.controlButton}
                onClick={() =>
                  removeRow(secIndex, Object.keys(section.seats).slice(-1)[0])
                }
              >
                Delete Last Row
              </button>
              <button
                style={customStyles?.controlButton}
                onClick={() => removeColumn(secIndex)}
              >
                Delete Last Column
              </button>
              <button
                className="theaterSeatLayoutDesigner-delete-section-btn"
                style={{
                  ...customStyles?.controlButton,
                  ...customStyles?.deleteSectionBtn,
                }}
                onClick={() => removeSection(secIndex)}
              >
                Delete Section
              </button>
            </div>

            {/* Seat Grid */}
            <div
              className="theaterSeatLayoutDesigner-seat-grid"
              style={customStyles.seatGrid}
            >
              {Object.entries(section.seats).map(([rowLabel, row]) => (
                <div
                  className="theaterSeatLayoutDesigner-seat-row"
                  key={rowLabel}
                  style={customStyles.row}
                >
                  {/* Row Label */}
                  <div
                    className="theaterSeatLayoutDesigner-row-label"
                    onClick={() =>
                      setSelected({
                        type: "row",
                        secIndex,
                        rowLabel,
                        inspectorDisplayLabelValue: rowLabel,
                      })
                    }
                    style={customStyles.rowLabel}
                  >
                    <span>{rowLabel}</span>
                  </div>

                  {/* Seats */}
                  <div
                    className="theaterSeatLayoutDesigner-seat-group"
                    style={customStyles.seatGroup}
                  >
                    {row?.map((seat, colIndex) => (
                      <div
                        key={`${rowLabel}-${colIndex}`}
                        className={`theaterSeatLayoutDesigner-seat theaterSeatLayoutDesigner-${
                          seat.isBlank ? "blankSeat" : "AVAILABLE"
                        }`}
                        style={{
                          ...customStyles.seat,
                          ...(selected?.type === "seat" &&
                          selected?.rowLabel === rowLabel &&
                          selected?.seatIndex === colIndex &&
                          selected?.secIndex === secIndex
                            ? customStyles.selectedSeat
                            : {}),
                          ...(seat.isBlank ? customStyles.blankSeat : {}),
                        }}
                        onClick={() =>
                          setSelected({
                            type: "seat",
                            secIndex,
                            rowLabel,
                            seatIndex: colIndex,
                          })
                        }
                      >
                        {seat.label}
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
            <button onClick={addSection} style={customStyles?.controlButton}>
              + Add Section
            </button>
          </div>
          <div className="theaterSeatLayoutDesigner-add-section-box">
            <button onClick={exportToJSON} style={customStyles?.controlButton}>
              Export to JSON
            </button>
          </div>
        </div>
      </div>

      {/* Inspector */}
      <div
        className="theaterSeatLayoutDesigner-inspector"
        style={customStyles?.inspectorBox}
      >
        <h3 style={customStyles?.inspectorHeader}>Inspector</h3>
        {!selected && (
          <p style={customStyles?.inspectorPlaceholder}>
            Select a section title, row label, or seat
          </p>
        )}

        {selected?.type === "section" && (
          <div>
            <label style={customStyles?.inspectorLabel}>Section Title</label>
            <input
              value={sections[selected.secIndex].title}
              onChange={(e) =>
                updateSectionTitle(selected.secIndex, e.target.value)
              }
              style={customStyles?.inspectorInput}
            />
          </div>
        )}

        {selected?.type === "row" && (
          <div>
            <label style={customStyles?.inspectorLabel}>Row label</label>
            <input
              value={selected.inspectorDisplayLabelValue}
              onChange={(e) => {
                const newLabel = e.target.value.trim();
                if (
                  newLabel &&
                  newLabel !== selected.rowLabel &&
                  !sections[selected.secIndex].seats[newLabel]
                ) {
                  updateRowLabel(
                    selected.secIndex,
                    selected.rowLabel,
                    e.target.value
                  );
                } else {
                  setSelected((prev) => {
                    if (!prev || prev.type !== "row") return prev; // only rows have editable label
                    return {
                      ...prev,
                      inspectorDisplayLabelValue: e.target.value,
                    };
                  });
                }
              }}
              style={customStyles?.inspectorInput}
            />
          </div>
        )}

        {selected?.type === "seat" && (
          <div>
            <label style={customStyles?.inspectorLabel}>Seat ID:</label>
            <input
              value={
                sections[selected.secIndex].seats[selected.rowLabel]?.[
                  selected.seatIndex
                ].id
              }
              onChange={(e) =>
                updateSeat(
                  selected.secIndex,
                  selected.rowLabel,
                  selected.seatIndex,
                  "id",
                  e.target.value
                )
              }
              style={customStyles?.inspectorInput}
            />
            <label style={customStyles?.inspectorLabel}>Seat Label:</label>
            <input
              value={
                sections[selected.secIndex].seats[selected.rowLabel]?.[
                  selected.seatIndex
                ].label || ""
              }
              onChange={(e) =>
                updateSeat(
                  selected.secIndex,
                  selected.rowLabel,
                  selected.seatIndex,
                  "label",
                  e.target.value
                )
              }
              style={customStyles?.inspectorInput}
            />
            <label className="theaterSeatLayoutDesigner-checkbox-label">
              <input
                type="checkbox"
                checked={
                  sections[selected.secIndex].seats[selected.rowLabel]?.[
                    selected.seatIndex
                  ].isBlank || false
                }
                onChange={(e) =>
                  updateSeat(
                    selected.secIndex,
                    selected.rowLabel,
                    selected.seatIndex,
                    "isBlank",
                    e.target.checked
                  )
                }
              />
              <span style={customStyles?.inspectorLabel}>Is Blank</span>
            </label>
          </div>
        )}
      </div>
    </div>
  );
};

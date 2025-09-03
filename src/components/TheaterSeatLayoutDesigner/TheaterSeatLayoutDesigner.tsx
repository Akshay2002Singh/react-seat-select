import { useState, useEffect } from "react";
import type { TheaterSeatSection } from "../TheaterSeatSelect/types";
import "./styles.css";
import type { TheaterSeatLayoutDesignerCustomStyles } from "./types";

interface TheaterSeatLayoutDesignerProps {
  config?: TheaterSeatSection[];
  onChange?: (config: TheaterSeatSection[]) => void;
  customStyles?: TheaterSeatLayoutDesignerCustomStyles;
}

type InspectorTarget =
  | { type: "section"; secIndex: number }
  | {
      type: "row";
      secIndex: number;
      rowLabel: string;
      inspectorDisplayLabelValue: string;
      isLabelValid: boolean;
    }
  | {
      type: "seat";
      secIndex: number;
      rowLabel: string;
      seatIndex: number;
      inspectorDisplayId: string;
      isIdValid: boolean;
    }
  | null;

export const TheaterSeatLayoutDesigner = ({
  config,
  onChange,
  customStyles = {},
}: TheaterSeatLayoutDesignerProps) => {
  const [sections, setSections] = useState<TheaterSeatSection[]>(
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
  const updateSections = (next: TheaterSeatSection[]) => {
    setSections(next);
    onChange?.(next);
  };

  // --- Helpers ---
  function createEmptySection(title = "Section 1"): TheaterSeatSection {
    return {
      title,
      seats: {},
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
      letters[Math.floor(Math.random() * letters.length)] +
      letters[Math.floor(Math.random() * letters.length)]
    );
  };

  const generateNextRowId = (rowKeys: string[]): string => {
    if (rowKeys.length === 0) return "A";
    // take last row key
    const lastKey = rowKeys[rowKeys.length - 1];
    let nextKey: string;
    // case: single char like A, B, C
    if (lastKey.length === 1 && /[A-Y]/.test(lastKey)) {
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

  // helpers
  const generateUniqueSeatId = (
    rowLable: string,
    existingIds: string[]
  ): string => {
    let id: string;
    do {
      const num = Math.floor(Math.random() * 1000); // 0–999
      id = rowLable + num.toString().padStart(3, "0"); // ensures 3 digits, e.g., "001"
    } while (existingIds.includes(id));
    return id;
  };

  // --- Row + Seat ---
  const addRow = (secIndex: number) => {
    const updated = [...sections];
    const rowKeys = Object.keys(updated[secIndex].seats);
    const nextRow = generateNextRowId(rowKeys);
    // determine number of seats in the first row as a template
    const cols = updated[secIndex].seats[rowKeys[0] as string]?.length ?? 1;
    // collect all existing seat IDs across all sections
    const existingIds = sections.flatMap((section) =>
      Object.values(section?.seats)?.flatMap(
        (row) => row?.map((seat) => seat?.id).filter(Boolean) ?? []
      )
    );

    updated[secIndex].seats[nextRow] = Array.from({ length: cols }, (_, i) => {
      const id = generateUniqueSeatId(nextRow, existingIds);
      existingIds.push(id); // ensure subsequent seats in this row are unique
      return {
        id,
        label: id,
        isBlank: false,
      };
    });
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
    // collect all existing seat IDs across all sections
    const existingIds = sections.flatMap((section) =>
      Object.values(section.seats).flatMap(
        (row) => row?.map((seat) => seat?.id).filter(Boolean) ?? []
      )
    );

    Object.entries(updated[secIndex].seats).forEach(([rowLabel, row]) => {
      // generate a unique ID for the new seat
      const id = generateUniqueSeatId(rowLabel, existingIds);
      existingIds.push(id); // ensure uniqueness for subsequent seats in this column

      row?.push({
        id,
        label: id,
        isBlank: false,
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
      isLabelValid: true,
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
      if (field === "id" && typeof value === "string") {
        setSelected(
          (prev) =>
            ({
              ...prev,
              inspectorDisplayId: value,
              isIdValid: true,
            } as InspectorTarget)
        );
      }
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
                        isLabelValid: true,
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
                          lineHeight: customStyles.seat?.lineHeight,
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
                            inspectorDisplayId: seat?.id,
                            isIdValid: true,
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
                } else if (newLabel && newLabel === selected.rowLabel) {
                  setSelected((prev) => {
                    if (!prev || prev.type !== "row") return prev; // only rows have editable label
                    return {
                      ...prev,
                      inspectorDisplayLabelValue: e.target.value,
                      isLabelValid: true,
                    };
                  });
                } else {
                  setSelected((prev) => {
                    if (!prev || prev.type !== "row") return prev; // only rows have editable label
                    return {
                      ...prev,
                      inspectorDisplayLabelValue: e.target.value,
                      isLabelValid: false,
                    };
                  });
                }
              }}
              style={customStyles?.inspectorInput}
              className={
                selected &&
                selected?.type === "row" &&
                selected.isLabelValid === false
                  ? "theaterSeatLayoutDesigner-inspector-invalid-id"
                  : ""
              }
            />
            <div
              style={{
                color: "red",
                fontSize: "12px",
                marginTop: "4px",
                ...customStyles.inspectorErrorMsg,
              }}
            >
              {selected &&
              selected?.type === "row" &&
              selected.isLabelValid === false
                ? "Invalid or Duplicate Value"
                : "\u00A0"}
            </div>
          </div>
        )}

        {selected?.type === "seat" && (
          <div>
            <label style={customStyles?.inspectorLabel}>Seat ID:</label>
            <input
              value={selected.inspectorDisplayId}
              onChange={(e) => {
                const newId = e.target.value.trim();
                const listOfExistingIds = sections.flatMap((section) =>
                  Object.values(section.seats).flatMap(
                    (row) => row?.map((seat) => seat.id).filter(Boolean) ?? []
                  )
                );
                if (newId && !listOfExistingIds?.includes(newId)) {
                  updateSeat(
                    selected.secIndex,
                    selected.rowLabel,
                    selected.seatIndex,
                    "id",
                    newId
                  );
                } else if (
                  sections[selected.secIndex].seats[selected.rowLabel]?.[
                    selected.seatIndex
                  ].id !== newId
                ) {
                  setSelected((prev) => {
                    if (!prev || prev.type !== "seat") return prev;
                    return {
                      ...prev,
                      inspectorDisplayId: newId,
                      isIdValid: false,
                    };
                  });
                } else {
                  setSelected((prev) => {
                    if (!prev || prev.type !== "seat") return prev;
                    return {
                      ...prev,
                      inspectorDisplayId: e.target.value,
                      isIdValid: true,
                    };
                  });
                }
              }}
              style={customStyles?.inspectorInput}
              className={
                selected &&
                selected?.type === "seat" &&
                selected.isIdValid === false
                  ? "theaterSeatLayoutDesigner-inspector-invalid-id"
                  : ""
              }
            />
            <div
              style={{
                color: "red",
                fontSize: "12px",
                marginTop: "4px",
                ...customStyles.inspectorErrorMsg,
              }}
            >
              {selected &&
              selected?.type === "seat" &&
              selected.isIdValid === false
                ? "Invalid or Duplicate Value"
                : "\u00A0"}
            </div>

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

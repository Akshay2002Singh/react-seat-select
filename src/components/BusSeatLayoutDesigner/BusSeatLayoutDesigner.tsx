import React, { useEffect, useState } from "react";
import type { BusConfig, Seat, Section } from "../BusSeatSelect/types";
import "./styles.css";

interface CustomStyles {
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

  // Inspector panel
  inspector?: React.CSSProperties;
  inspectorHeading?: React.CSSProperties;
  inspectorForm?: React.CSSProperties;
  inspectorLabel?: React.CSSProperties;
  inspectorInput?: React.CSSProperties;
  inspectorPlaceholder?: React.CSSProperties;
  inspectorErrorMsg?: React.CSSProperties;
}

interface BusSeatLayoutDesignerProps {
  config?: BusConfig;
  onChange?: (config: BusConfig) => void;
  customStyles?: CustomStyles;
}

export const BusSeatLayoutDesigner = ({
  config,
  onChange,
  customStyles = {},
}: BusSeatLayoutDesignerProps) => {
  const [sections, setSections] = useState<Section[]>(config ?? []);
  const [selected, setSelected] = useState<{
    type: "seat" | "column" | "section";
    secIndex: number;
    colIndex?: number;
    seatIndex?: number;
    isSeatIdValid?: boolean;
    inspectorDisplaySeatId?: string;
  } | null>(null);

  // Sync prop → state when config changes externally
  useEffect(() => {
    if (config) {
      setSections(config);
      onChange?.(config);
    }
  }, [config]);

  // helpers
  const generateUniqueSeatId = (): string => {
    const existingIds = sections?.flatMap(
      (section) =>
        section?.columns?.flatMap((column) =>
          column?.seats?.map((seat) => seat?.id)
        ) ?? []
    );
    let id: string;
    do {
      const num = Math.floor(Math.random() * 100000); // 0–99999
      id = num.toString().padStart(5, "0"); // ensures 5 digits, e.g., "00001"
    } while (existingIds.includes(id));
    return id;
  };

  // ---- sections
  const addSection = () => {
    setSections((prev) => {
      const next = [...prev, { title: "Section title", columns: [] }];
      onChange?.(next);
      return next;
    });
  };
  const updateSectionTitle = (secIndex: number, title: string) => {
    setSections((prev) => {
      const next = [...prev];
      next[secIndex] = { ...next[secIndex], title };
      onChange?.(next);
      return next;
    });
  };

  const removeSection = (secIndex: number) => {
    setSections((prev) => {
      let next = [...prev];
      next = next.filter((_, i) => i !== secIndex);
      onChange?.(next);
      return next;
    });
  };

  // ---- columns
  const addColumn = (secIndex: number) => {
    setSections((prev) => {
      // create copy of sections
      const next = [...prev];
      // get section to update
      const section = next[secIndex];
      // get columns array of section and create a copy
      const cols = [...section.columns];

      if (cols.length > 0) {
        let lastColId = cols[cols.length - 1].id;
        cols.push({ id: (Number(lastColId) + 1).toString(), seats: [] });
      } else {
        cols.push({ id: (1).toString(), seats: [] });
      }

      next[secIndex] = { ...section, columns: cols };
      onChange?.(next);
      return next;
    });
  };

  const removeColumn = (secIndex: number, colIndex: number) =>
    setSections((prev) => {
      // create copy of sections
      const next = [...prev];
      // get section to update
      const section = next[secIndex];
      // get columns array of section
      const cols = section.columns.filter((_, i) => i !== colIndex);

      next[secIndex] = { ...section, columns: cols };
      onChange?.(next);
      return next;
    });

  // ---- seats
  const addSeat = (
    secIndex: number,
    colIndex: number,
    type: "seater" | "sleeper"
  ) => {
    setSections((prev) => {
      // create copy of sections
      const next = [...prev];
      // get section to update and create a copy
      const section = { ...next[secIndex] };
      // get columns array of section and create a copy
      const cols = [...section.columns];
      // get specific column and create a copy
      const col = { ...cols[colIndex], seats: [...cols[colIndex].seats] };

      const newId = generateUniqueSeatId();

      // push new seat
      col.seats.push({
        id: newId,
        type,
        isBlank: false,
      });
      cols[colIndex] = col;
      section.columns = cols;
      next[secIndex] = section;
      onChange?.(next);
      return next;
    });
  };

  const updateSeat = (
    secIndex: number,
    colIndex: number,
    seatIndex: number,
    field: keyof Seat,
    value: string | boolean
  ) => {
    setSections((prev) => {
      // create copy of sections
      const next = [...prev];
      // clone the section
      const section = { ...next[secIndex] };
      // clone the columns
      const cols = [...section.columns];
      // clone the target column
      const col = { ...cols[colIndex], seats: [...cols[colIndex].seats] };
      // clone and update the seat
      const seat = { ...col.seats[seatIndex], [field]: value };

      col.seats[seatIndex] = seat;
      cols[colIndex] = col;
      section.columns = cols;
      next[secIndex] = section;
      onChange?.(next);
      return next;
    });
    if (
      selected?.type === "seat" &&
      field === "id" &&
      typeof value === "string"
    ) {
      setSelected((prev) => {
        if (!prev || prev.type !== "seat") return prev;
        return {
          ...prev,
          isSeatIdValid: true,
          inspectorDisplaySeatId: value,
        };
      });
    }
  };

  const removeLastSeat = (secIndex: number, colIndex: number) => {
    setSections((prev) => {
      // create copy of sections
      const next = [...prev];
      // clone the section
      const section = { ...next[secIndex] };
      // clone the columns
      const cols = [...section.columns];
      // clone the target column
      const col = { ...cols[colIndex], seats: [...cols[colIndex].seats] };
      // remove last seat if exists
      if (col.seats.length > 0) {
        col.seats.pop();
      }
      // rebuild
      cols[colIndex] = col;
      section.columns = cols;
      next[secIndex] = section;
      onChange?.(next);
      return next;
    });
  };

  // ---- export
  const exportToJSON = () => {
    const text = JSON.stringify(Object.values(sections), null, 2);
    const blob = new Blob([text], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "bus-layout.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="busSeatLayoutDesigner-root" style={customStyles?.root}>
      <div
        className="busSeatLayoutDesigner-workspace"
        style={customStyles?.workspace}
      >
        {/* canvas */}
        <div
          className="busSeatLayoutDesigner-canvas"
          style={customStyles?.canvas}
        >
          {sections.map((section, secIndex) => (
            <section
              key={secIndex}
              className="busSeatLayoutDesigner-section"
              style={customStyles?.section}
            >
              <header
                className="busSeatLayoutDesigner-sectionHeader"
                style={customStyles?.sectionHeader}
                onClick={() => setSelected({ type: "section", secIndex })}
              >
                <span
                  className="busSeatLayoutDesigner-sectionTitleDisplay"
                  style={customStyles?.sectionTitle}
                >
                  {section.title}
                </span>
                <button
                  className="busSeatLayoutDesigner-delete-section-btn"
                  style={{
                    ...customStyles?.controlsButton,
                    ...customStyles?.deleteSectionBtn,
                  }}
                  onClick={() => removeSection(secIndex)}
                  title="Remove section"
                >
                  Delete Section
                </button>
              </header>

              <div
                className="busSeatLayoutDesigner-columns"
                style={customStyles?.columns}
              >
                {section.columns.map((col, colIndex) => (
                  <div
                    className="busSeatLayoutDesigner-column"
                    style={customStyles?.column}
                    key={col.id}
                  >
                    <div
                      className="busSeatLayoutDesigner-seats"
                      style={customStyles?.seats}
                    >
                      {col.seats.map((seat, seatIndex) => {
                        const cls = [
                          "busSeatLayoutDesigner-seat",
                          seat.isBlank ? "is-blank" : "",
                          seat.type === "sleeper" ? "is-sleeper" : "is-seater",
                        ]
                          .filter(Boolean)
                          .join(" ");
                        const isSelected =
                          selected?.type === "seat" &&
                          selected.secIndex === secIndex &&
                          selected.colIndex === colIndex &&
                          selected.seatIndex === seatIndex;

                        return (
                          <div
                            key={seatIndex}
                            className={cls}
                            style={{
                              ...customStyles.seat,
                              ...(seat.type === "seater"
                                ? customStyles.seaterSeat
                                : {}),
                              ...(seat.type === "sleeper"
                                ? customStyles.sleeperSeat
                                : {}),
                              ...(seat.isBlank ? customStyles.blankSeat : {}),
                              ...(isSelected ? customStyles.selectedSeat : {}),
                            }}
                            onClick={() =>
                              setSelected({
                                type: "seat",
                                secIndex,
                                colIndex,
                                seatIndex,
                                inspectorDisplaySeatId: seat?.id,
                                isSeatIdValid: true,
                              })
                            }
                            title={seat.id || "Seat"}
                          >
                            {!seat.isBlank && (
                              <span className="busSeatLayoutDesigner-seatLabel">
                                {seat.id || "?"}
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    <div
                      className="busSeatLayoutDesigner-controls"
                      style={customStyles.controls}
                    >
                      <button
                        className="busSeatLayoutDesigner-btn busSeatLayoutDesigner-btn--tiny"
                        style={customStyles.controlsButton}
                        onClick={() => addSeat(secIndex, colIndex, "seater")}
                      >
                        + Seater
                      </button>
                      <button
                        className="busSeatLayoutDesigner-btn busSeatLayoutDesigner-btn--tiny"
                        style={customStyles.controlsButton}
                        onClick={() => addSeat(secIndex, colIndex, "sleeper")}
                      >
                        + Sleeper
                      </button>
                    </div>
                    <div
                      className="busSeatLayoutDesigner-controls"
                      style={customStyles.controls}
                    >
                      <button
                        className="busSeatLayoutDesigner-btn busSeatLayoutDesigner-btn--tiny"
                        style={customStyles.controlsButton}
                        onClick={() => removeColumn(secIndex, colIndex)}
                      >
                        Remove Column
                      </button>
                      <button
                        className="busSeatLayoutDesigner-btn busSeatLayoutDesigner-btn--tiny"
                        style={customStyles.controlsButton}
                        onClick={() => removeLastSeat(secIndex, colIndex)}
                      >
                        Remove Last Seat
                      </button>
                    </div>
                  </div>
                ))}

                <button
                  className="busSeatLayoutDesigner-addColumnCard"
                  onClick={() => addColumn(secIndex)}
                  title="Add column"
                  style={customStyles.addColumnCard}
                >
                  + Column
                </button>
              </div>
            </section>
          ))}

          {/* bottom global actions */}
          <div className="busSeatLayoutDesigner-bottomActions">
            <button
              className="busSeatLayoutDesigner-btn"
              onClick={addSection}
              style={customStyles.controlsButton}
            >
              + Add Section
            </button>
            <button
              className="busSeatLayoutDesigner-btn"
              onClick={exportToJSON}
              style={customStyles.controlsButton}
            >
              Export JSON
            </button>
          </div>
        </div>

        {/* inspector */}
        <aside
          className="busSeatLayoutDesigner-inspector"
          style={customStyles?.inspector}
        >
          <h3 style={customStyles?.inspectorHeading}>Inspector</h3>
          {!selected && (
            <div
              className="busSeatLayoutDesigner-placeholder"
              style={customStyles?.inspectorPlaceholder}
            >
              Select a section title or seat
            </div>
          )}

          {selected?.type === "seat" &&
            (() => {
              const s = sections[selected.secIndex];
              const seat =
                s.columns[selected.colIndex!].seats?.[selected.seatIndex!];
              return (
                <div
                  className="busSeatLayoutDesigner-form"
                  style={customStyles?.inspectorForm}
                >
                  <label style={customStyles?.inspectorLabel}>Seat ID</label>
                  <input
                    style={customStyles?.inspectorInput}
                    value={selected?.inspectorDisplaySeatId}
                    onChange={(e) => {
                      const newId = e.target.value.trim();
                      const listOfExistingIds = sections.flatMap((section) =>
                        section.columns.flatMap((column) =>
                          column.seats.map((seat) => seat.id)
                        )
                      );
                      if (newId && !listOfExistingIds?.includes(newId)) {
                        updateSeat(
                          selected.secIndex,
                          selected.colIndex!,
                          selected.seatIndex!,
                          "id",
                          newId
                        );
                      } else if (seat?.id !== newId) {
                        setSelected((prev) => {
                          if (!prev || prev.type !== "seat") return prev;
                          return {
                            ...prev,
                            inspectorDisplaySeatId: newId,
                            isSeatIdValid: false,
                          };
                        });
                      } else {
                        setSelected((prev) => {
                          if (!prev || prev.type !== "seat") return prev;
                          return {
                            ...prev,
                            inspectorDisplaySeatId: newId,
                            isSeatIdValid: true,
                          };
                        });
                      }
                    }}
                    className={
                      selected &&
                      selected.type === "seat" &&
                      selected.isSeatIdValid === false
                        ? "busSeatLayoutDesigner-invalid-id"
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
                    selected.isSeatIdValid === false
                      ? "Invalid or Duplicate Value"
                      : "\u00A0"}
                  </div>

                  <label style={customStyles?.inspectorLabel}>Type</label>
                  <select
                    style={customStyles?.inspectorInput}
                    value={seat?.type}
                    onChange={(e) =>
                      updateSeat(
                        selected.secIndex,
                        selected.colIndex!,
                        selected.seatIndex!,
                        "type",
                        e.target.value
                      )
                    }
                  >
                    <option value="seater">Seater</option>
                    <option value="sleeper">Sleeper</option>
                  </select>

                  <label className="busSeatLayoutDesigner-checkbox">
                    <input
                      type="checkbox"
                      checked={seat?.isBlank}
                      onChange={(e) =>
                        updateSeat(
                          selected.secIndex,
                          selected.colIndex!,
                          selected.seatIndex!,
                          "isBlank",
                          e.target.checked
                        )
                      }
                    />
                    <span style={customStyles?.inspectorLabel}>Is Blank</span>
                  </label>
                </div>
              );
            })()}

          {selected?.type === "section" && (
            <div
              className="busSeatLayoutDesigner-form"
              style={customStyles?.inspectorForm}
            >
              <label style={customStyles?.inspectorLabel}>Section Title</label>
              <input
                style={customStyles?.inspectorInput}
                value={sections[selected.secIndex]?.title}
                onChange={(e) =>
                  updateSectionTitle(selected.secIndex, e.target.value)
                }
              />
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};

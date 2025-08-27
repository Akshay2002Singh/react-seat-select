import { useState } from "react";
import type { BusConfig, Seat, Section } from "../BusSeatSelect/types";
import "./styles.css";

type Sections = Record<string, Section>;

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
  controlsActionButton?: React.CSSProperties;
  addColumnCard?: React.CSSProperties;
  bottomActions?: React.CSSProperties;

  // Inspector panel
  inspector?: React.CSSProperties;
  inspectorHeading?: React.CSSProperties;
  inspectorForm?: React.CSSProperties;
  inspectorLabel?: React.CSSProperties;
  inspectorInput?: React.CSSProperties;
  inspectorPlaceholder?: React.CSSProperties;
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
  const [sections, setSections] = useState<Sections>({});
  const [selected, setSelected] = useState<{
    type: "seat" | "column" | "section";
    secKey: string;
    colIndex?: number;
    seatIndex?: number;
  } | null>(null);

  // ---- sections
  const addSection = () => {
    const key = `Section${Object.keys(sections).length + 1}`;
    setSections((prev) => ({ ...prev, [key]: { title: key, columns: [] } }));
  };
  const updateSectionTitle = (key: string, title: string) =>
    setSections((p) => ({ ...p, [key]: { ...p[key], title } }));
  const removeSection = (key: string) => {
    const next = { ...sections };
    delete next[key];
    setSections(next);
    setSelected(null);
  };

  // ---- columns
  const addColumn = (secKey: string) =>
    setSections((p) => {
      const id = `col${p[secKey].columns.length + 1}`;
      return {
        ...p,
        [secKey]: {
          ...p[secKey],
          columns: [...p[secKey].columns, { id, seats: [] }],
        },
      };
    });

  const removeColumn = (secKey: string, colIndex: number) =>
    setSections((p) => {
      const cols = [...p[secKey].columns];
      cols.splice(colIndex, 1);
      return { ...p, [secKey]: { ...p[secKey], columns: cols } };
    });

  // ---- seats
  const addSeat = (
    secKey: string,
    colIndex: number,
    type: "seater" | "sleeper"
  ) =>
    setSections((p) => {
      const cols = p[secKey].columns.map((c, i) =>
        i === colIndex
          ? { ...c, seats: [...c.seats, { id: `S${c.seats.length + 1}`, type, isBlank: false }] }
          : c
      );
      return { ...p, [secKey]: { ...p[secKey], columns: cols } };
    });

  const updateSeat = (
    secKey: string,
    colIndex: number,
    seatIndex: number,
    field: keyof Seat,
    value: string | boolean
  ) =>
    setSections((p) => {
      const cols = [...p[secKey].columns];
      (cols[colIndex].seats[seatIndex] as any)[field] = value;
      return { ...p, [secKey]: { ...p[secKey], columns: cols } };
    });

  const removeSeat = (secKey: string, colIndex: number, seatIndex: number) =>
    setSections((p) => {
      const cols = [...p[secKey].columns];
      cols[colIndex].seats.splice(seatIndex, 1);
      return { ...p, [secKey]: { ...p[secKey], columns: cols } };
    });

  const removeLastSeat = (secKey: string, colIndex: number) =>
    setSections((p) => {
      const cols = [...p[secKey].columns];
      if (cols[colIndex].seats.length > 0) {
        cols[colIndex].seats.pop();
      }
      return { ...p, [secKey]: { ...p[secKey], columns: cols } };
    });

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
          {Object.entries(sections).map(([secKey, section]) => (
            <section
              key={secKey}
              className="busSeatLayoutDesigner-section"
              style={customStyles?.section}
              onClick={() => setSelected({ type: "section", secKey })}
            >
              <header
                className="busSeatLayoutDesigner-sectionHeader"
                style={customStyles?.sectionHeader}
              >
                <span
                  className="busSeatLayoutDesigner-sectionTitleDisplay"
                  style={customStyles?.sectionTitle}
                >
                  {section.title}
                </span>
                <button
                  className="busSeatLayoutDesigner-delete-section-btn"
                  style={customStyles?.deleteSectionBtn}
                  onClick={() => removeSection(secKey)}
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
                          selected.secKey === secKey &&
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
                                secKey,
                                colIndex,
                                seatIndex,
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
                        style={customStyles.controlsActionButton}
                        onClick={() => addSeat(secKey, colIndex, "seater")}
                      >
                        + Seater
                      </button>
                      <button
                        className="busSeatLayoutDesigner-btn busSeatLayoutDesigner-btn--tiny"
                        style={customStyles.controlsActionButton}
                        onClick={() => addSeat(secKey, colIndex, "sleeper")}
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
                        style={customStyles.controlsActionButton}
                        onClick={() => removeColumn(secKey, colIndex)}
                      >
                        Remove Column
                      </button>
                      <button
                        className="busSeatLayoutDesigner-btn busSeatLayoutDesigner-btn--tiny"
                        style={customStyles.controlsActionButton}
                        onClick={() => removeLastSeat(secKey, colIndex)}
                      >
                        Remove Last Seat
                      </button>
                    </div>
                  </div>
                ))}

                <button
                  className="busSeatLayoutDesigner-addColumnCard"
                  onClick={() => addColumn(secKey)}
                  title="Add column"
                  style={customStyles.addColumnCard}
                >
                  + Column
                </button>
              </div>
            </section>
          ))}

          {/* bottom global actions */}
          <div
            className="busSeatLayoutDesigner-bottomActions"
            style={customStyles?.bottomActions}
          >
            <button className="busSeatLayoutDesigner-btn" onClick={addSection}>
              + Add Section
            </button>
            <button
              className="busSeatLayoutDesigner-btn"
              onClick={exportToJSON}
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
              const s = sections[selected.secKey];
              const seat =
                s.columns[selected.colIndex!].seats[selected.seatIndex!];
              return (
                <div className="busSeatLayoutDesigner-form" style={customStyles?.inspectorForm}>
                    <label style={customStyles?.inspectorLabel}>Seat ID</label>
                    <input
                      style={customStyles?.inspectorInput}
                      value={seat.id}
                      onChange={(e) =>
                        updateSeat(
                          selected.secKey,
                          selected.colIndex!,
                          selected.seatIndex!,
                          "id",
                          e.target.value
                        )
                      }
                    />
                    <label style={customStyles?.inspectorLabel}>Type</label>
                    <select
                      style={customStyles?.inspectorInput}
                      value={seat.type}
                      onChange={(e) =>
                        updateSeat(
                          selected.secKey,
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

                    <label
                      className="busSeatLayoutDesigner-checkbox">
                      <input
                      type="checkbox"
                      checked={seat.isBlank}
                      onChange={(e) =>
                        updateSeat(
                          selected.secKey,
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
            <div className="busSeatLayoutDesigner-form" style={customStyles?.inspectorForm}>
              <label style={customStyles?.inspectorLabel}>
                Section Title
              </label>
               <input
                  style={customStyles?.inspectorInput}
                  value={sections[selected.secKey].title}
                  onChange={(e) =>
                    updateSectionTitle(selected.secKey, e.target.value)
                  }
                />
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};

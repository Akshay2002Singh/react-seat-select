import { useState } from "react";
import type { Seat, Section } from "../BusSeatSelect/types";
import "./styles.css";

type Sections = Record<string, Section>;

export const BusSeatLayoutDesigner = () => {
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
    <div className="busSeatLayoutDesigner-root">
      <div className="busSeatLayoutDesigner-workspace">
        {/* canvas */}
        <div className="busSeatLayoutDesigner-canvas">
          {Object.entries(sections).map(([secKey, section]) => (
            <section key={secKey} className="busSeatLayoutDesigner-section">
              <header
                className="busSeatLayoutDesigner-sectionHeader"
                onClick={() => setSelected({ type: "section", secKey })}
              >
                <span className="busSeatLayoutDesigner-sectionTitleDisplay">
                  {section.title}
                </span>
                <button
                  className="busSeatLayoutDesigner-delete-section-btn"
                  onClick={() => removeSection(secKey)}
                  title="Remove section"
                >
                  Delete Section
                </button>
              </header>

              <div className="busSeatLayoutDesigner-columns">
                {section.columns.map((col, colIndex) => (
                  <div className="busSeatLayoutDesigner-column" key={col.id}>

                    <div className="busSeatLayoutDesigner-seats">
                      {col.seats.map((seat, seatIndex) => {
                        const cls = [
                          "busSeatLayoutDesigner-seat",
                          seat.isBlank ? "is-blank" : "",
                          seat.type === "sleeper" ? "is-sleeper" : "is-seater",
                        ]
                          .filter(Boolean)
                          .join(" ");
                        return (
                          <div
                            key={seatIndex}
                            className={cls}
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

                    <div className="busSeatLayoutDesigner-colActions">
                      <button
                        className="busSeatLayoutDesigner-btn busSeatLayoutDesigner-btn--tiny"
                        onClick={() => addSeat(secKey, colIndex, "seater")}
                      >
                        + Seater
                      </button>
                      <button
                        className="busSeatLayoutDesigner-btn busSeatLayoutDesigner-btn--tiny"
                        onClick={() => addSeat(secKey, colIndex, "sleeper")}
                      >
                        + Sleeper
                      </button>
                    </div>
                    <div className="busSeatLayoutDesigner-colActions">
                      <button
                        className="busSeatLayoutDesigner-btn busSeatLayoutDesigner-btn--tiny"
                        onClick={() => removeColumn(secKey, colIndex)}
                      >
                        Remove Column
                      </button>
                      <button
                        className="busSeatLayoutDesigner-btn busSeatLayoutDesigner-btn--tiny"
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
            >
              + Add Section
            </button>
            <button className="busSeatLayoutDesigner-btn" onClick={exportToJSON}>
              Export JSON
            </button>
          </div>
        </div>

        {/* inspector */}
        <aside className="busSeatLayoutDesigner-inspector">
          <h3>Inspector</h3>
          {!selected && (
            <div className="busSeatLayoutDesigner-empty">
              Select a section title or seat
            </div>
          )}

          {selected?.type === "seat" &&
            (() => {
              const s = sections[selected.secKey];
              const seat =
                s.columns[selected.colIndex!].seats[selected.seatIndex!];
              return (
                <div className="busSeatLayoutDesigner-form">
                  <label>
                    Seat ID
                    <input
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
                  </label>
                  <label>
                    Type
                    <select
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
                  </label>
                  <label className="busSeatLayoutDesigner-checkbox">
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
                    <span>Is Blank</span>
                  </label>
                </div>
              );
            })()}

          {selected?.type === "column" && (
            <div className="busSeatLayoutDesigner-subtle">
              Editing column:{" "}
              {sections[selected.secKey].columns[selected.colIndex!].id}
            </div>
          )}
          {selected?.type === "section" && (
            <div className="busSeatLayoutDesigner-form">
              <label>
                Section Title
                <input
                  value={sections[selected.secKey].title}
                  onChange={(e) =>
                    updateSectionTitle(selected.secKey, e.target.value)
                  }
                />
              </label>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};

import React, { useState } from "react";
import "./styles.css";
import type {
  CustomStyles,
  screenConfig,
  Seat,
  SeatConfig,
  SeatSection,
} from "./types";
import { getScreenSVG } from "./utils";

type Props = {
  config: SeatConfig;
  bookedSeats?: string[];
  disabledSeats?: string[];
  reservedSeats?: string[];
  onSelect?: (seat: Seat) => void;
  onUnselect?: (seat: Seat) => void;
  showRowNumbers?: boolean;
  maxSelectedSeats?: number;
  autoSeatExpansion?: boolean;
  customStyles?: CustomStyles;
  showBookedSeatLabel?: boolean;
  showDisabledSeatLabel?: boolean;
  showReservedSeatLabel?: boolean;
  showBlankSeatLabel?: boolean;
  showSelectedSeatLabel?: boolean;
  showDefaultScreen?: boolean;
  screenConfig?: screenConfig;
  CustomScreenComponent?: React.ComponentType;
  CustomLegendComponent?: React.ComponentType;
  showDefaultLegend?: boolean;
  legendConfig?: {
    bookedSeatText?: string;
    selectedSeatText?: string;
    reservedSeatText?: string;
    disabledSeatText?: string;
    availableSeatText?: string;
  };
};

const SEAT_STATUS: Record<string, string> = {
  BOOKED: "BOOKED",
  DISABLED: "DISABLED",
  SELECTED: "SELECTED",
  RESERVED: "RESERVED",
  AVAILABLE: "AVAILABLE",
};

export const TheaterSeatSelect: React.FC<Props> = ({
  config = [],
  bookedSeats = [],
  disabledSeats = [],
  reservedSeats = [],
  onSelect = () => {},
  onUnselect = () => {},
  showRowNumbers = true,
  maxSelectedSeats = null,
  autoSeatExpansion = true,
  customStyles = [],
  showBookedSeatLabel = false,
  showDisabledSeatLabel = false,
  showReservedSeatLabel = false,
  showBlankSeatLabel = false,
  showSelectedSeatLabel = true,
  showDefaultScreen = true,
  screenConfig = {
    screenVariant: 3,
    width: 600,
    color: "$fff",
  },
  CustomScreenComponent,
  CustomLegendComponent,
  showDefaultLegend = true,
  legendConfig = {
    bookedSeatText: "Booked",
    selectedSeatText: "Selected",
    reservedSeatText: "Reserved",
    disabledSeatText: "Disabled",
    availableSeatText: "Available",
  },
}) => {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const isSeatUnavailable = (seat: Seat) =>
    bookedSeats?.includes(seat.id) ||
    disabledSeats?.includes(seat.id) ||
    reservedSeats?.includes(seat.id);

  function getSeatsByIds(ids: string[]): Seat[] {
    const result: Seat[] = [];

    const idSet = new Set(ids);

    for (const section of config) {
      for (const rowKey in section.seats) {
        const row = section.seats[rowKey] || [];
        for (const seat of row) {
          if (seat.id && idSet.has(seat.id)) {
            result.push(seat);
          }
        }
      }
    }

    return result;
  }

  const handleSeatClick = (
    clickedSeat: Seat,
    rowLabel: string,
    section: SeatSection
  ) => {
    const rowSeats = section?.seats?.[rowLabel];
    if (!rowSeats) return;

    if (selectedSeats.includes(clickedSeat.id)) {
      const updated = selectedSeats.filter((id) => id !== clickedSeat.id);
      setSelectedSeats(updated);
      onUnselect(clickedSeat);
      return;
    } else if (autoSeatExpansion && maxSelectedSeats) {
      if (
        selectedSeats.length == maxSelectedSeats ||
        selectedSeats.length == 0
      ) {
        if(selectedSeats.length === maxSelectedSeats){
          // call callback for unSelect seats
          getSeatsByIds(selectedSeats)?.forEach(seat => onUnselect(seat)); 
        }
        const requiredSeats = maxSelectedSeats;
        const clickedIndex = rowSeats.findIndex(
          (seat: Seat) => seat.id === clickedSeat.id
        );
        if (clickedIndex === -1) return;

        const trySelect = (indexes: number[]): Seat[] => {
          const result: Seat[] = [];
          for (const i of indexes) {
            const seat = rowSeats[i];
            if (seat && !seat.isBlank && !isSeatUnavailable(seat)) {
              result.push(seat);
            } else {
              break;
            }
          }
          return result;
        };

        // 1. Try right side only
        const rightIndexes = Array.from(
          { length: requiredSeats - 1 },
          (_, i) => clickedIndex + i + 1
        );
        const rightSeats = trySelect(rightIndexes);

        if (rightSeats.length === requiredSeats - 1) {
          const newSelection = [clickedSeat.id, ...rightSeats.map((s) => s.id)];
          setSelectedSeats(newSelection);
          onSelect(clickedSeat);
          rightSeats.forEach((seat) => onSelect(seat));
          return;
        }

        // 2. Try left side only
        const leftIndexes = Array.from(
          { length: requiredSeats - 1 },
          (_, i) => clickedIndex - i - 1
        );
        const leftSeats = trySelect(leftIndexes);

        if (leftSeats.length === requiredSeats - 1) {
          const newSelection = [...leftSeats.map((s) => s.id), clickedSeat.id];
          setSelectedSeats(newSelection);
          onSelect(clickedSeat);
          leftSeats.forEach((seat) => onSelect(seat));
          return;
        }

        let combinedSeats = [...leftSeats, clickedSeat, ...rightSeats];

        combinedSeats = combinedSeats.slice(-maxSelectedSeats);

        const newSelection = [...combinedSeats.map((s) => s.id)];
        setSelectedSeats(newSelection);
        combinedSeats.forEach((seat) => onSelect(seat));
      } else {
        if (selectedSeats.length == maxSelectedSeats) {
          setSelectedSeats([clickedSeat.id]);
          return;
        }
        const newSelection = [...selectedSeats, clickedSeat.id];
        setSelectedSeats(newSelection);
        onSelect(clickedSeat);
      }
    } else if (!autoSeatExpansion && maxSelectedSeats) {
      if (selectedSeats.length == maxSelectedSeats) {
        getSeatsByIds(selectedSeats)?.forEach(seat => onUnselect(seat)); 
        setSelectedSeats([clickedSeat.id]);
        onSelect(clickedSeat);
        return;
      }
      const newSelection = [...selectedSeats, clickedSeat.id];
      setSelectedSeats(newSelection);
      onSelect(clickedSeat);
    } else {
      const newSelection = [...selectedSeats, clickedSeat.id];
      setSelectedSeats(newSelection);
      onSelect(clickedSeat);
    }
  };

  const getSeatStatus = (seatId: string) => {
    if (bookedSeats?.includes(seatId)) return SEAT_STATUS.BOOKED;
    if (disabledSeats?.includes(seatId)) return SEAT_STATUS.DISABLED;
    if (selectedSeats?.includes(seatId)) return SEAT_STATUS.SELECTED;
    if (reservedSeats?.includes(seatId)) return SEAT_STATUS.RESERVED;
    return SEAT_STATUS.AVAILABLE;
  };

  const shouldShowSeatLabel = (seatId: string) => {
    if (selectedSeats?.includes(seatId) && showBookedSeatLabel) return true;
    else if (reservedSeats?.includes(seatId) && showReservedSeatLabel)
      return true;
    else if (disabledSeats?.includes(seatId) && showDisabledSeatLabel)
      return true;
    else if (selectedSeats?.includes(seatId) && showSelectedSeatLabel)
      return true;
    else if (showBlankSeatLabel) return true;

    return false;
  };

  const renderDefaultLegend = () => {
    return (
      <div className="theaterSeatSelect-legend-container">
        {(customStyles && customStyles.length > 0 ? customStyles : [{}])?.map(
          (style, index) => (
            <div className="theaterSeatSelect-legend-row" key={index}>
              {legendConfig?.availableSeatText ? (
                <div className="theaterSeatSelect-legend-item">
                  <div
                    className={`theaterSeatSelect-seat theaterSeatSelect-${SEAT_STATUS.AVAILABLE}`}
                    style={{ ...style?.seatStyles, ...style?.availableStyles }}
                  />
                  <span>{legendConfig?.availableSeatText}</span>
                </div>
              ) : null}
              {legendConfig?.bookedSeatText ? (
                <div className="theaterSeatSelect-legend-item">
                  <div
                    className={`theaterSeatSelect-seat theaterSeatSelect-${SEAT_STATUS.BOOKED}`}
                    style={{ ...style?.seatStyles, ...style.bookedStyles }}
                  />
                  <span>{legendConfig?.bookedSeatText}</span>
                </div>
              ) : null}
              {legendConfig?.disabledSeatText ? (
                <div className="theaterSeatSelect-legend-item">
                  <div
                    className={`theaterSeatSelect-seat theaterSeatSelect-${SEAT_STATUS.DISABLED}`}
                    style={{ ...style?.seatStyles, ...style.disabledStyles }}
                  />
                  <span>{legendConfig?.disabledSeatText}</span>
                </div>
              ) : null}
              {legendConfig?.reservedSeatText ? (
                <div className="theaterSeatSelect-legend-item">
                  <div
                    className={`theaterSeatSelect-seat theaterSeatSelect-${SEAT_STATUS.RESERVED}`}
                    style={{ ...style?.seatStyles, ...style.reservedStyles }}
                  />
                  <span>{legendConfig?.reservedSeatText}</span>
                </div>
              ) : null}
              {legendConfig?.selectedSeatText ? (
                <div className="theaterSeatSelect-legend-item">
                  <div
                    className={`theaterSeatSelect-seat theaterSeatSelect-${SEAT_STATUS.SELECTED}`}
                    style={{ ...style?.seatStyles, ...style.selectedStyles }}
                  />
                  <span>{legendConfig?.selectedSeatText}</span>
                </div>
              ) : null}
            </div>
          )
        )}
      </div>
    );
  };

  return (
    <div className="theaterSeatSelect-wrapper">
      <div className="theaterSeatSelect-container">
        <div className="theaterSeatSelect">
          {config?.map((section, index) => {
            const currentSectionStyle =
              customStyles?.[index] ??
              customStyles[customStyles.length - 1] ??
              {};

            const {
              rowGap = "10px",
              columnGap = "6px",
              headerStyles = {},
              seatStyles = {},
              availableStyles = {},
              bookedStyles = {},
              disabledStyles = {},
              reservedStyles = {},
              selectedStyles = {},
            } = currentSectionStyle;

            const statusStyles: Record<string, React.CSSProperties> = {
              [SEAT_STATUS.SELECTED]: { ...seatStyles, ...selectedStyles },
              [SEAT_STATUS.DISABLED]: { ...seatStyles, ...disabledStyles },
              [SEAT_STATUS.BOOKED]: { ...seatStyles, ...bookedStyles },
              [SEAT_STATUS.RESERVED]: { ...seatStyles, ...reservedStyles },
              [SEAT_STATUS.AVAILABLE]: { ...seatStyles, ...availableStyles },
            };

            return (
              <div key={index}>
                {section?.title && (
                  <div
                    className="theaterSeatSelect-section-header"
                    style={{ ...headerStyles }}
                  >
                    {section.title}
                  </div>
                )}
                <div className="theaterSeatSelect-seat-grid" style={{ gap: rowGap }}>
                  {section?.seats
                    ? Object.entries(section.seats).map(
                        ([rowLabel, rowSeats]) => (
                          <div
                            className="theaterSeatSelect-seat-row"
                            key={rowLabel}
                            style={{ gap: columnGap }}
                          >
                            {showRowNumbers && (
                              <span
                                style={{
                                  height: seatStyles?.height || "32px",
                                  width: seatStyles?.width || "32px",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  flexShrink: 0,
                                }}
                              >
                                {rowLabel}
                              </span>
                            )}
                            <div
                              className="theaterSeatSelect-seat-group"
                              style={{ gap: columnGap }}
                            >
                              {rowSeats?.map((seat) => {
                                if (seat?.isBlank) {
                                  return (
                                    <div
                                      key={`blank-${rowLabel}-${seat.id}`}
                                      className="theaterSeatSelect-blankSeat"
                                      style={{
                                        height: seatStyles?.height || "32px",
                                        width: seatStyles?.width || "32px",
                                      }}
                                    />
                                  );
                                }

                                const status = getSeatStatus(seat.id);

                                return (
                                  <div
                                    key={seat.id}
                                    className={`theaterSeatSelect-seat theaterSeatSelect-${status}`}
                                    style={{
                                      ...statusStyles[status],
                                      pointerEvents: [
                                        SEAT_STATUS.DISABLED,
                                        SEAT_STATUS.RESERVED,
                                        SEAT_STATUS.BOOKED,
                                      ].includes(status)
                                        ? "none"
                                        : "auto",
                                    }}
                                    onClick={() =>
                                      handleSeatClick(seat, rowLabel, section)
                                    }
                                  >
                                    {shouldShowSeatLabel(seat?.id)
                                      ? seat.label || seat.id
                                      : null}
                                  </div>
                                );
                              })}
                              {/* add one blank seat for better spacing */}
                              <div
                                key={`last-blank-${rowLabel}`}
                                className="theaterSeatSelect-blankSeat"
                                style={{
                                  height: seatStyles?.height || "32px",
                                  width: seatStyles?.width || "32px",
                                }}
                              />
                            </div>
                          </div>
                        )
                      )
                    : null}
                </div>
              </div>
            );
          })}
          {CustomScreenComponent ? (
            <div className="theaterSeatSelect-screen-container">
              <CustomScreenComponent />
            </div>
          ) : showDefaultScreen ? (
            <div
              className="theaterSeatSelect-screen-container"
              dangerouslySetInnerHTML={{ __html: getScreenSVG(screenConfig) }}
            ></div>
          ) : null}
        </div>
      </div>
      {CustomLegendComponent ? (
        <div className="theaterSeatSelect-legend-container">
          <CustomLegendComponent />
        </div>
      ) : showDefaultLegend ? (
        renderDefaultLegend()
      ) : null}
    </div>
  );
};

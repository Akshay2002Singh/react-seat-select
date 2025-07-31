import React, { useState } from "react";
import "./styles.css";
import type { CustomStyles, screenConfig, Seat, SeatConfig } from "./types";
import { getScreenSVG } from "./utils";

type Props = {
  config: SeatConfig;
  bookedSeats?: string[];
  disabledSeats?: string[];
  reservedSeats?: string[];
  onSelect?: (seat: Seat) => void;
  onUnselect?: (seat: Seat) => void;
  showRowNumbers?: boolean;
  customStyles?: CustomStyles;
  showBookedSeatLabel?: boolean;
  showDisabledSeatLabel?: boolean;
  showReservedSeatLabel?: boolean;
  showBlankSeatLabel?: boolean;
  showSelectedSeatLabel?: boolean;
  showDefaultScreen?: boolean;
  screenConfig?: screenConfig;
  CustomScreenComponent?: React.ComponentType;
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
}) => {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const handleSeatClick = (seat: Seat) => {
    if (
      bookedSeats?.includes(seat.id) ||
      disabledSeats?.includes(seat.id) ||
      reservedSeats?.includes(seat?.id)
    )
      return;

    const newSelected = new Set(selectedSeats);
    if (newSelected.has(seat.id)) {
      newSelected.delete(seat.id);
      onUnselect(seat);
    } else {
      newSelected.add(seat.id);
      onSelect(seat);
    }
    setSelectedSeats([...newSelected]);
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

  return (
    <div className="threater-seat-selection">
      {config?.map((section, index) => {
        const currentSectionStyle =
          customStyles?.[index] ?? customStyles[customStyles.length - 1] ?? {};

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
              <div className="seat-section-header" style={{ ...headerStyles }}>
                {section.title}
              </div>
            )}
            <div className="seat-grid" style={{ gap: rowGap }}>
              {section?.seats
                ? Object.entries(section.seats).map(([rowLabel, rowSeats]) => (
                    <div
                      className="seat-row"
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
                          }}
                        >
                          {rowLabel}
                        </span>
                      )}
                      <div className="seat-group" style={{gap:columnGap}}>
                      {rowSeats?.map((seat) => {
                        if (seat?.isBlank) {
                          return (
                            <div
                              key={`blank-${rowLabel}-${seat.id}`}
                              className="blankSeat"
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
                            className={`seat ${status}`}
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
                            onClick={() => handleSeatClick(seat)}
                          >
                            {shouldShowSeatLabel(seat?.id)
                              ? seat.label || seat.id
                              : null}
                          </div>
                        );
                      })}
                      </div>
                    </div>
                  ))
                : null}
            </div>
          </div>
        );
      })}
      {CustomScreenComponent ? (
        <div className="screen-container">
          <CustomScreenComponent />
        </div>
      ) : showDefaultScreen ? (
        <div className="screen-container">
          <div
            dangerouslySetInnerHTML={{ __html: getScreenSVG(screenConfig) }}
          />
        </div>
      ) : null}
    </div>
  );
};

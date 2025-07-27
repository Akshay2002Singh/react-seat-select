import React, { useState } from "react";
import "./styles.css";
import type { CustomStyles, Seat } from "./types";

type Props = {
  seats: Record<string, Seat[]>;
  bookedSeats?: string[];
  disabledSeats?: string[];
  reservedSeats?: string[];
  onSelect?: (seat: Seat) => void;
  onUnselect?: (seat: Seat) => void;
  showRowNumbers?: boolean;
  styles?: CustomStyles;
};

const SEAT_STATUS: Record<string, string> = {
  BOOKED: "BOOKED",
  DISABLED: "DISABLED",
  SELECTED: "SELECTED",
  RESERVED: "RESERVED",
  AVAILABLE: "AVAILABLE",
};

export const TheaterSeatSelect: React.FC<Props> = ({
  seats,
  bookedSeats = [],
  disabledSeats = [],
  reservedSeats = [],
  onSelect = () => {},
  onUnselect = () => {},
  showRowNumbers = true,
  styles = {},
}) => {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

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
  } = styles;

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

  const getStatusStyle = (status: string) => {
    // const base = {
    //   padding: 0,
    //   width: seat?.width || "32px",
    //   height: seat?.height || "32px",
    //   fontSize: "14px",
    // };

    const statusStyles: Record<string, React.CSSProperties> = {
      [SEAT_STATUS.SELECTED]: { ...seatStyles, ...selectedStyles },
      [SEAT_STATUS.DISABLED]: { ...seatStyles, ...disabledStyles },
      [SEAT_STATUS.BOOKED]: { ...seatStyles, ...bookedStyles },
      [SEAT_STATUS.RESERVED]: { ...seatStyles, ...reservedStyles },
      [SEAT_STATUS.AVAILABLE]: { ...seatStyles, ...availableStyles },
    };

    return statusStyles[status];
  };

  return (
    <div className="seat-grid" style={{ gap: rowGap }}>
      {Object.entries(seats).map(([rowLabel, rowSeats]) => {
        if (rowSeats.length === 0) {
          return (
            <div
              className="seat-row-label-wrapper"
              style={{ ...headerStyles }}
              key={rowLabel}
            >
              {rowLabel}
            </div>
          );
        }

        return (
          <div className="seat-row" key={rowLabel} style={{ gap: columnGap }}>
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
            {rowSeats.map((seat) => {
              if (seat?.isBlank) {
                return <div className="blankSeat" style={{ ...seatStyles }} />;
              }
              const status = getSeatStatus(seat?.id);
              return (
                <div
                  key={seat?.id}
                  className={`seat ${status}`}
                  style={{
                    ...getStatusStyle(status),
                    pointerEvents: [
                      SEAT_STATUS.DISABLED,
                      SEAT_STATUS.RESERVED,
                      SEAT_STATUS.BOOKED,
                    ]?.includes(seat.id)
                      ? "none"
                      : "auto",
                  }}
                  onClick={() => handleSeatClick(seat)}
                >
                  {seat.label || seat.id}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

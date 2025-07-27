import React, { useState } from "react";
import "./styles.css";
import type { Seat } from "./types";

type Props = {
  seats: Record<string, Seat[]>;
  bookedSeats?: string[];
  disabledSeats?: string[];
  reservedSeats?: string[];
  onSelect?: (seat: Seat) => void;
  onUnselect?: (seat: Seat) => void;
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

  return (
    <div className="seat-grid">
      {Object.entries(seats).map(([rowLabel, rowSeats]) => {
        if(rowSeats.length === 0){
            return <div className="seat-row-label-wrapper"><span>{rowLabel}</span></div>
        }
        
        return ( 
        <div key={rowLabel} className="seat-row">
          {rowSeats.map((seat) => {
            if(seat?.isBlank){
                return <div className='blackSeat'/>
            }
            const status = getSeatStatus(seat?.id);
            return (
              <button
                key={seat?.id}
                className={`seat ${status}`}
                onClick={() => handleSeatClick(seat)}
                disabled={[SEAT_STATUS.DISABLED, SEAT_STATUS.RESERVED]?.includes(seat.id)}
              >
                {seat.label || seat.id}
              </button>
            );
          })}
        </div>
      )})}
    </div>
  );
};

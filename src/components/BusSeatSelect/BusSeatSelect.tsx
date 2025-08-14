import React, { useState } from "react";
import type { BusConfig, Column, CustomStyles, Seat, Section } from "./types";
import "./styles.css";

type Props = {
  config: BusConfig;
  bookedForFemaleSeats?: string[];
  bookedForMaleSeats?: string[];
  onSelect?: (seat: Seat) => void;
  onUnselect?: (seat: Seat) => void;
  maxSelectedSeats?: number;
  customStyles?: CustomStyles;
  showBookedSeatLabel?: boolean;
  showSelectedSeatLabel?: boolean;
  CustomLegendComponent?: React.ComponentType;
  showDefaultLegend?: boolean;
  legendConfig?: {
    bookedSeatText?: string;
    selectedSeatText?: string;
    availableSeatText?: string;
  };
};

const SEAT_STATUS: Record<string, string> = {
  BOOKED_FOR_FEMALE: "BOOKED_FOR_FEMALE",
  BOOKED_FOR_MALE: "BOOKED_FOR_MALE",
  SELECTED: "SELECTED",
  AVAILABLE: "AVAILABLE"
};

const BusSeatSelect = (props: Props) => {
  const {
    config = {},
    bookedForFemaleSeats = [],
    bookedForMaleSeats = [],
    onSelect = () => {},
    onUnselect = () => {},
    maxSelectedSeats = null,
    customStyles = [],
    showBookedSeatLabel = false,
    showSelectedSeatLabel = false,
    CustomLegendComponent,
    showDefaultLegend = true,
    legendConfig = {},
  } = props;

  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const getSeatStatus = (seatId: string) => {
    if (bookedForFemaleSeats?.includes(seatId))
      return SEAT_STATUS.BOOKED_FOR_FEMALE;
    if (bookedForMaleSeats?.includes(seatId))
      return SEAT_STATUS.BOOKED_FOR_MALE;
    if (selectedSeats?.includes(seatId)) return SEAT_STATUS.SELECTED;
    return SEAT_STATUS.AVAILABLE;
  };

  
  const shouldShowSeatLabel = (seatId: string) => {
    if ((bookedForFemaleSeats?.includes(seatId) || bookedForMaleSeats?.includes(seatId)) && showBookedSeatLabel) return true;
   
    else if (selectedSeats?.includes(seatId) && showSelectedSeatLabel)
      return true;

    return false;
  };

    const isSeatUnavailable = (seat: Seat) =>
      bookedForFemaleSeats?.includes(seat.id) ||
      bookedForMaleSeats?.includes(seat.id);

    const handleSeatClick = (
      clickedSeat: Seat,
    ) => {

     
      if (selectedSeats.includes(clickedSeat.id)) {
        const updated = selectedSeats.filter((id) => id !== clickedSeat.id);
        setSelectedSeats(updated);
        onUnselect(clickedSeat);
        return;
      }
      else if(maxSelectedSeats &&selectedSeats.length >= maxSelectedSeats){
            return;
        }
      else{
        if(!isSeatUnavailable(clickedSeat)){
          const updated = [...selectedSeats, clickedSeat.id];
          setSelectedSeats(updated);
          onSelect(clickedSeat);
        }
      }
    }

  return <div className="bus-seat-selection-wrapper">
        <div className="bus-seat-selection-container">
          <div className="bus-seat-selection" style={{gap:"10px"}}>
            {Object.entries(config)?.map(([sectionId, section], index) => {
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
                      className="seat-section-header"
                      style={{ ...headerStyles }}
                    >
                      {section.title}
                    </div>
                  )}
                  <div className="seat-grid" style={{ gap: columnGap }}>
                    {section?.columns
                      ? section.columns.map(
                          (column) => (
                            <div
                              className="seat-column"
                              key={column.id}
                              style={{ gap: rowGap }}
                            >
                          
                                {column.seats?.map((seat) => {
                                  if (seat?.isBlank) {
                                    return (
                                      <div
                                        key={`blank-${column.id}-${seat.id}`}
                                        className={`blankSeat ${seat.type}`}
                                        style={{
                                          height: seatStyles?.height || seat.type === "sleeper" ? `calc(64px + ${rowGap})` :"32px",
                                          width: seatStyles?.width || "32px",
                                        }}
                                      />
                                    );
                                  }
  
                                  const status = getSeatStatus(seat.id);
  
                                  return (
                                    <div
                                      key={seat.id}
                                      className={`seat ${status} ${seat.type}`}
                                      style={{
                                        height: seat.type === "sleeper" ? `calc(64px + ${rowGap})` : "32px",
                                        ...statusStyles[status],
                                        pointerEvents: [
                                            SEAT_STATUS.BOOKED_FOR_FEMALE,
                                            SEAT_STATUS.BOOKED_FOR_MALE,
                                        ].includes(status)
                                          ? "none"
                                          : "auto",
                                      }}
                                      onClick={() =>
                                        handleSeatClick(seat)
                                      }
                                    >
                                      {shouldShowSeatLabel(seat?.id)
                                        ? seat.id
                                        : null}
                                    </div>
                                  );
                                })}
                                {/* add one blank seat for better spacing
                                <div
                                  key={`last-blank-${sectionId}`}
                                  className="blankSeat"
                                  style={{
                                    height: seatStyles?.height || "32px",
                                    width: seatStyles?.width || "32px",
                                  }}
                                /> */}
                              </div>
                          )
                        )
                      : null}
                  </div>
                </div>
              );
            })}
            
          </div>
        </div>
        </div>
};

export default BusSeatSelect;

import React, { useRef, useState } from "react";
import type { BusConfig, CustomStyles, Seat } from "./types";
import "./styles.css";
import { useElementTotalSize } from "./utils";

type Props = {
  config: BusConfig;
  bookedSeats?: string[];
  bookedByFemaleSeats?: string[];
  bookedByMaleSeats?: string[];
  availableForFemaleSeats?: string[];
  availableForMaleSeats?: string[];
  onSelect?: (seat: Seat) => void;
  onUnselect?: (seat: Seat) => void;
  maxSelectedSeats?: number;
  customStyles?: CustomStyles;
  showBookedSeatLabel?: boolean;
  showSelectedSeatLabel?: boolean;
  CustomLegendComponent?: React.ComponentType;
  showDefaultLegend?: boolean;
  seatPriceMap?: Record<string, number>;
  legendConfig?: {
    bookedSeatText?: string;
    bookedByFemaleSeatText?: string;
    bookedByMaleSeatText?: string;
    selectedSeatText?: string;
    availableSeatText?: string;
    availableForMaleSeatText?: string;
    availableForFemaleSeatText?: string;
  };
};

const SEAT_STATUS: Record<string, string> = {
  BOOKED_BY_FEMALE: "BOOKED_BY_FEMALE",
  BOOKED_BY_MALE: "BOOKED_BY_MALE",
  SELECTED: "SELECTED",
  AVAILABLE: "AVAILABLE",
  AVAILABLE_FOR_MALE: "AVAILABLE_FOR_MALE",
  AVAILABLE_FOR_FEMALE: "AVAILABLE_FOR_FEMALE",
};

export const BusSeatSelect = (props: Props) => {
  const {
    config = {},
    bookedSeats = [],
    bookedByFemaleSeats = [],
    bookedByMaleSeats = [],
    availableForFemaleSeats = [],
    availableForMaleSeats = [],
    onSelect = () => {},
    onUnselect = () => {},
    maxSelectedSeats = null,
    customStyles = [],
    showBookedSeatLabel = false,
    showSelectedSeatLabel = false,
    CustomLegendComponent,
    showDefaultLegend = true,
    legendConfig = {},
    seatPriceMap = {},
  } = props;

  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const boxRef = useRef(null);
  const { height } = useElementTotalSize(boxRef);

  const renderDefaultLegend = () => {
    return (
      <div className="busSeatSelect-legend-container">
        {(customStyles && customStyles.length > 0 ? customStyles : [{}])?.map(
          (style, index) => (
            <div className="busSeatSelect-legend-row" key={index}>
              {legendConfig?.availableSeatText ? (
                <div className="busSeatSelect-legend-item">
                  <div
                    className={`busSeatSelect-seat busSeatSelect-${SEAT_STATUS.AVAILABLE}`}
                    style={{ ...style?.seatStyles, ...style?.availableStyles }}
                  />
                  <span>{legendConfig?.availableSeatText}</span>
                </div>
              ) : null}
              {legendConfig?.availableForMaleSeatText ? (
                <div className="busSeatSelect-legend-item">
                  <div
                    className={`busSeatSelect-seat busSeatSelect-${SEAT_STATUS.AVAILABLE_FOR_MALE}`}
                    style={{
                      ...style?.seatStyles,
                      ...style?.availableStyles,
                      ...style?.availableForMaleStyles,
                    }}
                  />
                  <span>{legendConfig?.availableForMaleSeatText}</span>
                </div>
              ) : null}
              {legendConfig?.availableForFemaleSeatText ? (
                <div className="busSeatSelect-legend-item">
                  <div
                    className={`busSeatSelect-seat busSeatSelect-${SEAT_STATUS.AVAILABLE_FOR_FEMALE}`}
                    style={{
                      ...style?.seatStyles,
                      ...style?.availableStyles,
                      ...style?.availableForFemaleStyles,
                    }}
                  />
                  <span>{legendConfig?.availableForFemaleSeatText}</span>
                </div>
              ) : null}
              {legendConfig?.bookedSeatText ? (
                <div className="busSeatSelect-legend-item">
                  <div
                    className={`busSeatSelect-seat busSeatSelect-${SEAT_STATUS.BOOKED}`}
                    style={{ ...style?.seatStyles, ...style?.bookedStyles }}
                  />
                  <span>{legendConfig?.bookedSeatText}</span>
                </div>
              ) : null}
              {legendConfig?.bookedByMaleSeatText ? (
                <div className="busSeatSelect-legend-item">
                  <div
                    className={`busSeatSelect-seat busSeatSelect-${SEAT_STATUS.BOOKED_BY_MALE}`}
                    style={{
                      ...style?.seatStyles,
                      ...style?.bookedStyles,
                      ...style?.bookedByMaleStyles,
                    }}
                  />
                  <span>{legendConfig?.bookedByMaleSeatText}</span>
                </div>
              ) : null}
              {legendConfig?.bookedByFemaleSeatText ? (
                <div className="busSeatSelect-legend-item">
                  <div
                    className={`busSeatSelect-seat busSeatSelect-${SEAT_STATUS.BOOKED_BY_FEMALE}`}
                    style={{
                      ...style?.seatStyles,
                      ...style?.bookedStyles,
                      ...style?.bookedByFemaleStyles,
                    }}
                  />
                  <span>{legendConfig?.bookedByFemaleSeatText}</span>
                </div>
              ) : null}
              {legendConfig?.selectedSeatText ? (
                <div className="busSeatSelect-legend-item">
                  <div
                    className={`busSeatSelect-seat busSeatSelect-${SEAT_STATUS.SELECTED}`}
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

  const getSeatStatus = (seatId: string) => {
    if (bookedByFemaleSeats?.includes(seatId))
      return SEAT_STATUS.BOOKED_BY_FEMALE;
    if (bookedByMaleSeats?.includes(seatId)) return SEAT_STATUS.BOOKED_BY_MALE;
    if (bookedSeats?.includes(seatId)) return SEAT_STATUS.BOOKED;
    if (selectedSeats?.includes(seatId)) return SEAT_STATUS.SELECTED;
    if (availableForFemaleSeats?.includes(seatId))
      return SEAT_STATUS.AVAILABLE_FOR_FEMALE;
    if (availableForMaleSeats?.includes(seatId))
      return SEAT_STATUS.AVAILABLE_FOR_MALE;
    return SEAT_STATUS.AVAILABLE;
  };

  const shouldShowSeatLabel = (seatId: string) => {
    if (
      (bookedByFemaleSeats?.includes(seatId) ||
        bookedByMaleSeats?.includes(seatId)) &&
      showBookedSeatLabel
    )
      return true;
    else if (selectedSeats?.includes(seatId) && showSelectedSeatLabel)
      return true;

    return false;
  };

  const isSeatUnavailable = (seat: Seat) =>
    bookedByFemaleSeats?.includes(seat.id) ||
    bookedByMaleSeats?.includes(seat.id);

  const handleSeatClick = (clickedSeat: Seat) => {
    if (selectedSeats.includes(clickedSeat.id)) {
      const updated = selectedSeats.filter((id) => id !== clickedSeat.id);
      setSelectedSeats(updated);
      onUnselect(clickedSeat);
      return;
    } else if (maxSelectedSeats && selectedSeats.length >= maxSelectedSeats) {
      return;
    } else {
      if (!isSeatUnavailable(clickedSeat)) {
        const updated = [...selectedSeats, clickedSeat.id];
        setSelectedSeats(updated);
        onSelect(clickedSeat);
      }
    }
  };

  return (
    <div className="busSeatSelect-wrapper">
      <div className="busSeatSelect-container">
        <div className="busSeatSelect" style={{ gap: "10px" }}>
          {Object.entries(config)?.map(([_, section], index) => {
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
              availableForMaleStyles = {},
              availableForFemaleStyles = {},
              bookedStyles = {},
              bookedByMaleStyles = {},
              bookedByFemaleStyles = {},
              selectedStyles = {},
              seatPriceStyles = {},
            } = currentSectionStyle;

            const statusStyles: Record<string, React.CSSProperties> = {
              [SEAT_STATUS.SELECTED]: { ...seatStyles, ...selectedStyles },
              [SEAT_STATUS.AVAILABLE]: { ...seatStyles, ...availableStyles },
              [SEAT_STATUS.BOOKED]: { ...seatStyles, ...bookedStyles },
              [SEAT_STATUS.BOOKED_BY_MALE]: {
                ...seatStyles,
                ...bookedStyles,
                ...bookedByMaleStyles,
              },
              [SEAT_STATUS.BOOKED_BY_FEMALE]: {
                ...seatStyles,
                ...bookedStyles,
                ...bookedByFemaleStyles,
              },
              [SEAT_STATUS.AVAILABLE_FOR_MALE]: {
                ...seatStyles,
                ...availableStyles,
                ...availableForMaleStyles,
              },
              [SEAT_STATUS.AVAILABLE_FOR_FEMALE]: {
                ...seatStyles,
                ...availableStyles,
                ...availableForFemaleStyles,
              },
            };

            return (
              <div key={index}>
                {section?.title && (
                  <div
                    className="busSeatSelect-section-header"
                    style={{ ...headerStyles }}
                  >
                    {section.title}
                  </div>
                )}
                <div
                  className="busSeatSelect-seat-grid"
                  style={{ gap: columnGap }}
                >
                  {section?.columns
                    ? section.columns.map((column) => (
                        <div
                          className="busSeatSelect-seat-column"
                          key={column.id}
                          style={{ gap: rowGap }}
                        >
                          {column.seats?.map((seat) => {
                            if (seat?.isBlank) {
                              return (
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                  }}
                                  key={seat.id}
                                >
                                  <div
                                    key={`blank-${column.id}-${seat.id}`}
                                    className={`busSeatSelect-blankSeat busSeatSelect-${seat.type}`}
                                    style={{
                                      height: seatStyles?.height
                                        ? seat.type === "sleeper"
                                          ? `calc(${seatStyles.height} +  ${height}px  + ${seatStyles.height} + ${rowGap})`
                                          : seatStyles.height
                                        : seat.type === "sleeper"
                                        ? `calc(64px + ${rowGap})`
                                        : "32px",
                                      width: seatStyles?.width || "32px",
                                    }}
                                  />
                                  {seatPriceMap && Object.keys(seatPriceMap).length > 0 ? (
                                    <span
                                      ref={boxRef}
                                      style={{
                                        ...seatPriceStyles,
                                        visibility: "hidden",
                                      }}
                                    >
                                      "no"
                                    </span>
                                  ) : null}
                                </div>
                              );
                            }

                            const status = getSeatStatus(seat.id);

                            return (
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                }}
                                key={seat.id}
                              >
                                <div
                                  key={seat.id}
                                  className={`busSeatSelect-seat busSeatSelect-${status} busSeatSelect-${seat.type}`}
                                  style={{
                                    ...statusStyles[status],
                                    height: seatStyles?.height
                                      ? seat.type === "sleeper"
                                        ? `calc(${seatStyles.height} + ${height}px  +  ${seatStyles.height} + ${rowGap})`
                                        : seatStyles.height
                                      : seat.type === "sleeper"
                                      ? `calc(64px + ${rowGap})`
                                      : "32px",
                                    pointerEvents: [
                                      SEAT_STATUS.BOOKED,
                                      SEAT_STATUS.BOOKED_BY_FEMALE,
                                      SEAT_STATUS.BOOKED_BY_MALE,
                                    ].includes(status)
                                      ? "none"
                                      : "auto",
                                  }}
                                  onClick={() => handleSeatClick(seat)}
                                >
                                  {shouldShowSeatLabel(seat?.id)
                                    ? seat.id
                                    : null}
                                </div>
                                <span ref={boxRef} style={seatPriceStyles}>
                                  {seatPriceMap && seatPriceMap[seat.id]
                                    ? seatPriceMap[seat.id]?.toLocaleString(
                                        "en-IN",
                                        {
                                          style: "currency",
                                          currency: "INR",
                                          minimumFractionDigits: 0,
                                          maximumFractionDigits: 2,
                                        }
                                      )
                                    : null}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      ))
                    : null}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {CustomLegendComponent ? (
        <div className="busSeatSelect-legend-container">
          <CustomLegendComponent />
        </div>
      ) : showDefaultLegend ? (
        renderDefaultLegend()
      ) : null}
    </div>
  );
};

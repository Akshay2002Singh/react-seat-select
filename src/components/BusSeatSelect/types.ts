export type SeatType = "sleeper" | "seater";

export interface Seat {
  id: string;
  type: SeatType;
  isBlank: boolean;
}

export interface Column {
    id: string;
  seats: Seat[];
}

export interface Section {
    title?: string;
  columns: Column[];
}

export type BusConfig = Record<string, Section>;

export type SectionStyle = {
  rowGap?: string;
  columnGap?: string;
  headerStyles?: React.CSSProperties;
  seatStyles?: React.CSSProperties;
  availableStyles?: React.CSSProperties;
  bookedStyles?: React.CSSProperties;
  disabledStyles?: React.CSSProperties;
  reservedStyles?: React.CSSProperties;
  selectedStyles?: React.CSSProperties;
};

export type CustomStyles = SectionStyle[];
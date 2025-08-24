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
  containerStyle?: React.CSSProperties;
  headerStyles?: React.CSSProperties;
  seatStyles?: React.CSSProperties;
  availableStyles?: React.CSSProperties;
  availableForMaleStyles?: React.CSSProperties;
  availableForFemaleStyles?: React.CSSProperties;
  bookedStyles?: React.CSSProperties;
  bookedByMaleStyles?: React.CSSProperties;
  bookedByFemaleStyles?: React.CSSProperties;
  selectedStyles?: React.CSSProperties;
  seatPriceStyles?: React.CSSProperties;
};

export type CustomStyles = SectionStyle[];

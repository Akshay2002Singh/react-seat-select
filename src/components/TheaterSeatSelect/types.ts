export type Seat = {
  id: string;
  isBlank?: boolean;
  label?: string;
};

export type SeatRow = Seat[];

export type SeatMap = Partial<Record<string, SeatRow>>;

export type SeatSection = {
  title?: string;
  seats: SeatMap;
};

export type SeatConfig = SeatSection[];

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

export type screenConfig = {
  screenVariant: number;
  width: number;
  screenColor?: string;
  textColor?: string;
  screenText?: string;
};

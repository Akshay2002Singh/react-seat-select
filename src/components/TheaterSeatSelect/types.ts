export type TheaterSeat = {
  id: string;
  isBlank?: boolean;
  label?: string;
};

export type TheaterSeatRow = TheaterSeat[];

export type TheaterSeatMap = Partial<Record<string, TheaterSeatRow>>;

export type TheaterSeatSection = {
  title?: string;
  seats: TheaterSeatMap;
};

export type TheaterSeatConfig = TheaterSeatSection[];

export type TheaterSeatSelectSectionStyle = {
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

export type TheaterSeatSelectCustomStyles = TheaterSeatSelectSectionStyle[];

export type TheaterScreenConfig = {
  screenVariant: number;
  width: number;
  screenColor?: string;
  textColor?: string;
  screenText?: string;
};

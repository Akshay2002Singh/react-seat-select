export type Seat = {
  id: string;
  isBlank?: boolean;
  label?: string;

};

export type CustomStyles = {
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

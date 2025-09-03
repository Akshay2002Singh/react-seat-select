export type BusSeatType = "sleeper" | "seater";

export interface BusSeat {
  id: string;
  type: BusSeatType;
  isBlank: boolean;
}

export interface BusColumn {
  id: string;
  seats: BusSeat[];
}

export interface BusSection {
  title?: string;
  columns: BusColumn[];
}

export type BusConfig = BusSection[];

export type BusSeatSelectSectionStyle = {
  rowGap?: string;
  columnGap?: string;
  sectionStyle?: React.CSSProperties;
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

export type BusSeatSelectCustomStyles = BusSeatSelectSectionStyle[];

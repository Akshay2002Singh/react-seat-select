import React from "react";
// import { TheaterSeatSelect } from "./components/TheaterSeatSelect/TheaterSeatSelect.tsx";
import type { Seat } from "./components/TheaterSeatSelect/types.ts";
import data from "./bus_layout.ts";
import seatPriceMap from "./seat_price_map.ts";
// import SeatLayoutDesigner from "./components/SeatLayoutDesigner/SeatLayoutDesigner.tsx";
import type { BusConfig } from "./components/BusSeatSelect/types.ts";
import SeatConfigGenerator from "./components/SeatLayoutDesigner/BusLayoutDesigner.tsx";
import { BusSeatSelect } from "./components/BusSeatSelect/BusSeatSelect.tsx";

// const generateSeats = (): Record<string, Seat[]> => {
//   const rows = ["A", "B", "C", "D", "E", "F", "G","H","I","J","K","L","M"];
//   const columns = 24;

//   const seats: Record<string, Seat[]> = {};

//   for (const row of rows) {
//     seats[row] = [];
//     for (let col = 1; col <= columns; col++) {
//       const id = `${row}${col}`;
//       seats[row].push({ id, label: id, isBlank: false });
//     }
//   }

//   return seats;
// };

const App: React.FC = () => {
  // const seats = generateSeats();
  const config = data;

  const bookedForFemaleSeats = ["LB2", "LB5"];
  // const disabledSeats = ["A3", "C7","A3","A4","A5","A6","A7","A8","A9","A10","A11","A12","A13","A14","A15","A16","A17","A18"];
  const bookedForMaleSeats = ["LB6", "LB8"];

  const handleSelect = (seat: Seat) => {
    console.log("Seat selected:", seat);
  };

  const handleUnselect = (seat: Seat) => {
    console.log("Seat unselected:", seat);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Theater Seat Selection</h2>
      <div>
        <BusSeatSelect
          config={config as BusConfig}
          bookedByFemaleSeats={bookedForFemaleSeats}
          bookedByMaleSeats={bookedForMaleSeats}
          seatPriceMap={seatPriceMap}
          availableForFemaleSeats={["LB1", "LB3", "LB4"]}
          availableForMaleSeats={["LB7", "LB9", "LB10"]}
          onSelect={handleSelect}
          onUnselect={handleUnselect}
          maxSelectedSeats={5}
          legendConfig={{
            bookedByMaleSeatText: "Booked by Male",
            bookedByFemaleSeatText: "Booked by Female",
            availableForMaleSeatText: "Available For Male",
            availableForFemaleSeatText: "Available for Female",
          }}
          customSectionWrapperStyle={{
            gap: "60px",
          }}
          SectionHeader={() => {
            return (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "8px 16px",
                  borderBottom: "1px solid #ccc",
                  fontWeight: "bold",
                  fontSize: "16px",
                }}
              >
                <span></span>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    fontSize: "48px",
                  }}
                >
                   ☮
                </div>
              </div>
            );
          }}
          // autoSeatExpansion={true}
          customStyles={[
            {
              rowGap: "12px",
              columnGap: "16px",
              sectionStyle: {
                border: "1px solid white",
                padding: "4px 12px",
                borderTopLeftRadius: "22px",
                borderTopRightRadius: "22px",
              },
              headerStyles: {
                fontSize: "16px",
                fontWeight: 600,
                color: "black",
                // marginBottom: "8px",
                padding: "8px 0",
              },
              seatPriceStyles: {
                padding: "4px 0px",
                marginBottom: "10px",
                fontSize: "12px",
              },
              seatStyles: {
                width: "36px",
                height: "36px",
                borderRadius: "6px",
                // backgroundColor: "#f9f9f9",
                border: "1px solid #cccccc",
                fontSize: "14px",
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              },
              availableForMaleStyles: {
                // backgroundColor: "#d4fcd4",
                backgroundColor: "#155724",
                border: "1px solid #a4d7a4",
                // backgroundImage : "url('https://img.icons8.com/?size=48&id=rI1co8lOfrTW&format=png')",
              },
              availableForFemaleStyles: {
                // backgroundColor: "#d4fcd4",
                backgroundColor: "#45ce65ff",
                // color: "#155724",
                border: "1px solid #a4d7a4",
                // backgroundImage : "url('https://img.icons8.com/?size=48&id=rI1co8lOfrTW&format=png')",
              },

              bookedByMaleStyles: {
                backgroundColor: "#f8d7da",
                color: "#721c24",
                border: "1px solid #f5c6cb",
              },
              bookedByFemaleStyles: {
                backgroundColor: "#762027ff",
                color: "#721c24",
                border: "1px solid #f5c6cb",
              },
              selectedStyles: {
                backgroundColor: "#cce5ff",
                color: "#004085",
                border: "2px solid #004085",
              },
            },
            // {
            //   rowGap: "12px",
            //   columnGap: "16px",
            //   headerStyles: {
            //     fontSize: "16px",
            //     fontWeight: "bold",
            //     color: "#333",
            //     padding: "8px 0",
            //     textAlign: "center",
            //   },
            //   seatStyles: {
            //     width: "36px",
            //     height: "36px",
            //     borderRadius: "4px",
            //     border: "1px solid #ccc",
            //     display: "inline-flex",
            //     justifyContent: "center",
            //     alignItems: "center",
            //     fontSize: "12px",
            //   },
            //   seatPriceStyles:{
            //     padding: "4px 0px",
            //     marginBottom:"10px",
            //     fontSize:"12px"
            //   },
            //   availableStyles: {
            //     // backgroundColor: "#d4edda",
            //     backgroundImage: "url('https://img.icons8.com/?size=40&id=53746&format=png')",
            //     color: "#155724",
            //   },
            //   bookedStyles: {
            //     backgroundColor: "#f8d7da",
            //     color: "#721c24",
            //     cursor: "not-allowed",
            //   },
            //   selectedStyles: {
            //     backgroundColor: "#cce5ff",
            //     color: "#004085",
            //     border: "2px solid #004085",
            //   },
            // },
          ]}
        />
      </div>
      <SeatConfigGenerator />
    </div>
  );
};

export default App;

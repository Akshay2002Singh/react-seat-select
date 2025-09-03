import React from "react";
// import { TheaterSeatSelect } from "./components/TheaterSeatSelect/TheaterSeatSelect.tsx";
// import type { TheaterSeat } from "./components/TheaterSeatSelect/types.ts";
import data from "./bus_layout";
import seatPriceMap from "./seat_price_map";
// import SeatLayoutDesigner from "./components/SeatLayoutDesigner/SeatLayoutDesigner.tsx";
import type { BusConfig, BusSeat } from "./components/BusSeatSelect/types";
import { BusSeatLayoutDesigner } from "./components/BusSeatLayoutDesigner/BusSeatLayoutDesigner";
import { BusSeatSelect } from "./components/BusSeatSelect/BusSeatSelect";
// import { TheaterSeatSelect } from "./components/TheaterSeatSelect/TheaterSeatSelect.tsx";
import { TheaterSeatLayoutDesigner } from "./components/TheaterSeatLayoutDesigner/TheaterSeatLayoutDesigner";

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

// function TheaterExample() {
//   const config = [
//   {
//     title: "Section A",
//     seats: {
//       A: [
//         { id: "A1", label: "A1" },
//         { id: "A2", label: "A2" },
//         { id: "A3", label: "A3" },
//         { id: "A4", label: "A4" },
//         { id: "A5", label: "A5" }
//       ],
//       B: [
//         { id: "B1", label: "B1" },
//         { id: "B2", label: "B2" },
//         { id: "B3", label: "B3" },
//         { id: "B4", label: "B4" },
//         { id: "B5", label: "B5" }
//       ],
//       C: [
//         { id: "C1", label: "C1" },
//         { id: "C2", label: "C2" },
//         { id: "C3", label: "C3" },
//         { id: "C4", label: "C4" },
//         { id: "C5", label: "C5" }
//       ]
//     }
//   },
//   {
//     title: "Section B",
//     seats: {
//       D: [
//         { id: "D1", label: "D1" },
//         { id: "D2", label: "D2" },
//         { id: "D3", label: "D3" },
//         { id: "D4", label: "D4" },
//         { id: "D5", label: "D5" },
//         { id: "D6", label: "D6" }
//       ],
//       E: [
//         { id: "E1", label: "E1" },
//         { id: "E2", label: "E2" },
//         { id: "E3", label: "E3" },
//         { id: "E4", label: "E4" },
//         { id: "E5", label: "E5" },
//         { id: "E6", label: "E6" }
//       ]
//     }
//   }
// ];

//   const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

//   return (
//     <div>
//       <TheaterSeatSelect
//         config={config}
//         onSelect={(seat) => setSelectedSeats((prev) => [...prev, seat.id])}
//         onUnselect={(seat) =>
//           setSelectedSeats((prev) => prev.filter((s) => s !== seat.id))
//         }
//         maxSelectedSeats={3}
//       />
//       <p style={{ marginTop: "1rem" }}>
//         <strong>Selected Seats:</strong> {selectedSeats.join(", ") || "None"}
//       </p>
//     </div>
//   );
// }

const App: React.FC = () => {
  // const seats = generateSeats();
  const config = data;

  const bookedForFemaleSeats = ["LB2", "LB5"];
  // const disabledSeats = ["A3", "C7","A3","A4","A5","A6","A7","A8","A9","A10","A11","A12","A13","A14","A15","A16","A17","A18"];
  const bookedForMaleSeats = ["LB6", "LB8"];

  const handleSelect = (seat: BusSeat) => {
    console.log("Seat selected:", seat);
  };

  const handleUnselect = (seat: BusSeat) => {
    console.log("Seat unselected:", seat);
  };

  return (
    <div style={{ padding: "20px" }}>
      {/* <h2>Theater Seat Selection</h2> */}
      {/* <TheaterExample/> */}
      <TheaterSeatLayoutDesigner
        customStyles={{
          wrapper: { display: "flex", gap: "16px" },
          sectionBox: {
            border: "2px solid #993939ff",
            borderRadius: "8px",
            padding: "12px",
          },
          controlButton: { fontSize: "18px", fontWeight: "bold" },
          seat: {
            width: "32px",
            height: "32px",
            background: "#20487dff",
            margin: "4px",
            textAlign: "center",
            cursor: "pointer",
          },
          inspectorHeader: { fontSize: "40px" },
          inspectorPlaceholder: { fontSize: "24px", color: "gray" },
          inspectorLabel: { fontSize: "18px", fontWeight: "bold" },
          inspectorInput: { width: "200px", height: "20px", cursor: "pointer" },
          blankSeat: { background: "transparent" },
          selectedSeat: { background: "#fbbf24", fontWeight: "bold" },
          rowLabel: {
            color: "red",
            backgroundColor: "yellow",
            fontWeight: "bold",
            marginRight: "8px",
          },
        }}
      />
      <h2>Bus Seat Selection</h2>
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
      <BusSeatLayoutDesigner
        // customStyles={{
        //   root: {
        //     backgroundColor: "#f9fafb",
        //     fontFamily: "Arial, sans-serif",
        //     boxSizing: 'border-box',
        //     padding: '16px'
        //   },
        //   workspace: {
        //     border: "2px dashed #ccc",
        //     borderRadius: "12px",
        //     backgroundColor: "#fff",
        //   },
        //   canvas: {
        //     gap: "16px",
        //     backgroundColor: "#f0f4f8",
        //     padding: "20px",
        //     borderRadius: "8px",
        //   },

        //   section: {
        //     border: "1px solid #ddd",
        //     borderRadius: "10px",
        //     padding: "10px",
        //     backgroundColor: "#ffffff",
        //   },
        //   sectionHeader: {
        //     display: "flex",
        //     justifyContent: "space-between",
        //     alignItems: "center",
        //     backgroundColor: "#f1f5f9",
        //     padding: "6px 10px",
        //     borderRadius: "6px",
        //   },
        //   sectionTitle: {
        //     fontWeight: "bold",
        //     fontSize: "16px",
        //     color: "#1e293b",
        //   },
        //   deleteSectionBtn: {
        //     cursor: "pointer",
        //     fontWeight: "bold",
        //   },

        //   columns: {
        //     display: "flex",
        //     gap: "12px",
        //     marginTop: "8px",
        //   },
        //   column: {
        //     display: "flex",
        //     flexDirection: "column",
        //     gap: "6px",
        //   },

        //   seats: {
        //     display: "flex",
        //     gap: "6px",
        //   },
        //   seat: {
        //     width: "40px",
        //     height: "40px",
        //     backgroundColor: "#e2e8f0",
        //     border: "2px solid #94a3b8",
        //     borderRadius: "6px",
        //     display: "flex",
        //     alignItems: "center",
        //     justifyContent: "center",
        //     fontSize: "12px",
        //     fontWeight: "bold",
        //     cursor: "pointer",
        //   },
        //   seaterSeat: {
        //     backgroundColor: "#bae6fd",
        //     border: "2px solid #0284c7",
        //   },
        //   sleeperSeat: {
        //     backgroundColor: "#c7d2fe",
        //     border: "2px solid #4f46e5",
        //     width: "40px",
        //     height: "80px",
        //   },
        //   blankSeat: {
        //     backgroundColor: "#f8fafc",
        //     border: "1px dashed #94a3b8",
        //   },
        //   selectedSeat: {
        //     backgroundColor: "#34d399",
        //     border: "2px solid #065f46",
        //     color: "#fff",
        //   },

        //   controls: {
        //     display: "flex",
        //     gap: "10px",
        //     marginTop: "12px",
        //   },
        //   controlsButton: {
        //     backgroundColor: "#3b82f6",
        //     color: "#fff",
        //     border: "none",
        //     padding: "6px 12px",
        //     borderRadius: "6px",
        //     cursor: "pointer",
        //   },
        //   addColumnCard: {
        //     border: "2px dashed #94a3b8",
        //     padding: "10px",
        //     borderRadius: "6px",
        //     textAlign: "center",
        //     cursor: "pointer",
        //     color: "#475569",
        //   },

        //   inspector: {
        //     borderLeft: "2px solid #e5e7eb",
        //     padding: "12px",
        //     backgroundColor: "#f8fafc",
        //   },
        //   inspectorHeading: {
        //     fontSize: "18px",
        //     fontWeight: "bold",
        //     marginBottom: "10px",
        //     color: "#111827",
        //   },
        //   inspectorForm: {
        //     display: "flex",
        //     flexDirection: "column",
        //     gap: "8px",
        //   },
        //   inspectorLabel: {
        //     fontSize: "14px",
        //     fontWeight: "500",
        //     color: "#374151",
        //   },
        //   inspectorInput: {
        //     padding: "6px 10px",
        //     borderRadius: "6px",
        //     border: "1px solid #d1d5db",
        //     fontSize: "14px",
        //   },
        //   inspectorPlaceholder: {
        //     fontStyle: "italic",
        //     color: "#9ca3af",
        //   },
        // }}
      />
    </div>
  );
};

export default App;

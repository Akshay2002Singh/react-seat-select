---
id: bus-seat-layout-designer-playground
title: 🚌 Playground
sidebar_label: Playground
sidebar_position: 4
---

# 🛠 Playground

Welcome to the **interactive playground** for the `BusSeatLayoutDesigner`!  
Here, you can freely experiment with props such as `config`, `onChange`, and `customStyles` to design your own bus seat layouts.

---

## 🔹 Try it Out

```tsx live 
function Playground() {
  const [config, setConfig] = useState([]);

  return (
    <div style={{ padding: "16px" }}>
      <h2>🚌 Bus Seat Layout Designer Playground</h2>
      <p>
        Use the editor below to modify <code>customStyles</code>, update the <code>config</code>, 
        and see live changes to the seat layout designer.
      </p>

      <BusSeatLayoutDesigner
        config={config}
        onChange={(updatedConfig) => setConfig(updatedConfig)}
        customStyles={{
          root: { padding: "16px" },
          workspace: { border: "1px dashed #ccc", padding: "12px" },
          seat: { border: "1px solid #666", borderRadius: "6px" },
          selectedSeat: { backgroundColor: "lightblue" },
          sectionHeader: { fontWeight: "bold", fontSize: "16px" },
          controlsButton: {
            background: "#007bff",
            color: "white",
            borderRadius: "4px",
            padding: "6px 10px"
          },
          inspectorHeading: { fontSize: "14px", fontWeight: "bold" },
          inspectorInput: {
            border: "1px solid #ddd",
            padding: "4px 6px",
            borderRadius: "3px"
          }
        }}
      />
    </div>
  );
}
```
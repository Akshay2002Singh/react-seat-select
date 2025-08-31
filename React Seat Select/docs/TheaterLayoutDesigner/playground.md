---
id: theater-seat-layout-designer-playground
title: 🎭 Playground
sidebar_label: Playground
sidebar_position: 4
---

# 🛠 Playground

Welcome to the **interactive playground** for the `TheaterSeatLayoutDesigner`! Experiment with seat layouts, change styles, and export configurations.

---

## 🔹 Try it Out

```tsx live
function Playground() {
  const [config, setConfig] = useState([]);

  return (
    <div style={{ padding: "16px" }}>
      <h2>🎭 Theater Seat Layout Designer Playground</h2>
      <p>
        Add/remove sections, rows, and seats. Use the Inspector to edit properties.  
        When ready, download your config below!
      </p>

      <TheaterSeatLayoutDesigner
        config={config}
        onChange={(updatedConfig) => setConfig(updatedConfig)}
        customStyles={{
          wrapper: { padding: "16px" },
          sectionBox: { border: "1px solid #ddd", borderRadius: "8px" },
          seat: { border: "1px solid #444", borderRadius: "4px" },
          selectedSeat: { background: "lightblue" },
          controlButton: { background: "#007bff", color: "white", padding: "6px 10px" },
        }}
      />
    </div>
  );
}
```
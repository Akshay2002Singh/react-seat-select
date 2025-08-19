---
id: jsx-example
title: JSX Example
sidebar_label: JSX Example
---

import React, { useState } from "react";

# JSX Example in MDX

This page shows how you can **display JSX code** and also **render live JSX output**.

## Code Block (just shown)

```tsx
function Counter() {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
```
<Counter />

export function Counter() {
const [count, setCount] = useState(0);
return (
<button
style={{
padding: "8px 16px",
fontSize: "16px",
borderRadius: "8px",
background: "#4cafef",
color: "#fff",
border: "none",
cursor: "pointer",
}}
onClick={() => setCount(count + 1)}
>
Count: {count}
</button>
);
}
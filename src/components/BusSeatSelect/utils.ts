import { useState, useEffect } from "react";

export function useElementTotalSize(ref) {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!ref.current) return;

    function updateSize() {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const styles = window.getComputedStyle(ref.current);

        const marginTop = parseFloat(styles.marginTop) || 0;
        const marginBottom = parseFloat(styles.marginBottom) || 0;
        const marginLeft = parseFloat(styles.marginLeft) || 0;
        const marginRight = parseFloat(styles.marginRight) || 0;

        const totalWidth = rect.width + marginLeft + marginRight;
        const totalHeight = rect.height + marginTop + marginBottom;

        setSize({ width: totalWidth, height: totalHeight });
      }
    }

    updateSize();
    window.addEventListener("resize", updateSize);

    return () => window.removeEventListener("resize", updateSize);
  }, [ref]);

  return size;
}

import { useState, useEffect, useRef } from "react";

export function useCanvasSize() {
  const [size, setSize] = useState({ width: 0, height: 0 });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const updateSize = () => {
      if (ref.current) {
        setSize({
          width: ref.current.offsetWidth,
          height: ref.current.offsetHeight,
        });
      }
    };

    // Initialize observer
    const resizeObserver = new ResizeObserver((entries) => {
      // We only observe one element
      updateSize();
    });

    // Start observing
    resizeObserver.observe(ref.current);

    // Cleanup
    return () => resizeObserver.disconnect();
  }, []);

  return { canvasRef: ref, ...size };
}

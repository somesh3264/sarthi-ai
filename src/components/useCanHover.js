import { useEffect, useState } from "react";

// True on devices with a real pointer that can hover (desktop), false on touch screens.
export function useCanHover() {
  const query = "(hover: hover) and (pointer: fine)";
  const [canHover, setCanHover] = useState(() => typeof window !== "undefined" && window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setCanHover(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return canHover;
}

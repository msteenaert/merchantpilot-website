"use client";
import { useEffect, useRef } from "react";

// Fades and slides its content in when it scrolls into view.
// Content is visible by default; hiding only starts once JS runs, and only for items below the fold.
export default function Reveal({ className = "", delay = 0, children }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return;
    el.classList.add("rvl-pre");
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          setTimeout(() => { el.classList.remove("rvl-pre"); el.classList.add("rvl-in"); }, delay);
          io.disconnect();
        }
      });
    }, { threshold: 0.2, rootMargin: "0px 0px -8% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);
  return <article ref={ref} className={"rvl " + className}>{children}</article>;
}

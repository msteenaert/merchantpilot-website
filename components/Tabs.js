"use client";
import { useState, useEffect } from "react";

// Simple tab switcher. Labels and panels (children) are in the same order.
export default function Tabs({ labels, ids, children }) {
  const [i, setI] = useState(0);
  const panels = Array.isArray(children) ? children : [children];
  useEffect(() => {
    const h = decodeURIComponent(window.location.hash.slice(1));
    if (!h) return;
    const idx = (ids || []).findIndex((x) => x.includes(h));
    if (idx >= 0) setI(idx);
  }, [ids]);
  return (
    <div>
      <div className="tabs" role="tablist">
        {labels.map((l, k) => (
          <button key={l} role="tab" aria-selected={k === i} className={"tab" + (k === i ? " on" : "")} onClick={() => setI(k)}>{l}</button>
        ))}
      </div>
      {panels.map((p, k) => <div key={k} role="tabpanel" hidden={k !== i}>{p}</div>)}
    </div>
  );
}

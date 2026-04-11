"use client";

export default function CornerOrnaments() {
  return (
    <>
      {(["tl", "tr", "bl", "br"] as const).map((pos) => (
        <div key={pos} className={`corner-ornament ${pos}`} />
      ))}
    </>
  );
}

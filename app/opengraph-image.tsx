import { ImageResponse } from "next/og";
export const alt = "Manikant Kumar — AI, backend, and full stack engineering";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#060913",
          padding: 90,
          color: "#f8fafc",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div style={{ fontSize: 20, color: "#a78bfa", letterSpacing: 6 }}>
          ENGINEER & BUILDER
        </div>
        <div
          style={{
            fontSize: 86,
            fontWeight: 700,
            letterSpacing: -4,
            marginTop: 32,
          }}
        >
          Manikant Kumar
        </div>
        <div style={{ fontSize: 27, color: "#94a3b8", marginTop: 28 }}>
          AI-powered applications · Backend systems · Full stack
        </div>
        <div style={{ fontSize: 20, color: "#818cf8", marginTop: 65 }}>
          Explore the code. Understand the decisions.
        </div>
      </div>
    ),
    size,
  );
}

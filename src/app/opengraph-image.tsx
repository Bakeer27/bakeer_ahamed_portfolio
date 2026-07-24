import { ImageResponse } from "next/og";

export const alt = "Bakeer Ahamed — Full-Stack Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Purpose-built OG card — generated at build, no stock imagery. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(160deg, #0b1120 0%, #070b14 60%)",
          color: "#e9edf6",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* seal motif */}
        <div
          style={{
            position: "absolute",
            right: -120,
            top: 95,
            width: 440,
            height: 440,
            borderRadius: "50%",
            border: "2px dashed rgba(217,165,74,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: 300,
              height: 300,
              borderRadius: "50%",
              border: "1px solid rgba(158,178,222,0.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: 130,
                height: 130,
                borderRadius: "50%",
                border: "2px solid #d9a54a",
                display: "flex",
              }}
            />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: 6,
            color: "#d9a54a",
            textTransform: "uppercase",
          }}
        >
          Full-Stack Software Engineer — Colombo, LK
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 110, fontWeight: 700, letterSpacing: -4 }}>
            Bakeer Ahamed
          </div>
          <div style={{ display: "flex", marginTop: 20, fontSize: 30, color: "#94a0b8", maxWidth: 760 }}>
            Production systems end-to-end — architecture, security, deployment.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 20,
            color: "#5d6880",
            letterSpacing: 3,
          }}
        >
          <span>LARAVEL · LIVEWIRE · REACT · TYPESCRIPT</span>
          <span>6.9271° N, 79.8612° E</span>
        </div>
      </div>
    ),
    size
  );
}

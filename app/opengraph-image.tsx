import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Crate Construction — We build what lasts. Dallas, Texas.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const dir = join(process.cwd(), "assets/og");
  const [archivo, mono, background] = await Promise.all([
    readFile(join(dir, "Archivo-SemiBold.woff")),
    readFile(join(dir, "IBMPlexMono-Medium.woff")),
    readFile(join(dir, "og-background.jpg")),
  ]);
  const bg = `data:image/jpeg;base64,${background.toString("base64")}`;

  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: "#111111" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={bg} alt="" width={1200} height={630} style={{ position: "absolute", inset: 0, objectFit: "cover" }} />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(17,17,17,0.55) 0%, rgba(17,17,17,0.15) 40%, rgba(17,17,17,0.9) 100%)",
        }}
      />
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          padding: "56px 64px",
          color: "#FFFFFF",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontFamily: "Plex",
            fontSize: 20,
            letterSpacing: 3,
          }}
        >
          <span>CRATE CONSTRUCTION</span>
          <span style={{ opacity: 0.7 }}>DALLAS, TEXAS</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontFamily: "Archivo",
              fontSize: 132,
              lineHeight: 0.9,
              letterSpacing: -5,
              textTransform: "uppercase",
            }}
          >
            We build
          </div>
          <div
            style={{
              display: "flex",
              fontFamily: "Archivo",
              fontSize: 132,
              lineHeight: 0.9,
              letterSpacing: -5,
              textTransform: "uppercase",
            }}
          >
            What lasts<span style={{ color: "#B45B35" }}>.</span>
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 36,
              paddingTop: 24,
              borderTop: "1px solid rgba(255,255,255,0.3)",
              fontFamily: "Plex",
              fontSize: 20,
              letterSpacing: 2,
              opacity: 0.85,
            }}
          >
            GENERAL CONTRACTOR · NEW HOMES · REMODELS · ADDITIONS
          </div>
        </div>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: "Archivo", data: archivo, style: "normal", weight: 600 },
        { name: "Plex", data: mono, style: "normal", weight: 500 },
      ],
    },
  );
}

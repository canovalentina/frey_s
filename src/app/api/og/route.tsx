import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") ?? "frey_s";
  const sub = searchParams.get("sub") ?? "Composer & Sound Artist";
  const tag = searchParams.get("tag") ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "60px",
          background: "#f7f5f2",
          fontFamily: "sans-serif",
        }}
      >
        {/* Background accent */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "320px",
            height: "320px",
            background: "radial-gradient(circle, #b2a2cb33 0%, transparent 70%)",
          }}
        />

        {/* Top bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: "#b2a2cb",
          }}
        />

        {/* Brand */}
        <div
          style={{
            position: "absolute",
            top: "48px",
            left: "60px",
            fontSize: "18px",
            fontWeight: 700,
            color: "#0a0a0a",
            letterSpacing: "-0.02em",
          }}
        >
          frey_s
        </div>

        {/* Tag */}
        {tag && (
          <div
            style={{
              fontSize: "13px",
              fontWeight: 600,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#b2a2cb",
              marginBottom: "16px",
            }}
          >
            {tag}
          </div>
        )}

        {/* Title */}
        <div
          style={{
            fontSize: title.length > 30 ? "44px" : "60px",
            fontWeight: 800,
            color: "#0a0a0a",
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            marginBottom: "20px",
            maxWidth: "820px",
          }}
        >
          {title}
        </div>

        {/* Sub */}
        <div
          style={{
            fontSize: "20px",
            color: "#6b6b6b",
            maxWidth: "560px",
            lineHeight: 1.4,
          }}
        >
          {sub}
        </div>

        {/* Waveform decoration */}
        <div
          style={{
            position: "absolute",
            bottom: "48px",
            right: "60px",
            display: "flex",
            alignItems: "flex-end",
            gap: "3px",
            opacity: 0.15,
          }}
        >
          {[20, 45, 70, 55, 85, 40, 60, 75, 35, 65, 50, 80, 30, 55, 70].map(
            (h, i) => (
              <div
                key={i}
                style={{
                  width: "4px",
                  height: `${h}px`,
                  background: "#0a0a0a",
                  borderRadius: "2px",
                }}
              />
            )
          )}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}

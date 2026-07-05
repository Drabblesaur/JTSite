import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Nav from "../components/Nav.jsx";
import Screensaver from "../components/fancy/blocks/Screensaver.jsx";

const serif = "'Redaction 35','Space Grotesk',serif";

// Bouncing photos. Vary size, speed, start position, and angle so they scatter.
const PHOTOS = [
  { src: "/assets/404_Images/404-1.jpg", size: 150 },
  { src: "/assets/404_Images/404-2.jpg", size: 116 },
  { src: "/assets/404_Images/404-3.jpg", size: 168 },
  { src: "/assets/404_Images/404-4.jpg", size: 128 },
  { src: "/assets/404_Images/404-5.jpg", size: 156 },
  { src: "/assets/404_Images/404-6.jpg", size: 108 },
  { src: "/assets/404_Images/404-7.jpg", size: 138 },
];

export default function NotFound() {
  const containerRef = useRef(null);
  useEffect(() => {
    document.title = "Page Not Found — Johnny To";
    document.body.style.background = "#F2F0EF";
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        minHeight: "100vh",
        overflow: "hidden",
        background: "#F2F0EF",
      }}
    >
      {/* nav sits above the bouncers */}
      <div style={{ position: "relative", zIndex: 40 }}>
        <Nav />
      </div>

      {/* centered message */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 30,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          pointerEvents: "none",
          padding: "0 24px",
        }}
      >
        <h1
          style={{
            fontFamily: serif,
            fontWeight: 600,
            fontSize: "clamp(34px,5vw,64px)",
            letterSpacing: "-.03em",
            color: "#1a1712",
            margin: 0,
          }}
        >
          Page Not Found
        </h1>
        <Link
          to="/"
          style={{
            pointerEvents: "auto",
            marginTop: 26,
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            fontSize: 15,
            fontWeight: 600,
            color: "#fcfcfa",
            background: "#1a1712",
            textDecoration: "none",
            padding: "13px 22px",
            borderRadius: 11,
          }}
        >
          Back home →
        </Link>
      </div>

      {/* bouncing photos */}
      {PHOTOS.map((img, i) => (
        <Screensaver
          key={i}
          speed={1.1 + (i % 4) * 0.35}
          startPosition={{ x: (i * 14) % 90, y: (i * 27) % 85 }}
          startAngle={25 + i * 47}
          containerRef={containerRef}
        >
          <div
            style={{
              width: img.size,
              height: img.size,
              borderRadius: 14,
              overflow: "hidden",
              border: "1px solid #e6e0d2",
              boxShadow: "0 16px 34px -22px rgba(26,23,18,.4)",
            }}
          >
            <img
              src={img.src}
              alt=""
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </div>
        </Screensaver>
      ))}
    </div>
  );
}

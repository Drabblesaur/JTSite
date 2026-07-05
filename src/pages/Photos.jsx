import React, { useEffect } from "react";
import Nav from "../components/Nav.jsx";
import Footer from "../components/Footer.jsx";
import MarqueeAlongSvgPath from "../components/fancy/blocks/MarqueeAlongSvgPath.jsx";
import SimpleMarquee from "../components/fancy/blocks/SimpleMarquee.jsx";

const serif = "'Redaction 35','Space Grotesk',serif";
const mono = "'Space Mono', monospace";

const PHOTOS = [
  "/assets/404_Images/404-5.jpg",
  "/assets/404_Images/404-3.jpg",
  "/assets/404_Images/404-4.jpg",
  "/assets/404_Images/404-2.jpg",
  "/assets/404_Images/404-6.jpg",
  "/assets/404_Images/404-1.jpg",
  "/assets/404_Images/404-7.jpg",
  "/assets/photocase/photocase1.jpg",
  "/assets/photocase/photocase2.jpg",
  "/assets/photocase/photocase3.jpg",
  "/assets/photocase/photocase4.jpg",
  "/assets/photocase/photocase5.jpg",
  "/assets/photocase/photocase6.jpg",
  "/assets/photocase/photocase7.jpg",
];

// A gentle wave the hero photos travel along.
const HERO_PATH =
  "M0 212 C 180 70, 360 70, 500 180 C 640 290, 820 290, 1000 150";

function RowItem({ src }) {
  return (
    <div
      style={{
        margin: "0 8px",
        borderRadius: 12,
        overflow: "hidden",
        border: "1px solid #e6e0d2",
        flexShrink: 0,
      }}
    >
      <img
        src={src}
        alt=""
        draggable={false}
        style={{
          height: 168,
          width: "auto",
          display: "block",
          objectFit: "cover",
          userSelect: "none",
        }}
      />
    </div>
  );
}

const rowA = PHOTOS.slice(0, 4);
const rowB = PHOTOS.slice(4, 8);
const rowC = PHOTOS.slice(8, 12);

export default function Photos() {
  useEffect(() => {
    document.title = "Photos — Johnny To";
    document.body.style.background = "#F2F0EF";
  }, []);

  return (
    <>
      <Nav active="photos" />

      {/* ===== HERO: marquee along an SVG path ===== */}
      <header
        style={{
          position: "relative",
          height: "64vh",
          minHeight: 440,
          overflow: "hidden",
        }}
      >
        <MarqueeAlongSvgPath
          path={HERO_PATH}
          viewBox="0 0 1000 300"
          baseVelocity={6}
          repeat={2}
          slowdownOnHover
          draggable
          grabCursor
          dragSensitivity={0.1}
          responsive
          enableRollingZIndex
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
          }}
        >
          {PHOTOS.map((src, i) => (
            <div
              key={i}
              style={{
                width: 92,
                height: 92,
                borderRadius: 12,
                overflow: "hidden",
                border: "2px solid #fcfcfa",
                boxShadow: "0 12px 28px -16px rgba(26,23,18,.5)",
              }}
            >
              <img
                src={src}
                alt=""
                draggable={false}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                  userSelect: "none",
                }}
              />
            </div>
          ))}
        </MarqueeAlongSvgPath>

        {/* title overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            pointerEvents: "none",
            padding: "0 24px",
          }}
        >
          <div
            style={{
              fontFamily: mono,
              fontSize: 12,
              letterSpacing: ".14em",
              textTransform: "uppercase",
              color: "#000000",
              marginBottom: 14,
            }}
          >
            Selected frames from my photography collection
          </div>
          <h1
            style={{
              fontFamily: "'Comico', cursive",
              fontWeight: 400,
              fontSize: "clamp(48px,10vw,132px)",
              lineHeight: 0.95,
              letterSpacing: ".015em",
              margin: 0,
              color: "#A7C098",
            }}
          >
            Photos
          </h1>
          <p
            style={{
              fontFamily: mono,
              fontSize: 12,
              letterSpacing: ".14em",
              textTransform: "uppercase",
              color: "#000000",
              marginTop: 18,
              background: "rgba(255,255,255,.8)",
              padding: "6px 12px",
              borderRadius: 8,
            }}
          >
            drag the photos ↔
          </p>
        </div>
      </header>

      {/* ===== SHOWCASE: simple marquees ===== */}
      <section style={{ padding: "70px 0 90px", overflow: "hidden" }}>
        <div
          style={{
            maxWidth: 1080,
            margin: "0 auto",
            boxSizing: "border-box",
            padding: "0 32px 34px",
          }}
        >
          <h2
            style={{
              fontFamily: serif,
              fontWeight: 600,
              fontSize: "clamp(26px,3vw,38px)",
              letterSpacing: "-.025em",
              margin: 0,
              color: "#1a1712",
            }}
          >
            Selected frames
          </h2>
          <p
            style={{
              margin: "10px 0 0",
              fontSize: 15,
              lineHeight: 1.6,
              color: "#6a655b",
              maxWidth: "52ch",
            }}
          >
            A rolling shelf of favorites — trails, coastlines, and the
            occasional goose. Hover to slow a row down.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <SimpleMarquee
            baseVelocity={22}
            repeat={4}
            direction="left"
            slowdownOnHover
            slowDownFactor={0.15}
            draggable
            grabCursor
            dragAwareDirection
          >
            {rowA.map((src, i) => (
              <RowItem key={i} src={src} />
            ))}
          </SimpleMarquee>
          <SimpleMarquee
            baseVelocity={22}
            repeat={4}
            direction="right"
            slowdownOnHover
            slowDownFactor={0.15}
            draggable
            grabCursor
            dragAwareDirection
          >
            {rowB.map((src, i) => (
              <RowItem key={i} src={src} />
            ))}
          </SimpleMarquee>
          <SimpleMarquee
            baseVelocity={22}
            repeat={4}
            direction="left"
            slowdownOnHover
            slowDownFactor={0.15}
            draggable
            grabCursor
            dragAwareDirection
          >
            {rowC.map((src, i) => (
              <RowItem key={i} src={src} />
            ))}
          </SimpleMarquee>
        </div>
      </section>

      <Footer />
    </>
  );
}

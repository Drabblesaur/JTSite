import React, { useEffect, useState } from "react";
import Nav from "../components/Nav.jsx";
import Footer from "../components/Footer.jsx";
import PixelTrailBackground from "../components/PixelTrailBackground.jsx";
import { A, useIsMobile } from "../lib/ui.jsx";

const PHOTOS = [
  "/assets/profile/profile1.jpg",
  "/assets/profile/profile2.jpg",
  "/assets/profile/profile3.jpg",
];

const mono = "'Space Mono', monospace";
const serif = "'Redaction 35','Space Grotesk',serif";

// Stacked, flippable photo cards. Click a card to advance; drag a photo to fill.
function PhotoStack() {
  const [index, setIndex] = useState(0);
  const advance = () => setIndex((i) => (i + 1) % 3);

  const configs = [
    {
      rot: 0,
      x: 0,
      y: 0,
      z: 3,
      scale: 1,
      shadow: "0 26px 50px -22px rgba(26,23,18,.55)",
    },
    {
      rot: -5,
      x: -16,
      y: 12,
      z: 2,
      scale: 0.95,
      shadow: "0 20px 44px -26px rgba(26,23,18,.45)",
    },
    {
      rot: 6,
      x: 16,
      y: 22,
      z: 1,
      scale: 0.9,
      shadow: "0 20px 44px -26px rgba(26,23,18,.45)",
    },
  ];

  return (
    <div style={{ position: "sticky", top: 40 }}>
      <div
        style={{ position: "relative", width: "100%", aspectRatio: "4 / 5" }}
      >
        {[0, 1, 2].map((i) => {
          const c = configs[(i - index + 3) % 3];
          return (
            <div
              key={i}
              onClickCapture={(e) => {
                e.stopPropagation();
                advance();
              }}
              title="Click to flip · drag a photo to fill"
              style={{
                position: "absolute",
                inset: 0,
                boxSizing: "border-box",
                cursor: "pointer",
                padding: 8,
                background: "#fcfcfa",
                border: "1px solid #e6e0d2",
                borderRadius: 18,
                boxShadow: c.shadow,
                transform: `translate(${c.x}px, ${c.y}px) rotate(${c.rot}deg) scale(${c.scale})`,
                zIndex: c.z,
                transition: "transform .5s cubic-bezier(.16,1,.3,1)",
              }}
            >
              <img
                src={PHOTOS[i]}
                alt=""
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: 11,
                  display: "block",
                }}
              />
            </div>
          );
        })}
      </div>
      <div
        style={{ display: "flex", gap: 7, alignItems: "center", marginTop: 26 }}
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            onClick={() => setIndex(i)}
            style={{
              width: i === index ? 22 : 8,
              height: 8,
              borderRadius: 99,
              cursor: "pointer",
              background: i === index ? "#1a1712" : "#c9c3b6",
              transition: "all .35s cubic-bezier(.16,1,.3,1)",
            }}
          />
        ))}
      </div>
      <div
        style={{
          fontFamily: mono,
          fontSize: 11,
          letterSpacing: ".12em",
          textTransform: "uppercase",
          color: "#a8a294",
          marginTop: 12,
        }}
      >
        {`0${index + 1} / 03 · click to flip`}
      </div>
    </div>
  );
}

export default function About() {
  const m = useIsMobile();
  useEffect(() => {
    document.title = "About — Johnny To";
    document.body.style.background = "#F2F0EF";
  }, []);

  return (
    <>
      <PixelTrailBackground />
      <div
        style={{
          position: "relative",
          zIndex: 1,
          overflowX: "hidden",
          background: "transparent",
        }}
      >
        <Nav active="about" />

        <div
          style={{
            maxWidth: 1080,
            margin: "0 auto",
            boxSizing: "border-box",
            padding: "20px 32px 0",
          }}
        >
          <A
            to="/"
            sx="font-family:'Space Mono',monospace;font-size:12px;letter-spacing:.1em;text-transform:uppercase;color:#8a8478;text-decoration:none"
            hx="color:#1a1712"
          >
            ← Back home
          </A>
        </div>

        {/* HERO */}
        <header
          style={{
            maxWidth: 1080,
            margin: "0 auto",
            boxSizing: "border-box",
            padding: "44px 32px 60px",
          }}
        >
          <div
            style={{
              fontFamily: mono,
              fontSize: 12,
              letterSpacing: ".14em",
              textTransform: "uppercase",
              color: "#8a8478",
              marginBottom: 20,
            }}
          >
            About me
          </div>
          <h1
            style={{
              animation: "fadeup .8s cubic-bezier(.16,1,.3,1) both",
              fontFamily: "'Comico', cursive",
              fontWeight: 400,
              fontSize: "clamp(54px,10vw,132px)",
              lineHeight: 0.92,
              letterSpacing: ".015em",
              margin: 0,
              color: "#A7C098",
            }}
          >
            Johnny To
          </h1>
          <p
            style={{
              animation: "fadeup .8s cubic-bezier(.16,1,.3,1) both",
              animationDelay: ".14s",
              margin: "28px 0 0",
              fontFamily: serif,
              fontWeight: 500,
              fontSize: "clamp(22px,2.8vw,32px)",
              lineHeight: 1.32,
              letterSpacing: "-.02em",
              color: "#2a251d",
            }}
          >
            Full-stack engineer focused on LLMs, agents, and user-facing
            products.
          </p>
        </header>

        {/* STORY */}
        <section
          style={{
            maxWidth: 1080,
            margin: "0 auto",
            boxSizing: "border-box",
            padding: "0 32px 80px",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: m ? "1fr" : "minmax(0,220px) minmax(0,1fr)",
              gap: m ? 28 : 48,
              alignItems: "start",
            }}
          >
            <div style={{ maxWidth: m ? 240 : "none" }}>
              <PhotoStack />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <p
                style={{
                  margin: 0,
                  fontSize: 16.5,
                  lineHeight: 1.7,
                  color: "#4a4640",
                }}
              >
                I earned my bachelor's in Computer Science from the University
                of California, Riverside. I recently completed my master's in
                Software Engineering with a specialization in Data Science at
                San Jose State University.
              </p>
              <p
                style={{
                  margin: 0,
                  fontSize: 16.5,
                  lineHeight: 1.7,
                  color: "#4a4640",
                }}
              >
                Throughout my studies, I discovered that I enjoy both building
                polished frontend experiences and developing the AI systems
                behind them, especially with LLMs and autonomous agents. I'm
                looking for opportunities to build products that combine
                intelligent AI with great user experiences.
              </p>
              <p
                style={{
                  margin: 0,
                  fontSize: 16.5,
                  lineHeight: 1.7,
                  color: "#4a4640",
                }}
              >
                Outside of coding, you'll usually find me cycling, hiking, or
                exploring new places with my camera. I enjoy being outdoors and
                am always looking for the next adventure or a chance to capture
                a great photo.
              </p>
            </div>
          </div>
        </section>

        {/* FACTS */}
        <section
          style={{
            maxWidth: 1080,
            margin: "0 auto",
            boxSizing: "border-box",
            padding: "0 32px 80px",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: m ? "1fr" : "repeat(3,minmax(0,1fr))",
              gap: 1,
              background: "#e6e0d2",
              border: "1px solid #e6e0d2",
              borderRadius: 16,
              overflow: "hidden",
            }}
          >
            {[
              { k: "Based in", v: "San Jose, CA" },
              { k: "Studying", v: "M.S. Computer Science" },
              { k: "Open to", v: "Frontend & ML roles" },
            ].map((f) => (
              <div
                key={f.k}
                style={{ background: "#fcfcfa", padding: "24px 26px" }}
              >
                <div
                  style={{
                    fontFamily: mono,
                    fontSize: 11,
                    letterSpacing: ".14em",
                    textTransform: "uppercase",
                    color: "#a8a294",
                    marginBottom: 12,
                  }}
                >
                  {f.k}
                </div>
                <div
                  style={{
                    fontFamily: serif,
                    fontWeight: 600,
                    fontSize: 22,
                    color: "#1a1712",
                  }}
                >
                  {f.v}
                </div>
              </div>
            ))}
          </div>
        </section>

        <Footer
          actions={[
            {
              label: "jtochap785@gmail.com",
              primary: true,
              href: "mailto:jtochap785@gmail.com",
            },
            { label: "See my work →", to: "/#work" },
            {
              label: "LinkedIn ↗",
              href: "https://linkedin.com/in/johnnyto015",
            },
          ]}
          back={{ label: "Back home ↑", to: "/" }}
        />
      </div>
    </>
  );
}

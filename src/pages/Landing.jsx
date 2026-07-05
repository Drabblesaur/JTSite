import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Nav from "../components/Nav.jsx";
import Footer from "../components/Footer.jsx";
import { A, Box, useIsMobile } from "../lib/ui.jsx";
import { GridSpinner } from "../components/GridSpinner.jsx";
import { PROJECTS, PROJECT_ORDER } from "../data/projects.js";

const mono = "'Space Mono', monospace";
const serif = "'Redaction 35','Space Grotesk',serif";

function WorkCard({ p }) {
  return (
    <Box
      as="article"
      sx="border:1px solid #e6e0d2;border-radius:18px;overflow:hidden;background:#fff;transition:transform .25s,box-shadow .25s;height:100%;display:flex;flex-direction:column"
      hx="transform:translateY(-3px);box-shadow:0 18px 40px -22px rgba(26,23,18,.35)"
    >
      <div
        style={{
          aspectRatio: "16/10",
          borderBottom: "1px solid #e6e0d2",
          background: "#f4f1e8",
          overflow: "hidden",
        }}
      >
        <img
          src={p.image}
          alt={p.title}
          loading="lazy"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      </div>
      <div
        style={{
          padding: "22px 24px",
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 9,
            marginBottom: 9,
          }}
        >
          <span
            style={{
              fontFamily: mono,
              fontSize: 11,
              color: p.tagColor,
              fontWeight: 700,
              textTransform: "uppercase",
            }}
          >
            {p.tag}
          </span>
        </div>
        <h3
          style={{
            fontFamily: serif,
            fontWeight: 600,
            fontSize: 20,
            letterSpacing: "-.01em",
            margin: "0 0 7px",
          }}
        >
          <A
            to={`/work/${p.slug}`}
            sx="color:#1a1712;text-decoration:none"
            hx="text-decoration:underline"
          >
            {p.title}
          </A>
        </h3>
        <p
          style={{
            margin: "0 0 16px",
            fontSize: 14.5,
            lineHeight: 1.55,
            color: "#6a655b",
          }}
        >
          {p.cardBlurb}
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "auto",
          }}
        >
          <div style={{ display: "flex", gap: 6 }}>
            {p.cardChips.map((c) => (
              <span
                key={c}
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#7a756b",
                  background: "#f4f1e8",
                  borderRadius: 6,
                  padding: "3px 8px",
                }}
              >
                {c}
              </span>
            ))}
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <A
              href={p.codeUrl}
              target="_blank"
              sx="font-size:13px;font-weight:600;color:#4a4640;text-decoration:none"
              hx="color:#1a1712"
            >
              Code ↗
            </A>
            {p.liveLabel && (
              <A
                href={p.liveUrl}
                target="_blank"
                sx="font-size:13px;font-weight:600;color:#4a4640;text-decoration:none"
                hx="color:#1a1712"
              >
                {p.liveLabel} ↗
              </A>
            )}
          </div>
        </div>
      </div>
    </Box>
  );
}

export default function Landing() {
  const m = useIsMobile();
  useEffect(() => {
    document.title = "Johnny To — Software Engineer";
    document.body.style.background = "#F2F0EF";
    // Hide the "Built with Spline" badge inside the viewer's shadow DOM.
    let tries = 0;
    const timer = setInterval(() => {
      tries++;
      const v = document.querySelector("spline-viewer");
      const sr = v && v.shadowRoot;
      if (sr && !sr.querySelector("#hide-badge")) {
        const st = document.createElement("style");
        st.id = "hide-badge";
        st.textContent = '#logo, a[href*="spline"]{display:none !important}';
        sr.appendChild(st);
        clearInterval(timer);
      }
      if (tries > 40) clearInterval(timer);
    }, 300);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ position: "relative", overflowX: "hidden" }}>
      <div style={{ position: "relative", zIndex: 1, background: "#F2F0EF" }}>
        {/* ===== HERO ===== */}
        <header
          style={{
            position: "relative",
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <Nav />

          {/* Spline 3D scene */}
          <div
            aria-hidden="true"
            style={{ position: "absolute", inset: 0, zIndex: 0 }}
          >
            <spline-viewer
              url="https://prod.spline.design/zzP3slV4VptghZdc/scene.splinecode"
              style={{ width: "100%", height: "100%", display: "block" }}
            ></spline-viewer>
          </div>

          {/* legibility scrim */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              height: "34%",
              zIndex: 1,
              pointerEvents: "none",
              background:
                "linear-gradient(180deg,rgba(242,240,239,0) 0%,rgba(242,240,239,.8) 58%,#F2F0EF 100%)",
            }}
          ></div>

          {/* hero content */}
          <div
            id="top"
            style={{
              position: "relative",
              zIndex: 2,
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              maxWidth: 1080,
              width: "100%",
              margin: "0 auto",
              boxSizing: "border-box",
              padding: "0 32px 8vh",
              pointerEvents: "none",
            }}
          >
            <h1
              style={{
                animation: "fadeup .8s cubic-bezier(.16,1,.3,1) both",
                animationDelay: ".05s",
                fontFamily: "'Comico', cursive",
                fontWeight: 400,
                fontSize: "clamp(40px,12.5vw,176px)",
                lineHeight: 0.9,
                letterSpacing: ".015em",
                margin: 0,
                color: "#A7C098",
                whiteSpace: "nowrap",
                pointerEvents: "auto",
              }}
            >
              JOHNNY TO
            </h1>

            <div
              style={{
                animation: "fadeup .8s cubic-bezier(.16,1,.3,1) both",
                animationDelay: ".18s",
                display: "flex",
                alignItems: "flex-start",
                gap: 20,
                marginTop: 28,
                pointerEvents: "auto",
              }}
            >
              <div aria-hidden="true" style={{ flex: "none", marginTop: 3 }}>
                <GridSpinner size={52} color="#111" />
              </div>
              <div>
                <p
                  style={{
                    margin: 0,
                    fontSize: 15,
                    lineHeight: 1.7,
                    color: "#1a1712",
                  }}
                >
                  Hi there!
                  <br />
                  I'm a recent master's graduate in Software Engineering with a
                  specialization in Data Science, passionate about building AI
                  products and crafting great frontend and full-stack
                  experiences.
                  <br />
                  Nice to meet u!
                </p>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 12,
                    marginTop: 24,
                  }}
                >
                  <A
                    href="#work"
                    sx="display:inline-flex;align-items:center;gap:8px;font-size:15px;font-weight:600;color:#fcfcfa;background:#1a1712;text-decoration:none;padding:13px 22px;border-radius:11px"
                    hx="background:#000;transform:translateY(-1px)"
                  >
                    See my projects →
                  </A>
                  <A
                    to="/resume"
                    sx="display:inline-flex;align-items:center;gap:8px;font-size:15px;font-weight:600;color:#1a1712;background:rgba(255,255,255,.5);border:1px solid #dcd6c8;text-decoration:none;padding:13px 22px;border-radius:11px"
                    hx="border-color:#1a1712"
                  >
                    Résumé ↓
                  </A>
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 34,
              zIndex: 2,
              display: "flex",
              justifyContent: "center",
              pointerEvents: "none",
            }}
          >
            <span
              style={{
                animation: "bob 2.4s ease-in-out infinite",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                letterSpacing: ".22em",
                color: "#5a554c",
              }}
            >
              SCROLL ↓
            </span>
          </div>
        </header>

        {/* ===== ABOUT ===== */}
        <section
          id="about"
          style={{
            maxWidth: 1080,
            margin: "0 auto",
            boxSizing: "border-box",
            padding: "110px 32px 70px",
          }}
        >
          <div
            style={{
              maxWidth: 760,
              margin: "0 auto 28px",
              fontFamily: mono,
              fontSize: 12,
              letterSpacing: ".14em",
              textTransform: "uppercase",
              color: "#8a8478",
              textAlign: "left",
            }}
          >
            A bit about me
          </div>
          <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "left" }}>
            <p
              style={{
                margin: 0,
                fontFamily: serif,
                fontWeight: 500,
                fontSize: "clamp(22px,2.6vw,30px)",
                lineHeight: 1.32,
                letterSpacing: "-.02em",
                color: "#2a251d",
              }}
            >
              I like building software that feels as good to use as it is
              interesting to build.
            </p>
            <p
              style={{
                margin: "22px 0 0",
                fontSize: 16.5,
                lineHeight: 1.65,
                color: "#5a554c",
              }}
            >
              I recently completed my master's in Software Engineering with a
              specialization in Data Science at San Jose State University after
              earning my bachelor's in Computer Science from the University of
              California, Riverside. I'm excited about building AI products with
              LLMs and agents while crafting great frontend and full-stack
              experiences, and when I'm not coding, you'll usually find me
              cycling, hiking, or exploring with my camera.
            </p>
            <A
              to="/about"
              sx="display:inline-flex;align-items:center;gap:8px;margin-top:26px;font-size:15px;font-weight:600;color:#fcfcfa;background:#1a1712;text-decoration:none;padding:13px 22px;border-radius:11px"
              hx="background:#000;transform:translateY(-1px)"
            >
              More about me →
            </A>
          </div>
        </section>

        {/* ===== STACK ===== */}
        <section
          style={{
            maxWidth: 1080,
            margin: "0 auto",
            boxSizing: "border-box",
            padding: "0 32px 90px",
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
              {
                label: "Frontend",
                items: ["React", "TypeScript", "Next.js", "Tailwind"],
              },
              {
                label: "Machine learning",
                items: ["PyTorch", "NumPy", "scikit-learn", "FastAPI"],
              },
              { label: "Tools", items: ["Git", "Docker", "Figma", "Postgres"] },
            ].map((col) => (
              <div
                key={col.label}
                style={{ background: "#fcfcfa", padding: "24px 26px" }}
              >
                <div
                  style={{
                    fontFamily: mono,
                    fontSize: 11,
                    letterSpacing: ".14em",
                    textTransform: "uppercase",
                    color: "#a8a294",
                    marginBottom: 14,
                  }}
                >
                  {col.label}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {col.items.map((it) => (
                    <span
                      key={it}
                      style={{
                        fontSize: 13.5,
                        fontWeight: 500,
                        color: "#2a251d",
                        border: "1px solid #e0dacb",
                        borderRadius: 8,
                        padding: "5px 11px",
                      }}
                    >
                      {it}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ===== WORK ===== */}
        <section
          id="work"
          style={{
            maxWidth: 1080,
            margin: "0 auto",
            boxSizing: "border-box",
            padding: "0 32px 110px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              marginBottom: 34,
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
              Selected work
            </h2>
            <A
              href="https://github.com"
              target="_blank"
              sx="font-size:14px;font-weight:600;color:#4a4640;text-decoration:none"
              hx="color:#1a1712"
            >
              All repos on GitHub ↗
            </A>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: m ? "1fr" : "repeat(2,minmax(0,1fr))",
              gap: 22,
            }}
          >
            {PROJECT_ORDER.map((slug) => (
              <WorkCard key={slug} p={PROJECTS[slug]} />
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}

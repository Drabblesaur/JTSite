import React, { useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import Nav from "../components/Nav.jsx";
import Footer from "../components/Footer.jsx";
import PixelTrailBackground from "../components/PixelTrailBackground.jsx";
import { A, useIsMobile } from "../lib/ui.jsx";
import ScrambleIn from "../components/fancy/text/ScrambleIn.jsx";
import { PROJECTS } from "../data/projects.js";

const mono = "'Space Mono', monospace";
const serif = "'Redaction 35','Space Grotesk',serif";

export default function CaseStudy() {
  const { slug } = useParams();
  const m = useIsMobile();
  useEffect(() => {
    document.body.style.background = "#F2F0EF";
  }, []);

  const p = PROJECTS[slug];
  useEffect(() => {
    if (p) document.title = `${p.title} — Johnny To`;
  }, [p]);
  if (!p) return <Navigate to="/" replace />;
  const next = PROJECTS[p.next];

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
        <Nav active="work" />

        <div
          style={{
            maxWidth: 1080,
            margin: "0 auto",
            boxSizing: "border-box",
            padding: "20px 32px 0",
          }}
        >
          <A
            to="/#work"
            sx="font-family:'Space Mono',monospace;font-size:12px;letter-spacing:.1em;text-transform:uppercase;color:#8a8478;text-decoration:none"
            hx="color:#1a1712"
          >
            ← All work
          </A>
        </div>

        {/* HERO */}
        <header
          style={{
            maxWidth: 1080,
            margin: "0 auto",
            boxSizing: "border-box",
            padding: "36px 32px 44px",
          }}
        >
          <div
            style={{
              fontFamily: mono,
              fontSize: 12,
              letterSpacing: ".14em",
              textTransform: "uppercase",
              color: p.tagColor,
              fontWeight: 700,
              marginBottom: 18,
            }}
          >
            {p.tag}
          </div>
          <h1
            style={{
              animation: "fadeup .7s cubic-bezier(.16,1,.3,1) both",
              fontFamily: serif,
              fontWeight: 600,
              fontSize: "clamp(34px,5.4vw,64px)",
              lineHeight: 1.02,
              letterSpacing: "-.03em",
              margin: 0,
              color: "#1a1712",
              maxWidth: "20ch",
            }}
          >
            <ScrambleIn
              key={p.slug}
              text={p.title}
              scrambleSpeed={30}
              scrambledLetterCount={3}
            />
          </h1>
          <p
            style={{
              animation: "fadeup .7s cubic-bezier(.16,1,.3,1) both",
              animationDelay: ".12s",
              margin: "22px 0 0",
              fontFamily: serif,
              fontWeight: 500,
              fontSize: "clamp(19px,2.3vw,26px)",
              lineHeight: 1.34,
              letterSpacing: "-.015em",
              color: "#5a554c",
              maxWidth: "52ch",
            }}
          >
            {p.tagline}
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 12,
              marginTop: 30,
            }}
          >
            <A
              href={p.codeUrl}
              target="_blank"
              sx="display:inline-flex;align-items:center;gap:8px;font-size:15px;font-weight:600;color:#fcfcfa;background:#1a1712;text-decoration:none;padding:12px 20px;border-radius:11px"
              hx="background:#000"
            >
              View code ↗
            </A>
            {p.liveUrl && (
              <A
                href={p.liveUrl}
                target="_blank"
                sx="display:inline-flex;align-items:center;gap:8px;font-size:15px;font-weight:600;color:#1a1712;background:#fff;border:1px solid #e2ddd2;text-decoration:none;padding:12px 20px;border-radius:11px"
                hx="border-color:#c9c3b6"
              >
                Live demo ↗
              </A>
            )}
          </div>
        </header>

        {/* hero image */}
        <div
          style={{
            maxWidth: 1080,
            margin: "0 auto",
            boxSizing: "border-box",
            padding: "0 32px 56px",
          }}
        >
          <div
            style={{
              width: "100%",
              aspectRatio: "16 / 9",
              border: "1px solid #e6e0d2",
              borderRadius: 18,
              overflow: "hidden",
              background: "#f4f1e8",
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
        </div>

        {/* META + OVERVIEW */}
        <section
          style={{
            maxWidth: 1080,
            margin: "0 auto",
            boxSizing: "border-box",
            padding: "0 32px 64px",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: m ? "1fr" : "minmax(0,220px) minmax(0,1fr)",
              gap: m ? 26 : 48,
              alignItems: "start",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
              {[
                { k: "Role", v: p.role },
                { k: "Timeline", v: p.timeline },
              ].map((m) => (
                <div key={m.k}>
                  <div
                    style={{
                      fontFamily: mono,
                      fontSize: 11,
                      letterSpacing: ".14em",
                      textTransform: "uppercase",
                      color: "#a8a294",
                      marginBottom: 8,
                    }}
                  >
                    {m.k}
                  </div>
                  <div
                    style={{
                      fontSize: 14.5,
                      color: "#2a251d",
                      lineHeight: 1.5,
                    }}
                  >
                    {m.v}
                  </div>
                </div>
              ))}
              <div>
                <div
                  style={{
                    fontFamily: mono,
                    fontSize: 11,
                    letterSpacing: ".14em",
                    textTransform: "uppercase",
                    color: "#a8a294",
                    marginBottom: 10,
                  }}
                >
                  Stack
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {p.stack.map((s) => (
                    <span
                      key={s}
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        color: "#7a756b",
                        background: "#f4f1e8",
                        borderRadius: 6,
                        padding: "4px 9px",
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div
              style={{
                maxWidth: "62ch",
                display: "flex",
                flexDirection: "column",
                gap: 20,
              }}
            >
              <h2
                style={{
                  fontFamily: serif,
                  fontWeight: 600,
                  fontSize: 26,
                  letterSpacing: "-.02em",
                  margin: 0,
                  color: "#1a1712",
                }}
              >
                Overview
              </h2>
              {p.overview.map((t, i) => (
                <p
                  key={i}
                  style={{
                    margin: 0,
                    fontSize: 16.5,
                    lineHeight: 1.7,
                    color: "#4a4640",
                  }}
                >
                  {t}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* HIGHLIGHTS */}
        <section
          style={{
            maxWidth: 1080,
            margin: "0 auto",
            boxSizing: "border-box",
            padding: "0 32px 40px",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: m ? "1fr" : "minmax(0,220px) minmax(0,1fr)",
              gap: m ? 20 : 48,
              alignItems: "start",
            }}
          >
            <div
              style={{
                fontFamily: mono,
                fontSize: 12,
                letterSpacing: ".14em",
                textTransform: "uppercase",
                color: "#8a8478",
                paddingTop: 6,
              }}
            >
              What I built
            </div>
            <div
              style={{
                maxWidth: "62ch",
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}
            >
              {p.highlights.map((t, i) => (
                <div
                  key={i}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "28px 1fr",
                    gap: 14,
                    alignItems: "start",
                  }}
                >
                  <div
                    style={{
                      fontFamily: mono,
                      fontSize: 13,
                      fontWeight: 700,
                      color: p.tagColor,
                      paddingTop: 2,
                    }}
                  >
                    {"0" + (i + 1)}
                  </div>
                  <div
                    style={{ fontSize: 16, lineHeight: 1.6, color: "#2a251d" }}
                  >
                    {t}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* gallery */}
        <div
          style={{
            maxWidth: 1080,
            margin: "0 auto",
            boxSizing: "border-box",
            padding: "0 32px 70px",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: m ? "1fr" : "repeat(2,minmax(0,1fr))",
              gap: 22,
            }}
          >
            {p.galleryImages.map((src, n) => (
              <div
                key={src}
                style={{
                  width: "100%",
                  aspectRatio: "4 / 3",
                  border: "1px solid #e6e0d2",
                  borderRadius: 14,
                  overflow: "hidden",
                  background: "#f4f1e8",
                }}
              >
                <img
                  src={src}
                  alt={`${p.title} detail ${n + 1}`}
                  loading="lazy"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* next project */}
        <section
          style={{
            maxWidth: 1080,
            margin: "0 auto",
            boxSizing: "border-box",
            padding: "0 32px 90px",
          }}
        >
          <A
            to={`/work/${p.next}`}
            sx="display:flex;align-items:center;justify-content:space-between;gap:24px;text-decoration:none;border:1px solid #e6e0d2;border-radius:18px;background:#fff;padding:26px 30px"
            hx="border-color:#1a1712;transform:translateY(-2px)"
          >
            <div>
              <div
                style={{
                  fontFamily: mono,
                  fontSize: 11,
                  letterSpacing: ".14em",
                  textTransform: "uppercase",
                  color: "#a8a294",
                  marginBottom: 8,
                }}
              >
                Next project
              </div>
              <div
                style={{
                  fontFamily: serif,
                  fontWeight: 600,
                  fontSize: 24,
                  letterSpacing: "-.02em",
                  color: "#1a1712",
                }}
              >
                {next.title}
              </div>
            </div>
            <div style={{ fontSize: 26, color: "#1a1712" }}>→</div>
          </A>
        </section>

        <Footer
          actions={[
            {
              label: "jtochap785@gmail.com",
              primary: true,
              href: "mailto:jtochap785@gmail.com",
            },
            { label: "See all work →", to: "/#work" },
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

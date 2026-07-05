import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { A, useIsMobile } from "../lib/ui.jsx";
import PixelTrailBackground from "../components/PixelTrailBackground.jsx";

const mono = "'Space Mono', monospace";
const serif = "'Redaction 35','Space Grotesk',serif";

const label = {
  fontFamily: mono,
  fontSize: 12,
  letterSpacing: ".14em",
  textTransform: "uppercase",
  color: "#8a8478",
};
const roleTitle = {
  fontFamily: serif,
  fontWeight: 600,
  fontSize: 18,
  color: "#1a1712",
};
const dateText = {
  fontFamily: mono,
  fontSize: 12,
  color: "#8a8478",
  whiteSpace: "nowrap",
};
const bullet = { fontSize: 14, lineHeight: 1.55, color: "#2a251d" };

function Entry({ title, date, sub, bullets }) {
  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          gap: 16,
        }}
      >
        <div style={roleTitle}>{title}</div>
        <div style={dateText}>{date}</div>
      </div>
      <div style={{ fontSize: 13.5, color: "#6a655b", margin: "3px 0 10px" }}>
        {sub}
      </div>
      {bullets && (
        <ul
          style={{
            margin: 0,
            paddingLeft: 18,
            display: "flex",
            flexDirection: "column",
            gap: 6,
          }}
        >
          {bullets.map((b, i) => (
            <li key={i} style={bullet}>
              {b}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function Resume() {
  const m = useIsMobile();
  useEffect(() => {
    document.title = "Résumé — Johnny To";
    document.body.style.background = "#e9e6e2";
  }, []);

  const stamp = {
    position: "absolute",
    zIndex: 3,
    padding: 8,
    boxSizing: "border-box",
    background: "#fcfcfa",
    borderRadius: 12,
    filter: "drop-shadow(0 8px 14px rgba(26,23,18,.26))",
  };
  const stampImg = {
    display: "block",
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: 5,
  };

  return (
    <>
      <div className="no-print">
        <PixelTrailBackground />
      </div>
      <div style={{ position: "relative", zIndex: 1, overflowX: "hidden" }}>
        {/* nav (hidden when printing) */}
        <nav
          className="no-print"
          style={{
            position: "relative",
            zIndex: 2,
            maxWidth: 1080,
            width: "100%",
            margin: "0 auto",
            boxSizing: "border-box",
            padding: "28px 32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Link
            to="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              textDecoration: "none",
            }}
          >
            <img
              src="/assets/logo.svg"
              alt="Home"
              style={{ width: 50, height: 50, display: "block" }}
            />
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: 26 }}>
            <A
              to="/#work"
              sx="font-size:14px;font-weight:500;color:#4a4640;text-decoration:none"
              hx="color:#1a1712"
            >
              Work
            </A>
            <A
              to="/about"
              sx="font-size:14px;font-weight:500;color:#4a4640;text-decoration:none"
              hx="color:#1a1712"
            >
              About
            </A>
            <A
              href="/assets/Johnny_To_Resume.pdf"
              target="_blank"
              sx="font-size:13.5px;font-weight:600;color:#fcfcfa;background:#1a1712;text-decoration:none;padding:9px 15px;border-radius:9px"
              hx="background:#000"
            >
              Download PDF ↓
            </A>
          </div>
        </nav>

        {/* sheet */}
        <div
          className="sheet"
          style={{
            position: "relative",
            maxWidth: 820,
            margin: "16px auto 80px",
            boxSizing: "border-box",
            background: "#fcfcfa",
            border: "1px solid #ded9cf",
            boxShadow: "0 30px 70px -40px rgba(26,23,18,.4)",
            padding: m ? "40px 22px 48px" : "64px 64px 72px",
          }}
        >
          {/* photo cards */}
          {!m && (
            <>
              <div
                style={{
                  ...stamp,
                  top: 300,
                  right: -78,
                  width: 126,
                  height: 168,
                  transform: "rotate(4deg)",
                }}
              >
                <img
                  src="/assets/stamp-tower.jpg"
                  alt="Tower"
                  style={stampImg}
                />
              </div>
              <div
                style={{
                  ...stamp,
                  top: 830,
                  left: -100,
                  width: 158,
                  height: 120,
                  transform: "rotate(-4deg)",
                }}
              >
                <img
                  src="/assets/stamp-campus.jpg"
                  alt="Campus"
                  style={stampImg}
                />
              </div>
            </>
          )}

          {/* header */}
          <header
            style={{
              display: "flex",
              flexDirection: m ? "column" : "row",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: m ? 14 : 24,
              paddingBottom: 26,
              borderBottom: "2px solid #1a1712",
            }}
          >
            <div>
              <h1
                style={{
                  fontFamily: "'Comico', cursive",
                  fontWeight: 400,
                  fontSize: 52,
                  lineHeight: 0.95,
                  letterSpacing: ".01em",
                  margin: 0,
                  color: "#1a1712",
                }}
              >
                Johnny To
              </h1>
              <p
                style={{
                  margin: "12px 0 0",
                  fontFamily: serif,
                  fontWeight: 500,
                  fontSize: 18,
                  color: "#5a554c",
                  letterSpacing: "-.01em",
                }}
              >
                Software Engineering · Data Science · AI Systems
              </p>
            </div>
            <div
              style={{
                textAlign: m ? "left" : "right",
                fontFamily: mono,
                fontSize: 12.5,
                lineHeight: 1.9,
                color: "#4a4640",
                whiteSpace: "nowrap",
              }}
            >
              <div>jtochap785@gmail.com</div>
              <A
                href="https://github.com/drabblesaur"
                target="_blank"
                sx="color:#4a4640;text-decoration:none"
                hx="color:#1a1712"
              >
                github.com/drabblesaur
              </A>
              <div>
                <A
                  href="https://linkedin.com/in/johnnyto015"
                  target="_blank"
                  sx="color:#4a4640;text-decoration:none"
                  hx="color:#1a1712"
                >
                  linkedin.com/in/johnnyto015
                </A>
              </div>
            </div>
          </header>

          {/* summary */}
          <section
            style={{ padding: "26px 0", borderBottom: "1px solid #e6e0d2" }}
          >
            <p
              style={{
                margin: 0,
                fontSize: 15,
                lineHeight: 1.65,
                color: "#2a251d",
                maxWidth: "66ch",
              }}
            >
              Recent MS graduate in Software Engineering with a specialization
              in Data Science from SJSU, with project experience spanning LLM
              systems, RAG pipelines, and full-stack mobile and web development.
              Looking to bring both software engineering depth and applied AI
              skills to a collaborative engineering team.
            </p>
          </section>

          {/* two-column body */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: m ? "1fr" : "minmax(0,150px) minmax(0,1fr)",
              gap: m ? 8 : 36,
              paddingTop: 30,
            }}
          >
            <div style={{ ...label, paddingTop: 4 }}>Education</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
              <Entry
                title="MS in Software Engineering, Specialization in Data Science"
                date="August 2024 – May 2026"
                sub="San Jose State University · San Jose, California"
                bullets={[
                  "Relevant Coursework: Enterprise Software Platforms, Software Systems Engineering, Software QA Testing",
                ]}
              />
              <Entry
                title="BS in Computer Science"
                date="September 2021 – December 2024"
                sub="University of California, Riverside · Riverside, California"
              />
            </div>

            <div
              style={{
                ...label,
                paddingTop: 22,
                borderTop: "1px solid #e6e0d2",
              }}
            >
              Technical Skills
            </div>
            <div
              style={{
                paddingTop: 22,
                borderTop: "1px solid #e6e0d2",
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: mono,
                    fontSize: 11,
                    letterSpacing: ".1em",
                    textTransform: "uppercase",
                    color: "#a8a294",
                    marginBottom: 7,
                  }}
                >
                  Languages
                </div>
                <div
                  style={{ fontSize: 14, color: "#2a251d", lineHeight: 1.5 }}
                >
                  Python · JavaScript · SQL
                </div>
              </div>
              <div>
                <div
                  style={{
                    fontFamily: mono,
                    fontSize: 11,
                    letterSpacing: ".1em",
                    textTransform: "uppercase",
                    color: "#a8a294",
                    marginBottom: 7,
                  }}
                >
                  Frameworks
                </div>
                <div
                  style={{ fontSize: 14, color: "#2a251d", lineHeight: 1.5 }}
                >
                  React · React Native · Next.js · Express.js
                </div>
              </div>
              <div>
                <div
                  style={{
                    fontFamily: mono,
                    fontSize: 11,
                    letterSpacing: ".1em",
                    textTransform: "uppercase",
                    color: "#a8a294",
                    marginBottom: 7,
                  }}
                >
                  AI/ML
                </div>
                <div
                  style={{ fontSize: 14, color: "#2a251d", lineHeight: 1.5 }}
                >
                  LangChain · RAG · Prompt Engineering · LLM Benchmarking ·
                  FAISS · Ollama · OpenAI API
                </div>
              </div>
              <div>
                <div
                  style={{
                    fontFamily: mono,
                    fontSize: 11,
                    letterSpacing: ".1em",
                    textTransform: "uppercase",
                    color: "#a8a294",
                    marginBottom: 7,
                  }}
                >
                  Data Science
                </div>
                <div
                  style={{ fontSize: 14, color: "#2a251d", lineHeight: 1.5 }}
                >
                  NumPy · Pandas · Jupyter Notebooks
                </div>
              </div>
              <div>
                <div
                  style={{
                    fontFamily: mono,
                    fontSize: 11,
                    letterSpacing: ".1em",
                    textTransform: "uppercase",
                    color: "#a8a294",
                    marginBottom: 7,
                  }}
                >
                  Cloud/DevOps
                </div>
                <div
                  style={{ fontSize: 14, color: "#2a251d", lineHeight: 1.5 }}
                >
                  AWS (Lambda, API Gateway) · Docker
                </div>
              </div>
              <div>
                <div
                  style={{
                    fontFamily: mono,
                    fontSize: 11,
                    letterSpacing: ".1em",
                    textTransform: "uppercase",
                    color: "#a8a294",
                    marginBottom: 7,
                  }}
                >
                  Databases
                </div>
                <div
                  style={{ fontSize: 14, color: "#2a251d", lineHeight: 1.5 }}
                >
                  PostgreSQL · MongoDB
                </div>
              </div>
              <div>
                <div
                  style={{
                    fontFamily: mono,
                    fontSize: 11,
                    letterSpacing: ".1em",
                    textTransform: "uppercase",
                    color: "#a8a294",
                    marginBottom: 7,
                  }}
                >
                  Tools
                </div>
                <div
                  style={{ fontSize: 14, color: "#2a251d", lineHeight: 1.5 }}
                >
                  Git · GitHub
                </div>
              </div>
            </div>

            <div
              style={{
                ...label,
                paddingTop: 22,
                borderTop: "1px solid #e6e0d2",
              }}
            >
              Projects
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 16,
                paddingTop: 22,
                borderTop: "1px solid #e6e0d2",
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: serif,
                    fontWeight: 600,
                    fontSize: 16,
                    color: "#1a1712",
                  }}
                >
                  SJSU Course &amp; Degree Virtual Assistant
                </div>
                <div
                  style={{
                    fontSize: 13.5,
                    lineHeight: 1.5,
                    color: "#6a655b",
                    marginTop: 3,
                  }}
                >
                  Python, LangChain, FAISS, OpenAI API · GitHub
                </div>
                <ul
                  style={{
                    margin: "8px 0 0",
                    paddingLeft: 18,
                    display: "flex",
                    flexDirection: "column",
                    gap: 6,
                  }}
                >
                  <li style={bullet}>
                    Architected an LLM-based agent system integrating tool
                    orchestration, multi-source retrieval, and query planning to
                    answer SJSU students' course planning and degree audit
                    questions.
                  </li>
                  <li style={bullet}>
                    Built a dynamic tool routing pipeline enabling the model to
                    select between database queries, retrieval systems, and
                    constrained web search.
                  </li>
                  <li style={bullet}>
                    Benchmarked Qwen 1.7B vs 14B models, identifying
                    latency/quality tradeoffs (20–30s vs 60–100s inference).
                  </li>
                  <li style={bullet}>
                    Designed secure tool-scoped data access, preventing leakage
                    of sensitive student information under adversarial prompts.
                  </li>
                </ul>
              </div>
              <div>
                <div
                  style={{
                    fontFamily: serif,
                    fontWeight: 600,
                    fontSize: 16,
                    color: "#1a1712",
                  }}
                >
                  LessGo: Smart Carpooling Platform
                </div>
                <div
                  style={{
                    fontSize: 13.5,
                    lineHeight: 1.5,
                    color: "#6a655b",
                    marginTop: 3,
                  }}
                >
                  Python, Node.js, React Native, PostgreSQL, FastAPI · GitHub
                </div>
                <ul
                  style={{
                    margin: "8px 0 0",
                    paddingLeft: 18,
                    display: "flex",
                    flexDirection: "column",
                    gap: 6,
                  }}
                >
                  <li style={bullet}>
                    Architected a full-stack microservice carpooling platform
                    for SJSU students, spanning 11 independent services
                    including matching, routing, payments, and real-time safety
                    monitoring.
                  </li>
                  <li style={bullet}>
                    Implemented a three-stage rider-driver matching pipeline
                    combining PostGIS proximity filtering, RShareForm
                    heterogeneous network embeddings, and a weighted service
                    cost function, achieving 84%+ match accuracy across
                    candidate pools of 100 drivers.
                  </li>
                  <li style={bullet}>
                    Engineered a real-time safety monitoring system that detects
                    route deviations and speed anomalies by comparing live GPS
                    updates against planned route polylines, triggering
                    automated alerts on suspicious driver behavior.
                  </li>
                </ul>
              </div>
            </div>

            <div
              style={{
                ...label,
                paddingTop: 22,
                borderTop: "1px solid #e6e0d2",
              }}
            >
              Experience
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 26,
                paddingTop: 22,
                borderTop: "1px solid #e6e0d2",
              }}
            >
              <Entry
                title="Undergraduate Research Assistant"
                date="June 2021 – August 2021"
                sub="UCR Bourns College of Engineering · Riverside, California"
                bullets={[
                  "Developed a NumPy-based benchmarking framework to evaluate the performance of experimental matrix multiplication methods.",
                  "Reduced computational steps by 33% through algorithmic optimization.",
                  "Collaborated with faculty to test novel approaches to accelerating deep learning workloads.",
                ]}
              />
            </div>

            <div
              style={{
                ...label,
                paddingTop: 22,
                borderTop: "1px solid #e6e0d2",
              }}
            >
              Leadership
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 16,
                paddingTop: 22,
                borderTop: "1px solid #e6e0d2",
              }}
            >
              <Entry
                title="Vice President"
                date="2019 – 2021"
                sub="Developers' Guild · Cupertino, California"
                bullets={[
                  "Led a redesign of club assets resulting in an 88% increase in new student sign-ups.",
                  "Taught Python and Web Development to club members; coordinated the school's first Hacktoberfest event.",
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

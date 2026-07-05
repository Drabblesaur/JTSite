import React from "react";
import { A } from "../lib/ui.jsx";

const primarySx =
  "display:inline-flex;align-items:center;gap:8px;font-size:15px;font-weight:600;color:#F2F0EF;background:#1a1712;text-decoration:none;padding:13px 22px;border-radius:11px";
const ghostSx =
  "display:inline-flex;align-items:center;gap:8px;font-size:15px;font-weight:600;color:#1a1712;background:#fff;border:1px solid #e2ddd2;text-decoration:none;padding:13px 22px;border-radius:11px";

function Action({ action }) {
  const sx = action.primary ? primarySx : ghostSx;
  const hx = action.primary ? "background:#000" : "border-color:#c9c3b6";
  return (
    <A
      to={action.to}
      href={action.href}
      target={action.href ? "_blank" : undefined}
      sx={sx}
      hx={hx}
    >
      {action.label}
    </A>
  );
}

/**
 * Shared contact footer. Pass `actions` (array of {label, primary?, to?, href?})
 * and a `back` link ({label, to?, href?}). Defaults match the landing page.
 */
export default function Footer({
  actions = [
    {
      label: "jtochap785@gmail.com",
      primary: true,
      href: "mailto:jtochap785@gmail.com",
    },
    { label: "GitHub ↗", href: "https://github.com/Drabblesaur" },
    { label: "LinkedIn ↗", href: "https://linkedin.com/in/johnnyto015" },
    { label: "Résumé ↓", to: "/resume" },
  ],
  back = {
    label: "Back to top ↑",
    href: "#",
    onClick: (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  },
}) {
  return (
    <footer
      style={{
        position: "relative",
        zIndex: 1,
        color: "#1a1712",
        marginTop: 20,
      }}
    >
      <div
        style={{
          background:
            "linear-gradient(180deg,rgba(242,240,239,.74) 0%,rgba(242,240,239,.34) 52%,rgba(242,240,239,.12) 100%),url('/assets/dither-footer.png') center/100% 100% no-repeat",
        }}
      >
        <div
          style={{
            position: "relative",
            zIndex: 2,
            maxWidth: 1080,
            margin: "0 auto",
            boxSizing: "border-box",
            padding: "96px 32px 40px",
          }}
        >
          <div
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 12,
              letterSpacing: ".14em",
              textTransform: "uppercase",
              color: "#2a251d",
              marginBottom: 20,
              fontWeight: 700,
            }}
          >
            Currently seeking · frontend &amp; ML · 2026
          </div>
          <h2
            style={{
              fontFamily: "'Redaction 35','Space Grotesk',serif",
              fontWeight: 600,
              fontSize: "clamp(32px,5vw,58px)",
              lineHeight: 1.05,
              letterSpacing: "-.03em",
              margin: 0,
              maxWidth: "16ch",
            }}
          >
            Let's build something worth shipping.
          </h2>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 12,
              marginTop: 34,
            }}
          >
            {actions.map((a, i) => (
              <Action key={i} action={a} />
            ))}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 72,
              paddingTop: 22,
              borderTop: "1px solid #1a171229",
              fontSize: 13,
              color: "#2a251d",
            }}
          >
            <span
              style={{ fontFamily: "'Space Mono', monospace", fontWeight: 700 }}
            >
              © 2026 Johnny To
            </span>
            <A
              to={back.to}
              href={back.href}
              onClick={back.onClick}
              sx="font-family:'Space Mono',monospace;color:#2a251d;text-decoration:none;font-weight:700"
              hx="color:#000"
            >
              {back.label}
            </A>
          </div>
        </div>
      </div>
    </footer>
  );
}

import React from "react";
import { Link } from "react-router-dom";
import { A, useIsMobile } from "../lib/ui.jsx";

const linkBase =
  "font-size:14px;font-weight:500;color:#4a4640;text-decoration:none";
const linkActive =
  "font-size:14px;font-weight:600;color:#1a1712;text-decoration:none";
const hover = "color:#1a1712";

/**
 * Shared top navigation used on the Landing, About, and Case Study pages.
 * `active` highlights the current section ('work' | 'about' | null).
 */
export default function Nav({ active = null }) {
  const m = useIsMobile();
  return (
    <nav style={{ ...navStyle, padding: m ? "18px 20px" : "28px 32px" }}>
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
          style={{ width: m ? 40 : 50, height: m ? 40 : 50, display: "block" }}
        />
      </Link>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          justifyContent: "flex-end",
          gap: m ? 14 : 26,
        }}
      >
        <A
          to="/#work"
          sx={active === "work" ? linkActive : linkBase}
          hx={active === "work" ? undefined : hover}
        >
          Work
        </A>
        <A
          to="/about"
          sx={active === "about" ? linkActive : linkBase}
          hx={active === "about" ? undefined : hover}
        >
          About
        </A>
        <A
          to="/photos"
          sx={active === "photos" ? linkActive : linkBase}
          hx={active === "photos" ? undefined : hover}
        >
          Photos
        </A>
        <A
          href="https://github.com/Drabblesaur"
          target="_blank"
          sx={linkBase}
          hx={hover}
        >
          GitHub ↗
        </A>
        <A
          to="/resume"
          sx="font-size:13.5px;font-weight:600;color:#fcfcfa;background:#1a1712;text-decoration:none;padding:9px 15px;border-radius:9px"
          hx="background:#000"
        >
          Résumé ↓
        </A>
      </div>
    </nav>
  );
}

const navStyle = {
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
};

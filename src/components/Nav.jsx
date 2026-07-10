import React, { useState } from "react";
import { Link } from "react-router-dom";
import { A, useIsMobile, usePrefersReducedMotion } from "../lib/ui.jsx";

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
  const reducedMotion = usePrefersReducedMotion();
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  const linkStyle = m
    ? {
        display: "block",
        width: "100%",
        padding: "10px 0",
      }
    : { whiteSpace: "nowrap" };

  const mobileLinkSx = m ? "display:block;width:100%;padding:10px 0" : "";

  const mobileMenu = m && open;
  const menuTransition = reducedMotion
    ? "none"
    : mobileMenu
      ? "max-height 250ms cubic-bezier(0.22, 1, 0.36, 1), opacity 250ms cubic-bezier(0.22, 1, 0.36, 1), transform 250ms cubic-bezier(0.22, 1, 0.36, 1), padding 250ms cubic-bezier(0.22, 1, 0.36, 1), margin-top 250ms cubic-bezier(0.22, 1, 0.36, 1)"
      : "max-height 150ms cubic-bezier(0.22, 1, 0.36, 1), opacity 150ms cubic-bezier(0.22, 1, 0.36, 1), transform 150ms cubic-bezier(0.22, 1, 0.36, 1), padding 150ms cubic-bezier(0.22, 1, 0.36, 1), margin-top 150ms cubic-bezier(0.22, 1, 0.36, 1)";

  const menuPanelStyle = m
    ? {
        background: "rgba(252, 252, 250, 0.95)",
        border: "1px solid rgba(26, 23, 18, 0.12)",
        borderRadius: 18,
        boxShadow: "0 18px 40px rgba(26, 23, 18, 0.09)",
        boxSizing: "border-box",
        width: "min(320px, calc(100vw - 40px))",
        alignSelf: "flex-end",
        overflow: "hidden",
        maxHeight: mobileMenu ? 420 : 0,
        opacity: mobileMenu ? 1 : 0,
        transform: mobileMenu ? "translateY(0)" : "translateY(-8px)",
        padding: mobileMenu ? "12px 14px" : "0 14px",
        marginTop: mobileMenu ? 12 : 0,
        pointerEvents: mobileMenu ? "auto" : "none",
        transition: menuTransition,
      }
    : undefined;

  return (
    <nav
      style={{
        ...navStyle,
        padding: m ? "18px 20px" : "28px 32px",
        flexDirection: m ? "column" : "row",
        alignItems: m ? "stretch" : "center",
        gap: m ? 16 : 0,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Link
          to="/"
          onClick={closeMenu}
          style={{
            display: "inline-flex",
            alignItems: "center",
            textDecoration: "none",
          }}
        >
          <img
            src="/assets/logo.svg"
            alt="Home"
            style={{
              width: m ? 40 : 50,
              height: m ? 40 : 50,
              display: "block",
            }}
          />
        </Link>
        {m ? (
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="primary-nav-links"
            style={{
              appearance: "none",
              border: "1px solid rgba(26, 23, 18, 0.16)",
              background: open ? "#1a1712" : "rgba(252, 252, 250, 0.96)",
              color: open ? "#fcfcfa" : "#1a1712",
              borderRadius: 999,
              padding: "10px 14px",
              font: "inherit",
              fontSize: 13,
              fontWeight: 600,
              lineHeight: 1,
              transition: reducedMotion
                ? "none"
                : "background 180ms ease, color 180ms ease, border-color 180ms ease",
            }}
          >
            {open ? "Close" : "Menu"}
          </button>
        ) : null}
      </div>
      <div
        style={{
          display: m ? "flex" : "flex",
          flexDirection: m ? "column" : "row",
          alignItems: m ? "flex-start" : "center",
          flexWrap: "nowrap",
          justifyContent: m ? "flex-start" : "flex-end",
          gap: m ? 12 : 26,
          width: m ? "100%" : "auto",
          position: "relative",
        }}
        id="primary-nav-links"
      >
        <div
          aria-hidden={m ? !mobileMenu : undefined}
          style={{
            display: "flex",
            flexDirection: m ? "column" : "row",
            alignItems: m ? "flex-start" : "center",
            flexWrap: "nowrap",
            justifyContent: m ? "flex-start" : "flex-end",
            gap: m ? 12 : 26,
            width: m ? "100%" : "auto",
            opacity: m ? (mobileMenu ? 1 : 0) : 1,
            transform: m
              ? mobileMenu
                ? "translateY(0)"
                : "translateY(-8px)"
              : "none",
            maxHeight: m ? (mobileMenu ? 420 : 0) : "none",
            overflow: m ? "hidden" : "visible",
            pointerEvents: m ? (mobileMenu ? "auto" : "none") : "auto",
            transition: menuTransition,
            ...menuPanelStyle,
          }}
        >
          <A
            to="/#work"
            sx={`${active === "work" ? linkActive : linkBase};${mobileLinkSx}`}
            style={linkStyle}
            hx={active === "work" ? undefined : hover}
            onClick={closeMenu}
          >
            Work
          </A>
          <A
            to="/about"
            sx={`${active === "about" ? linkActive : linkBase};${mobileLinkSx}`}
            style={linkStyle}
            hx={active === "about" ? undefined : hover}
            onClick={closeMenu}
          >
            About
          </A>
          <A
            to="/photos"
            sx={`${active === "photos" ? linkActive : linkBase};${mobileLinkSx}`}
            style={linkStyle}
            hx={active === "photos" ? undefined : hover}
            onClick={closeMenu}
          >
            Photos
          </A>
          <A
            href="https://github.com/Drabblesaur"
            target="_blank"
            sx={`${linkBase};${mobileLinkSx}`}
            style={linkStyle}
            hx={hover}
            onClick={closeMenu}
          >
            GitHub ↗
          </A>
          <A
            to="/resume"
            sx="font-size:13.5px;font-weight:600;color:#fcfcfa;background:#1a1712;text-decoration:none;padding:9px 15px;border-radius:9px"
            style={{
              ...(linkStyle || {}),
              padding: m ? "12px 15px" : "9px 15px",
              display: m ? "block" : undefined,
              boxSizing: m ? "border-box" : undefined,
              textAlign: m ? "center" : undefined,
            }}
            hx="background:#000"
            onClick={closeMenu}
          >
            Résumé ↓
          </A>
        </div>
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

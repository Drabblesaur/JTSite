import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import './styles.css';

import Landing from './pages/Landing.jsx';
import About from './pages/About.jsx';
import CaseStudy from './pages/CaseStudy.jsx';
import Resume from './pages/Resume.jsx';
import Photos from './pages/Photos.jsx';
import NotFound from './pages/NotFound.jsx';

// On route change: scroll to the #hash target if present, otherwise to the top.
function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) { window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 8, behavior: 'smooth' }); return; }
    }
    window.scrollTo({ top: 0 });
  }, [pathname, hash]);
  return null;
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* BrowserRouter gives clean URLs and lets in-page #anchors work.
        `npm run dev` (Vite) serves deep links fine. For static hosting,
        add a catch-all rewrite to index.html, or switch to HashRouter. */}
    <BrowserRouter>
      <ScrollManager />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/work/:slug" element={<CaseStudy />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/photos" element={<Photos />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

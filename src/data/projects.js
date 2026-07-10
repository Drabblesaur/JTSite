// All project data for the Work section and case-study pages lives here.
// Edit these entries to change what shows across the site.

export const PROJECTS = {
  lessgo: {
    slug: "lessgo",
    tag: "Full-stack",
    tagColor: "#16a34a",
    image: "/assets/projects/LessGo1.png",
    galleryImages: [
      "/assets/projects/LessGo2.png",
      "/assets/projects/LessGo3.png",
    ],

    title: "LessGo — SJSU ridesharing platform",

    cardBlurb:
      "Campus carpooling with ML-powered route matching, SJSU ID verification, and a microservices backend deployed on GKE.",

    cardChips: ["Swift", "TypeScript", "Kubernetes"],

    liveLabel: null,

    tagline:
      "A ridesharing platform built for SJSU students, with ML-based route matching, driver verification, and real-time safety monitoring across a nine-service backend.",

    role: "Team · Architecture + build",
    timeline: "2025",

    stack: [
      "Swift / SwiftUI",
      "Node.js / TypeScript",
      "Python (ML services)",
      "PostgreSQL + PostGIS",
      "Redis",
      "Stripe",
      "Kubernetes (GKE)",
    ],

    codeUrl: "https://github.com/manamsriram/SJSU_Ridesharing",
    liveUrl: null,

    overview: [
      "LessGo lets SJSU drivers post scheduled trips and riders book seats that fit their schedule, with every user verified against a valid SJSU student ID before they can participate.",
      "Under the hood it's nine microservices — auth, trips, bookings, payments, notifications, cost calculation, and two ML services — behind a single API gateway, talking to a PostGIS-backed Postgres database on Supabase.",
    ],

    highlights: [
      "ML-based route-compatibility matching (RShareForm embeddings) ranks trips by how well routes actually align, not just pickup proximity.",
      "Dynamic fare engine handling detour surcharges and multi-rider discounts, with a T-1h freeze that locks in and redistributes savings-pool discounts across confirmed riders.",
      "Real-time safety service monitoring route deviation and speed anomalies mid-trip, plus live chat, location tracking, and Stripe payments captured only on trip completion.",
    ],

    next: "sjsuVA",
  },
  sjsuVA: {
    slug: "sjsuVA",
    tag: "Machine learning",
    tagColor: "#0358f7",
    image: "/assets/stamp-campus.jpg",
    galleryImages: [
      "/assets/projects/sjsuVA1.jpeg",
      "/assets/projects/sjsuVA2.png",
    ],

    title: "SJSU Course Advisor & Degree Audit Virtual Assistant",

    cardBlurb:
      "An LLM-orchestrated advisor that routes student questions through RAG tools and a secured database lookup to answer course-planning and degree-audit questions.",

    cardChips: ["Python", "LLM Orchestration", "RAG"],

    liveLabel: null,

    tagline:
      "A retrieval-augmented virtual advisor that routes graduate and transfer student questions through an LLM orchestrator, three specialized RAG tools, and a security-hardened student data lookup.",

    role: "Solo · design + implementation",
    timeline: "CMPE 259 final project, 2024",

    stack: [
      "Python",
      "Qwen3 (1.7B / 14B)",
      "RAG",
      "LLM Orchestration",
      "Google Search API",
    ],

    codeUrl: "https://github.com/Drabblesaur/SJSU_VAssistant",
    liveUrl: null,

    overview: [
      "Built for SJSU graduate and transfer students, the VA answers course-planning and degree-audit questions by routing each query through helper LLM calls, an orchestrator, and a set of specialized tools rather than a single monolithic prompt.",
      "Two traditional RAGs (Graduate Info, Major Info) and a Registrar Info RAG supply catalog and policy context, a database-backed Student Information tool supplies the asker's own record, and a domain-restricted web search tool fills gaps — all coordinated by an orchestrator that decides which tools a given query actually needs.",
    ],

    highlights: [
      "Orchestrator architecture that rewrites and tags each query, then calls only the RAG/tool combination it actually needs instead of running every tool on every request.",
      "Security-first design: student ID is bound only to the Student Information tool, web search is restricted to SJSU domains, and the VA was stress-tested against prompt-injection and cross-student data-leak attempts.",
      "Benchmarked a small (Qwen3-1.7B) vs. large (Qwen3-14B) model across 27 test queries — the larger model gave notably more detailed, correct answers at 60–130s latency vs. the small model's 20–30s.",
    ],

    next: "jot",
  },
  jot: {
    slug: "jot",
    tag: "Machine learning",
    tagColor: "#0358f7",
    image: "/assets/projects/jot1.png",
    galleryImages: ["/assets/projects/jot2.gif", "/assets/projects/jot3.png"],

    title: "Jot — Offline Notes with a RAG agent",

    cardBlurb:
      "A note-taking app with a local Ollama agent that answers questions about your notes via RAG — no cloud, no API keys.",

    cardChips: ["Ollama", "Tauri", "IN PROGRESS"],

    liveLabel: null,

    tagline:
      "A note-taking app where an Ollama-powered agent answers questions about what you've written, entirely offline via retrieval-augmented generation.",

    role: "Solo · design + implementation",
    timeline: "2024",

    stack: ["TypeScript", "Tauri", "Python", "Ollama", "RAG"],

    codeUrl: "https://github.com/Drabblesaur/OfflineRAGNotes",
    liveUrl: null,

    overview: [
      "Jot pairs a normal note-taking interface with a local agent: instead of exact-match search, you can ask it questions and get answers grounded in your own notes.",
      "A Python RAG backend handles retrieval over your notes and feeds relevant context to a local Ollama model, so the whole thing runs offline with no cloud calls or API keys.",
    ],

    highlights: [
      "Fully local pipeline — Ollama serves the LLM and a Python service handles retrieval, so notes and queries never leave the machine.",
      "Electron/Tauri frontend gives it a native note-taking feel while the RAG agent runs as a background service.",
      "Ask-your-notes interface: query in natural language and get an answer synthesized from the relevant notes, not just a list of matches.",
    ],

    next: "RMap",
  },
  RMap: {
    slug: "RMap",
    tag: "Frontend",
    tagColor: "#c2410c",
    image: "/assets/projects/rmap1.png",
    galleryImages: ["/assets/projects/rmap2.png", "/assets/projects/rmap3.png"],

    title: "UCR Map — campus navigation app",

    cardBlurb:
      "A React Native app that makes navigating UCR's confusing campus layout easy, with route planning, class locations, and campus resources.",

    cardChips: ["React Native", "Node.js", "MongoDB"],

    liveLabel: null,

    tagline:
      "A mobile/web app that helps UCR students navigate a campus with confusing building names, plotting routes to classes, dorms, and campus resources.",

    role: "Team of 5 · frontend + planning",
    timeline: "Group project, UCR",

    stack: ["React Native", "Expo", "Node.js", "Express", "MongoDB"],

    codeUrl: "https://github.com/Drabblesaur/UCR_Map",
    liveUrl: null,

    overview: [
      'UCR\'s campus map is notoriously hard to navigate — building names like "Chass North/South" or "Chung Hall" don\'t tell you much if you\'ve never been there, and finding the actual classroom inside can mean circling the building. This app was built to fix that.',
      "A React Native/Expo frontend talks to a Node/Express backend backed by MongoDB, aiming to route students not just to buildings but to specific classrooms, plus points of interest like the Botanic Gardens and Orbach Library.",
    ],

    highlights: [
      "Walking/biking route planning across inner campus, with the ability to drop custom pins.",
      "Class schedule saving tied to a UCR course database lookup, so the map knows where you need to be.",
      "Campus resource layer showing store/shop hours and event times alongside the navigation view.",
    ],

    next: "lessgo",
  },
};

// Order the cards appear in the Work grid on the landing page.
export const PROJECT_ORDER = ["lessgo", "sjsuVA", "jot", "RMap"];

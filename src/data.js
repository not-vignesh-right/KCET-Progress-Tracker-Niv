export const S = {
  bio: { label: "Biology", color: "#5ee9b5", dark: "rgba(20,45,38,0.92)", emoji: "🧬" },
  chem: { label: "Chemistry", color: "#7cb9ff", dark: "rgba(18,35,58,0.92)", emoji: "⚗️" },
  phys: { label: "Physics", color: "#ffb86b", dark: "rgba(48,32,18,0.92)", emoji: "⚡" },
  math: { label: "Maths", color: "#e78dfb", dark: "rgba(42,22,52,0.92)", emoji: "∫" },
};

/** Number of planner days (Mar 30 → Apr 14, 2026). */
export const TOTAL_PLAN_DAYS = 16;

/** Calendar labels — KCET 2026 prep window (matches PLAN_START in getDayIndex). */
export const DAYS = [
  "Mon Mar 30, 2026",
  "Tue Mar 31, 2026",
  "Wed Apr 1, 2026",
  "Thu Apr 2, 2026",
  "Fri Apr 3, 2026",
  "Sat Apr 4, 2026",
  "Sun Apr 5, 2026",
  "Mon Apr 6, 2026",
  "Tue Apr 7, 2026",
  "Wed Apr 8, 2026",
  "Thu Apr 9, 2026",
  "Fri Apr 10, 2026",
  "Sat Apr 11, 2026",
  "Sun Apr 12, 2026",
  "Mon Apr 13, 2026",
  "Tue Apr 14, 2026",
];

export const ALL_SESSIONS = [
  { id: "d0s0", day: 0, slot: "6–9 AM", sub: "bio", p: 3, ch: "Principles of Inheritance and Variation (NCERT Reading & PYQs)" },
  { id: "d0s1", day: 0, slot: "10AM–1PM", sub: "math", p: 3, ch: "Integrals (NCERT Ex 7.1-7.11 & PYQs)" },
  { id: "d0s2", day: 0, slot: "2–5 PM", sub: "chem", p: 3, ch: "Haloalkanes and Haloarenes (NCERT Reading & In-text)" },
  { id: "d0s3", day: 0, slot: "6–8 PM", sub: "phys", p: 3, ch: "Electric Charges and Fields (NCERT Derivations & Exercises)" },

  { id: "d1s0", day: 1, slot: "6–9 AM", sub: "bio", p: 3, ch: "Molecular Basis of Inheritance (NCERT Reading & PYQs)" },
  { id: "d1s1", day: 1, slot: "10AM–1PM", sub: "math", p: 2, ch: "Application of Integrals" },
  { id: "d1s2", day: 1, slot: "2–5 PM", sub: "chem", p: 3, ch: "Alcohols, Phenols and Ethers (NCERT Reading & In-text)" },
  { id: "d1s3", day: 1, slot: "6–8 PM", sub: "phys", p: 3, ch: "Electrostatic Potential and Capacitance (NCERT & PYQs)" },

  { id: "d2s0", day: 2, slot: "6–9 AM", sub: "bio", p: 3, ch: "Human Reproduction & Reproductive Health" },
  { id: "d2s1", day: 2, slot: "10AM–1PM", sub: "math", p: 2, ch: "Differential Equations" },
  { id: "d2s2", day: 2, slot: "2–5 PM", sub: "chem", p: 3, ch: "Aldehydes, Ketones and Carboxylic Acids (NCERT)" },
  { id: "d2s3", day: 2, slot: "6–8 PM", sub: "phys", p: 3, ch: "Current Electricity (NCERT & PYQs)" },

  { id: "d3s0", day: 3, slot: "6–9 AM", sub: "bio", p: 3, ch: "Evolution & Human Health and Disease" },
  { id: "d3s1", day: 3, slot: "10AM–1PM", sub: "math", p: 3, ch: "Matrices and Determinants" },
  { id: "d3s2", day: 3, slot: "2–5 PM", sub: "chem", p: 3, ch: "Amines & Biomolecules (NCERT)" },
  { id: "d3s3", day: 3, slot: "6–8 PM", sub: "phys", p: 3, ch: "Moving Charges and Magnetism" },

  { id: "d4s0", day: 4, slot: "6–9 AM", sub: "bio", p: 3, ch: "Biotechnology: Principles and Processes, & Applications" },
  { id: "d4s1", day: 4, slot: "10AM–1PM", sub: "math", p: 3, ch: "Continuity and Differentiability" },
  { id: "d4s2", day: 4, slot: "2–5 PM", sub: "chem", p: 3, ch: "Coordination Compounds & d-and f-Block Elements" },
  { id: "d4s3", day: 4, slot: "6–8 PM", sub: "phys", p: 3, ch: "Magnetism and Matter & Electromagnetic Induction" },

  { id: "d5s0", day: 5, slot: "6–9 AM", sub: "bio", p: 3, ch: "Organisms and Populations & Ecosystem" },
  { id: "d5s1", day: 5, slot: "10AM–1PM", sub: "math", p: 3, ch: "Application of Derivatives" },
  { id: "d5s2", day: 5, slot: "2–5 PM", sub: "chem", p: 3, ch: "Electrochemistry & Chemical Kinetics (NCERT)" },
  { id: "d5s3", day: 5, slot: "6–8 PM", sub: "phys", p: 3, ch: "Alternating Current & Electromagnetic Waves" },

  { id: "d6s0", day: 6, slot: "6–9 AM", sub: "bio", p: 3, ch: "Biodiversity and Conservation & Environmental Issues" },
  { id: "d6s1", day: 6, slot: "10AM–1PM", sub: "math", p: 3, ch: "Vector Algebra" },
  { id: "d6s2", day: 6, slot: "2–5 PM", sub: "chem", p: 3, ch: "Solutions & Surface Chemistry" },
  { id: "d6s3", day: 6, slot: "6–8 PM", sub: "phys", p: 3, ch: "Ray Optics and Optical Instruments" },

  { id: "d7s0", day: 7, slot: "6–9 AM", sub: "bio", p: 3, ch: "Cell: The Unit of Life & Cell Cycle and Cell Division" },
  { id: "d7s1", day: 7, slot: "10AM–1PM", sub: "math", p: 3, ch: "Three Dimensional Geometry" },
  { id: "d7s2", day: 7, slot: "2–5 PM", sub: "chem", p: 3, ch: "Thermodynamics & Equilibrium (Class 11)" },
  { id: "d7s3", day: 7, slot: "6–8 PM", sub: "phys", p: 3, ch: "Wave Optics" },

  { id: "d8s0", day: 8, slot: "6–9 AM", sub: "bio", p: 3, ch: "Structural Organisation in Animals & Biomolecules (11th)" },
  { id: "d8s1", day: 8, slot: "10AM–1PM", sub: "math", p: 3, ch: "Probability" },
  { id: "d8s2", day: 8, slot: "2–5 PM", sub: "chem", p: 3, ch: "Structure of Atom & Classification of Elements" },
  { id: "d8s3", day: 8, slot: "6–8 PM", sub: "phys", p: 3, ch: "Dual Nature of Radiation and Matter" },

  { id: "d9s0", day: 9, slot: "6–9 AM", sub: "bio", p: 3, ch: "Plant Kingdom & Animal Kingdom" },
  { id: "d9s1", day: 9, slot: "10AM–1PM", sub: "math", p: 3, ch: "Relations and Functions & Inverse Trigonometric Functions" },
  { id: "d9s2", day: 9, slot: "2–5 PM", sub: "chem", p: 3, ch: "Chemical Bonding and Molecular Structure" },
  { id: "d9s3", day: 9, slot: "6–8 PM", sub: "phys", p: 3, ch: "Atoms and Nuclei" },

  { id: "d10s0", day: 10, slot: "6–9 AM", sub: "bio", p: 3, ch: "Morphology & Anatomy of Flowering Plants" },
  { id: "d10s1", day: 10, slot: "10AM–1PM", sub: "math", p: 3, ch: "Complex Numbers & Quadratic Equations, Linear Inequalities" },
  { id: "d10s2", day: 10, slot: "2–5 PM", sub: "chem", p: 3, ch: "p-Block Elements (Class 11 & 12)" },
  { id: "d10s3", day: 10, slot: "6–8 PM", sub: "phys", p: 3, ch: "Semiconductor Electronics (Materials, Devices & Circuits)" },

  { id: "d11s0", day: 11, slot: "6–9 AM", sub: "bio", p: 3, ch: "Photosynthesis in Higher Plants & Respiration in Plants" },
  { id: "d11s1", day: 11, slot: "10AM–1PM", sub: "math", p: 3, ch: "Permutations, Combinations & Binomial Theorem" },
  { id: "d11s2", day: 11, slot: "2–5 PM", sub: "chem", p: 3, ch: "Some Basic Concepts of Chemistry & Redox Reactions" },
  { id: "d11s3", day: 11, slot: "6–8 PM", sub: "phys", p: 3, ch: "Thermodynamics & Kinetic Theory" },

  { id: "d12s0", day: 12, slot: "6–9 AM", sub: "bio", p: 3, ch: "Plant Growth and Development & Transport/Mineral Nutrition" },
  { id: "d12s1", day: 12, slot: "10AM–1PM", sub: "math", p: 3, ch: "Sequence and Series & Limits and Derivatives" },
  { id: "d12s2", day: 12, slot: "2–5 PM", sub: "chem", p: 3, ch: "Hydrocarbons & Environmental Chemistry" },
  { id: "d12s3", day: 12, slot: "6–8 PM", sub: "phys", p: 3, ch: "Laws of Motion & Work, Energy and Power" },

  { id: "d13s0", day: 13, slot: "6–9 AM", sub: "bio", p: 3, ch: "Digestion and Absorption & Breathing and Exchange of Gases" },
  { id: "d13s1", day: 13, slot: "10AM–1PM", sub: "math", p: 3, ch: "Conic Sections & Straight Lines" },
  { id: "d13s2", day: 13, slot: "2–5 PM", sub: "chem", p: 3, ch: "States of Matter & s-Block Elements" },
  { id: "d13s3", day: 13, slot: "6–8 PM", sub: "phys", p: 3, ch: "Rotational Motion & Gravitation" },

  { id: "d14s0", day: 14, slot: "6–9 AM", sub: "bio", p: 3, ch: "Body Fluids and Circulation & Excretory Products" },
  { id: "d14s1", day: 14, slot: "10AM–1PM", sub: "math", p: 3, ch: "Sets, Mathematical Reasoning & Statistics" },
  { id: "d14s2", day: 14, slot: "2–5 PM", sub: "chem", p: 3, ch: "Organic Chemistry: Some Basic Principles and Techniques" },
  { id: "d14s3", day: 14, slot: "6–8 PM", sub: "phys", p: 3, ch: "Mechanical Properties of Solids and Fluids" },

  { id: "d15s0", day: 15, slot: "6–9 AM", sub: "bio", p: 3, ch: "Locomotion and Movement, Neural Control & Chemical Coordination" },
  { id: "d15s1", day: 15, slot: "10AM–1PM", sub: "math", p: 3, ch: "🔁 FULL MATHS MOCK TEST (KCET Pattern)" },
  { id: "d15s2", day: 15, slot: "2–5 PM", sub: "chem", p: 3, ch: "🔁 FULL CHEMISTRY REVISION (Formulas & Name Reactions)" },
  { id: "d15s3", day: 15, slot: "6–8 PM", sub: "phys", p: 3, ch: "🔁 FULL PHYSICS REVISION (Formula Drill)" },
];

/** Checklist of major NCERT units/concepts — tick what you already know. */
export const CHAPTER_CHECKLIST = [
  { id: "bio_genetics", sub: "bio", label: "Genetics & Evolution (NCERT)", stars: 3 },
  { id: "bio_repro", sub: "bio", label: "Reproduction (Plants & Human)", stars: 3 },
  { id: "bio_human_physio", sub: "bio", label: "Human Physiology (NCERT 11th)", stars: 3 },
  { id: "bio_plant_physio", sub: "bio", label: "Plant Physiology (NCERT 11th)", stars: 3 },
  { id: "bio_cell", sub: "bio", label: "Cell Structure & Function", stars: 2 },
  { id: "bio_biotech", sub: "bio", label: "Biotechnology", stars: 3 },
  { id: "bio_ecology", sub: "bio", label: "Ecology", stars: 3 },
  { id: "bio_diversity", sub: "bio", label: "Diversity in Living World", stars: 1 },
  { id: "bio_structure", sub: "bio", label: "Structural Org in Animals & Plants", stars: 1 },

  { id: "chem_organic_12", sub: "chem", label: "Organic Chem - Class 12 Chapters", stars: 3 },
  { id: "chem_organic_11", sub: "chem", label: "Organic Chem - Class 11 (GOC, Hydrocarbons)", stars: 3 },
  { id: "chem_physical_12", sub: "chem", label: "Physical Chem - Class 12 (Electro, Kinetics)", stars: 3 },
  { id: "chem_physical_11", sub: "chem", label: "Physical Chem - Class 11 (Thermo, Eq)", stars: 2 },
  { id: "chem_inorganic", sub: "chem", label: "Inorganic Chem (Periodic, Bonding, Blocks)", stars: 2 },

  { id: "phys_electro", sub: "phys", label: "Electrostatics & Current", stars: 3 },
  { id: "phys_magnetic", sub: "phys", label: "Magnetism & EMI", stars: 3 },
  { id: "phys_optics", sub: "phys", label: "Optics (Ray & Wave)", stars: 3 },
  { id: "phys_modern", sub: "phys", label: "Modern Physics (Atoms, Nuclei, Dual Nature)", stars: 3 },
  { id: "phys_mech_11", sub: "phys", label: "Mechanics (Laws of Motion, Work, Rotational)", stars: 2 },
  { id: "phys_thermo", sub: "phys", label: "Thermodynamics & Kinetic Theory", stars: 1 },

  { id: "math_calculus", sub: "math", label: "Calculus (Integrals & Derivatives)", stars: 3 },
  { id: "math_algebra", sub: "math", label: "Algebra (Matrices, Complex, Binomial)", stars: 3 },
  { id: "math_vectors_3d", sub: "math", label: "Vectors & 3D Geometry", stars: 3 },
  { id: "math_coord", sub: "math", label: "Coordinate Geometry (Conics, Lines)", stars: 2 },
  { id: "math_prob", sub: "math", label: "Probability & Statistics", stars: 2 },
];

export const QUOTES = [
  "Every chapter you finish today is one less thing to panic about on Apr 23, 2026.",
  "Put the phone down. The notifs will be there after you ace KCET 2026.",
  "Consistency beats intensity. Show up every single session.",
  "Don't think about 4 subjects — think about this one NCERT chapter.",
  "The students who get top ranks aren't smarter. They're consistent.",
  "Hard work now = options later. Skipping now = regret later.",
  "You don't need motivation. You need discipline. Just start.",
  "Your future self is watching you right now. Don't let them down.",
  "5-min break, not 50-min scroll. You know the difference.",
  "NCERT is your best friend right now — not Instagram.",
];

/** First day of the 16-day planner (Mar 30). */
export const PLAN_START = "2026-03-30";
/** KCET 2026 exam window start (day 1 of exam). */
export const KCET_EXAM_DATE = "2026-04-23";

export function getDayIndex() {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const s = new Date(PLAN_START);
  s.setHours(0, 0, 0, 0);
  return Math.max(0, Math.min(TOTAL_PLAN_DAYS - 1, Math.floor((now - s) / 86400000)));
}

export function getDaysToExam() {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const e = new Date(KCET_EXAM_DATE);
  e.setHours(0, 0, 0, 0);
  return Math.max(0, Math.ceil((e - now) / 86400000));
}

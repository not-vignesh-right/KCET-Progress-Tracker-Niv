export const S = {
  bio: { label: "Biology", color: "#5ee9b5", dark: "rgba(20,45,38,0.92)", emoji: "🧬" },
  chem: { label: "Chemistry", color: "#7cb9ff", dark: "rgba(18,35,58,0.92)", emoji: "⚗️" },
  phys: { label: "Physics", color: "#ffb86b", dark: "rgba(48,32,18,0.92)", emoji: "⚡" },
  math: { label: "Maths", color: "#e78dfb", dark: "rgba(42,22,52,0.92)", emoji: "∫" },
};

/** Number of planner days (Mar 29 → Apr 13, 2026). */
export const TOTAL_PLAN_DAYS = 16;

/** Calendar labels — KCET 2026 prep window (matches PLAN_START in getDayIndex). */
export const DAYS = [
  "Sun Mar 29, 2026",
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
];

export const ALL_SESSIONS = [
  { id: "d0s0", day: 0, slot: "6–9 AM", sub: "bio", p: 3, ch: "Genetics Pt.1 – Mendel's Laws, Monohybrid & Dihybrid crosses, Chromosomal theory" },
  { id: "d0s1", day: 0, slot: "10AM–1PM", sub: "math", p: 3, ch: "Indefinite Integration – standard forms, substitution, integration by parts" },
  { id: "d0s2", day: 0, slot: "2–5 PM", sub: "bio", p: 3, ch: "Genetics Pt.1 cont. – Codominance, sex-linked inheritance, polygenic traits" },
  { id: "d0s3", day: 0, slot: "6–8 PM", sub: "math", p: 2, ch: "Integration – KCET PYQ practice & formula drill" },
  { id: "d1s0", day: 1, slot: "6–9 AM", sub: "bio", p: 3, ch: "Genetics Pt.2 – DNA structure, replication, transcription, translation" },
  { id: "d1s1", day: 1, slot: "10AM–1PM", sub: "phys", p: 3, ch: "Electrostatics – Coulomb's law, E-field, Gauss's law, potential, capacitors" },
  { id: "d1s2", day: 1, slot: "2–5 PM", sub: "bio", p: 3, ch: "Genetics Pt.2 cont. – Human Genome Project, DNA fingerprinting, gene expression" },
  { id: "d1s3", day: 1, slot: "6–8 PM", sub: "phys", p: 3, ch: "Electrostatics numericals – capacitor combinations & Gauss's law problems" },
  { id: "d2s0", day: 2, slot: "6–9 AM", sub: "bio", p: 3, ch: "Evolution – Origin of life, Darwin's theory, evidences, speciation, Hardy-Weinberg" },
  { id: "d2s1", day: 2, slot: "10AM–1PM", sub: "chem", p: 3, ch: "Haloalkanes & Haloarenes – Nomenclature, SN1/SN2, elimination reactions" },
  { id: "d2s2", day: 2, slot: "2–5 PM", sub: "chem", p: 3, ch: "Haloalkanes cont. – Grignard reagent, polyhalogen compounds, DDT" },
  { id: "d2s3", day: 2, slot: "6–8 PM", sub: "bio", p: 2, ch: "Bio revision – Genetics + Evolution NCERT Q&A + key diagrams" },
  { id: "d3s0", day: 3, slot: "6–9 AM", sub: "bio", p: 3, ch: "Human Reproduction – Male & female systems, gametogenesis, fertilisation, implantation" },
  { id: "d3s1", day: 3, slot: "10AM–1PM", sub: "math", p: 3, ch: "Definite Integration – properties, area under curve, area between curves" },
  { id: "d3s2", day: 3, slot: "2–5 PM", sub: "bio", p: 3, ch: "Human Reproduction cont. – Embryo development, pregnancy, parturition, lactation" },
  { id: "d3s3", day: 3, slot: "6–8 PM", sub: "math", p: 3, ch: "Definite Integration – KCET PYQ problems (timed)" },
  { id: "d4s0", day: 4, slot: "6–9 AM", sub: "bio", p: 3, ch: "Reproductive Health – Contraception, MTP, STIs, infertility, ART (IVF, ZIFT, GIFT)" },
  { id: "d4s1", day: 4, slot: "10AM–1PM", sub: "phys", p: 3, ch: "Current Electricity – Ohm's law, Kirchhoff's laws, Wheatstone bridge, drift velocity" },
  { id: "d4s2", day: 4, slot: "2–5 PM", sub: "bio", p: 2, ch: "Strategies for Enhancement – Animal & plant breeding, biofortification, SCP" },
  { id: "d4s3", day: 4, slot: "6–8 PM", sub: "phys", p: 3, ch: "Current Electricity – meter bridge, potentiometer, numericals" },
  { id: "d5s0", day: 5, slot: "6–9 AM", sub: "bio", p: 3, ch: "Human Physiology Pt.1 – Digestion & absorption, Breathing & gas exchange" },
  { id: "d5s1", day: 5, slot: "10AM–1PM", sub: "chem", p: 3, ch: "Alcohols, Phenols & Ethers – Nomenclature, preparation, reactions, acidity" },
  { id: "d5s2", day: 5, slot: "2–5 PM", sub: "bio", p: 3, ch: "Human Physiology cont. – Body fluids, circulation, heart, blood pressure, lymph" },
  { id: "d5s3", day: 5, slot: "6–8 PM", sub: "chem", p: 2, ch: "APE cont. – Lucas test, oxidation reactions, ether prep + practice" },
  { id: "d6s0", day: 6, slot: "6–9 AM", sub: "bio", p: 3, ch: "Human Physiology Pt.2 – Neural coordination (impulse, synapse, reflex arc, brain)" },
  { id: "d6s1", day: 6, slot: "10AM–1PM", sub: "math", p: 3, ch: "Differentiation – chain rule, implicit, parametric + tangent/normal applications" },
  { id: "d6s2", day: 6, slot: "2–5 PM", sub: "bio", p: 3, ch: "Human Physiology Pt.2 cont. – Endocrine glands, hormones, excretion (nephron)" },
  { id: "d6s3", day: 6, slot: "6–8 PM", sub: "math", p: 3, ch: "Differentiation Applications – maxima, minima, rate of change, KCET PYQs" },
  { id: "d7s0", day: 7, slot: "6–9 AM", sub: "bio", p: 3, ch: "Plant Physiology – Transport in plants, Mineral nutrition, Photosynthesis (LDR+LIR)" },
  { id: "d7s1", day: 7, slot: "10AM–1PM", sub: "phys", p: 3, ch: "Magnetism & Moving Charges – Biot-Savart, Ampere's law, force on conductor" },
  { id: "d7s2", day: 7, slot: "2–5 PM", sub: "bio", p: 3, ch: "Plant Physiology cont. – Respiration, Growth & development, phytohormones" },
  { id: "d7s3", day: 7, slot: "6–8 PM", sub: "phys", p: 3, ch: "EMI – Faraday's laws, Lenz's law, self & mutual inductance, AC circuit basics" },
  { id: "d8s0", day: 8, slot: "6–9 AM", sub: "bio", p: 3, ch: "Ecology Pt.1 – Organisms & Populations (adaptations, growth models, interspecific)" },
  { id: "d8s1", day: 8, slot: "10AM–1PM", sub: "chem", p: 3, ch: "Aldehydes, Ketones & CA – nucleophilic addition, Aldol, Cannizzaro, Clemmensen" },
  { id: "d8s2", day: 8, slot: "2–5 PM", sub: "bio", p: 3, ch: "Ecology Pt.2 – Ecosystem energy flow, nutrient cycles, Biodiversity & Conservation" },
  { id: "d8s3", day: 8, slot: "6–8 PM", sub: "chem", p: 2, ch: "Carbonyl compounds – mechanism summary + carboxylic acid derivatives" },
  { id: "d9s0", day: 9, slot: "6–9 AM", sub: "bio", p: 3, ch: "Biotechnology – rDNA tools (restriction enzymes, PCR, gel electrophoresis, vectors)" },
  { id: "d9s1", day: 9, slot: "10AM–1PM", sub: "math", p: 3, ch: "Matrices & Determinants – operations, adjoint, inverse, Cramer's rule" },
  { id: "d9s2", day: 9, slot: "2–5 PM", sub: "bio", p: 2, ch: "Biotechnology Applications – Bt crops, GMOs, gene therapy, bioreactors, biosafety" },
  { id: "d9s3", day: 9, slot: "6–8 PM", sub: "math", p: 3, ch: "Determinants – KCET past year problems (timed)" },
  { id: "d10s0", day: 10, slot: "6–9 AM", sub: "bio", p: 2, ch: "Cell Biology – Cell cycle, Mitosis, Meiosis (stages & significance)" },
  { id: "d10s1", day: 10, slot: "10AM–1PM", sub: "phys", p: 3, ch: "Ray Optics – reflection, refraction, lenses, mirrors, TIR, optical instruments" },
  { id: "d10s2", day: 10, slot: "2–5 PM", sub: "bio", p: 2, ch: "Diversity – Plant Kingdom (algae→angiosperms) + Animal Kingdom (key phyla)" },
  { id: "d10s3", day: 10, slot: "6–8 PM", sub: "phys", p: 3, ch: "Wave Optics – Huygens' principle, Young's double slit, diffraction, polarisation" },
  { id: "d11s0", day: 11, slot: "6–9 AM", sub: "chem", p: 3, ch: "Amines – classification, nomenclature, preparation, reactions, Hinsberg test, coupling" },
  { id: "d11s1", day: 11, slot: "10AM–1PM", sub: "math", p: 3, ch: "3D Geometry – direction cosines/ratios, line & plane equations, skew lines, distance" },
  { id: "d11s2", day: 11, slot: "2–5 PM", sub: "chem", p: 2, ch: "Biomolecules + Polymers – carbs, proteins, enzymes, nucleic acids, addition & condensation" },
  { id: "d11s3", day: 11, slot: "6–8 PM", sub: "math", p: 3, ch: "Vectors – dot product, cross product, scalar triple product, applications" },
  { id: "d12s0", day: 12, slot: "6–9 AM", sub: "phys", p: 3, ch: "Modern Physics – dual nature, photoelectric effect, de Broglie, Davisson-Germer" },
  { id: "d12s1", day: 12, slot: "10AM–1PM", sub: "chem", p: 3, ch: "Electrochemistry – Galvanic cells, Nernst eq., EMF, conductance, electrolysis, Faraday" },
  { id: "d12s2", day: 12, slot: "2–5 PM", sub: "phys", p: 3, ch: "Atoms & Nuclei – Bohr model, spectral series, radioactivity, binding energy" },
  { id: "d12s3", day: 12, slot: "6–8 PM", sub: "chem", p: 3, ch: "Chemical Kinetics – rate laws, order of reaction, half-life, Arrhenius equation" },
  { id: "d13s0", day: 13, slot: "6–9 AM", sub: "phys", p: 3, ch: "Semiconductor Electronics – p-n junction, diode, Zener, transistor CE, logic gates" },
  { id: "d13s1", day: 13, slot: "10AM–1PM", sub: "math", p: 3, ch: "Probability – conditional probability, Bayes' theorem, binomial distribution" },
  { id: "d13s2", day: 13, slot: "2–5 PM", sub: "phys", p: 2, ch: "Waves & Oscillations – SHM equations, energy, standing waves, resonance, Doppler" },
  { id: "d13s3", day: 13, slot: "6–8 PM", sub: "math", p: 2, ch: "Complex Numbers + Binomial Theorem – De Moivre's, Argand plane, key identities" },
  { id: "d14s0", day: 14, slot: "6–9 AM", sub: "chem", p: 3, ch: "Coordination Compounds – IUPAC naming, Werner's theory, VBT, CFT, isomerism" },
  { id: "d14s1", day: 14, slot: "10AM–1PM", sub: "math", p: 3, ch: "Conic Sections – circles, parabola, ellipse, hyperbola standard forms & properties" },
  { id: "d14s2", day: 14, slot: "2–5 PM", sub: "chem", p: 2, ch: "p-Block + d & f Block – key reactions, HNO3, SO2, ozone, transition metal properties" },
  { id: "d14s3", day: 14, slot: "6–8 PM", sub: "math", p: 2, ch: "Differential Equations + Limits & Continuity – types, LHL/RHL tricks" },
  { id: "d15s0", day: 15, slot: "6–9 AM", sub: "chem", p: 2, ch: "Solutions + Surface Chemistry + Thermodynamics – colligative props, Hess's law" },
  { id: "d15s1", day: 15, slot: "10AM–1PM", sub: "phys", p: 2, ch: "Laws of Motion + Work-Energy + Thermal – friction, collision types, heat transfer" },
  { id: "d15s2", day: 15, slot: "2–5 PM", sub: "bio", p: 3, ch: "🔁 FULL BIO REVISION – NCERT diagrams, hormone tables, ecology terms, genetics numericals" },
  { id: "d15s3", day: 15, slot: "6–8 PM", sub: "math", p: 3, ch: "🔁 FULL MATHS REVISION – formula sheet, weak topic drill, integration tricks" },
];

/** Checklist of major concepts — tick what you already know (independent of daily sessions). */
export const CHAPTER_CHECKLIST = [
  { id: "bio_genetics", sub: "bio", label: "Genetics (Mendel + Molecular)", stars: 3 },
  { id: "bio_repro", sub: "bio", label: "Human Reproduction + Health", stars: 3 },
  { id: "bio_physio", sub: "bio", label: "Human Physiology (both parts)", stars: 3 },
  { id: "bio_ecology", sub: "bio", label: "Ecology + Biodiversity", stars: 3 },
  { id: "bio_biotech", sub: "bio", label: "Biotechnology", stars: 3 },
  { id: "bio_evo", sub: "bio", label: "Evolution", stars: 3 },
  { id: "bio_plant", sub: "bio", label: "Plant Physiology", stars: 2 },
  { id: "bio_cell", sub: "bio", label: "Cell Bio + Diversity", stars: 1 },
  { id: "chem_halo", sub: "chem", label: "Haloalkanes & Haloarenes", stars: 3 },
  { id: "chem_ape", sub: "chem", label: "APE (Alcohols, Phenols, Ethers)", stars: 3 },
  { id: "chem_carbonyl", sub: "chem", label: "Carbonyl + Carboxylic Acids", stars: 3 },
  { id: "chem_amines", sub: "chem", label: "Amines", stars: 3 },
  { id: "chem_electro", sub: "chem", label: "Electrochemistry", stars: 3 },
  { id: "chem_coord", sub: "chem", label: "Coordination Compounds", stars: 3 },
  { id: "chem_kinetics", sub: "chem", label: "Chemical Kinetics", stars: 2 },
  { id: "chem_block", sub: "chem", label: "p & d-block Elements", stars: 2 },
  { id: "chem_bio", sub: "chem", label: "Biomolecules + Polymers", stars: 2 },
  { id: "chem_misc", sub: "chem", label: "Solutions + Thermodynamics", stars: 1 },
  { id: "phys_electrostatics", sub: "phys", label: "Electrostatics", stars: 3 },
  { id: "phys_current", sub: "phys", label: "Current Electricity", stars: 3 },
  { id: "phys_mag", sub: "phys", label: "Magnetism + EMI", stars: 3 },
  { id: "phys_optics", sub: "phys", label: "Ray + Wave Optics", stars: 3 },
  { id: "phys_modern", sub: "phys", label: "Modern Physics", stars: 3 },
  { id: "phys_semi", sub: "phys", label: "Semiconductor Electronics", stars: 3 },
  { id: "phys_waves", sub: "phys", label: "Waves + SHM", stars: 2 },
  { id: "phys_mechanics", sub: "phys", label: "Laws of Motion", stars: 1 },
  { id: "math_int", sub: "math", label: "Integration (Indefinite + Definite)", stars: 3 },
  { id: "math_diff", sub: "math", label: "Differentiation + Applications", stars: 3 },
  { id: "math_prob", sub: "math", label: "Probability", stars: 3 },
  { id: "math_matrix", sub: "math", label: "Matrices & Determinants", stars: 3 },
  { id: "math_3d", sub: "math", label: "3D Geometry", stars: 3 },
  { id: "math_vec", sub: "math", label: "Vectors", stars: 3 },
  { id: "math_conic", sub: "math", label: "Conic Sections", stars: 2 },
  { id: "math_complex", sub: "math", label: "Complex Numbers", stars: 2 },
  { id: "math_de", sub: "math", label: "Differential Equations", stars: 1 },
];

export const QUOTES = [
  "Every chapter you finish today is one less thing to panic about on Apr 23, 2026.",
  "Put the phone down. The notifs will be there after you ace KCET 2026.",
  "Consistency beats intensity. Show up every single session.",
  "Don't think about 4 subjects — think about this one chapter.",
  "The students who get top ranks aren't smarter. They're consistent.",
  "Hard work now = options later. Skipping now = regret later.",
  "You don't need motivation. You need discipline. Just start.",
  "Your future self is watching you right now. Don't let them down.",
  "5-min break, not 50-min scroll. You know the difference.",
  "NCERT is your best friend right now — not Instagram.",
];

/** First day of the 16-day planner (KCET 2026). */
export const PLAN_START = "2026-03-29";
/** KCET 2026 exam window start (day 1 of exam). */
export const KCET_EXAM_DATE = "2026-04-23";

export function getDayIndex() {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const s = new Date(PLAN_START);
  s.setHours(0, 0, 0, 0);
  return Math.max(0, Math.min(15, Math.floor((now - s) / 86400000)));
}

export function getDaysToExam() {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const e = new Date(KCET_EXAM_DATE);
  e.setHours(0, 0, 0, 0);
  return Math.max(0, Math.ceil((e - now) / 86400000));
}

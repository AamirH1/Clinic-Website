// ---------------------------------------------------------------------------
// SITE CONTENT
// ---------------------------------------------------------------------------
// Everything marked [PLACEHOLDER] is invented sample copy, not a real claim
// about any clinic — replace with verified facts (numbers, review counts,
// qualifications, before/after imagery) before this site goes live.
// ---------------------------------------------------------------------------

export const brand = {
  name: "Harborlight Dental",
  shortName: "Harborlight",
  phone: "+1 (555) 019-2231",
  email: "hello@harborlightdental.com", // [PLACEHOLDER]
  address: {
    line1: "214 Marina Boulevard",
    line2: "Suite 3, Harborview District",
    city: "San Francisco, CA 94123" // [PLACEHOLDER]
  },
  hours: [
    { day: "Monday – Thursday", time: "8:00 AM – 6:00 PM" },
    { day: "Friday", time: "8:00 AM – 4:00 PM" },
    { day: "Saturday", time: "9:00 AM – 2:00 PM" },
    { day: "Sunday", time: "Closed" }
  ]
};

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Treatments", href: "#treatments" },
  { label: "Smile Gallery", href: "#gallery" },
  { label: "Technology", href: "#technology" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" }
];

export const trustStats = [
  { value: "5.0", suffix: "", label: "Average Google Rating", icon: "star" },
  { value: "15", suffix: "+", label: "Years of Clinical Experience", icon: "years" },
  { value: "10,000", suffix: "+", label: "Patients Cared For", icon: "patients" },
  { value: "98", suffix: "%", label: "Patient Satisfaction", icon: "heart" }
]; // [PLACEHOLDER] figures — replace with verified clinic data

export const treatments = [
  {
    id: "general",
    number: "01",
    name: "General Dentistry",
    description:
      "Comprehensive checkups, cleanings and preventative care built around your long‑term oral health.",
    tone: "from-clinical/30 to-clinicalDeep/40"
  },
  {
    id: "cosmetic",
    number: "02",
    name: "Cosmetic Dentistry",
    description:
      "Refined, natural‑looking enhancements — from subtle contouring to complete smile transformations.",
    tone: "from-gold/25 to-stone/30"
  },
  {
    id: "invisalign",
    number: "03",
    name: "Invisalign® & Clear Aligners",
    description:
      "Discreet, precisely mapped alignment using digital scanning and 3D treatment planning.",
    tone: "from-clinicalDeep/30 to-charcoal2/40"
  },
  {
    id: "implants",
    number: "04",
    name: "Dental Implants",
    description:
      "Permanent, natural‑feeling tooth replacement engineered with surgical‑grade precision.",
    tone: "from-stone/30 to-charcoal2/30"
  },
  {
    id: "whitening",
    number: "05",
    name: "Teeth Whitening",
    description:
      "Clinically supervised whitening for brighter, healthier‑looking results without sensitivity guesswork.",
    tone: "from-gold/30 to-ivory2/40"
  },
  {
    id: "veneers",
    number: "06",
    name: "Porcelain Veneers",
    description:
      "Bespoke, ultra‑thin veneers designed digitally and crafted to complement your facial features.",
    tone: "from-clinical/25 to-gold/25"
  },
  {
    id: "emergency",
    number: "07",
    name: "Emergency Dentistry",
    description:
      "Same‑day appointments for urgent pain, trauma or breakages — calm, immediate clinical care.",
    tone: "from-charcoal2/35 to-stone/25"
  }
];

export const whyChooseUs = [
  {
    title: "Experienced Clinicians",
    description:
      "Our team brings decades of combined clinical experience across general, cosmetic and restorative dentistry." // [PLACEHOLDER]
  },
  {
    title: "Advanced Technology",
    description:
      "Digital scanning and 3D imaging replace guesswork with precision at every stage of treatment."
  },
  {
    title: "Personalised Treatment",
    description:
      "No two smiles are treated the same. Every plan is designed around your goals, anatomy and timeline."
  },
  {
    title: "Comfort‑First Environment",
    description:
      "A calm, considered space designed to ease anxiety — from the waiting room to the chair."
  },
  {
    title: "Transparent Pricing",
    description:
      "Clear, upfront treatment estimates before any work begins. No surprises, ever."
  },
  {
    title: "Long‑Term Patient Care",
    description:
      "We build relationships measured in years, not appointments — proactive care that evolves with you."
  }
];

export const technologyFeatures = [
  {
    name: "Digital Smile Design",
    description: "Visualise your outcome before treatment begins with precise digital simulation."
  },
  {
    name: "Intraoral 3D Scanning",
    description: "Fast, comfortable scans replace traditional impressions with millimetre accuracy."
  },
  {
    name: "3D Diagnostic Imaging",
    description: "Detailed imaging supports safer, more predictable implant and surgical planning."
  },
  {
    name: "Minimally Invasive Techniques",
    description: "Preserve more natural tooth structure with modern, conservative approaches."
  }
];

export const journeySteps = [
  { number: "01", title: "Book", description: "Reserve your consultation online in under a minute." },
  { number: "02", title: "Consultation", description: "A thorough assessment of your oral health and goals." },
  { number: "03", title: "Personalised Plan", description: "A clear treatment roadmap, timeline and estimate." },
  { number: "04", title: "Treatment", description: "Precise, comfortable care delivered at your pace." },
  { number: "05", title: "Your New Smile", description: "Ongoing support to protect your results for years." }
];

export const testimonials = [
  {
    name: "Amelia R.",
    treatment: "Invisalign",
    rating: 5,
    quote:
      "The whole process felt considered from the first call. My results exceeded what I expected, and I never once felt like a number."
  }, // [PLACEHOLDER] sample review
  {
    name: "David K.",
    treatment: "Dental Implants",
    rating: 5,
    quote:
      "Precise, patient, and genuinely reassuring. The technology they use made a complex procedure feel completely manageable."
  }, // [PLACEHOLDER] sample review
  {
    name: "Priya S.",
    treatment: "Smile Makeover",
    rating: 5,
    quote:
      "I've recommended Harborlight to three friends already. It's the calmest, most professional dental experience I've had."
  } // [PLACEHOLDER] sample review
];

export const team = [
  {
    name: "Dr. Sarah Whitfield",
    role: "Lead Dentist, DDS",
    bio: "Focused on comprehensive restorative and cosmetic dentistry with a gentle, patient-first approach." // [PLACEHOLDER]
  },
  {
    name: "Dr. Marcus Chen",
    role: "Implant & Oral Surgery, DMD",
    bio: "Specialist in dental implants and minimally invasive surgical techniques." // [PLACEHOLDER]
  },
  {
    name: "Dr. Elena Novak",
    role: "Cosmetic Dentistry, DDS",
    bio: "Focused on veneers, whitening and full smile design using digital planning tools." // [PLACEHOLDER]
  }
];

export const galleryCategories = ["All", "Veneers", "Invisalign", "Whitening", "Implants", "Smile Makeover"];

export const faqs = [
  {
    question: "What are your opening hours?",
    answer: `We're open ${brand.hours[0].day} ${brand.hours[0].time}, ${brand.hours[1].day} ${brand.hours[1].time}, and ${brand.hours[2].day} ${brand.hours[2].time}.`
  },
  {
    question: "Where are you located?",
    answer: `We're at ${brand.address.line1}, ${brand.address.line2}, ${brand.address.city}.`
  },
  {
    question: "Is there parking?",
    answer:
      "Street parking and public transit are available nearby. [PLACEHOLDER — replace with real parking/transit details]"
  },
  {
    question: "Do you treat dental emergencies?",
    answer: "Yes — we offer same-day emergency appointments for urgent pain, trauma or breakages."
  },
  {
    question: "How much does Invisalign cost?",
    answer:
      "Invisalign pricing depends on your case complexity. Book a consultation and we'll give you a clear, upfront estimate before any treatment begins."
  },
  {
    question: "Do you accept insurance?",
    answer:
      "[PLACEHOLDER] Please call us or ask during your consultation to confirm which insurance plans we currently accept."
  },
  {
    question: "How do I book an appointment?",
    answer: "You can book right here in this chat — just choose \"Book an appointment\" below."
  }
];

// ---------------------------------------------------------------------------
// STOCK PHOTOGRAPHY
// ---------------------------------------------------------------------------
// Every photo below was individually verified (Sept 2026) to be published
// under the free Unsplash License (https://unsplash.com/license — free for
// commercial and non-commercial use, no permission needed), NOT the paid
// "Unsplash+" tier. None depict a named, identifiable individual presented
// as a real staff member of this clinic — team headshots intentionally stay
// as abstract art (see components/ui/ArtPanel.tsx) rather than attaching a
// real photographed person's likeness to an invented name/bio.
//
// These are placeholders for launch, not a substitute for real photography
// of your actual clinic, staff and space — swap them out via `lib/data.ts`
// usage sites once you have your own photos (see README "Adding real
// photography").
// ---------------------------------------------------------------------------

export const stockPhotos = {
  clinicInterior: {
    src: "https://images.unsplash.com/photo-1704455306925-1401c3012117?auto=format&fit=crop&w=1600&q=80",
    alt: "Modern dental clinic treatment room",
    credit: "Kari Bjorn Photography",
    creditUrl: "https://unsplash.com/@karibjorn"
  },
  consultation: {
    src: "https://images.unsplash.com/photo-1663755787934-3742b0f5983a?auto=format&fit=crop&w=1600&q=80",
    alt: "Dentist talking with a patient",
    credit: "D Dental Office",
    creditUrl: "https://unsplash.com/@ddentalof1"
  },
  digitalScan: {
    src: "https://images.unsplash.com/photo-1777443726993-8f9c8e96e46e?auto=format&fit=crop&w=1600&q=80",
    alt: "Dentist examining a 3D dental scan on a tablet",
    credit: "Harold Hisona",
    creditUrl: "https://unsplash.com/@harold_angus"
  },
  scanReview: {
    src: "https://images.unsplash.com/photo-1600170311833-c2cf5280ce49?auto=format&fit=crop&w=1600&q=80",
    alt: "Clinician pointing at a dental scan on a tablet",
    credit: "Quang Tri NGUYEN",
    creditUrl: "https://unsplash.com/@quangtri"
  }
} as const;

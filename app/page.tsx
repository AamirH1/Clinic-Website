import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import Intro from "@/components/Intro";
import Treatments from "@/components/Treatments";
import FeaturedTreatment from "@/components/FeaturedTreatment";
import SmileGallery from "@/components/SmileGallery";
import WhyChooseUs from "@/components/WhyChooseUs";
import Technology from "@/components/Technology";
import PatientJourney from "@/components/PatientJourney";
import Testimonials from "@/components/Testimonials";
import Team from "@/components/Team";
import Contact from "@/components/Contact";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <Intro />
        <Treatments />
        <FeaturedTreatment />
        <SmileGallery />
        <WhyChooseUs />
        <Technology />
        <PatientJourney />
        <Testimonials />
        <Team />
        <Contact />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}

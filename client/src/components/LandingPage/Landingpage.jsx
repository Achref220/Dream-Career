import AppShowcase from "./LandingPageChildComponents/AppShowcase";
import Contact from "./LandingPageChildComponents/Contact";
import Faq from "./LandingPageChildComponents/Faq";
import Footer from "./LandingPageChildComponents/Footer";
import Header from "./LandingPageChildComponents/Header";
import Hero from "./LandingPageChildComponents/Hero";
import JoinTeam from "./LandingPageChildComponents/JoinTeam";
import WhatIsDreaca from "./LandingPageChildComponents/WhatIsDreaca";


export default function Landingpage() {
  return (
    <div className="pt-[80px]">
      <Header />
      <Hero />
      <WhatIsDreaca />
      <Faq />
      <AppShowcase />
      <JoinTeam />
      <Contact />
      <Footer />
    </div>
  );
}

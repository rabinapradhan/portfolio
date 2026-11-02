import AboutSection from "../components/AboutSection";
import BookingSection from "../components/BookingSection";
import HeroSection from "../components/HeroSection";
import LetsCollaborate from "../components/LetsCollaborate";
import ProjectListings from "../components/ProjectListings";
import Seo from "../components/Seo";
import ServicesSection from "../components/ServicesSection";

const HomePage = () => {
  return (
    <>
      <Seo />
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectListings isHome={true} />
        <ServicesSection />
        <LetsCollaborate />
        <BookingSection />
      </main>
    </>
  );
};

export default HomePage;

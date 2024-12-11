import ContactSection from "@/components/HomeSection/contact-section"
import Featured from "@/components/HomeSection/Featured"
import Footer from "@/components/HomeSection/Footer"
import HeroSection from "@/components/HomeSection/Hero-Section"
import Navbar from "@/components/HomeSection/Navbar"
import Services from "@/components/HomeSection/Services"
import Testimonials from "@/components/HomeSection/Testimonials"

const HomePage = () => {
  return (
    <>
      {/* navbar */}
      <Navbar/>
{/* hero section */}
    <HeroSection/>
    {/* Services */}
    <Services/>
    {/* Featureds */}
    <Featured/>
    {/* testimonials */}
    <Testimonials/>
    {/* contact form */}
    <ContactSection/>
    {/* footer */}
    <Footer/>
    </>
  )
}

export default HomePage
import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import StatsSection from '@/components/StatsSection'
import MeetSection from '@/components/MeetSection'
import TemplatesSection from '@/components/TemplatesSection'
import CtaSection from '@/components/CtaSection'
import Footer from '@/components/Footer'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <StatsSection />
        <MeetSection />
        <TemplatesSection />
        <CtaSection />
      </main>
      <Footer />
    </>
  )
}

import Hero from '@/components/Hero';
import SectionDivider from '@/components/SectionDivider';
import Welcome from '@/components/Welcome';
import Speakers from '@/components/Speakers';
import AbstractSection from '@/components/AbstractSection';
import Destination from '@/components/Destination';
import Logistics from '@/components/Logistics';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <Hero />
      <Welcome />
      <SectionDivider tone="on-sand" />
      <Speakers />
      <AbstractSection />
      <SectionDivider tone="on-sand" />
      <Destination />
      <Logistics />
      <Footer />
    </main>
  );
}

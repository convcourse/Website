import { Hero } from '@/components/sections/Hero';
import { FeaturesOverview } from '@/components/sections/FeaturesOverview';
import { TrustIndicators } from '@/components/sections/TrustIndicators';
import { CTASection } from '@/components/sections/CTASection';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <FeaturesOverview />
      <TrustIndicators />
      <CTASection />
    </main>
  );
}
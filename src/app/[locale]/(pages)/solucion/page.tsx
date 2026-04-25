import { Metadata } from 'next';
import { Problem } from '@/components/sections/Problem';
import { Pipeline } from '@/components/sections/Pipeline';
import { Explainability } from '@/components/sections/Explainability';
import { Compliance } from '@/components/sections/Compliance';
import { CTASection } from '@/components/sections/CTASection';
import { Zap, ArrowRight, Brain, Clock, Users, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';

// Metadata needs to be handled separately for i18n, usually via generateMetadata
// For now, we'll keep the static metadata or update it later.
// export const metadata: Metadata = { ... }; 

export default function SolucionPage() {
  const tHero = useTranslations('Solucion.Hero');
  const tResults = useTranslations('Solucion.Results');

  return (
    <main className="pt-16">
      {/* Hero Section específico para solución */}
      <section className="relative py-24 overflow-hidden bg-primary-900">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.05]"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-950"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary-500/10 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10" suppressHydrationWarning>
          <div className="inline-flex items-center bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-sm font-medium text-primary-100 mb-8 border border-white/10 shadow-glow">
            <Zap className="h-4 w-4 mr-2 text-accent-400" />
            {tHero('badge')}
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 tracking-tight">
            {tHero('title')}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-200 to-accent-300 mt-2">
              {tHero('highlight')}
            </span>
          </h1>
          <p className="text-xl text-primary-100 max-w-4xl mx-auto mb-10 leading-relaxed font-light">
            {tHero('description')}
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Link href="/contacto?tipo=universidad">
              <Button
                size="lg"
                className="bg-white text-primary-900 hover:bg-primary-50 px-8 py-6 text-lg font-semibold rounded-full shadow-glow border-0 w-full sm:w-auto"
              >
                <Brain className="mr-2 h-5 w-5" />
                {tHero('cta')}
              </Button>
            </Link>
            <Link href="/convalidacion">
              <Button
                size="lg"
                variant="outline"
                className="border-primary-700 text-primary-100 hover:bg-primary-800 hover:text-white hover:border-primary-600 px-8 py-6 text-lg font-semibold rounded-full w-full sm:w-auto"
              >
                <ArrowRight className="mr-2 h-5 w-5" />
                {tHero('secondaryCta')}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Secciones principales */}
      <Problem />
      <Pipeline />
      <Explainability />

      {/* Compliance y Seguridad */}
      <Compliance />

      {/* Sección consolidada de beneficios y casos de éxito */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white" suppressHydrationWarning>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" suppressHydrationWarning>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {tResults('title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {tResults('description')}
            </p>
          </div>

          {/* Casos de éxito con métricas integradas */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <Card className="p-8 text-center hover:shadow-xl transition-all duration-300" suppressHydrationWarning>
              <CardContent className="p-0">
                <div className="w-20 h-20 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-6">
                  <Clock className="h-10 w-10 text-primary-600" />
                </div>
                <div className="text-lg font-semibold text-gray-900 mb-2">{tResults('cases.upm.name')}</div>
                <div className="text-4xl font-bold text-primary-600 mb-2">95%</div>
                <div className="text-sm font-medium text-gray-900 mb-1">{tResults('cases.upm.metric1Label')}</div>
                <div className="text-xs text-gray-500 mb-4">{tResults('cases.upm.metric1Sub')}</div>
                <div className="text-2xl font-bold text-green-600">€180K</div>
                <div className="text-xs text-gray-500">{tResults('cases.upm.metric2Label')}</div>
              </CardContent>
            </Card>

            <Card className="p-8 text-center hover:shadow-xl transition-all duration-300" suppressHydrationWarning>
              <CardContent className="p-0">
                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                  <Users className="h-10 w-10 text-green-600" />
                </div>
                <div className="text-lg font-semibold text-gray-900 mb-2">{tResults('cases.upb.name')}</div>
                <div className="text-4xl font-bold text-green-600 mb-2">87%</div>
                <div className="text-sm font-medium text-gray-900 mb-1">{tResults('cases.upb.metric1Label')}</div>
                <div className="text-xs text-gray-500 mb-4">{tResults('cases.upb.metric1Sub')}</div>
                <div className="text-2xl font-bold text-primary-600">92%</div>
                <div className="text-xs text-gray-500">{tResults('cases.upb.metric2Label')}</div>
              </CardContent>
            </Card>

            <Card className="p-8 text-center hover:shadow-xl transition-all duration-300" suppressHydrationWarning>
              <CardContent className="p-0">
                <div className="w-20 h-20 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-6">
                  <BarChart3 className="h-10 w-10 text-purple-600" />
                </div>
                <div className="text-lg font-semibold text-gray-900 mb-2">{tResults('cases.rua.name')}</div>
                <div className="text-4xl font-bold text-purple-600 mb-2">15K+</div>
                <div className="text-sm font-medium text-gray-900 mb-1">{tResults('cases.rua.metric1Label')}</div>
                <div className="text-xs text-gray-500 mb-4">{tResults('cases.rua.metric1Sub')}</div>
                <div className="text-2xl font-bold text-blue-600">100%</div>
                <div className="text-xs text-gray-500">{tResults('cases.rua.metric2Label')}</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection />
    </main>
  );
}
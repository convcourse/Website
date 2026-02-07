import { Shield, Mail, Phone, MapPin } from 'lucide-react';

const quickLinks = [
  { name: 'Política de Privacidad', href: '/privacidad' },
  { name: 'Términos de Servicio', href: '/terminos' },
  { name: 'Blog', href: '/blog' },
];

const socialLinks = [
  { name: 'LinkedIn', href: '#', icon: '🔗' },
  { name: 'Twitter', href: '#', icon: '🐦' },
  { name: 'GitHub', href: '#', icon: '💻' },
];

const legalLinks = [
  { name: 'Política de Privacidad', href: '/privacidad' },
  { name: 'Términos de Servicio', href: '/terminos' },
  { name: 'Blog', href: '/blog' },
];

const navigation = [
  { name: 'Solución', href: '/solucion' },
  { name: 'Casos de Uso', href: '/casos-uso' },
  { name: 'Planes', href: '/planes' },
  { name: 'Contacto', href: '/contacto' },
];

export function Footer() {
  return (
    <footer className="bg-surface-900 text-white border-t border-surface-800" role="contentinfo" aria-label="Información del sitio web">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" suppressHydrationWarning>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12" suppressHydrationWarning>
          {/* Company Info */}
          <div className="lg:col-span-1 space-y-6" suppressHydrationWarning>
            <div className="flex items-center space-x-2" suppressHydrationWarning>
              <Shield className="h-8 w-8 text-primary-400" aria-hidden="true" />
              <span className="text-2xl font-bold tracking-tight">Certified</span>
            </div>
            <p className="text-surface-300 leading-relaxed">
              Automatizamos convalidaciones universitarias con IA contrastada y verificación blockchain.
              ≥80% similitud con margen ±10% justificado.
            </p>
            <div className="space-y-3 text-sm text-surface-400" suppressHydrationWarning>
              <div className="flex items-center space-x-3" suppressHydrationWarning>
                <Mail className="h-4 w-4 text-primary-400" aria-hidden="true" />
                <a
                  href="mailto:info@certified.example.com"
                  className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 rounded"
                  aria-label="Enviar email a info@certified.example.com"
                >
                  info@certified.example.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-primary-400" aria-hidden="true" />
                <a
                  href="tel:+34900000000"
                  className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 rounded"
                  aria-label="Llamar al +34 900 000 000"
                >
                  +34 900 000 000
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-primary-400" aria-hidden="true" />
                <span>Madrid, España</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <nav aria-label="Enlaces rápidos">
            <h3 className="text-lg font-semibold mb-6 text-white">Enlaces Rápidos</h3>
            <ul className="space-y-3" role="list">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-surface-300 hover:text-primary-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-900 rounded px-1 py-0.5 block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Legal */}
          <nav aria-label="Enlaces legales">
            <h3 className="text-lg font-semibold mb-6 text-white">Legal</h3>
            <ul className="space-y-3" role="list">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-surface-300 hover:text-primary-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-900 rounded px-1 py-0.5 block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-8 space-y-2 text-sm text-surface-400 border-t border-surface-800 pt-6">
              <p className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-accent-500"></span> Cumplimiento GDPR/eIDAS</p>
              <p className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-accent-500"></span> Registro blockchain verificable</p>
              <p className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-accent-500"></span> Datos pseudonimizados</p>
            </div>
          </nav>

          {/* Social & Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Síguenos</h3>
            <div className="flex space-x-4 mb-8" role="list">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="bg-surface-800 p-2 rounded-lg text-surface-300 hover:text-white hover:bg-primary-600 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-900"
                  aria-label={`Síguenos en ${social.name}`}
                >
                  <span aria-hidden="true" className="text-xl">{social.icon}</span>
                </a>
              ))}
            </div>
            <div className="space-y-4 text-sm text-surface-400">
              <p className="font-medium text-white">Certificaciones</p>
              <div className="grid grid-cols-2 gap-3" role="list">
                <div className="bg-surface-800/50 px-3 py-2 rounded border border-surface-700 flex items-center gap-2">
                  <span aria-hidden="true">🛡️</span> ISO 27001
                </div>
                <div className="bg-surface-800/50 px-3 py-2 rounded border border-surface-700 flex items-center gap-2">
                  <span aria-hidden="true">🔒</span> GDPR
                </div>
                <div className="bg-surface-800/50 px-3 py-2 rounded border border-surface-700 flex items-center gap-2">
                  <span aria-hidden="true">📜</span> eIDAS
                </div>
                <div className="bg-surface-800/50 px-3 py-2 rounded border border-surface-700 flex items-center gap-2">
                  <span aria-hidden="true">⛓️</span> Blockchain
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-surface-800 pt-8 mt-12">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-surface-500 text-sm" role="contentinfo">
              © 2024 Certified. Todos los derechos reservados.
            </p>
            <div className="flex items-center space-x-6 text-sm text-surface-500" role="status" aria-label="Información del estado del proyecto">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent-500 animate-pulse"></span>
                v1.0.0
              </span>
              <span aria-hidden="true" className="text-surface-700">|</span>
              <span>Estado: Desarrollo</span>
              <span aria-hidden="true" className="text-surface-700">|</span>
              <a
                href="#roadmap"
                className="hover:text-primary-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-900 rounded px-1"
              >
                Roadmap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
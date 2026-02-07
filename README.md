# Certified Landing Page

Página de aterrizaje premium para Certified, una plataforma de convalidaciones automáticas con IA que automatiza las transferencias de créditos entre universidades usando embeddings de IA, re-rankers LLM y anclaje en blockchain.

## 🚀 Características

- **Framework**: Next.js 14 con App Router
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS + componentes personalizados
- **Animaciones**: Framer Motion
- **SEO**: Metadatos completos, Schema.org, sitemap
- **Accesibilidad**: WCAG 2.2 AA compliant
- **Analíticas**: Google Analytics 4 con Consent Mode v2
- **Rendimiento**: Optimizado para Lighthouse 95+

## 🎯 Audiencias Objetivo

1. **Universidades/Secretarías** - Compradores y decisores institucionales
2. **Estudiantes** - Verificación previa de compatibilidad

## 🔧 Instalación

### Prerrequisitos
- Node.js 18.17 o superior
- npm, yarn, pnpm o bun

### Configuración Inicial

```bash
# Clonar el repositorio
git clone <repository-url>
cd Certified

# Instalar dependencias
npm install
# o
yarn install
# o
pnpm install

# Configurar variables de entorno
cp .env.example .env.local

# Ejecutar en desarrollo
npm run dev
# o
yarn dev
# o
pnpm dev

# Abrir http://localhost:3000
```

### Variables de Entorno

Copia `.env.example` a `.env.local` y configura:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

## 📁 Estructura del Proyecto

```
src/
├── app/                    # App Router de Next.js
│   ├── layout.tsx         # Layout principal con metadatos SEO
│   ├── page.tsx           # Página principal
│   ├── sitemap.ts         # Sitemap automático
│   ├── robots.ts          # Robots.txt
│   └── globals.css        # Estilos globales
├── components/
│   ├── ui/                # Componentes base reutilizables
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   └── textarea.tsx
│   ├── layout/            # Componentes de layout
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── sections/          # Secciones de la landing page
│   │   ├── Hero.tsx       # Sección principal
│   │   ├── Problem.tsx    # Problema y solución
│   │   ├── Pipeline.tsx   # Pipeline de IA en 5 pasos
│   │   ├── Explainability.tsx  # Contrastabilidad y scores
│   │   ├── Compliance.tsx # GDPR/eIDAS compliance
│   │   ├── UseCases.tsx   # Casos de uso y KPIs
│   │   ├── Plans.tsx      # Planes y precios
│   │   ├── FAQ.tsx        # Preguntas frecuentes
│   │   ├── Roadmap.tsx    # Roadmap 0→1
│   │   └── Contact.tsx    # Formulario de contacto
│   ├── Analytics.tsx      # Google Analytics + tracking
│   └── CookieBanner.tsx   # Banner de cookies GDPR
└── lib/
    └── utils.ts           # Utilidades (cn function)
```

## 🎨 Componentes Principales

### Hero Section
- Titular principal y subtítulo
- Badges de características (≥80% similitud, ±10% margen, blockchain)
- CTAs diferenciados para instituciones y estudiantes
- Indicadores de confianza

### Pipeline de IA (5 Pasos)
1. **Ingesta**: PDFs/HTML de guías + boletín
2. **Normalización**: ECTS, tipología, limpieza
3. **Matching IA**: Embeddings + LLM re-ranker + filtros
4. **Política**: ≥80% acepta, 70-79% revisión, <70% rechaza
5. **Salida**: Score + citas + blockchain hash

### Contrastabilidad
- Desglose visual del score (0-100)
- Citas textuales de ambas asignaturas
- Validaciones automáticas (ECTS, tipo, nota)
- Ejemplo JSON estructurado

### Cumplimiento Legal
- GDPR con pseudonimización
- eIDAS ready para firma institucional
- Marcos legales universitarios
- Seguridad ISO 27001

## 📊 KPIs y Métricas

- **Tiempo**: 4-8 semanas → < 3 días (90% reducción)
- **Precisión**: 65-75% → 95%+ (25% mejora)
- **Cobertura**: 0% → 85% automatización
- **Falsos Positivos**: 15-20% → < 3%
- **Trazabilidad**: Manual → Blockchain 100%

## 🚢 Despliegue

### Desarrollo Local
```bash
npm run dev
```

### Producción
```bash
npm run build
npm run start
```

### Vercel (Recomendado)
```bash
# Instalar Vercel CLI
npm i -g vercel

# Desplegar
vercel

# Configurar variables de entorno en Vercel Dashboard
# NEXT_PUBLIC_SITE_URL=https://your-domain.com
# NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### Otros Proveedores
- **Netlify**: `npm run build` → desplegar carpeta `.next`
- **AWS Amplify**: Conectar repositorio Git
- **Docker**: Incluye `Dockerfile` para contenedores

## 🧪 Testing y QA

### Checklist de Verificación

- [ ] **Hero comprensible en ≤5s** (test de 5 segundos)
- [ ] **Doble CTA** con rutas separadas estudiante/institución
- [ ] **Pipeline 5 pasos** coincide con descripción técnica
- [ ] **Regla ≥80% y ±10%** visible y explicada
- [ ] **Citas y validaciones** mostradas por match
- [ ] **KPIs listados** (precisión, cobertura, tiempo, etc.)
- [ ] **GDPR + eIDAS** reflejados con enlaces a políticas
- [ ] **Schema.org embebido** (Organization, Product, FAQPage)
- [ ] **i18n ES/EN** y hreflang configurados
- [ ] **Lighthouse ≥95** en Performance/Accessibility/SEO/Best Practices
- [ ] **WCAG 2.2 AA** (contraste, foco, teclado, reduced motion)
- [ ] **Consent Mode v2** activo en banner cookies
- [ ] **Eventos analítica** funcionando correctamente
- [ ] **Formulario validado** con reCAPTCHA y consentimiento
- [ ] **Sin PII en ejemplos** - solo hashes/IDs en blockchain
- [ ] **Open Graph y Twitter Cards** correctos
- [ ] **Responsive** probado en 360px/768px/1280px
- [ ] **Sin dark patterns** - copy honesto y transparente
- [ ] **Roadmap visible** con semanas 1-6 detalladas

### Comandos de Testing
```bash
# Linting
npm run lint

# Build test
npm run build

# Lighthouse CI (requiere configuración)
npm run lighthouse

# Accesibilidad con axe
npm run a11y
```

## 🔧 Configuración Avanzada

### Google Analytics 4
1. Crear propiedad GA4
2. Añadir `NEXT_PUBLIC_GA_MEASUREMENT_ID` en `.env.local`
3. Configurar Consent Mode v2 para GDPR

### Formulario de Contacto
- Integración con servicios como Formspree, Netlify Forms, o API propia
- reCAPTCHA v3 para protección spam
- Validación tanto cliente como servidor

### SEO Avanzado
- Metadatos dinámicos por sección
- Schema.org JSON-LD automático
- Sitemap.xml generado automáticamente
- hreflang para ES/EN

## 🌍 Internacionalización (i18n)

### Configuración next-intl
```bash
# Instalar dependencias i18n
npm install next-intl

# Configurar en next.config.js
# Crear archivos de traducciones en /messages
```

### Idiomas Soportados
- **Español (ES)** - Por defecto
- **Inglés (EN)** - Traducciones de titulares y CTAs clave

## 🛡️ Seguridad y Privacidad

### GDPR Compliance
- Banner de cookies con Consent Mode v2
- Pseudonimización de datos personales
- Solo hashes en blockchain, nunca PII
- Políticas de privacidad y términos

### Seguridad Técnica
- Headers de seguridad configurados
- Validación de formularios
- Protección XSS y CSRF
- Rate limiting en APIs

## 📈 Analítica y Tracking

### Eventos Configurados
- `cta_demo_click` - Clicks en CTAs de demo
- `cta_student_click` - Clicks en CTAs de estudiantes
- `form_submit` - Envíos de formulario
- `precheck_start` - Inicio de pre-chequeo

### Métricas Core Web Vitals
- **LCP** < 2.5s
- **FID** < 100ms
- **CLS** < 0.1

## 🤝 Contribución

### Estándares de Código
- TypeScript estricto
- ESLint + Prettier configurados
- Componentes reutilizables
- Accesibilidad por defecto
- Mobile-first design

### Workflow de Desarrollo
1. Fork del repositorio
2. Crear rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -m 'Añadir nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear Pull Request

## 📞 Soporte

### Contacto Técnico
- **Email**: tech@certified.example.com
- **Documentación**: [Confluence/GitBook URL]
- **Issues**: GitHub Issues en este repositorio

### Recursos Adicionales
- [Guía de Componentes](./docs/components.md)
- [Guía de Despliegue](./docs/deployment.md)
- [Configuración SEO](./docs/seo.md)
- [Testing Guide](./docs/testing.md)

## 📝 Licencia

Copyright © 2024 Certified. Todos los derechos reservados.

---

**Estado del Proyecto**: 🚧 En desarrollo (Semana 5/6 del roadmap)

**Próximos Hitos**: Demo funcional completa, programa piloto con primera universidad
# Estructura de Páginas - Certified

## Diagrama de Navegación Actual (Implementado)

```text
                              ┌────────────────┐
                              │ HEADER (Fijo)  │
                              │ Logo + Nav     │
                              └────────┬───────┘
                                       │
                    ┌──────────────────┼──────────────────┐
                    │                  │                  │
                    ▼                  ▼                  ▼
            ┌──────────────┐   ┌──────────────┐   ┌──────────────┐
            │   Solución   │   │  Casos Uso   │   │    Planes    │
            │  /solucion   │   │ /casos-uso   │   │   /planes    │
            └──────────────┘   └──────────────┘   └──────────────┘
                    │                                       │
                    └───────────────┬───────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│                        PÁGINA PRINCIPAL (/)                         │
│                          Landing Page                               │
│                                                                     │
│  ✅ Hero                    - Propuesta valor dual (Uni+Est)       │
│  ✅ FeaturesOverview        - Características principales          │
│  ✅ TrustIndicators         - Métricas confianza y social proof    │
│  ✅ CTASection              - Llamada a la acción final            │
│                                                                     │
│  ❌ Problem                 - (No incluido actualmente)            │
│  ❌ Pipeline                - (No incluido actualmente)            │
│  ❌ Explainability          - (No incluido actualmente)            │
│  ❌ UseCases                - (No incluido actualmente)            │
│  ❌ Compliance              - (No incluido actualmente)            │
│  ❌ Plans                   - (No incluido actualmente)            │
│  ❌ Roadmap                 - (No incluido actualmente)            │
│  ❌ FAQ                     - (No incluido actualmente)            │
└─────────────────┬───────────────────────────────────────────────────┘
                  │
    ┌─────────────┼─────────────────┬───────────────┬─────────────┐
    │             │                 │               │             │
    ▼             ▼                 ▼               ▼             ▼
┌────────┐  ┌──────────┐      ┌─────────┐    ┌─────────┐  ┌─────────┐
│ DEMO   │  │CONTACTO  │      │  BLOG   │    │PRIVACIDAD│  │TÉRMINOS │
│ /demo  │  │/contacto │      │ /blog   │    │/privacidad│  │/terminos│
│        │  │          │      │         │    │          │  │         │
│• Upload│  │• Form    │      │• Posts  │    │• GDPR    │  │• ToS    │
│• AI    │  │• Dual    │      │ (struct)│    │• Datos   │  │• Uso    │
│• Result│  │  Audience│      │         │    │• Derechos│  │• Legal  │
│• Block-│  │• FAQ     │      │         │    │          │  │         │
│  chain │  │          │      │         │    │          │  │         │
└────────┘  └──────────┘      └─────────┘    └─────────┘  └─────────┘
                  │
                  └──────────────────┐
                                     │
                              ┌──────▼────────┐
                              │ FOOTER Global │
                              │               │
                              │ • Links       │
                              │ • Social      │
                              │ • Legal       │
                              │ • Cert Info   │
                              └───────────────┘

                           ┌─────────────────┐
                           │ COOKIE BANNER   │
                           │ (Overlay Global)│
                           └─────────────────┘
```

## Rutas Implementadas

### Páginas Principales

| Ruta | Archivo | Secciones/Contenido | Estado | Público |
|------|---------|---------------------|--------|---------|
| `/` | `app/page.tsx` | Hero, FeaturesOverview, TrustIndicators, CTA | ✅ Funcional | Ambos |
| `/solucion` | `app/(pages)/solucion/page.tsx` | Hero, Problem, Pipeline, Explainability, Compliance, Casos Éxito, CTA | ✅ Funcional | Universidades |
| `/casos-uso` | `app/(pages)/casos-uso/page.tsx` | Hero + Stats, UseCases component | ✅ Funcional | Ambos |
| `/planes` | `app/(pages)/planes/page.tsx` | Hero, Plans component (solo instituciones), Features, CTA | ✅ Funcional | Universidades |
| `/demo` | `app/(pages)/demo/page.tsx` | Demo interactiva 3 pasos: Upload→AI Processing→Results+Blockchain | ✅ Funcional | Ambos |
| `/contacto` | `app/(pages)/contacto/page.tsx` | Formulario dual + FAQ (incluye precios) | ✅ Funcional | Ambos |
| `/blog` | `app/(pages)/blog/page.tsx` | Estructura blog corporativo | ✅ Estructura | Todos |

### Páginas Legales

| Ruta | Archivo | Descripción | Estado |
|------|---------|-------------|--------|
| `/privacidad` | `app/(pages)/privacidad/page.tsx` | Política de privacidad GDPR completa | ✅ Funcional |
| `/terminos` | `app/(pages)/terminos/page.tsx` | Términos y condiciones de uso | ✅ Funcional |

### Componentes Globales (Layout)

- **Header** (`components/layout/Header.tsx`)
  - Navegación fija con efecto glassmorphism
  - Links: Solución, Casos de Uso, Planes, Contacto
  - Responsive con menú hamburguesa móvil
  - Active state en ruta actual

- **Footer** (`components/layout/Footer.tsx`)
  - 4 columnas: Info Empresa, Enlaces Rápidos, Legal, Social
  - Enlaces: Privacidad, Términos, Blog
  - Certificaciones: ISO 27001, GDPR, eIDAS, Blockchain
  - Contacto: Email, Teléfono, Ubicación

- **CookieBanner** (`components/CookieBanner.tsx`)
  - Gestión consentimiento cookies
  - LocalStorage persistente

- **Analytics** (`components/Analytics.tsx`)
  - Google Analytics 4 integración
  - Event tracking configurado

### Rutas Técnicas

- `/robots.txt` - Configuración para crawlers
- `/sitemap.xml` - Mapa del sitio para SEO

## Flujo de Usuario

### Flujo Principal - Universidad

```
Home → Solución → Casos de Uso → Demo → Planes → Contacto
  ↓                                              ↓
Blog ←─────────────────────────────────────────────┘
```

### Flujo Principal - Estudiante

```
Home → Demo → Casos de Uso → Blog → Contacto
  ↓                            ↓
FAQ en Home ←──────────────────┘
```

## Arquitectura de Navegación

### Header Navigation (Implementado)

- **Logo** → Home (`/`)
- **Solución** → `/solucion`
- **Casos de Uso** → `/casos-uso`
- **Planes** → `/planes`
- **Contacto** → `/contacto`

### Footer Navigation (Implementado)

#### Enlaces Rápidos

- Política de Privacidad → `/privacidad`
- Términos de Servicio → `/terminos`
- Blog → `/blog`

#### Legal

- Política de Privacidad → `/privacidad`
- Términos de Servicio → `/terminos`
- Blog → `/blog`

#### Navegación Principal (repetida)

- Solución → `/solucion`
- Casos de Uso → `/casos-uso`
- Planes → `/planes`
- Contacto → `/contacto`

## Secciones por Página

### Landing Page (`/`)

**Implementadas actualmente:**

1. **Hero** - Propuesta de valor dual (Universidades + Estudiantes)
2. **FeaturesOverview** - Grid de características principales
3. **TrustIndicators** - Métricas, logos universidades, certificaciones
4. **CTASection** - Doble CTA según audiencia

**Disponibles pero no incluidas:**

- Problem (componente existe)
- Pipeline (componente existe)
- Explainability (componente existe)
- UseCases (componente existe)
- Compliance (componente existe)
- Plans (componente existe)
- Roadmap (componente existe)
- FAQ (componente existe)
- Contact (componente existe)
- ContactFAQ (componente existe)

### Página Solución (`/solucion`)

**Secciones incluidas:**

1. **Hero Específico** - Título "Solución Definitiva" + CTAs
2. **Problem** - Análisis del problema actual
3. **Pipeline** - 5 pasos del proceso IA (detallado)
4. **Explainability** - Transparencia y explicabilidad
5. **Compliance** - GDPR, eIDAS, blockchain
6. **Casos de Éxito** - 3 cards con métricas reales + ROI
7. **CTASection** - Call to action final

### Página Demo (`/demo`)

**Flujo interactivo implementado:**

1. **Hero + Features** - Intro con stats (tiempo, docs, precisión)
2. **Step 1: Upload** - 3 zonas drag&drop (Guías Origen, Guías Destino, Boletín)
3. **Step 2: Processing** - Loading con 6 mensajes progresivos
4. **Step 3: Results**
   - Summary stats (18 convalidables, 4 revisar, 3 rechazadas)
   - Detalle por materia con % similitud
   - Blockchain verification
   - Botones: Reintentar / Descargar PDF

## Componentes de Secciones Disponibles

Ubicación: `src/components/sections/`

| Componente | Usado en | Descripción | Estado |
|------------|----------|-------------|--------|
| `Hero.tsx` | `/` | Hero principal landing page | ✅ En uso |
| `FeaturesOverview.tsx` | `/` | Grid características principales | ✅ En uso |
| `TrustIndicators.tsx` | `/` | Métricas, logos, certificaciones | ✅ En uso |
| `CTASection.tsx` | `/`, `/solucion` | Call to action final | ✅ En uso |
| `Problem.tsx` | `/solucion` | Análisis del problema | ✅ En uso |
| `Pipeline.tsx` | `/solucion` | 5 pasos proceso IA | ✅ En uso |
| `Explainability.tsx` | `/solucion` | Transparencia IA | ✅ En uso |
| `Compliance.tsx` | `/solucion` | GDPR, eIDAS, blockchain | ✅ En uso |
| `UseCases.tsx` | - | Casos uso específicos | 🔶 Disponible |
| `Plans.tsx` | `/planes` | Pricing planes institucionales | ✅ En uso |
| `Roadmap.tsx` | - | Hoja de ruta producto | 🔶 Disponible |
| `FAQ.tsx` | - | Preguntas frecuentes | 🔶 Disponible |
| `Contact.tsx` | - | Formulario contacto | 🔶 Disponible |
| `ContactFAQ.tsx` | - | FAQ contacto | 🔶 Disponible |

**Leyenda:**
- ✅ En uso: Implementado y utilizado en páginas
- 🔶 Disponible: Creado pero no incluido en ninguna página actual

## Stack Tecnológico

- **Framework**: Next.js 14 (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Componentes UI**: shadcn/ui (Button, Card, Input, Textarea)
- **Iconos**: Lucide React
- **Animaciones**: Framer Motion (preparado)
- **Analytics**: Google Analytics 4
- **SEO**: Metadata completa, sitemap, robots.txt

## Características Técnicas

### SEO

- ✅ Meta tags completos en todas las páginas
- ✅ Open Graph configurado
- ✅ Sitemap dinámico (`app/sitemap.ts`)
- ✅ Robots.txt configurado (`app/robots.ts`)
- ✅ Structured data ready

### Accesibilidad

- ✅ ARIA labels en navegación
- ✅ Roles semánticos (navigation, contentinfo, main)
- ✅ Focus states visibles
- ✅ Screen reader support
- ✅ Keyboard navigation

### Performance

- ✅ Next.js Image optimization ready
- ✅ App Router con RSC
- ✅ CSS optimizado con Tailwind
- ✅ Lazy loading preparado

## Próximas Páginas Sugeridas

- [ ] `/recursos` - Whitepapers, estudios de caso, downloads
- [ ] `/documentacion` - Docs técnicas API
- [ ] `/equipo` - Sobre el equipo y empresa
- [ ] `/prensa` - Kit de prensa, menciones
- [ ] `/partners` - Programa de partners
- [ ] `/universidades` - Portal específico universidades
- [ ] `/estudiantes` - Portal específico estudiantes

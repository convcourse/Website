export type ValidationStatus = 'approved' | 'pending' | 'rejected';
export type RecommendationStatus = 'approve' | 'partial' | 'deny';

export interface DashboardUser {
  name: string;
  email: string;
  institution: string;
  userType: 'student' | 'university';
  registeredAt: string;
}

export interface AnalysisRecord {
  id: string;
  date: string;
  originCourse: string;
  originUniversity: string;
  targetCourse: string;
  targetUniversity: string;
  status: ValidationStatus;
  score: number;
  subjects: number;
}

export interface ResultSubject {
  id: string;
  origin: string;
  target: string;
  originCredits: number;
  targetCredits: number;
  score: number;
  status: ValidationStatus;
  matchedTopics: string[];
  gaps: string[];
}

export interface ResultDetail {
  id: string;
  date: string;
  originCourse: string;
  originUniversity: string;
  targetCourse: string;
  targetUniversity: string;
  status: ValidationStatus;
  overallScore: number;
  processTime: string;
  blockchain: {
    hash: string;
    block: string;
    verified: boolean;
  };
  scoreBreakdown: {
    content: number;
    learningOutcomes: number;
    credits: number;
    assessment: number;
  };
  subjects: ResultSubject[];
  recommendation: RecommendationStatus;
}

export const mockDashboardUser: DashboardUser = {
  name: 'Alex',
  email: 'demo@certified.local',
  institution: 'Universidad Politecnica de Madrid',
  userType: 'student',
  registeredAt: '2025-10-20'
};

export const HARDCODED_DASHBOARD_USER_KEY = `user_${mockDashboardUser.email}`;

export function ensureHardcodedDashboardUser() {
  if (typeof window === 'undefined') {
    return mockDashboardUser;
  }

  const existingHardcodedUser = localStorage.getItem(HARDCODED_DASHBOARD_USER_KEY);
  if (!existingHardcodedUser) {
    localStorage.setItem(HARDCODED_DASHBOARD_USER_KEY, JSON.stringify(mockDashboardUser));
  }

  return mockDashboardUser;
}

export function ensureHardcodedDashboardSession() {
  if (typeof window === 'undefined') {
    return mockDashboardUser;
  }

  const currentUser = localStorage.getItem('currentUser');
  if (currentUser) {
    try {
      return JSON.parse(currentUser) as DashboardUser;
    } catch {
      localStorage.removeItem('currentUser');
    }
  }

  const hardcodedUser = ensureHardcodedDashboardUser();
  localStorage.setItem('currentUser', JSON.stringify(hardcodedUser));
  return hardcodedUser;
}

export const mockAnalyses: AnalysisRecord[] = [
  {
    id: 'RPT-2025-001',
    date: '2025-12-01',
    originCourse: 'Ingenieria Informatica',
    originUniversity: 'Universidad de Valencia',
    targetCourse: 'Grado en Informatica',
    targetUniversity: 'Universidad Politecnica de Madrid',
    status: 'approved',
    score: 94,
    subjects: 25
  },
  {
    id: 'RPT-2025-002',
    date: '2025-11-28',
    originCourse: 'Administracion de Empresas',
    originUniversity: 'Universidad de Barcelona',
    targetCourse: 'ADE',
    targetUniversity: 'Universidad Complutense',
    status: 'pending',
    score: 76,
    subjects: 18
  },
  {
    id: 'RPT-2025-003',
    date: '2025-11-25',
    originCourse: 'Derecho',
    originUniversity: 'Universidad de Salamanca',
    targetCourse: 'Grado en Derecho',
    targetUniversity: 'Universidad de Navarra',
    status: 'rejected',
    score: 45,
    subjects: 22
  },
  {
    id: 'RPT-2025-004',
    date: '2025-11-20',
    originCourse: 'Medicina',
    originUniversity: 'Universidad de Granada',
    targetCourse: 'Medicina',
    targetUniversity: 'Universidad Autonoma de Madrid',
    status: 'approved',
    score: 89,
    subjects: 35
  },
  {
    id: 'RPT-2025-005',
    date: '2025-11-15',
    originCourse: 'Arquitectura',
    originUniversity: 'Universidad de Sevilla',
    targetCourse: 'Grado en Arquitectura',
    targetUniversity: 'Universidad de Malaga',
    status: 'pending',
    score: 72,
    subjects: 28
  },
  {
    id: 'RPT-2025-006',
    date: '2025-11-10',
    originCourse: 'Psicologia',
    originUniversity: 'Universidad de Murcia',
    targetCourse: 'Grado en Psicologia',
    targetUniversity: 'Universidad de Oviedo',
    status: 'approved',
    score: 91,
    subjects: 20
  },
  {
    id: 'RPT-2025-007',
    date: '2025-11-05',
    originCourse: 'Economia',
    originUniversity: 'Universidad de Zaragoza',
    targetCourse: 'Grado en Economia',
    targetUniversity: 'Universidad Carlos III',
    status: 'rejected',
    score: 38,
    subjects: 15
  },
  {
    id: 'RPT-2025-008',
    date: '2025-10-30',
    originCourse: 'Ingenieria Civil',
    originUniversity: 'Universidad de Cantabria',
    targetCourse: 'Grado en Ingenieria Civil',
    targetUniversity: 'Universidad Politecnica de Valencia',
    status: 'approved',
    score: 88,
    subjects: 30
  }
];

export const mockResults: Record<string, ResultDetail> = {
  'RPT-2025-001': {
    id: 'RPT-2025-001',
    date: '2025-12-01',
    originCourse: 'Ingenieria Informatica',
    originUniversity: 'Universidad de Valencia',
    targetCourse: 'Grado en Informatica',
    targetUniversity: 'Universidad Politecnica de Madrid',
    status: 'approved',
    overallScore: 94,
    processTime: '1m 45s',
    blockchain: {
      hash: '0x7a8b...f9e2',
      block: '#2,847,592',
      verified: true
    },
    scoreBreakdown: {
      content: 92,
      learningOutcomes: 95,
      credits: 100,
      assessment: 88
    },
    subjects: [
      {
        id: '1',
        origin: 'Programacion I',
        target: 'Fundamentos de Programacion',
        originCredits: 6,
        targetCredits: 6,
        score: 96,
        status: 'approved',
        matchedTopics: ['Variables y tipos de datos', 'Estructuras de control', 'Funciones', 'Arrays'],
        gaps: []
      },
      {
        id: '2',
        origin: 'Algebra Lineal',
        target: 'Matematicas I',
        originCredits: 6,
        targetCredits: 6,
        score: 91,
        status: 'approved',
        matchedTopics: ['Matrices', 'Sistemas de ecuaciones', 'Espacios vectoriales'],
        gaps: ['Transformaciones lineales avanzadas']
      },
      {
        id: '3',
        origin: 'Bases de Datos',
        target: 'Gestion de Datos',
        originCredits: 6,
        targetCredits: 6,
        score: 74,
        status: 'pending',
        matchedTopics: ['SQL basico', 'Modelo relacional'],
        gaps: ['NoSQL', 'Big Data']
      },
      {
        id: '4',
        origin: 'Historia del Arte',
        target: '',
        originCredits: 3,
        targetCredits: 0,
        score: 0,
        status: 'rejected',
        matchedTopics: [],
        gaps: ['Sin equivalencia en plan destino']
      }
    ],
    recommendation: 'approve'
  },
  'RPT-2025-002': {
    id: 'RPT-2025-002',
    date: '2025-11-28',
    originCourse: 'Administracion de Empresas',
    originUniversity: 'Universidad de Barcelona',
    targetCourse: 'ADE',
    targetUniversity: 'Universidad Complutense',
    status: 'pending',
    overallScore: 76,
    processTime: '2m 12s',
    blockchain: {
      hash: '0x3c4d...a1b2',
      block: '#2,847,590',
      verified: true
    },
    scoreBreakdown: {
      content: 78,
      learningOutcomes: 72,
      credits: 85,
      assessment: 70
    },
    subjects: [
      {
        id: '1',
        origin: 'Contabilidad I',
        target: 'Introduccion a la Contabilidad',
        originCredits: 6,
        targetCredits: 6,
        score: 88,
        status: 'approved',
        matchedTopics: ['Plan General Contable', 'Asientos contables', 'Balance'],
        gaps: []
      },
      {
        id: '2',
        origin: 'Marketing',
        target: 'Fundamentos de Marketing',
        originCredits: 6,
        targetCredits: 4,
        score: 72,
        status: 'pending',
        matchedTopics: ['Analisis de mercado', 'Segmentacion'],
        gaps: ['Marketing digital', 'Diferencia de creditos']
      }
    ],
    recommendation: 'partial'
  },
  'RPT-2025-003': {
    id: 'RPT-2025-003',
    date: '2025-11-25',
    originCourse: 'Derecho',
    originUniversity: 'Universidad de Salamanca',
    targetCourse: 'Grado en Derecho',
    targetUniversity: 'Universidad de Navarra',
    status: 'rejected',
    overallScore: 45,
    processTime: '1m 30s',
    blockchain: {
      hash: '0x9f8e...c3d4',
      block: '#2,847,588',
      verified: true
    },
    scoreBreakdown: {
      content: 42,
      learningOutcomes: 48,
      credits: 50,
      assessment: 40
    },
    subjects: [
      {
        id: '1',
        origin: 'Derecho Romano',
        target: 'Historia del Derecho',
        originCredits: 6,
        targetCredits: 6,
        score: 52,
        status: 'rejected',
        matchedTopics: ['Conceptos historicos basicos'],
        gaps: ['Enfoque metodologico diferente', 'Contenido no equivalente']
      }
    ],
    recommendation: 'deny'
  }
};

export function getDashboardStats(records: AnalysisRecord[]) {
  const validations = records.length;
  const pending = records.filter((item) => item.status === 'pending').length;
  const approved = records.filter((item) => item.status === 'approved').length;
  const successRate = validations > 0 ? Math.round((approved / validations) * 100) : 0;

  return {
    validations,
    pending,
    approved,
    successRate
  };
}

export function getRecentAnalyses(records: AnalysisRecord[], limit = 4) {
  return [...records]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
}

export function getResultById(id: string) {
  return mockResults[id] || null;
}

import type { TestCategory } from '../types/qa.types';

export interface QATestDefinition {
  id: string;
  category: TestCategory;
  name: string;
  description: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  weight: number;
}

export const QA_CATEGORIES = [
  { id: 'code-correctness', name: 'Code Correctness', icon: '💻', color: '#3b82f6' },
  { id: 'wiring-integration', name: 'Wiring & Integration', icon: '🔌', color: '#8b5cf6' },
  { id: 'security', name: 'Security', icon: '🔒', color: '#ef4444' },
  { id: 'deployment', name: 'Deployment', icon: '🚀', color: '#f59e0b' },
  { id: 'ui-ux', name: 'UI/UX', icon: '🎨', color: '#ec4899' },
  { id: 'performance', name: 'Performance & Timing', icon: '⚡', color: '#14b8a6' },
  { id: 'runtime-rendering', name: 'Runtime Rendering', icon: '🎬', color: '#6366f1' },
  { id: 'accessibility', name: 'Accessibility', icon: '♿', color: '#10b981' },
  { id: 'data-integrity', name: 'Data Integrity', icon: '🗄️', color: '#8b5cf6' },
  { id: 'duplicates-legacy', name: 'Duplicates & Legacy', icon: '🔍', color: '#6b7280' },
] as const;

export const HEALTH_THRESHOLDS = {
  excellent: 90,
  good: 70,
  fair: 50,
  poor: 0,
};

export const TEST_DEFINITIONS: QATestDefinition[] = [
  // Sample test definitions - these will be expanded
  {
    id: 'cc-001',
    category: 'code-correctness',
    name: 'TypeScript Strict Mode',
    description: 'Verify strict mode enabled in tsconfig.json',
    priority: 'critical',
    weight: 1,
  },
  {
    id: 'wi-001',
    category: 'wiring-integration',
    name: 'Component Hierarchy',
    description: 'Component tree structure matches architecture',
    priority: 'critical',
    weight: 1,
  },
  {
    id: 'se-001',
    category: 'security',
    name: 'API Key Protection',
    description: 'API keys not in client-side code',
    priority: 'critical',
    weight: 1,
  },
  // More tests will be added during implementation
];

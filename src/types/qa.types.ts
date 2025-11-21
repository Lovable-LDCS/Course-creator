// QA and Testing Types
export type TestCategory = 
  | 'code-correctness'
  | 'wiring-integration'
  | 'security'
  | 'deployment'
  | 'ui-ux'
  | 'performance'
  | 'runtime-rendering'
  | 'accessibility'
  | 'data-integrity'
  | 'duplicates-legacy';

export type TestStatus = 'pending' | 'running' | 'passed' | 'failed' | 'skipped';

export interface QATest {
  id: string;
  category: TestCategory;
  name: string;
  description: string;
  status: TestStatus;
  error?: string;
  duration?: number;
}

export interface CategoryResults {
  category: TestCategory;
  total: number;
  passed: number;
  failed: number;
  skipped: number;
  tests: QATest[];
}

export interface QAResults {
  totalTests: number;
  passed: number;
  failed: number;
  skipped: number;
  categories: CategoryResults[];
  systemHealth: number;
  timestamp: Date;
}

export interface HealthStatus {
  score: number; // 0-100
  apiConnectivity: boolean;
  storageAvailability: boolean;
  testPassRate: number;
  performanceScore: number;
  status: 'excellent' | 'good' | 'fair' | 'poor';
}

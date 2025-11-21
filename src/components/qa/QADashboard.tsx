import { useState } from 'react';
import { Play, Heart, BarChart3, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '../common/Button';
import { QA_CATEGORIES } from '../../config/qa.config';
import type { QAResults } from '../../types/qa.types';

export function QADashboard() {
  const [qaResults, setQAResults] = useState<QAResults | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const handleRunTests = async () => {
    setIsRunning(true);
    // TODO: Implement actual test runner
    setTimeout(() => {
      // Mock results for now
      setQAResults({
        totalTests: 160,
        passed: 0,
        failed: 160,
        skipped: 0,
        categories: QA_CATEGORIES.map((cat) => ({
          category: cat.id as any,
          total: 16,
          passed: 0,
          failed: 16,
          skipped: 0,
          tests: [],
        })),
        systemHealth: 0,
        timestamp: new Date(),
      });
      setIsRunning(false);
    }, 2000);
  };

  const getHealthStatus = (score: number) => {
    if (score >= 90) return { label: 'Excellent', color: 'text-green-500', icon: '❤️' };
    if (score >= 70) return { label: 'Good', color: 'text-yellow-500', icon: '💛' };
    if (score >= 50) return { label: 'Fair', color: 'text-orange-500', icon: '🧡' };
    return { label: 'Poor', color: 'text-red-500', icon: '💔' };
  };

  return (
    <div className="flex-1 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">QA Dashboard</h1>

        {/* Run All Tests Button */}
        <div className="mb-8">
          <Button
            onClick={handleRunTests}
            isLoading={isRunning}
            size="lg"
            className="w-full sm:w-auto"
          >
            <Play className="w-5 h-5 mr-2" />
            Run All QA Tests
          </Button>
        </div>

        {qaResults && (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              {/* System Health */}
              <div className="bg-white rounded-lg shadow p-6 border-2 border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-gray-600">SYSTEM HEALTH</h3>
                  <Heart className="w-6 h-6 text-red-500" />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  {getHealthStatus(qaResults.systemHealth).icon}
                </div>
                <div className="text-2xl font-bold mb-1">
                  {qaResults.systemHealth}
                </div>
                <div className="text-sm text-gray-600 mb-4">Health Score</div>
                <a href="#details" className="text-primary-600 text-sm font-medium hover:underline">
                  View Details →
                </a>
              </div>

              {/* Total Tests */}
              <div className="bg-white rounded-lg shadow p-6 border-2 border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-gray-600">TOTAL TESTS</h3>
                  <BarChart3 className="w-6 h-6 text-blue-500" />
                </div>
                <div className="text-5xl font-bold text-gray-900 mb-2">
                  {qaResults.totalTests}
                </div>
                <div className="text-sm text-gray-600 mb-4">Tests Performed</div>
                <a href="#all-tests" className="text-primary-600 text-sm font-medium hover:underline">
                  View All Tests →
                </a>
              </div>

              {/* Passed */}
              <div className="bg-white rounded-lg shadow p-6 border-2 border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-gray-600">PASSED</h3>
                  <CheckCircle className="w-6 h-6 text-green-500" />
                </div>
                <div className="text-5xl font-bold text-green-600 mb-2">
                  {qaResults.passed}
                </div>
                <div className="text-sm text-gray-600 mb-4">Tests Passed</div>
                <a href="#passed" className="text-primary-600 text-sm font-medium hover:underline">
                  View Passed →
                </a>
              </div>

              {/* Failed */}
              <div className="bg-white rounded-lg shadow p-6 border-2 border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-gray-600">FAILED</h3>
                  <XCircle className="w-6 h-6 text-red-500" />
                </div>
                <div className="text-5xl font-bold text-red-600 mb-2">
                  {qaResults.failed}
                </div>
                <div className="text-sm text-gray-600 mb-4">Tests Failed</div>
                <a href="#failed" className="text-primary-600 text-sm font-medium hover:underline">
                  View Failed →
                </a>
              </div>
            </div>

            {/* Test Categories Breakdown */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Test Categories Breakdown</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {QA_CATEGORIES.map((category) => {
                  const categoryResult = qaResults.categories.find(
                    (c) => c.category === category.id
                  );
                  const passed = categoryResult?.passed || 0;
                  const failed = categoryResult?.failed || 0;

                  return (
                    <div
                      key={category.id}
                      className="bg-white rounded-lg shadow p-6 border-2 border-gray-200"
                    >
                      <div className="flex items-center space-x-3 mb-4">
                        <span className="text-3xl">{category.icon}</span>
                        <h3 className="font-semibold text-gray-900">{category.name}</h3>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">PASSED</span>
                          <span className="font-semibold text-green-600">{passed}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">FAILED</span>
                          <span className="font-semibold text-red-600">{failed}</span>
                        </div>
                      </div>
                      <a
                        href={`#${category.id}`}
                        className="mt-4 text-primary-600 text-sm font-medium hover:underline block"
                      >
                        Details →
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {!qaResults && !isRunning && (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <BarChart3 className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No Test Results Yet
            </h3>
            <p className="text-gray-600">
              Click "Run All QA Tests" to start testing the application
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

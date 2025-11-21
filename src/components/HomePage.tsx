import { Link } from 'react-router-dom';
import { ENGINES } from '../config/app.config';

export function HomePage() {
  return (
    <div className="flex-1 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">🎓</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Course Crafter
          </h1>
          <p className="text-xl text-gray-600">
            Transform your educational content into professional training materials with AI
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {ENGINES.filter((e) => e.enabled).map((engine) => (
            <Link
              key={engine.id}
              to={`/${engine.id}`}
              className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow border-2 border-transparent hover:border-primary-500"
            >
              <div className="text-5xl mb-4">{engine.icon}</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{engine.name}</h2>
              <p className="text-gray-600">{engine.description}</p>
              <div className="mt-4 text-primary-600 font-medium">
                Get Started →
              </div>
            </Link>
          ))}
        </div>

        <div className="bg-blue-50 rounded-lg p-8 border border-blue-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Features</h2>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span className="text-gray-700">AI-powered content generation with GPT-4</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span className="text-gray-700">Professional voice-over synthesis</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span className="text-gray-700">Automatic video creation from documents</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span className="text-gray-700">Cost-optimized AI model selection</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span className="text-gray-700">Comprehensive quality assurance testing</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

import { Sidebar } from '../../layout/Sidebar';

export function Engine2() {
  return (
    <>
      <Sidebar>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Video Settings</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content Type
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
              <option>Training Course</option>
              <option>Tutorial</option>
              <option>Presentation</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Style Template
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
              <option>Professional</option>
              <option>Casual</option>
              <option>Educational</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Video Quality
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
              <option>1080p (Full HD)</option>
              <option>720p (HD)</option>
              <option>4K (Ultra HD)</option>
            </select>
          </div>
        </div>
      </Sidebar>

      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Training Video Creator</h1>
        <p className="text-gray-600 mb-8">
          Create professional training videos from PowerPoint, documents, and other content
        </p>

        <div className="bg-white rounded-lg shadow p-8">
          <h2 className="text-xl font-semibold mb-4">Upload Source Materials</h2>
          <p className="text-gray-600 mb-4">
            Supported formats: PPTX, DOCX, PDF, MP4, TXT, MD
          </p>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
            <div className="text-6xl mb-4">📚</div>
            <p className="text-lg text-gray-700 mb-2">Drag and drop multiple files here</p>
            <p className="text-sm text-gray-500">or click to browse</p>
          </div>
        </div>
      </div>
    </>
  );
}

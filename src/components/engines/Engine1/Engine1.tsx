import { Sidebar } from '../../layout/Sidebar';

export function Engine1() {
  return (
    <>
      <Sidebar>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Voice Settings</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Voice Selection
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
              <option>Nova</option>
              <option>Alloy</option>
              <option>Echo</option>
              <option>Fable</option>
              <option>Onyx</option>
              <option>Shimmer</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Speed
            </label>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              defaultValue="1"
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Export Format
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
              <option>MP3</option>
              <option>WAV</option>
              <option>PPTX with Audio</option>
            </select>
          </div>
        </div>
      </Sidebar>

      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Voice-Over Generator</h1>
        <p className="text-gray-600 mb-8">
          Transform PowerPoint presentations and MP4 files into voice-enabled content
        </p>

        <div className="bg-white rounded-lg shadow p-8">
          <h2 className="text-xl font-semibold mb-4">Upload Content</h2>
          <p className="text-gray-600 mb-4">
            Supported formats: PowerPoint (.pptx) and Video (.mp4)
          </p>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
            <div className="text-6xl mb-4">📁</div>
            <p className="text-lg text-gray-700 mb-2">Drag and drop your files here</p>
            <p className="text-sm text-gray-500">or click to browse</p>
          </div>
        </div>
      </div>
    </>
  );
}

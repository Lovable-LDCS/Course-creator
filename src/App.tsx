import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AIProvider } from './contexts/AIContext';
import { MainLayout } from './components/layout/MainLayout';
import { HomePage } from './components/HomePage';
import { Engine1 } from './components/engines/Engine1/Engine1';
import { Engine2 } from './components/engines/Engine2/Engine2';
import { QADashboard } from './components/qa/QADashboard';

const basename = import.meta.env.PROD ? '/Course-creator' : '';

function App() {
  return (
    <AIProvider>
      <Router basename={basename}>
        <MainLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/engine1" element={<Engine1 />} />
            <Route path="/engine2" element={<Engine2 />} />
            <Route path="/engine3" element={<Navigate to="/" replace />} />
            <Route path="/engine4" element={<Navigate to="/" replace />} />
            <Route path="/system-health" element={<QADashboard />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </MainLayout>
      </Router>
    </AIProvider>
  );
}

export default App;

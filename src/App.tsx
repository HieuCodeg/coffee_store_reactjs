import { BrowserRouter } from 'react-router-dom';
import './App.css';
import ErrorBoundary from './providers/ErrorBoundary';
import { AppRoutes } from './routes';

function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <AppRoutes />
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;

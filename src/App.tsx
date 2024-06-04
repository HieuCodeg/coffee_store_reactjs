import { BrowserRouter } from 'react-router-dom';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import ErrorBoundary from './providers/ErrorBoundary';
import { AppRoutes } from './routes';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ToastContainer position="top-right" autoClose={2000} />
        <AppRoutes />
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;

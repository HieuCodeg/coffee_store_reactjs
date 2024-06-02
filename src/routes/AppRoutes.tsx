import { Route, Routes } from 'react-router-dom';
import { Login } from '../pages/Login';
import Home from './Home';
import { Cashier } from '../pages/Cashier';
import ProtectedComponent from '../components/ProtectedComponent';
import { MainLayout } from '../components/Layout/MainLayout';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/cashier"
        element={
          <ProtectedComponent>
            <MainLayout>
              <Cashier />
            </MainLayout>
          </ProtectedComponent>
        }
      />
    </Routes>
  );
}

import { Route, Routes } from 'react-router-dom';
import { MainLayout } from '../components/Layout/MainLayout';
import ProtectedComponent from '../components/ProtectedComponent';
import { Cashier } from '../pages/Cashier';
import { Login } from '../pages/Login';
import Home from './Home';

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

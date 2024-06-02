import { Navigate } from 'react-router-dom';
import { getUserInfo } from '../../services/loginService';

interface IProps {
  children: JSX.Element;
}

function ProtectedComponent({ children }: IProps) {
  const userInfo = getUserInfo();

  if (!userInfo) {
    return <Navigate to={{ pathname: '/login' }} />;
  }

  return children;
}

export default ProtectedComponent;

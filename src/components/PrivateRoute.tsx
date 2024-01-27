import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IUserContext, UserContext } from '../contexts/userContext';

interface PrivateRouteProps {
  element: React.ReactElement;
}

const PrivateRoute = ({ element }: PrivateRouteProps) => {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(UserContext) as IUserContext;

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn]);

  return isLoggedIn ? element : null;
};

export default PrivateRoute;

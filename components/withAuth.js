import Loading from '@components/Loading';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';

const withAuth = (Component) => (props) => {
  const { isAuthenticated, loading } = useAuth();
  const Router = useRouter();

  if (loading || (!isAuthenticated && Router.pathname !== '/')) {
    return <Loading />;
  }
  return <Component {...props} />;
};

export default withAuth;

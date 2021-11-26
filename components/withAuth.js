import { Center, CircularProgress } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';

const withAuth = (Component) => (props) => {
  const { isAuthenticated, loading } = useAuth();
  const Router = useRouter();

  if (loading || (!isAuthenticated && Router.pathname !== '/')) {
    return (
      <Center h="80vh">
        <CircularProgress
          isIndeterminate
          value={30}
          size="120px"
          color="highlight"
        />
      </Center>
    );
  }
  return <Component {...props} />;
};

export default withAuth;

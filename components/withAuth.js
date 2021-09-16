import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { Center, CircularProgress } from '@chakra-ui/react';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';

const withAuth = (Component) => (props) => {
  const Router = useRouter();
  const [verified, setVerified] = useState(false);
  const { loading, setLoading } = useAuth();

  useEffect(() => {
    setLoading(true);

    const token = Cookies.get('itka');

    if (!token) {
      setLoading(false);
      Router.push('/login');
      return null;
    }

    const check = async () => {
      await api
        .get('check')
        .then(() => {
          setLoading(false);
          setVerified(true);
        })
        .catch((err) => {
          console.log('error', err);
          setLoading(false);
          Router.push('/login');
        });
    };

    return check();
  }, []);

  return (
    <>
      {verified ? (
        <Component {...props} />
      ) : (
        <Center h="80vh">
          <CircularProgress
            isIndeterminate
            value={30}
            size="120px"
            color="highlight"
          />
        </Center>
      )}
    </>
  );
};

export default withAuth;

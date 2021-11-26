import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Center, CircularProgress } from '@chakra-ui/react';
import { parseCookies } from 'nookies';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';

const withAuth = (Component) => (props) => {
  const Router = useRouter();
  const [verified, setVerified] = useState(false);
  const { setLoading, setLeader } = useAuth();

  useEffect(() => {
    setLoading(true);

    const { itkan: token } = parseCookies();

    if (!token) {
      setLoading(false);
      Router.push('/');
      return null;
    }

    const check = async () => {
      await api
        .get('check')
        .then((res) => {
          setLeader(res.data.leader);
          setLoading(false);
          setVerified(true);
        })
        .catch((err) => {
          console.log('error', err);
          setLoading(false);
          Router.push('/');
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

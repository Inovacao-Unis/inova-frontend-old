import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Container, Flex, Button, Heading, useToast } from '@chakra-ui/react';
import Layout from '@components/Layout';
import withAuth from '@components/withAuth';
import { useAuth } from '@contexts/AuthContext';
import PainelAdmin from '@components/PainelAdmin';
import api from '@services/api';
import { getAPI } from '@services/axios';

const Painel = ({ trailData, teamsData, rankingData }) => {
  const Router = useRouter();
  const { trailId } = Router.query;
  const toast = useToast();
  const { leader } = useAuth();
  const [trail, setTrail] = useState(null);
  const [teams, setTeams] = useState(null);
  const [ranking, setRanking] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const getData = async () => {
      if (!trail) {
        return setTrail(trailData);
      }
      const res = await api.get(`trail/${trailId}`);
      return setTrail(res.data);
    };

    if (isMounted) {
      getData();
    }
    return () => {
      isMounted = false;
    };
  }, [trail, setTrail]);

  useEffect(() => {
    let isMounted = true;

    const getData = async () => {
      if (!teams) {
        return setTeams(teamsData);
      }
      const res = await api.get(`painel-teams/${trailId}`);
      return setTeams(res.data);
    };

    if (isMounted) {
      getData();
    }
    return () => {
      isMounted = false;
    };
  }, [teams, setTeams]);

  useEffect(() => {
    let isMounted = true;

    const getData = async () => {
      if (!ranking) {
        return setRanking(rankingData);
      }
      const res = await api.get(`game-ranking/${trailId}`);
      return setRanking(res.data);
    };

    if (isMounted) {
      getData();
    }
    return () => {
      isMounted = false;
    };
  }, [ranking, setRanking]);

  const copyCodeToClipboard = (url) => {
    const origin =
      typeof window !== 'undefined' && window.location.origin
        ? window.location.origin
        : '';
    navigator.clipboard.writeText(origin + url);

    toast({
      title: 'Link copiado',
      position: 'bottom-left',
      status: 'success',
      duration: 9000,
      isClosable: true,
    });
  };

  if (!leader) {
    Router.push('/minha-conta');
    return <div />;
  }

  return (
    <>
      {trail && teams && ranking ? (
        <Layout painel>
          <Container maxW="container.xl" zIndex="800" pb="100px" minH="89vh">
            <Flex direction="column" m="70px 0">
              <Heading
                fontSize="2.5rem"
                fontWeight="700"
                textAlign="center"
                mb="15px"
              >
                painel da trilha
              </Heading>
              <Button
                maxW="400px"
                mx="auto"
                mb="20px"
                bg="white"
                _hover={{ bg: 'white' }}
                color="highlight"
                onClick={() => copyCodeToClipboard(`/t/${trail?.code}`)}
              >
                Copiar link da trilha
              </Button>
            </Flex>
            <PainelAdmin trail={trail} teams={teams} ranking={ranking} />
          </Container>
        </Layout>
      ) : null}
    </>
  );
};

export default withAuth(Painel);

export async function getServerSideProps(ctx) {
  try {
    const apiServer = getAPI(ctx);
    const { trailId } = ctx.query;

    const trail = await apiServer.get(`trail/${trailId}`);
    const teams = await apiServer.get(`painel-teams/${trailId}`);
    const ranking = await apiServer.get(`game-ranking/${trailId}`);

    return {
      props: {
        trailData: trail.data,
        teamsData: teams.data,
        rankingData: ranking.data,
      },
    };
  } catch (err) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
}

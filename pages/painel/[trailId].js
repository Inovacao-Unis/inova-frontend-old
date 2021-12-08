import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Container,
  Flex,
  Button,
  Heading,
  useToast,
  Text,
} from '@chakra-ui/react';
import Layout from '@components/Layout';
import withAuth from '@components/withAuth';
import { useAuth } from '@contexts/AuthContext';
import PainelAdmin from '@components/PainelAdmin';
import api from '@services/api';
import { getAPI } from '@services/axios';

const Painel = ({ trailData, teamsData, usersData, rankingData }) => {
  const Router = useRouter();
  const { trailId } = Router.query;
  const toast = useToast();
  const { leader } = useAuth();
  const [trail, setTrail] = useState(null);
  const [teams, setTeams] = useState(null);
  const [users, setUsers] = useState(null);
  const [ranking, setRanking] = useState(null);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const res = await api.get(`trail/${trailId}`);
      setTrail(res.data);
      return null;
    };

    if (!trail) {
      setTrail(trailData);
      return null;
    }

    getData();
    return null;
  }, [trailId, setTrail, reload]);

  useEffect(() => {
    const getData = async () => {
      const res = await api.get(`painel-teams/${trailId}`);
      setUsers(res.data.participants);
      return setTeams(res.data.teams);
    };

    if (!teams || !users) {
      setTeams(teamsData);
      setUsers(usersData);
      return null;
    }

    getData();
    return null;
  }, [setTeams, setUsers, reload]);

  // useEffect(() => {
  //   const getData = async () => {
  //     const res = await api.get(`painel-users/${trailId}`);
  //     return setUsers(res.data);
  //   };

  //   if (!users) {
  //     setUsers(usersData);
  //     return null;
  //   }

  //   getData();
  //   return null;
  // }, [setUsers, reload]);

  useEffect(() => {
    const getData = async () => {
      const res = await api.get(`game-ranking/${trailId}`);
      setRanking(res.data);
      return null;
    };

    if (!ranking) {
      setRanking(rankingData);
      return null;
    }

    getData();
    return null;
  }, [setRanking, reload]);

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
            <Flex direction="column" justify="center" m="70px 0 30px">
              <Heading
                fontSize="2.5rem"
                fontWeight="700"
                textAlign="center"
                mb="10px"
              >
                {trail.title}
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
            <Flex
              justify="center"
              mb="50px"
              border="1px"
              borderColor="white"
              borderRadius="4px"
              maxW="400px"
              mx="auto"
              p="10px"
              direction="column"
            >
              <Flex
                borderBottom="1px"
                borderBottomColor="gray.500"
                justify="space-evenly"
                align="center"
                pb="5px"
              >
                <Flex direction="column" align="center" px="20px">
                  <Text fontSize="1.8rem" fontWeight="bold">
                    {teams?.length || '0'}
                  </Text>
                  <Text fontSize="1.1rem">Times</Text>
                </Flex>
                <Flex
                  direction="column"
                  align="center"
                  borderLeft="1px"
                  borderRight="1px"
                  borderColor="gray.500"
                  px="20px"
                >
                  <Text fontSize="1.8rem" fontWeight="bold">
                    {users?.length || '0'}
                  </Text>
                  <Text fontSize="1.1rem">Participantes</Text>
                </Flex>
                <Flex direction="column" align="center" px="20px">
                  <Text fontSize="1.8rem" fontWeight="bold">
                    {trail.note || '0'}
                  </Text>
                  <Text fontSize="1.1rem">Nota</Text>
                </Flex>
              </Flex>
              <Flex justify="center" align="center" pt="10px">
                <Flex direction="column" align="center" px="20px">
                  <Text fontSize="1.1rem" fontWeight="bold">
                    {trail.schedule || '-'}
                  </Text>
                  <Text fontSize="1rem">Cronograma</Text>
                </Flex>
              </Flex>
            </Flex>
            <PainelAdmin
              trail={trail}
              teams={teams}
              users={users}
              ranking={ranking}
              reload={reload}
              setReload={setReload}
            />
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
    const painel = await apiServer.get(`painel-teams/${trailId}`);
    const ranking = await apiServer.get(`game-ranking/${trailId}`);

    const { teams } = painel.data;
    const users = painel.data.participants;

    return {
      props: {
        trailData: trail.data,
        teamsData: teams,
        usersData: users,
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

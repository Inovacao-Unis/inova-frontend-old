import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, Container, Text, Circle, Flex, Image } from '@chakra-ui/react';
import Layout from '@components/Layout';
import withAuth from '@components/withAuth';
import Ranking from '@components/Ranking';
import JourneyInfo from '@components/JourneyInfo';
import { useAuth } from '@contexts/AuthContext';
import api from '@services/api';

const Painel = () => {
  const Router = useRouter();
  const { trailId } = Router.query;
  const { leader } = useAuth();
  const [trail, setTrail] = useState(null);
  const [responses, setResponses] = useState({});

  useEffect(() => {
    const getData = async () => {
      await api.get(`trail/${trailId}`).then((res) => setTrail(res.data));
    };

    getData();
  }, [trailId]);

  return (
    <Layout profile>
      <Container maxW="container.xl" zIndex="800" pb="100px">
        <Flex py={4}>
          <Flex w="100%" flexDirection="column" align="center" flex="1">
            <p>titulo</p>
          </Flex>
          <Box w="400px">
            {trail && <JourneyInfo status={30} trail={trail} painel />}
            <Ranking />
          </Box>
        </Flex>
      </Container>
    </Layout>
  );
};

export default withAuth(Painel);

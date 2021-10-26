import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, Container, Text, Flex, Image } from '@chakra-ui/react';
import Layout from '@components/Layout';
import withAuth from '@components/withAuth';
import Ranking from '@components/Ranking';
import TrailInfo from '@components/TrailInfo';
import api from '@services/api';

const Journey = () => {
  const Router = useRouter();
  const { trailId } = Router.query;
  const [trail, setTrail] = useState(null);
  const [responses, setResponses] = useState({});

  useEffect(() => {
    const getData = async () => {
      await api.get(`trail/${trailId}`).then((res) => setTrail(res.data));
    };

    getData();
  }, [trailId]);

  useEffect(() => {
    const getData = async () => {
      await api
        .get(`game-responses/${trailId}`)
        .then((res) => setResponses(res.data));
    };

    getData();
  }, [trailId]);

  return (
    <Layout profile>
      <Container maxW="container.xl" zIndex="800" pb="100px">
        <Flex py={4}>
          <Flex w="100%" flexDirection="column" align="center" flex="1">
            <Flex
              onClick={() => Router.push(`/trilha/${trailId}/1`)}
              cursor="pointer"
              mr="auto"
              ml="180px"
              direction="column"
              align="center"
            >
              <Image src="/images/planets/1.png" boxSize="180px" />
              <Text>Etapa 1</Text>
            </Flex>
            <Flex
              onClick={() =>
                responses[1] ? Router.push(`/trilha/${trailId}/2`) : null
              }
              cursor={responses[1] ? 'pointer' : 'inherit'}
              mr="180px"
              ml="auto"
              direction="column"
              align="center"
            >
              <Image
                src="/images/planets/2.png"
                boxSize="250px"
                style={
                  responses[1]
                    ? { filter: 'none' }
                    : { filter: 'grayscale(100%)' }
                }
              />
              <Text color={responses[1] ? 'white' : 'gray'}>Etapa 2</Text>
            </Flex>
            <Flex
              onClick={() =>
                responses[2] ? Router.push(`/trilha/${trailId}/3`) : null
              }
              cursor={responses[2] ? 'pointer' : 'inherit'}
              mr="auto"
              ml="180px"
              direction="column"
              align="center"
            >
              <Image
                src="/images/planets/3.png"
                boxSize="200px"
                style={
                  responses[2]
                    ? { filter: 'none' }
                    : { filter: 'grayscale(100%)' }
                }
              />
              <Text color={responses[2] ? 'white' : 'gray'}>Etapa 3</Text>
            </Flex>
            <Flex
              onClick={() =>
                responses[3] ? Router.push(`/trilha/${trailId}/4`) : null
              }
              cursor={responses[3] ? 'pointer' : 'inherit'}
              mr="220px"
              ml="auto"
              direction="column"
              align="center"
            >
              <Image
                src="/images/planets/4.png"
                boxSize="220px"
                style={
                  responses[3]
                    ? { filter: 'none' }
                    : { filter: 'grayscale(100%)' }
                }
              />
              <Text color={responses[3] ? 'white' : 'gray'}>Etapa 4</Text>
            </Flex>
          </Flex>
          <Box w="400px">
            {trail && <TrailInfo status={30} trail={trail} />}
            <Ranking />
          </Box>
        </Flex>
      </Container>
    </Layout>
  );
};

export default withAuth(Journey);

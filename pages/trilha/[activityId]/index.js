import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, Container, Text, Circle, Flex, Image } from '@chakra-ui/react';
import Layout from '@components/Layout';
import withAuth from '@components/withAuth';
import Ranking from '@components/Ranking';
import JourneyInfo from '@components/JourneyInfo';
import { useAuth } from '@contexts/AuthContext';
import api from '@services/api';

const Journey = () => {
  const Router = useRouter();
  const { activityId } = Router.query;
  const { leader } = useAuth();
  const [activity, setActivity] = useState(null);
  const [responses, setResponses] = useState({});

  useEffect(() => {
    const getData = async () => {
      await api
        .get(`activity/${activityId}`)
        .then((res) => setActivity(res.data));
    };

    getData();
  }, [activityId]);

  useEffect(() => {
    const getData = async () => {
      await api
        .get(`game-responses/${activityId}`)
        .then((res) => setResponses(res.data));
    };

    getData();
  }, [activityId]);

  return (
    <Layout profile>
      <Container maxW="container.xl" zIndex="800" pb="100px">
        <Flex py={4}>
          <Flex w="100%" flexDirection="column" align="center" flex="1">
            <Flex
              onClick={() => Router.push(`/trilha/${activityId}/1`)}
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
              onClick={
                responses[1]
                  ? () => Router.push(`/trilha/${activityId}/2`)
                  : '#'
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
              onClick={
                responses[2]
                  ? () => Router.push(`/trilha/${activityId}/3`)
                  : '#'
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
                  responses[1]
                    ? { filter: 'none' }
                    : { filter: 'grayscale(100%)' }
                }
              />
              <Text color={responses[2] ? 'white' : 'gray'}>Etapa 3</Text>
            </Flex>
            <Flex
              onClick={
                responses[3]
                  ? () => Router.push(`/trilha/${activityId}/4`)
                  : '#'
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
                  responses[4]
                    ? { filter: 'none' }
                    : { filter: 'grayscale(100%)' }
                }
              />
              <Text color={responses[3] ? 'white' : 'gray'}>Etapa 4</Text>
            </Flex>
          </Flex>
          <Box w="400px">
            {activity && <JourneyInfo status={30} activity={activity} />}
            <Ranking />
          </Box>
        </Flex>
      </Container>
    </Layout>
  );
};

export default withAuth(Journey);

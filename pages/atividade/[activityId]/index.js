import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, Container, Text, Circle, Flex } from '@chakra-ui/react';
import Layout from '@components/Layout';
import withAuth from '@components/withAuth';
import Ranking from '@components/Ranking';
import JourneyInfo from '@components/JourneyInfo';
import api from '@services/api';

const Journey = () => {
  const Router = useRouter();
  const { activityId } = Router.query;
  const [responses, setResponses] = useState({});

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
      <Container maxW="container.xl" zIndex="800">
        <Flex py={4}>
          <Flex w="100%" flexDirection="column" align="center" flex="1">
            <Flex
              onClick={() => Router.push(`/atividade/${activityId}/1`)}
              cursor="pointer"
              mr="auto"
              ml="180px"
            >
              <Circle size="180px" bg="highlight" color="white">
                <Text>Etapa 1</Text>
              </Circle>
            </Flex>
            <Flex cursor="pointer" mr="180px" ml="auto">
              <Circle
                size="210px"
                bg={responses[1] ? 'highlight' : 'gray'}
                color="white"
              >
                <Text>Etapa 2</Text>
              </Circle>
            </Flex>
            <Flex cursor="pointer" mr="auto" ml="180px">
              <Circle
                size="190px"
                bg={responses[2] ? 'highlight' : 'gray'}
                color="white"
              >
                <Text>Etapa 3</Text>
              </Circle>
            </Flex>
            <Flex cursor="pointer" mr="180px" ml="auto">
              <Circle
                size="200px"
                bg={responses[3] ? 'highlight' : 'gray'}
                color="white"
              >
                <Text>Etapa 4</Text>
              </Circle>
            </Flex>
          </Flex>
          <Box w="400px">
            <JourneyInfo status={30} activityId={activityId} />
            <Ranking />
          </Box>
        </Flex>
      </Container>
    </Layout>
  );
};

export default withAuth(Journey);

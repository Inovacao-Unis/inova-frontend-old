import { useRouter } from 'next/router';
import { Box, Container, Text, Circle, Flex } from '@chakra-ui/react';
import Layout from '@components/Layout';
import withAuth from '@components/withAuth';
import Ranking from '@components/Ranking';
import JourneyInfo from '@components/JourneyInfo';

const Journey = () => {
  const Router = useRouter();
  const { jornadaSlug } = Router.query;

  return (
    <Layout profile>
      <Container maxW="container.xl" zIndex="800">
        <Flex py={4}>
          <Flex w="100%" flexDirection="column" align="center" flex="1">
            <Flex
              onClick={() => Router.push(`/jornada/${jornadaSlug}/problema`)}
              cursor="pointer"
              mr="auto"
              ml="180px"
            >
              <Circle
                size="180px"
                bg={true ? 'highlight' : 'gray'}
                color="white"
              >
                <Text>Desafio 1</Text>
              </Circle>
            </Flex>
            <Flex cursor="pointer" mr="180px" ml="auto">
              <Circle size="210px" bg={false ? 'tomato' : 'gray'} color="white">
                <Text>Desafio 2</Text>
              </Circle>
            </Flex>
            <Flex cursor="pointer" mr="auto" ml="180px">
              <Circle size="190px" bg={false ? 'tomato' : 'gray'} color="white">
                <Text>Desafio 3</Text>
              </Circle>
            </Flex>
            <Flex cursor="pointer" mr="180px" ml="auto">
              <Circle size="200px" bg={false ? 'tomato' : 'gray'} color="white">
                <Text>Desafio 4</Text>
              </Circle>
            </Flex>
            <Flex cursor="pointer" mx="auto" mt="80px">
              <Circle size="250px" bg={false ? 'tomato' : 'gray'} color="white">
                <Text>Desafio Final</Text>
              </Circle>
            </Flex>
          </Flex>
          <Box w="400px">
            <JourneyInfo status={30} jornadaSlug={jornadaSlug} />
            <Ranking />
          </Box>
        </Flex>
      </Container>
    </Layout>
  );
};

export default withAuth(Journey);

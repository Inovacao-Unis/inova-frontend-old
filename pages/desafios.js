/* eslint-disable no-underscore-dangle */
import Layout from '@components/Layout';
import withAuth from '@components/withAuth';
import { Container, Heading, Flex, Text } from '@chakra-ui/react';

const Desafios = () => (
  <Layout activityBtn>
    <Container maxW="container.xl" zIndex="800" pb="100px" minH="87vh">
      <Heading
        fontSize="2.5rem"
        fontWeight="700"
        textAlign="center"
        m="100px auto"
      >
        desafios
      </Heading>
      <Flex direction="column" bg="white" borderRadius="4px" m="100px" p="80px">
        <Flex direction="column" mb="50px">
          <Text
            color="highlight"
            textTransform="uppercase"
            fontSize="1.6rem"
            textAlign="center"
            fontWeight="bold"
            mb="20px"
          >
            Saúde
          </Text>
          <Flex direction="column" mb="30px">
            <Text color="black" fontWeight="bold" fontSize="1.1rem" mb="5px">
              Título do desafio
            </Text>
            <Text color="black">
              Donec fermentum nulla eu ipsum fermentum tempor. Suspendisse
              faucibus sit amet ligula vitae laoreet. Nam eleifend ultricies
              enim at aliquet. Curabitur posuere sapien non enim sodales, sit
              amet rutrum nisi ornare. Nulla purus ligula, pellentesque at nisl
              et, congue pulvinar ante. Etiam tristique tristique tellus, eget
              pulvinar tortor tincidunt quis. Nullam commodo justo sodales leo
              blandit rutrum.
            </Text>
          </Flex>
          <Flex direction="column" mb="30px">
            <Text color="black" fontWeight="bold" fontSize="1.1rem" mb="5px">
              Título do desafio 2
            </Text>
            <Text color="black">
              Donec fermentum nulla eu ipsum fermentum tempor. Suspendisse
              faucibus sit amet ligula vitae laoreet. Nam eleifend ultricies
              enim at aliquet. Curabitur posuere sapien non enim sodales, sit
              amet rutrum nisi ornare. Nulla purus ligula, pellentesque at nisl
              et, congue pulvinar ante. Etiam tristique tristique tellus, eget
              pulvinar tortor tincidunt quis. Nullam commodo justo sodales leo
              blandit rutrum.
            </Text>
          </Flex>
        </Flex>
        <Flex direction="column" mb="50px">
          <Text
            color="highlight"
            textTransform="uppercase"
            fontSize="1.6rem"
            textAlign="center"
            fontWeight="bold"
            mb="20px"
          >
            Gestão
          </Text>
          <Flex direction="column" mb="30px">
            <Text color="black" fontWeight="bold" fontSize="1.1rem" mb="5px">
              Título do desafio
            </Text>
            <Text color="black">
              Donec fermentum nulla eu ipsum fermentum tempor. Suspendisse
              faucibus sit amet ligula vitae laoreet. Nam eleifend ultricies
              enim at aliquet. Curabitur posuere sapien non enim sodales, sit
              amet rutrum nisi ornare. Nulla purus ligula, pellentesque at nisl
              et, congue pulvinar ante. Etiam tristique tristique tellus, eget
              pulvinar tortor tincidunt quis. Nullam commodo justo sodales leo
              blandit rutrum.
            </Text>
          </Flex>
          <Flex direction="column" mb="30px">
            <Text color="black" fontWeight="bold" fontSize="1.1rem" mb="5px">
              Título do desafio 2
            </Text>
            <Text color="black">
              Donec fermentum nulla eu ipsum fermentum tempor. Suspendisse
              faucibus sit amet ligula vitae laoreet. Nam eleifend ultricies
              enim at aliquet. Curabitur posuere sapien non enim sodales, sit
              amet rutrum nisi ornare. Nulla purus ligula, pellentesque at nisl
              et, congue pulvinar ante. Etiam tristique tristique tellus, eget
              pulvinar tortor tincidunt quis. Nullam commodo justo sodales leo
              blandit rutrum.
            </Text>
          </Flex>
        </Flex>
        <Flex direction="column" mb="50px">
          <Text
            color="highlight"
            textTransform="uppercase"
            fontSize="1.6rem"
            textAlign="center"
            fontWeight="bold"
            mb="20px"
          >
            Engenharia
          </Text>
          <Flex direction="column" mb="30px">
            <Text color="black" fontWeight="bold" fontSize="1.1rem" mb="5px">
              Título do desafio
            </Text>
            <Text color="black">
              Donec fermentum nulla eu ipsum fermentum tempor. Suspendisse
              faucibus sit amet ligula vitae laoreet. Nam eleifend ultricies
              enim at aliquet. Curabitur posuere sapien non enim sodales, sit
              amet rutrum nisi ornare. Nulla purus ligula, pellentesque at nisl
              et, congue pulvinar ante. Etiam tristique tristique tellus, eget
              pulvinar tortor tincidunt quis. Nullam commodo justo sodales leo
              blandit rutrum.
            </Text>
          </Flex>
          <Flex direction="column" mb="30px">
            <Text color="black" fontWeight="bold" fontSize="1.1rem" mb="5px">
              Título do desafio 2
            </Text>
            <Text color="black">
              Donec fermentum nulla eu ipsum fermentum tempor. Suspendisse
              faucibus sit amet ligula vitae laoreet. Nam eleifend ultricies
              enim at aliquet. Curabitur posuere sapien non enim sodales, sit
              amet rutrum nisi ornare. Nulla purus ligula, pellentesque at nisl
              et, congue pulvinar ante. Etiam tristique tristique tellus, eget
              pulvinar tortor tincidunt quis. Nullam commodo justo sodales leo
              blandit rutrum.
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Container>
  </Layout>
);

export default withAuth(Desafios);

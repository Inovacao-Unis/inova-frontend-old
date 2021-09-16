import Layout from '@components/Layout';
import withAuth from '@components/withAuth';
import Link from 'next/link';
import {
  Container,
  Heading,
  Flex,
  Avatar,
  Box,
  Grid,
  Image,
  Text,
  Button,
  Divider,
} from '@chakra-ui/react';

const Perfil = () => (
  <Layout profile>
    <Container maxW="container.xl">
      <Flex py="3rem" direction="column" align="center" pb="25vh">
        <Box boxSize="200px" mb="3rem">
          <Avatar size="full" name="Nome perfil" src="/images/zebra.jpg" />
        </Box>
        <Flex direction="column" align="center" mb="2rem">
          <Heading fontWeight="700" pb="2rem" maxW="400px">
            Time Nome do Time
          </Heading>
          <Flex w="100%" maxW="440px" justify="center" wrap="wrap">
            <Text
              fontSize="1.2rem"
              lineHeight="1.6rem"
              textAlign="center"
              mb="10px"
              px="15px"
            >
              João Silva
            </Text>
            <Text
              fontSize="1.2rem"
              lineHeight="1.6rem"
              textAlign="center"
              mb="10px"
              px="15px"
            >
              Maria Silva
            </Text>
            <Text
              fontSize="1.2rem"
              lineHeight="1.6rem"
              textAlign="center"
              mb="10px"
              px="15px"
            >
              Pedro Silva
            </Text>
            <Text
              fontSize="1.2rem"
              lineHeight="1.6rem"
              textAlign="center"
              mb="10px"
              px="15px"
            >
              José Souza
            </Text>
            <Text
              fontSize="1.2rem"
              lineHeight="1.6rem"
              textAlign="center"
              mb="10px"
              px="15px"
            >
              Tiago Souza
            </Text>
          </Flex>
        </Flex>
        <Button bgColor="highlight">Editar perfil</Button>
      </Flex>
    </Container>
  </Layout>
);

// export default withAuth(Perfil);
export default Perfil;

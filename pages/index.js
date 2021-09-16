import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { useAuth } from '@contexts/AuthContext';
import Layout from '@components/Layout';
import { Container, Text, Button, Flex, Image } from '@chakra-ui/react';
import api from '../services/api';

const Home = () => {
  const Router = useRouter();
  const { setLoading } = useAuth();

  useEffect(() => {
    setLoading(true);

    const token = Cookies.get('itka');

    if (!token) {
      setLoading(false);
      return null;
    }

    const check = async () => {
      await api
        .get('check')
        .then(() => {
          setLoading(false);
          window.location.href = '/minha-conta';
        })
        .catch((err) => console.log('error: ', err));
    };

    return check();
  }, []);

  return (
    <Layout>
      <Flex w="100vw" minH="100vh" direction="column" align="center">
        <Image
          src="/images/astronaut.png"
          alt="Imagem de astronauta"
          position="absolute"
          top="0"
          bottom="0"
          right="0"
          maxW="620px"
        />
        <Container maxW="container.xl">
          <Flex direction="column" align="center" pt="15vh">
            <Text fontSize="3rem">seja</Text>
            <Text
              fontSize="4rem"
              lineHeight="4rem"
              fontWeight="bold"
              mb="3rem"
              textTransform="uppercase"
              fontFamily="fontastique"
            >
              bem-vindo
            </Text>
            <Button
              size="lg"
              bgColor="highlight"
              _hover={{ bg: 'highlight' }}
              color="white"
              onClick={() => Router.push('/login')}
            >
              entrar
            </Button>
          </Flex>
        </Container>
      </Flex>
    </Layout>
  );
};

export default Home;

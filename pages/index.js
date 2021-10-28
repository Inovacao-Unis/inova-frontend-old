import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Layout from '@components/Layout';
import {
  Container,
  Text,
  Button,
  Flex,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import firebase from '@lib/firebase';
import api from '../services/api';

const Home = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [login, setLogin] = useState(true);

  useEffect(() => {
    const token = Cookies.get('itka');

    if (!token) {
      return null;
    }

    const check = async () => {
      await api
        .get('check')
        .then(() => {
          window.location.href = '/minha-conta';
        })
        .catch((err) => console.log('error: ', err));
    };

    return check();
  }, []);

  const signinGoogle = async () => {
    try {
      await firebase
        .auth()
        .signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then(() => {
          window.location.href = '/minha-conta';
        });
    } finally {
      console.log('ok');
    }
  };

  return (
    <Layout>
      <Flex w="100vw" minH="87vh" direction="column" align="center">
        <Image
          src="/images/astronaut.png"
          alt="Imagem de astronauta"
          position="absolute"
          top="0"
          bottom="0"
          right="0"
          maxW={{ base: '0', lg: '0', xl: '567px', '2xl': '705px' }}
        />
        <Container maxW="container.xl">
          <Flex direction="column" align="center" pt="15vh">
            <Text fontSize="3rem">seja</Text>
            <Text
              fontSize={['3rem', '4rem']}
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
              onClick={() => {
                setLogin(true);
                onOpen();
              }}
              mb="10px"
            >
              Entrar
            </Button>
            <Button
              size="lg"
              bg="white"
              color="highlight"
              _hover={{ bg: 'white' }}
              onClick={() => {
                setLogin(false);
                onOpen();
              }}
            >
              Criar uma conta
            </Button>
          </Flex>
          <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader color="highlight">
                {login ? 'Entrar' : 'Criar uma nova conta'}
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Flex justify="center">
                  <Button
                    bg="#1a73e8"
                    _hover={{ bg: '1a73e8' }}
                    color="white"
                    fontWeight="400"
                    pl="0"
                    onClick={signinGoogle}
                  >
                    <Image
                      src="/images/google.jpg"
                      width="36px"
                      borderTopLeftRadius="4px"
                      borderBottomLeftRadius="4px"
                      alt="Logo Google"
                      mr="var(--chakra-space-4)"
                      ml="3px;"
                    />
                    {login ? 'Login com Google' : 'Criar conta com Google'}
                  </Button>
                </Flex>
              </ModalBody>

              <ModalFooter>
                <Button variant="ghost" onClick={onClose}>
                  Fechar
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Container>
      </Flex>
    </Layout>
  );
};

export default Home;

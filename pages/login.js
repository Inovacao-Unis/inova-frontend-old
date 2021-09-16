import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { useAuth } from '@contexts/AuthContext';
import Layout from '@components/Layout';
import {
  Box,
  Text,
  Input,
  FormControl,
  FormLabel,
  Button,
  Heading,
  CircularProgress,
  useToast,
  Link,
} from '@chakra-ui/react';
import firebase from '@lib/firebase';
import firebaseErrors from '@utils/firebaseErrors';
import api from '../services/api';

export default function Login() {
  const toast = useToast();
  const Router = useRouter();
  const { loading, setLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);

    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        setIsLoading(false);
        window.location.href = '/minha-conta';
      })
      .catch((error) => {
        setIsLoading(false);
        const message = firebaseErrors[error.code];
        toast({
          title: 'Ocorreu um erro.',
          description: message,
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      });
  };

  return (
    <Layout noHeader>
      <Box w={400} mx="auto" minH="100vh" pt="20vh" zIndex="888">
        <Heading textAlign="center" as="h2">
          Login
        </Heading>
        <form onSubmit={(e) => handleSubmit(e)} width="100%">
          <FormControl isRequired id="email">
            <FormLabel>E-mail</FormLabel>
            <Input
              type="email"
              mb={4}
              _focus={{
                boxShadow: '0 0 0 3px rgba(0, 0, 0, 0.3)',
                outline: '2px solid transparent',
              }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl isRequired id="password">
            <FormLabel>Senha</FormLabel>
            <Input
              type="password"
              mb={4}
              _focus={{
                boxShadow: '0 0 0 3px rgba(0, 0, 0, 0.3)',
                outline: '2px solid transparent',
              }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <Button
            bgColor="highlight"
            _hover={{ bg: 'highlight' }}
            type="submit"
            width="full"
          >
            {isLoading ? (
              <CircularProgress isIndeterminate size="24px" color="highlight" />
            ) : (
              'Enviar'
            )}
          </Button>
        </form>
        <Box mt="3rem" textAlign="center">
          <Text>Problemas para entrar? Envie um e-mail para:</Text>
          <Link
            fontWeight="bold"
            fontSize="1.4rem"
            href="mailto:inovacao@unis.edu.br"
          >
            inovacao@unis.edu.br
          </Link>
        </Box>
      </Box>
    </Layout>
  );
}

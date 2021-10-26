import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { useAuth } from '@contexts/AuthContext';
import Layout from '@components/Layout';
import {
  Box,
  Flex,
  Text,
  Input,
  FormControl,
  FormLabel,
  Button,
  Heading,
  CircularProgress,
  useToast,
  Link,
  Image,
  Divider,
  Checkbox,
  InputGroup,
  FormHelperText,
} from '@chakra-ui/react';
import firebase from '@lib/firebase';
import firebaseErrors from '@utils/firebaseErrors';
import api from '../services/api';

export default function Registro() {
  const toast = useToast();
  const Router = useRouter();
  const { loading, setLoading } = useAuth();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

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

  const signinGoogle = async () => {
    try {
      setLoading(true);
      await firebase
        .auth()
        .signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then(() => {
          window.location.href = '/minha-conta';
        });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);

    if (firstName === '') {
      setIsLoading(false);
      return toast({
        title: `Informe o nome!`,
        status: 'warning',
        isClosable: true,
      });
    }

    if (lastName === '') {
      setIsLoading(false);
      return toast({
        title: `Informe o sobrenome!`,
        status: 'warning',
        isClosable: true,
      });
    }

    if (email === '') {
      setIsLoading(false);
      return toast({
        title: `Informe o email!`,
        status: 'warning',
        isClosable: true,
      });
    }

    if (password === '') {
      setIsLoading(false);
      return toast({
        title: `Informe a senha!`,
        status: 'warning',
        isClosable: true,
      });
    }

    if (password !== passwordConfirm) {
      setIsLoading(false);
      return toast({
        title: `A confirmação e a senha precisam ser iguais!`,
        status: 'warning',
        isClosable: true,
      });
    }

    const displayName = `${firstName} ${lastName}`;

    // await firebase
    //   .auth()
    //   .signInWithEmailAndPassword(email, password)
    //   .then(() => {
    //     setIsLoading(false);
    //     window.location.href = '/minha-conta';
    //   })
    //   .catch((error) => {
    //     setIsLoading(false);
    //     const message = firebaseErrors[error.code];
    //     toast({
    //       title: 'Ocorreu um erro.',
    //       description: message,
    //       status: 'error',
    //       duration: 9000,
    //       isClosable: true,
    //     });
    //   });

    await api
      .post('users', {
        displayName,
        email,
        password,
      })
      .then((res) => {
        console.log('res ', res.data);
        // res.data.sendEmailVerification().then(() => {
        //   setIsLoading(false);
        //   return toast({
        //     title: `Um email de verificação foi enviado para você.`,
        //     status: 'warning',
        //     isClosable: true,
        //   });
        // });
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response.data.error);
          toast({
            title: err.response.data.error,
            status: 'error',
            isClosable: true,
          });
        } else {
          console.log(err);
          toast({
            title: 'Houve um erro',
            status: 'error',
            isClosable: true,
          });
        }
      });
  };

  return (
    <Layout noHeader>
      <Button
        pt="10px"
        bg="none"
        _hover={{ bg: 'none' }}
        w="100px"
        ml="30px"
        onClick={() => Router.push('/')}
      >
        Voltar
      </Button>
      <Box w={400} mx="auto" mb="5vh" minH="100vh" pt="15vh" zIndex="888">
        <Heading textAlign="center" as="h2">
          Criar uma nova conta
        </Heading>
        <Flex justify="center" pt="8vh">
          <Button
            bg="#1a73e8"
            _hover={{ bg: '1a73e8' }}
            fontWeight="400"
            pl="0"
            onClick={signinGoogle}
          >
            <Image
              src="/images/google.jpg"
              width="40px"
              borderTopLeftRadius="4px"
              borderBottomLeftRadius="4px"
              alt="Logo Google"
              mr="var(--chakra-space-4)"
            />
            Inscreva-se com o Google
          </Button>
        </Flex>
        {/* <Flex align="center" py="5vh">
          <Divider />
          <Text px="10px">Ou</Text>
          <Divider />
        </Flex>
        <form onSubmit={(e) => handleSubmit(e)} width="100%">
          <FormControl isRequired id="nome">
            <FormLabel>Nome</FormLabel>
            <Input
              type="text"
              mb={4}
              _focus={{
                boxShadow: '0 0 0 3px rgba(0, 0, 0, 0.3)',
                outline: '2px solid transparent',
              }}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </FormControl>
          <FormControl isRequired id="sobrenome">
            <FormLabel>Sobrenome</FormLabel>
            <Input
              type="text"
              mb={4}
              _focus={{
                boxShadow: '0 0 0 3px rgba(0, 0, 0, 0.3)',
                outline: '2px solid transparent',
              }}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </FormControl>
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
            <InputGroup size="md">
              <Input
                type={show ? 'text' : 'password'}
                mb={4}
                _focus={{
                  boxShadow: '0 0 0 3px rgba(0, 0, 0, 0.3)',
                  outline: '2px solid transparent',
                }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </InputGroup>
            <FormHelperText mt="0" mb="15px" color="gray.400">
              Use oito ou mais caracteres com uma combinação de letras, números
              e símbolos
            </FormHelperText>
          </FormControl>
          <FormControl isRequired id="password">
            <FormLabel>Confirmar senha</FormLabel>
            <Input
              type={show ? 'text' : 'password'}
              mb={4}
              _focus={{
                boxShadow: '0 0 0 3px rgba(0, 0, 0, 0.3)',
                outline: '2px solid transparent',
              }}
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </FormControl>

          <Checkbox
            checked={show}
            onChange={(e) => setShow(e.target.checked)}
            mb="40px"
          >
            Mostrar senha
          </Checkbox>
          <Text mb="20px" fontSize=".9rem">
            Ao clicar em enviar você concorda com nossa{' '}
            <a href="#" style={{ color: '#ff47dc' }}>
              política de privacidade
            </a>
            .
          </Text>
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
        </form> */}
        <Box mt="3rem" textAlign="center">
          <Text>Problemas para criar conta? Envie um e-mail para:</Text>
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

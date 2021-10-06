/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
/* eslint-disable array-callback-return */
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Container,
  Heading,
  Text,
  RadioGroup,
  Flex,
  Stack,
  Radio,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Box,
  Button,
  Spinner,
  useToast,
} from '@chakra-ui/react';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import Layout from '@components/Layout';
import withAuth from '@components/withAuth';
import api from '@services/api';

const TrilhaPage = () => {
  const Router = useRouter();
  const { trailId } = Router.query;
  const toast = useToast();
  const [trail, setTrail] = useState(null);
  const [leader, setLeader] = useState({});
  const [challenge, setChallenge] = useState(null);
  const [saude, setSaude] = useState(false);
  const [gestao, setGestao] = useState(false);
  const [engenharia, setEngenharia] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState(['fulano']);

  useEffect(() => {
    const getData = async () => {
      await api.get(`game-trail/${trailId}`).then((res) => setTrail(res.data));
    };

    getData();
  }, [trailId]);

  useEffect(() => {
    if (
      trail?.challenges.some((e) => e.categoryId === '614389a34db7167c3368f753')
    ) {
      setSaude(true);
    }

    if (
      trail?.challenges.some((e) => e.categoryId === '61438a07f87adb7c88785a41')
    ) {
      setGestao(true);
    }

    if (
      trail?.challenges.some((e) => e.categoryId === '61438a13f87adb7c88785a44')
    ) {
      setEngenharia(true);
    }
  }, [trail, setSaude, setGestao, setEngenharia]);

  const addMember = async () => {
    setLoading(true);
    if (users.includes(userInput)) {
      setLoading(false);
      return toast({
        title: `Usuário já adicionado!`,
        status: 'warning',
        isClosable: true,
      });
    }
    await api
      .get(`/game-user/${userInput}`)
      .then((res) => {
        setUsers((prev) => [...prev, res.data.email]);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        toast({
          title: `Usuário não encontrado`,
          status: 'error',
          isClosable: true,
        });
        setLoading(false);
      });
  };

  const removeMember = (userRemove) => {
    setUsers(users.filter((item) => item !== userRemove));
  };

  return (
    <Layout profile>
      <Container maxW="container.lg" zIndex="800" pb="40vh">
        <Flex direction="column">
          <Heading
            fontSize="2.5rem"
            fontWeight="700"
            textAlign="center"
            m="70px auto"
          >
            participar da trilha
          </Heading>
        </Flex>
        <Flex bg="white" borderRadius="4px" p="30px" direction="column">
          <Flex display="column" mb="10px">
            <Text fontSize="1.6rem" fontWeight="bold" color="highlight">
              {trail?.title}
            </Text>
            <Text fontSize="1rem" mb="10px" color="black">
              Gerenciado por {trail?.leader}
            </Text>
          </Flex>
          <Divider mb="30px" />
          <Text fontSize="1.3rem" fontWeight="bold" mb="30px" color="black">
            Escolha um desafio:
          </Text>
          <RadioGroup
            mb="30px"
            color="gray.700"
            onChange={setChallenge}
            value={challenge}
          >
            {saude && (
              <Text fontSize="1.1rem" fontWeight="bold" mb="10px">
                Saúde
              </Text>
            )}
            <Stack direction="row">
              {trail?.challenges.map((item) => {
                if (item.categoryId === '614389a34db7167c3368f753') {
                  return (
                    <Radio key={item._id} value={item._id}>
                      {item.title}
                    </Radio>
                  );
                }
              })}
            </Stack>
            {gestao && (
              <Text fontSize="1.1rem" fontWeight="bold" mb="10px">
                Gestão
              </Text>
            )}
            <Stack direction="row">
              {trail?.challenges.map((item) => {
                if (item.categoryId === '61438a07f87adb7c88785a41') {
                  return (
                    <Radio key={item._id} value={item._id}>
                      {item.title}
                    </Radio>
                  );
                }
              })}
            </Stack>
            {engenharia && (
              <Text fontSize="1.1rem" fontWeight="bold" mb="10px">
                Engenharia
              </Text>
            )}
            <Stack direction="row">
              {trail?.challenges.map((item) => {
                if (item.categoryId === '61438a13f87adb7c88785a44') {
                  return (
                    <Radio key={item._id} value={item._id}>
                      {item.title}
                    </Radio>
                  );
                }
              })}
            </Stack>
          </RadioGroup>
          <Divider mb="30px" />
          <Text fontSize="1.3rem" fontWeight="bold" mb="30px" color="black">
            Crie seu time:
          </Text>
          <FormControl maxW="400px" pb="40px">
            <FormLabel color="black" fontWeight="600" fontSize="1rem">
              Nome do time
            </FormLabel>
            <Input color="black" placeholder="Digite o nome" />
          </FormControl>
          <FormControl maxW="400px" pb="40px">
            <FormLabel color="black" mb="0" fontWeight="600" fontSize="1rem">
              Adicione outros participantes:
            </FormLabel>
            <Text color="gray" mb="15px" fontSize="xs">
              Só é possível adicionar quem já se cadastrou na plataforma.
            </Text>
            <Flex>
              <Input
                color="black"
                type="email"
                placeholder="E-mail do participante"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
              />
              <Button bg="highlight" _hover={{ bg: 'highlight' }}>
                {loading ? <Spinner /> : <AddIcon onClick={addMember} />}
              </Button>
            </Flex>
          </FormControl>
          <Flex direction="column" maxW="500px" mb="50px">
            <Text color="black">Membros do time:</Text>
            <Box
              border="1px"
              borderColor="gray.400"
              padding="10px"
              borderRadius="4px"
            >
              <Flex color="gray" wrap="wrap">
                <Flex
                  align="center"
                  bg="gray.100"
                  borderRadius="4px"
                  py="5px"
                  px="10px"
                  mr="10px"
                  mb="10px"
                >
                  <Text>Você</Text>
                </Flex>
                {users.map((user) => (
                  <Flex
                    key={user}
                    align="center"
                    bg="gray.100"
                    borderRadius="4px"
                    py="5px"
                    px="10px"
                    mr="10px"
                    mb="10px"
                  >
                    <Text>{user}</Text>
                    <DeleteIcon
                      cursor="pointer"
                      ml="8px"
                      w={3}
                      h={3}
                      color="red.500"
                      onClick={() => removeMember(user)}
                    />
                  </Flex>
                ))}
              </Flex>
            </Box>
          </Flex>
          <Box>
            <Button bg="highlight" _hover={{ bg: 'highlight' }}>
              Participar
            </Button>
          </Box>
        </Flex>
      </Container>
    </Layout>
  );
};

export default withAuth(TrilhaPage);

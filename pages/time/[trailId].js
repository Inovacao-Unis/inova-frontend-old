import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
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
  RadioGroup,
  Stack,
  Radio,
  FormControl,
  FormLabel,
  Input,
  Spinner,
  useToast,
  Editable,
  EditableInput,
  EditablePreview,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import api from '@services/api';
import { useAuth } from '@contexts/AuthContext';

const Time = () => {
  const Router = useRouter();
  const { trailId } = Router.query;
  const { user } = useAuth();
  const toast = useToast();
  const [team, setTeam] = useState(null);
  const [name, setName] = useState('');
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const data = async () => {
      await api.get(`game-team/${trailId}`).then((res) => {
        setTeam(res.data);
        setName(res.data.name);
        const usersFilter = res.data.users.filter(
          (item) => item.uid !== user.uid,
        );
        setUsers(usersFilter);
      });
    };

    if (trailId && user) {
      data();
    }
  }, [trailId, user]);

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
        setUsers((prev) => [
          ...prev,
          { uid: res.data.uid, email: res.data.email },
        ]);
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

  const handleTeam = async () => {
    if (!challenge) {
      return toast({
        title: `Escolha um desafio`,
        status: 'error',
        isClosable: true,
      });
    }

    if (name === '') {
      return toast({
        title: `Digite um nome para o time`,
        status: 'error',
        isClosable: true,
      });
    }

    const usersArr = [];
    users.forEach((item) => usersArr.push(item.uid));

    const usersFull = [user.uid, ...usersArr];

    await api
      .post('teams', {
        name,
        challengeId: challenge,
        leaderId: trail.leaderId,
        trailId: trail._id,
        users: usersFull,
      })
      .then(() => {
        toast({
          title: `Time cadastrado!`,
          status: 'success',
          isClosable: true,
        });

        Router.push('/minha-conta');
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
    <Layout profile>
      <Container maxW="container.sm">
        <Flex direction="column">
          <Heading
            fontSize="2.5rem"
            fontWeight="700"
            textAlign="center"
            m="70px auto"
          >
            área do time
          </Heading>
        </Flex>
        <Flex p="30px" mx="auto" maxW="900px" bg="white" borderRadius="4px">
          <Tabs colorScheme="pink" isFitted w="100%">
            <TabList>
              <Tab color="black">Respostas enviadas</Tab>
              <Tab color="black">Editar/Excluir</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <Text>Notas e feedback</Text>
              </TabPanel>
              <TabPanel>
                <Flex py="3rem" direction="column" align="center" pb="25vh">
                  <FormControl pb="10px">
                    <FormLabel color="black" fontWeight="600" fontSize="1rem">
                      Nome do Time
                    </FormLabel>
                    <Box mb="5px">
                      <Editable
                        border="1px"
                        borderColor="gray.400"
                        borderRadius="4px"
                        color="gray.600"
                        value={name}
                        px="10px"
                        py="10px"
                      >
                        <EditablePreview maxW="100%" w="100%" />
                        <EditableInput
                          onChange={(e) => setName(e.target.value)}
                        />
                      </Editable>
                    </Box>
                  </FormControl>
                  <FormControl maxW="400px" pb="40px">
                    <FormLabel
                      color="black"
                      mb="0"
                      fontWeight="600"
                      fontSize="1rem"
                    >
                      Adicione outros participantes:
                    </FormLabel>
                    <Text color="gray" mb="15px" fontSize="xs">
                      Só é possível adicionar quem já se cadastrou na
                      plataforma.
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
                        {loading ? (
                          <Spinner />
                        ) : (
                          <AddIcon onClick={addMember} />
                        )}
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
                          <Text>{user?.email}</Text>
                        </Flex>
                        {users.map((item) => (
                          <Flex
                            key={user.uid}
                            align="center"
                            bg="gray.100"
                            borderRadius="4px"
                            py="5px"
                            px="10px"
                            mr="10px"
                            mb="10px"
                          >
                            <Text>{item.email}</Text>
                            <DeleteIcon
                              cursor="pointer"
                              ml="8px"
                              w={3}
                              h={3}
                              color="red.500"
                              onClick={() => removeMember(item)}
                            />
                          </Flex>
                        ))}
                      </Flex>
                    </Box>
                  </Flex>
                  <Box>
                    <Button
                      bg="highlight"
                      _hover={{ bg: 'highlight' }}
                      onClick={handleTeam}
                    >
                      Salvar
                    </Button>
                  </Box>
                </Flex>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Flex>
      </Container>
    </Layout>
  );
};

// export default withAuth(Perfil);
export default withAuth(Time);

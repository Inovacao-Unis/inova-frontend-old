/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Layout from '@components/Layout';
import withAuth from '@components/withAuth';
import {
  Container,
  Heading,
  Flex,
  Box,
  Text,
  Button,
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
  Link,
  TabPanel,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import api from '@services/api';
import { useAuth } from '@contexts/AuthContext';
import imgAvatars from '@utils/imgAvatars.json';
import { getAPI } from '@services/axios';

const Time = ({ team }) => {
  const Router = useRouter();
  const { trailId } = Router.query;
  const { user } = useAuth();
  const toast = useToast();
  const [name, setName] = useState('');
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [avatar, setAvatar] = useState(null);
  const [responses, setResponses] = useState(null);
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const onCloseAlert = () => setIsOpenAlert(false);
  const cancelRef = useRef();

  useEffect(() => {
    setName(team.name);
    setAvatar(team.avatar);

    const filterUsers = team.users.filter((item) => item.uid !== user.uid);
    setUsers(filterUsers);
  }, []);

  useEffect(() => {
    const data = async () => {
      await api
        .get(`game-responses-team/${trailId}`)
        .then((res) => setResponses(res.data));
    };

    data();
  }, []);

  const addMember = async () => {
    setLoading(true);
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < users.length; i++) {
      if (users[i].email === userInput) {
        setLoading(false);
        return toast({
          title: `Usuário já adicionado!`,
          status: 'warning',
          isClosable: true,
        });
      }
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
      .put(`team/${team._id}`, {
        name,
        avatar,
        users: usersFull,
      })
      .then(() => {
        toast({
          title: `Salvo com sucesso!`,
          status: 'success',
          isClosable: true,
        });
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

  const deleteTeam = async () => {
    await api
      .delete(`team/${team._id}`)
      .then(() => {
        toast({
          title: 'Time deletado',
          status: 'success',
          duration: 3000,
        });
        Router.push('/minha-conta');
      })
      .catch((err) => {
        onCloseAlert();
        toast({
          title: 'Houve um erro',
          status: 'error',
          duration: 3000,
        });
        if (err.response) {
          console.log(err.response.data.error);
        } else {
          console.log('Ocorreu um erro. Tente novamente, por favor.');
        }
      });
  };

  return (
    <Layout profile>
      <Container maxW="container.sm" minH="89vh">
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
        <Flex
          p="30px"
          mb="30px"
          mx="auto"
          maxW="900px"
          bg="white"
          borderRadius="4px"
        >
          <Tabs colorScheme="pink" isFitted w="100%">
            <TabList>
              <Tab
                color="black"
                _focus={{
                  boxShadow: '0 0 0 3px rgb(255,255,255)',
                  outline: '2px solid transparent',
                }}
              >
                Respostas enviadas
              </Tab>
              <Tab
                color="black"
                _focus={{
                  boxShadow: '0 0 0 3px rgb(255,255,255)',
                  outline: '2px solid transparent',
                }}
              >
                Editar/Excluir
              </Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <Flex direction="column">
                  {responses && responses.length > 0 ? (
                    responses?.map((item) => (
                      <Flex
                        direction="column"
                        mb="20px"
                        bg="#eeeeee"
                        p="20px"
                        borderRadius="4px"
                      >
                        <Link href={item.response} isExternal>
                          <Text color="highlight">{item.response}</Text>
                        </Link>
                        {item?.points ? (
                          <Flex direction="column" mt="10px">
                            <Text color="gray.700" fontSize="1.1rem">
                              Nota: {item.points.value} pontos
                            </Text>
                            <Text color="gray.700" fontSize=".9rem">
                              Feedback: {item.points.feedback}
                            </Text>
                          </Flex>
                        ) : (
                          <Text color="gray.600" mt="10px" fontSize=".9rem">
                            Aguardando correção
                          </Text>
                        )}
                      </Flex>
                    ))
                  ) : (
                    <Text color="black">Nenhuma resposta enviada</Text>
                  )}
                </Flex>
              </TabPanel>
              <TabPanel>
                <Flex direction="column">
                  <Text color="black" fontWeight="600" fontSize="1rem">
                    Avatar do Time
                  </Text>
                  {avatar && (
                    <Box cursor="pointer" maxW="250px" mx="auto">
                      <img alt="Avatar time" src={avatar} />
                    </Box>
                  )}
                  <Text color="gray" fontSize=".8rem" mt="20px">
                    Para alterar, clique em uma das opções:
                  </Text>
                  <Flex wrap="wrap">
                    {imgAvatars.map((image) => (
                      <Box
                        cursor="pointer"
                        maxW="70px"
                        onClick={() => setAvatar(image)}
                      >
                        <img alt="Avatar time" src={image} />
                      </Box>
                    ))}
                  </Flex>
                </Flex>
                <Flex py="3rem" direction="column">
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
                  <Flex direction="column" maxW="500px" mb="50px">
                    <Text color="black" fontWeight="600">
                      Membros do time:
                    </Text>
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
                  <FormControl maxW="400px" pb="40px">
                    <FormLabel
                      color="black"
                      mb="0"
                      fontWeight="600"
                      fontSize="1rem"
                    >
                      Adicionar outros membros:
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
                <Flex
                  border="1px"
                  borderColor="red"
                  direction="column"
                  maxW="400px"
                  mx="auto"
                  p="10px"
                  mt="80px"
                  borderRadius="4px"
                >
                  <Text color="gray.800" mb="10px">
                    Depois de excluir um time, não há como voltar atrás.
                  </Text>
                  <Button
                    colorScheme="red"
                    onClick={() => setIsOpenAlert(true)}
                  >
                    Deletar trilha
                  </Button>
                  <AlertDialog
                    isOpen={isOpenAlert}
                    leastDestructiveRef={cancelRef}
                    onClose={onCloseAlert}
                  >
                    <AlertDialogOverlay>
                      <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                          Deletar time
                        </AlertDialogHeader>

                        <AlertDialogBody>Tem certeza?</AlertDialogBody>

                        <AlertDialogFooter>
                          <Button ref={cancelRef} onClick={onCloseAlert}>
                            Cancelar
                          </Button>
                          <Button colorScheme="red" onClick={deleteTeam} ml={3}>
                            Deletar
                          </Button>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialogOverlay>
                  </AlertDialog>
                </Flex>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Flex>
      </Container>
    </Layout>
  );
};

export default withAuth(Time);

export async function getServerSideProps(ctx) {
  try {
    const apiServer = getAPI(ctx);
    const { trailId } = ctx.query;

    const response = await apiServer.get(`game-team/${trailId}`);

    return {
      props: {
        team: response.data,
      },
    };
  } catch (err) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
}

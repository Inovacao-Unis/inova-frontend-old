/* eslint-disable consistent-return */
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
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import api from '@services/api';
import { useAuth } from '@contexts/AuthContext';
import imgAvatars from '@utils/imgAvatars.json';

const images = [
  'https://firebasestorage.googleapis.com/v0/b/inova-c70f5.appspot.com/o/inova%2Favatars%2F1.png?alt=media&token=03082ec9-282b-49ed-a2c8-ffc61e47e9a1',
  'https://firebasestorage.googleapis.com/v0/b/inova-c70f5.appspot.com/o/inova%2Favatars%2F2.png?alt=media&token=c94d6d77-ccb8-48fd-82dc-4dad4d78f18c',
  'https://firebasestorage.googleapis.com/v0/b/inova-c70f5.appspot.com/o/inova%2Favatars%2F3.png?alt=media&token=b28452ee-168d-43bc-bd3f-1e6a2cc0b230',
  'https://firebasestorage.googleapis.com/v0/b/inova-c70f5.appspot.com/o/inova%2Favatars%2F4.png?alt=media&token=e4821345-aca4-476b-8694-f9420add65ab',
  'https://firebasestorage.googleapis.com/v0/b/inova-c70f5.appspot.com/o/inova%2Favatars%2F5.png?alt=media&token=423fdac7-8a1b-409a-b688-841a36fb7fb2',
  'https://firebasestorage.googleapis.com/v0/b/inova-c70f5.appspot.com/o/inova%2Favatars%2F6.png?alt=media&token=d1f4ded9-d816-475c-b9cc-f4439f8399c4',
  'https://firebasestorage.googleapis.com/v0/b/inova-c70f5.appspot.com/o/inova%2Favatars%2F7.png?alt=media&token=d868e783-2a89-42c1-845c-9d364916e337',
  'https://firebasestorage.googleapis.com/v0/b/inova-c70f5.appspot.com/o/inova%2Favatars%2F8.png?alt=media&token=f25a4d86-38c1-42db-af73-2d63b2ab655f',
  'https://firebasestorage.googleapis.com/v0/b/inova-c70f5.appspot.com/o/inova%2Favatars%2F9.png?alt=media&token=d6fcfa1c-0cd2-4634-9d0d-750787ffaac1',
  'https://firebasestorage.googleapis.com/v0/b/inova-c70f5.appspot.com/o/inova%2Favatars%2F10.png?alt=media&token=51aff87b-2b64-40fc-9da9-541f9962f934',
  'https://firebasestorage.googleapis.com/v0/b/inova-c70f5.appspot.com/o/inova%2Favatars%2F11.png?alt=media&token=85629c0c-1c50-4059-8bb1-83aaa8adaf18',
  'https://firebasestorage.googleapis.com/v0/b/inova-c70f5.appspot.com/o/inova%2Favatars%2F12.png?alt=media&token=9cbdd64a-6e48-4049-b754-99c8f5500a8a',
  'https://firebasestorage.googleapis.com/v0/b/inova-c70f5.appspot.com/o/inova%2Favatars%2F13.png?alt=media&token=e3b2f9e1-b4a6-4c54-8823-a1e1f129ff40',
];

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
  const [avatar, setAvatar] = useState(
    'https://firebasestorage.googleapis.com/v0/b/inova-c70f5.appspot.com/o/inova%2Favatars%2F10.png?alt=media&token=51aff87b-2b64-40fc-9da9-541f9962f934',
  );

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

    console.log('nome ', name);
    console.log('avatar ', avatar);
    console.log('users ', usersFull);

    // await api
    //   .put('teams', {
    //     name,
    //     avatar,
    //     users: usersFull,
    //   })
    //   .then(() => {
    //     toast({
    //       title: `Alterado com sucesso!`,
    //       status: 'success',
    //       isClosable: true,
    //     });
    //   })
    //   .catch((err) => {
    //     if (err.response) {
    //       console.log(err.response.data.error);
    //       toast({
    //         title: err.response.data.error,
    //         status: 'error',
    //         isClosable: true,
    //       });
    //     } else {
    //       console.log(err);
    //       toast({
    //         title: 'Houve um erro',
    //         status: 'error',
    //         isClosable: true,
    //       });
    //     }
    //   });
  };

  return (
    <Layout profile>
      <Container maxW="container.sm" minH="87vh">
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
                <Text>Notas e feedback</Text>
              </TabPanel>
              <TabPanel>
                <Flex direction="column">
                  <Text color="black" fontWeight="600" fontSize="1rem">
                    Avatar do Time
                  </Text>
                  <Box cursor="pointer" maxW="250px" mx="auto">
                    <img alt="Avatar time" src={avatar} />
                  </Box>
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

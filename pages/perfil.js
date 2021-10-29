/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
import { useState, useEffect } from 'react';
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
  TabPanel,
} from '@chakra-ui/react';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import api from '@services/api';
import { useAuth } from '@contexts/AuthContext';
import imgAvatars from '@utils/imgAvatars.json';

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
  const [avatar, setAvatar] = useState(null);
  const [responses, setResponses] = useState(null);

  useEffect(() => {
    const data = async () => {
      await api.get(`game-team/${trailId}`).then((res) => {
        setTeam(res.data);
        setName(res.data.name);
        const usersFilter = res.data.users.filter(
          (item) => item.uid !== user.uid,
        );
        setAvatar(res.data.avatar);
        setUsers(usersFilter);
      });
    };

    if (trailId && user) {
      data();
    }
  }, [trailId, user]);

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
            perfil
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
          <Text>Email</Text>
        </Flex>
      </Container>
    </Layout>
  );
};

// export default withAuth(Perfil);
export default withAuth(Time);

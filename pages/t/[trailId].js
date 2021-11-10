/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
/* eslint-disable array-callback-return */
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
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
  Modal,
  ModalHeader,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import Layout from '@components/Layout';
import withAuth from '@components/withAuth';
import { useAuth } from '@contexts/AuthContext';
import api from '@services/api';
import imgAvatars from '@utils/imgAvatars.json';
import Challenges from '@components/Challenges';

const TrilhaPage = () => {
  const Router = useRouter();
  const { trailId } = Router.query;
  const { user } = useAuth();
  const toast = useToast();
  const [trail, setTrail] = useState(null);
  const [name, setName] = useState('');
  const [challenge, setChallenge] = useState(null);
  const [saude, setSaude] = useState(false);
  const [gestao, setGestao] = useState(false);
  const [engenharia, setEngenharia] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [avatar, setAvatar] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

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

    if (!avatar) {
      return toast({
        title: `Escolha um avatar`,
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
        avatar,
      })
      .then((res) => {
        console.log(res);
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
    <Layout painel>
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
            <Text mb="5px" color="highlight" fontSize="xs">
              {trail?.schedule}
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
            <Stack direction="column">
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
              <Text fontSize="1.1rem" fontWeight="bold" mb="10px" mt="15px">
                Gestão
              </Text>
            )}
            <Stack direction="column">
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
              <Text fontSize="1.1rem" fontWeight="bold" mb="10px" mt="15px">
                Engenharia
              </Text>
            )}
            <Stack direction="column">
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
          <Button
            maxW={{ base: '100%', lg: '260px' }}
            size="sm"
            border="2px"
            mt="30px"
            bg="highlight"
            color="white"
            _hover={{ bg: 'highlight' }}
            mb="30px"
            onClick={onOpen}
          >
            Ver o conteúdo dos desafios
          </Button>
          <Divider mb="30px" />
          <Text fontSize="1.3rem" fontWeight="bold" mb="30px" color="black">
            Crie seu time:
          </Text>
          <Flex direction="column" maxW="400px" pb="40px">
            <Text color="black" fontWeight="600" fontSize="1rem">
              Avatar do Time
            </Text>
            {avatar && (
              <Box cursor="pointer" maxW="250px" mx="auto">
                <img alt="Avatar time" src={avatar} />
              </Box>
            )}
            <Text color="gray" fontSize=".8rem" mt="20px">
              Para escolher, clique em uma das opções:
            </Text>
            <Flex wrap="wrap">
              {imgAvatars.map((image) => (
                <Box
                  key={image}
                  cursor="pointer"
                  maxW="70px"
                  onClick={() => setAvatar(image)}
                >
                  <img alt="Avatar time" src={image} />
                </Box>
              ))}
            </Flex>
          </Flex>
          <FormControl maxW="400px" pb="40px">
            <FormLabel color="black" fontWeight="600" fontSize="1rem">
              Nome do time
            </FormLabel>
            <Input
              color="black"
              placeholder="Digite o nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
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
                  <Text>{user?.email}</Text>
                </Flex>
                {users.map((item) => (
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
              Participar
            </Button>
          </Box>
        </Flex>
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Desafios</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Challenges />
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="pink" mr={3} onClick={onClose}>
                Fechar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Container>
    </Layout>
  );
};

export default withAuth(TrilhaPage);

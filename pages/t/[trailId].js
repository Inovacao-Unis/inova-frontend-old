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
} from '@chakra-ui/react';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import Layout from '@components/Layout';
import withAuth from '@components/withAuth';
import api from '@services/api';

const TrilhaPage = () => {
  const Router = useRouter();
  const { trailId } = Router.query;
  const [activity, setActivity] = useState(null);
  const [leader, setLeader] = useState({});
  const [challenge, setChallenge] = useState(null);
  const [saude, setSaude] = useState(false);
  const [gestao, setGestao] = useState(false);
  const [engenharia, setEngenharia] = useState(false);

  useEffect(() => {
    const getData = async () => {
      await api
        .get(`game-activity/${trailId}`)
        .then((res) => setActivity(res.data));
    };

    getData();
  }, [trailId]);

  useEffect(() => {
    if (
      activity?.challenges.some(
        (e) => e.categoryId === '614389a34db7167c3368f753',
      )
    ) {
      setSaude(true);
    }

    if (
      activity?.challenges.some(
        (e) => e.categoryId === '61438a07f87adb7c88785a41',
      )
    ) {
      setGestao(true);
    }

    if (
      activity?.challenges.some(
        (e) => e.categoryId === '61438a13f87adb7c88785a44',
      )
    ) {
      setEngenharia(true);
    }
  }, [activity, setSaude, setGestao, setEngenharia]);

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
              {activity?.title}
            </Text>
            <Text fontSize="1rem" mb="10px" color="black">
              Gerenciado por {activity?.leader}
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
              {activity?.challenges.map((item) => {
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
              {activity?.challenges.map((item) => {
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
              {activity?.challenges.map((item) => {
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
              <Input color="black" placeholder="E-mail do participante" />
              <Button bg="highlight">
                <AddIcon />
              </Button>
            </Flex>
          </FormControl>
          <Flex direction="column" maxW="500px">
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
                <Flex
                  align="center"
                  bg="gray.100"
                  borderRadius="4px"
                  py="5px"
                  px="10px"
                  mr="10px"
                  mb="10px"
                >
                  <Text>Fulano da Silva</Text>
                  <DeleteIcon
                    cursor="pointer"
                    ml="8px"
                    w={3}
                    h={3}
                    color="red.500"
                  />
                </Flex>
                <Flex
                  align="center"
                  bg="gray.100"
                  borderRadius="4px"
                  py="5px"
                  px="10px"
                  mr="10px"
                  mb="10px"
                >
                  <Text>Fulano da Silva</Text>
                  <DeleteIcon
                    cursor="pointer"
                    ml="8px"
                    w={3}
                    h={3}
                    color="red.500"
                  />
                </Flex>
              </Flex>
            </Box>
          </Flex>
        </Flex>
      </Container>
    </Layout>
  );
};

export default withAuth(TrilhaPage);

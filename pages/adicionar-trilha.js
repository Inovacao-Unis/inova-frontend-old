/* eslint-disable no-return-assign */
/* eslint-disable no-underscore-dangle */
import { useState, useEffect } from 'react';
import api from '@services/api';
import Layout from '@components/Layout';
import { useAuth } from '@contexts/AuthContext';
import withAuth from '@components/withAuth';
import Link from 'next/link';
import {
  Container,
  Heading,
  Flex,
  Text,
  Button,
  Box,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Checkbox,
  Stack,
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
import { useRouter } from 'next/router';
import Challenges from '@components/Challenges';

const adicionarAtividade = () => {
  const Router = useRouter();
  const [title, setTitle] = useState('');
  const [schedule, setSchedule] = useState('');
  const [engenhariaChallenges, setEngenhariaChallenges] = useState({});
  const [saudeChallenges, setSaudeChallenges] = useState({});
  const [gestaoChallenges, setGestaoChallenges] = useState({});
  const { leader } = useAuth();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const getData = async () => {
      await api.get('challenges').then((res) => {
        res.data.forEach((category) => {
          category.checked = false;
          category.challenges.map((challenge) => (challenge.checked = false));
          if (category.slug === 'engenharia') setEngenhariaChallenges(category);
          if (category.slug === 'saude') setSaudeChallenges(category);
          if (category.slug === 'gestao') setGestaoChallenges(category);
        });
      });
    };

    getData();
  }, [setEngenhariaChallenges, setSaudeChallenges, setGestaoChallenges]);

  const reduceArr = (arr) => {
    const newArr = [];
    arr.forEach((item) => {
      newArr.push(item.checked);
    });

    return newArr;
  };

  const allCheckedEngenharia =
    engenhariaChallenges.challenges &&
    reduceArr(engenhariaChallenges.challenges).every(Boolean);

  const isIndeterminateEngenharia =
    engenhariaChallenges.challenges &&
    reduceArr(engenhariaChallenges.challenges).some(Boolean) &&
    !allCheckedEngenharia;

  const allCheckedSaude =
    saudeChallenges.challenges &&
    reduceArr(saudeChallenges.challenges).every(Boolean);

  const isIndeterminateSaude =
    saudeChallenges.challenges &&
    reduceArr(saudeChallenges.challenges).some(Boolean) &&
    !allCheckedSaude;

  const allCheckedGestao =
    gestaoChallenges.challenges &&
    reduceArr(gestaoChallenges.challenges).every(Boolean);

  const isIndeterminateGestao =
    gestaoChallenges.challenges &&
    reduceArr(gestaoChallenges.challenges).some(Boolean) &&
    !allCheckedGestao;

  const addTrail = async () => {
    const challengesCheked = [];

    engenhariaChallenges.challenges.forEach((challenge) => {
      if (challenge.checked) {
        challengesCheked.push(challenge._id);
      }
    });

    saudeChallenges.challenges.forEach((challenge) => {
      if (challenge.checked) {
        challengesCheked.push(challenge._id);
      }
    });

    gestaoChallenges.challenges.forEach((challenge) => {
      if (challenge.checked) {
        challengesCheked.push(challenge._id);
      }
    });

    await api
      .post('trails', {
        title,
        schedule,
        leaderId: leader,
        challenges: challengesCheked,
      })
      .then(() => {
        toast({
          title: 'Trilha criada!',
          description: 'Redirecionando para a página de trilhas...',
          status: 'success',
          duration: 3000,
        });
        Router.push('minha-conta');
      })
      .catch((err) => {
        toast({
          title: 'Ocorreu um erro!',
          description: 'Não foi possível criar a trilha',
          status: 'error',
          duration: 9000,
        });
        if (err.response) {
          console.error(err.response.data.error);
        } else {
          console.error('Ocorreu um erro. Tente novamente, por favor.');
        }
      });
  };

  return (
    <Layout painel>
      <Container maxW="container.xl" zIndex="800" pb="100px">
        <Heading
          fontSize="2.5rem"
          fontWeight="700"
          textAlign="center"
          m="80px auto"
        >
          adicionar trilha
        </Heading>
        <Box p={{ base: '10px', lg: '70px' }} bg="white" borderRadius="4px">
          <FormControl maxW="400px" pb="40px">
            <FormLabel color="black" fontWeight="600" fontSize="1.4rem">
              Título da trilha
            </FormLabel>
            <Input
              color="black"
              placeholder="Digite o título"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormControl>
          <FormControl maxW="400px" pb="40px">
            <FormLabel mb="0" color="black" fontWeight="600" fontSize="1.4rem">
              Cronograma
            </FormLabel>
            <FormHelperText mt="0" mb="10px">
              Data limite das etapas
            </FormHelperText>
            <Input
              color="black"
              placeholder="Digite o cronograma"
              value={schedule}
              onChange={(e) => setSchedule(e.target.value)}
            />
          </FormControl>
          <Text color="black" fontWeight="600" fontSize="1.4rem">
            Escolha os desafios:
          </Text>
          <Button
            size="xs"
            bgColor="highlight"
            color="white"
            _hover={{ bg: 'highlight' }}
            mb="30px"
            onClick={onOpen}
          >
            Ver o conteúdo dos desafios
          </Button>
          <Flex
            justify="space-between"
            mb="70px"
            direction={{ base: 'column', lg: 'row' }}
          >
            <Box mb="20px">
              <Checkbox
                color="black"
                isChecked={allCheckedEngenharia}
                isIndeterminate={isIndeterminateEngenharia}
                onChange={(e) => {
                  const newArr = [...engenhariaChallenges.challenges];
                  newArr.forEach((item) => (item.checked = e.target.checked));
                  setEngenhariaChallenges((prevState) => ({
                    ...prevState,
                    challenges: newArr,
                  }));
                }}
              >
                <Text fontWeight="bold" fontSize="1.1rem">
                  {engenhariaChallenges?.title}
                </Text>
              </Checkbox>
              <Stack pl={6} mt={1} spacing={1}>
                {engenhariaChallenges.challenges &&
                  engenhariaChallenges.challenges.map((challenge) => (
                    <Checkbox
                      key={challenge._id}
                      color="black"
                      isChecked={
                        engenhariaChallenges?.challenges[
                          engenhariaChallenges.challenges.indexOf(challenge)
                        ]?.checked
                      }
                      onChange={(e) => {
                        const newArr = [...engenhariaChallenges.challenges];
                        newArr[
                          engenhariaChallenges.challenges.indexOf(challenge)
                        ].checked = e.target.checked;

                        setEngenhariaChallenges((prevState) => ({
                          ...prevState,
                          challenges: newArr,
                        }));
                      }}
                    >
                      {challenge.title}
                    </Checkbox>
                  ))}
              </Stack>
            </Box>
            <Box mb="20px">
              <Checkbox
                color="black"
                isChecked={allCheckedSaude}
                isIndeterminate={isIndeterminateSaude}
                onChange={(e) => {
                  const newArr = [...saudeChallenges.challenges];
                  newArr.forEach((item) => (item.checked = e.target.checked));
                  setSaudeChallenges((prevState) => ({
                    ...prevState,
                    challenges: newArr,
                  }));
                }}
              >
                <Text fontWeight="bold" fontSize="1.1rem">
                  {saudeChallenges?.title}
                </Text>
              </Checkbox>
              <Stack pl={6} mt={1} spacing={1}>
                {saudeChallenges.challenges &&
                  saudeChallenges.challenges.map((challenge) => (
                    <Checkbox
                      key={challenge._id}
                      color="black"
                      isChecked={
                        saudeChallenges?.challenges[
                          saudeChallenges.challenges.indexOf(challenge)
                        ]?.checked
                      }
                      onChange={(e) => {
                        const newArr = [...saudeChallenges.challenges];
                        newArr[
                          saudeChallenges.challenges.indexOf(challenge)
                        ].checked = e.target.checked;

                        setSaudeChallenges((prevState) => ({
                          ...prevState,
                          challenges: newArr,
                        }));
                      }}
                    >
                      {challenge.title}
                    </Checkbox>
                  ))}
              </Stack>
            </Box>
            <Box mb="20px">
              <Checkbox
                color="black"
                isChecked={allCheckedGestao}
                isIndeterminate={isIndeterminateGestao}
                onChange={(e) => {
                  const newArr = [...gestaoChallenges.challenges];
                  newArr.forEach((item) => (item.checked = e.target.checked));
                  setGestaoChallenges((prevState) => ({
                    ...prevState,
                    challenges: newArr,
                  }));
                }}
              >
                <Text fontWeight="bold" fontSize="1.1rem">
                  {gestaoChallenges?.title}
                </Text>
              </Checkbox>
              <Stack pl={6} mt={1} spacing={1}>
                {gestaoChallenges.challenges &&
                  gestaoChallenges.challenges.map((challenge) => (
                    <Checkbox
                      key={challenge._id}
                      color="black"
                      isChecked={
                        gestaoChallenges?.challenges[
                          gestaoChallenges.challenges.indexOf(challenge)
                        ]?.checked
                      }
                      onChange={(e) => {
                        const newArr = [...gestaoChallenges.challenges];
                        newArr[
                          gestaoChallenges.challenges.indexOf(challenge)
                        ].checked = e.target.checked;

                        setGestaoChallenges((prevState) => ({
                          ...prevState,
                          challenges: newArr,
                        }));
                      }}
                    >
                      {challenge.title}
                    </Checkbox>
                  ))}
              </Stack>
            </Box>
          </Flex>
          <Flex>
            <Link href="minha-conta">
              <Button bg="gray.300" mr="5px" color="black">
                Voltar
              </Button>
            </Link>

            <Button
              bg="highlight"
              _hover={{ bg: 'highlight' }}
              onClick={addTrail}
            >
              Adicionar
            </Button>
          </Flex>
        </Box>
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

export default withAuth(adicionarAtividade);

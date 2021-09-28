/* eslint-disable no-return-assign */
/* eslint-disable no-underscore-dangle */
import { useState, useEffect } from 'react';
import api from '@services/api';
import Layout from '@components/Layout';
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
  Input,
  Checkbox,
  Stack,
} from '@chakra-ui/react';

const adicionarAtividade = () => {
  const [engenhariaChallenges, setEngenhariaChallenges] = useState({});
  const [saudeChallenges, setSaudeChallenges] = useState({});
  const [gestaoChallenges, setGestaoChallenges] = useState({});
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const getData = async () => {
      await api.get('challenges').then((res) => {
        // eslint-disable-next-line no-return-assign
        res.data.map((category) => {
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

  const teste = () => {
    const challengesCheked = [];

    engenhariaChallenges.challenges.forEach((challenge) => {
      if (challenge.checked) {
        challengesCheked.push(challenge);
      }
    });

    saudeChallenges.challenges.forEach((challenge) => {
      if (challenge.checked) {
        challengesCheked.push(challenge);
      }
    });

    gestaoChallenges.challenges.forEach((challenge) => {
      if (challenge.checked) {
        challengesCheked.push(challenge);
      }
    });
  };

  return (
    <Layout activityBtn>
      <Container maxW="container.xl" zIndex="800" pb="100px">
        <Heading
          fontSize="2.5rem"
          fontWeight="700"
          textAlign="center"
          m="100px auto"
        >
          adicionar atividade
        </Heading>
        <Box p="70px" bg="white" borderRadius="4px">
          <FormControl maxW="400px" pb="40px">
            <FormLabel color="black" fontWeight="600" fontSize="1.4rem">
              Título da atividade
            </FormLabel>
            <Input color="black" placeholder="Digite o título" />
          </FormControl>
          <Text color="black" fontWeight="600" pb="20px" fontSize="1.4rem">
            Escolha os desafios:
          </Text>
          <Flex justify="space-between" mb="70px">
            <Box>
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
            <Box>
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
            <Box>
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

            <Button bg="highlight">Adicionar</Button>
          </Flex>
        </Box>
      </Container>
    </Layout>
  );
};

export default withAuth(adicionarAtividade);

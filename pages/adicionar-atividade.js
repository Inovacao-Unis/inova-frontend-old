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
  const [activities, setActivities] = useState([]);
  const [challenges, setChallenges] = useState([]);
  const [challengesChecked, setChallengesChecked] = useState([]);
  const [engenhariaChallenges, setEngenhariaChallenges] = useState({});
  const [saudeChallenges, setSaudeChallenges] = useState({});
  const [gestaoChallenges, setGestaoChallenges] = useState({});
  const [checked, setChecked] = useState(false);

  const allCheckedEngenharia =
    engenhariaChallenges.challenges &&
    engenhariaChallenges.challenges.every((challenge) => challenge === true);
  const isIndeterminateEngenharia =
    engenhariaChallenges.challenges &&
    engenhariaChallenges.challenges.some((challenge) => challenge === true) &&
    !allCheckedEngenharia;

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

  const teste = () => {
    console.log('engenharia ', engenhariaChallenges);
    console.log('saude ', saudeChallenges);
    console.log('gestao ', gestaoChallenges);
  };

  const handleCategory = (e, category) => {};

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
        <Box p="15px" bg="white" borderRadius="4px">
          <FormControl>
            <FormLabel>Título da atividade</FormLabel>
            <Input placeholder="Digite o título" />
          </FormControl>
          <Button bg="highlight" onClick={teste}>
            Teste aqui
          </Button>
          <Button bg="highlight" onClick={() => setChecked(true)}>
            Marcar todos
          </Button>
          <Flex justify="space-between">
            <Box>
              <Checkbox
                color="black"
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
          </Flex>
        </Box>
      </Container>
    </Layout>
  );
};

export default withAuth(adicionarAtividade);

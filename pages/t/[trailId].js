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
} from '@chakra-ui/react';
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
      <Container maxW="container.xl" zIndex="800" pb="100px">
        <Flex direction="column">
          <Heading>Participar da trilha</Heading>
          <p>Líder: {activity?.leader}</p>
        </Flex>
        <Flex bg="white" p="30px">
          <RadioGroup color="black" onChange={setChallenge} value={challenge}>
            {saude && <Text>Saúde</Text>}
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
            {gestao && <Text>Gestão</Text>}
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
            {engenharia && <Text>Engenharia</Text>}
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
        </Flex>
      </Container>
    </Layout>
  );
};

export default withAuth(TrilhaPage);

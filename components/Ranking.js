/* eslint-disable no-underscore-dangle */
import { useState, useEffect } from 'react';
import {
  Flex,
  Text,
  Avatar,
  Box,
  Image,
  Center,
  CircularProgress,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import api from '@services/api';

const Ranking = ({ noTitle }) => {
  const Router = useRouter();
  const { trailId } = Router.query;
  const [ranking, setRanking] = useState([]);
  const [teamId, setTeamId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      await api.get(`game-ranking/${trailId}`).then((res) => {
        setRanking(res.data);
        setLoading(false);
      });
    };

    getData();
  }, [trailId]);

  useEffect(() => {
    const getData = async () => {
      await api
        .get(`game-team/${trailId}`)
        .then((res) => setTeamId(res.data._id))
        .catch((err) => {
          if (err.response) {
            return console.log(err.response.data.error);
          }
          return console.log('Ocorreu um erro. Tente novamente, por favor.');
        });
    };

    if (!noTitle) {
      getData();
    }
  }, [trailId, setTeamId]);

  return (
    <Flex
      bgColor="white"
      direction="column"
      align="center"
      borderRadius="md"
      pt="2rem"
      pb="4px"
      px="0"
      color="black"
      h={400}
      textAlign="center"
    >
      {!noTitle ? (
        <Text fontSize="xl" mb={4} fontWeight="bold">
          Ranking
        </Text>
      ) : null}
      <Flex direction="column" w="100%" h="100%" overflowY="auto">
        {ranking.length > 0 && !loading ? (
          ranking.map((team, index) => (
            <Flex
              key={team._id}
              bg={teamId && team._id === teamId ? 'gray.200' : '#fff'}
              w="100%"
              align="center"
              minH="60px"
              py="1rem"
              px="2rem"
            >
              <Text fontSize="1.2rem" mr="15px">
                {index + 1}
              </Text>
              <Avatar
                mr="15px"
                name="Nome perfil"
                src={team.avatar}
                bg="none"
              />
              <Text
                fontWeight="bold"
                overflow="hidden"
                textOverflow="ellipsis"
                whiteSpace="nowrap"
                mr="15px"
                fontSize="1.2rem"
              >
                {team.name}
              </Text>
              <Flex flexGrow="1" textAlign="right" align="center" justify="end">
                <Box w="15px" mr="0.5rem">
                  <Image src="/images/pointIcon.png" alt="Ícone dos pontos" />
                </Box>
                <Text fontSize="1.2rem">{team.points}</Text>
              </Flex>
            </Flex>
          ))
        ) : (
          <Center h="20vh">
            <CircularProgress
              isIndeterminate
              value={30}
              size="80px"
              color="highlight"
            />
          </Center>
        )}
        {!(ranking.length > 0) && !loading ? (
          <Text textAlign="center" pt="2rem" color="gray.600">
            Nenhum time nessa trilha
          </Text>
        ) : null}
      </Flex>
    </Flex>
  );
};

export default Ranking;

/* eslint-disable no-underscore-dangle */
import { useState, useEffect } from 'react';
import { Flex, Text, Avatar, Box, Image } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import api from '@services/api';

const Ranking = () => {
  const Router = useRouter();
  const { activityId } = Router.query;
  const [ranking, setRanking] = useState([]);
  const [teamId, setTeamId] = useState('');

  useEffect(() => {
    const getData = async () => {
      await api
        .get(`game-ranking/${activityId}`)
        .then((res) => setRanking(res.data));
    };

    getData();
  }, [activityId]);

  useEffect(() => {
    const getData = async () => {
      await api
        .get(`game-team/${activityId}`)
        .then((res) => setTeamId(res.data._id));
    };

    getData();
  }, [activityId, setTeamId]);

  return (
    <Flex
      bgColor="white"
      direction="column"
      align="center"
      border="1px"
      borderColor="gray.600"
      borderRadius="md"
      pt="2rem"
      pb="4px"
      px="0"
      color="black"
      h={400}
      textAlign="center"
    >
      <Text fontSize="xl" mb={4} fontWeight="bold">
        Ranking
      </Text>
      <Flex direction="column" w="100%" h="100%" overflowY="auto">
        {ranking &&
          ranking.map((team, index) => (
            <Flex
              key={team._id}
              bg={team._id === teamId ? 'gray.200' : '#fff'}
              w="100%"
              align="center"
              minH="60px"
              py="1rem"
              px="2rem"
            >
              <Text fontSize="1.2rem" mr="15px">
                {index + 1}
              </Text>
              <Avatar mr="15px" name="Nome perfil" src="/images/zebra.jpg" />
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
                <Box maxW="15px" mr="0.5rem">
                  <Image src="/images/pointIcon.png" alt="Ícone dos pontos" />
                </Box>
                <Text fontSize="1.2rem">{team.points}</Text>
              </Flex>
            </Flex>
          ))}
      </Flex>
    </Flex>
  );
};

export default Ranking;

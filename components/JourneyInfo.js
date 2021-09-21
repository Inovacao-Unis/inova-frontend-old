import { useState, useEffect } from 'react';
import api from '@services/api';
import { Flex, Box, Progress, Text, Avatar, Button } from '@chakra-ui/react';

const JourneyInfo = ({ status, activityId }) => {
  const [activity, setActivity] = useState(null);
  const [team, setTeam] = useState({});
  const [challenge, setChallenge] = useState({});
  const [category, setCategory] = useState({});

  useEffect(() => {
    const getData = async () => {
      await api.get(`game-team/${activityId}`).then((res) => setTeam(res.data));
    };

    getData();
  }, [activityId, setTeam]);

  useEffect(() => {
    const getData = async () => {
      await api
        .get(`activity/${activityId}`)
        .then((res) => setActivity(res.data));
    };

    getData();
  }, [activityId, setActivity]);

  useEffect(() => {
    const getData = async () => {
      await api
        .get(`challenge/${team.challengeId}`)
        .then((res) => setChallenge(res.data));
    };

    if (team && team.challengeId) {
      getData();
    }
  }, [team, setChallenge]);

  useEffect(() => {
    const getData = async () => {
      await api
        .get(`category/${challenge.categoryId}`)
        .then((res) => setCategory(res.data));
    };

    if (challenge && challenge.categoryId) {
      getData();
    }
  }, [challenge, setCategory]);

  return (
    <Flex
      direction="column"
      align="center"
      borderRadius="5px"
      py="2rem"
      px="0"
      mb="2rem"
      bgColor="white"
      color="black"
    >
      <Flex
        align="center"
        justify="space-between"
        w="100%"
        maxW="100%"
        py="0"
        px="2rem"
        mb="3rem"
      >
        <Flex direction="column">
          <Text
            fontSize="1.4rem"
            lineHeight="1.6rem"
            fontWeight="bold"
            maxW="200px"
            mb="10px"
          >
            {activity?.title}
          </Text>
          <Text fontSize="1rem" maxW="200px" mb="10px">
            {challenge?.title}
          </Text>
          <Button
            size="xs"
            bgColor="highlight"
            color="white"
            _hover={{ bg: 'highlight' }}
          >
            Informações do desafio
          </Button>
        </Flex>
        <Avatar
          size="xl"
          src={
            category?.image ? category.image : '/images/journey-placeholder.jpg'
          }
          alt="Imagem da jornada"
        />
      </Flex>
      <Box w="100%" maxW="100%" py="0" px="2rem">
        <Flex justify="space-between" align="center" mb="0.5rem">
          <Text>Seu progresso:</Text>
          <Text>{team.progress}/100%</Text>
        </Flex>
        <Box>
          <Progress hasStripe colorScheme="pink" value={team.progress} />
        </Box>
      </Box>
    </Flex>
  );
};

export default JourneyInfo;

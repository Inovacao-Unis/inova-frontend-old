import { useState, useEffect } from 'react';
import api from '@services/api';
import Link from 'next/link';
import {
  Flex,
  Box,
  Progress,
  Text,
  Avatar,
  Button,
  useToast,
} from '@chakra-ui/react';

const TrailInfo = ({ status, trail, painel }) => {
  const toast = useToast();
  const [team, setTeam] = useState(null);
  const [challenge, setChallenge] = useState({});
  const [category, setCategory] = useState({});

  useEffect(() => {
    const getData = async () => {
      await api.get(`game-team/${trail._id}`).then((res) => setTeam(res.data));
    };

    getData();
  }, [trail, setTeam]);

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

  const copyCodeToClipboard = (url) => {
    navigator.clipboard.writeText(url);

    toast({
      title: 'Link copiado',
      position: 'bottom-left',
      status: 'success',
      duration: 9000,
      isClosable: true,
    });
  };

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
            mb="5px"
            color="highlight"
          >
            {trail?.title}
          </Text>
          <Button
            size="xs"
            mb="20px"
            bg="highlight"
            _hover={{ bg: 'highlight' }}
            color="white"
            onClick={() =>
              copyCodeToClipboard(`http://localhost:3000/t/${trail?.code}`)
            }
          >
            Copiar link da trilha
          </Button>
          {!painel && team && (
            <>
              <Text fontSize="xs" color="highlight">
                Time
              </Text>
              <Text
                fontSize="1.1rem"
                fontWeight="bold"
                maxW="200px"
                mb="20px"
                color="highlight"
              >
                {team?.name}
              </Text>
              <Text fontSize="xs" color="highlight">
                Desafio
              </Text>
              <Text
                fontSize="1.1rem"
                fontWeight="bold"
                lineHeight="1rem"
                maxW="300px"
                mb="5px"
                color="highlight"
              >
                {challenge?.title}
              </Text>
              <Link href="/desafios">
                <Button
                  size="xs"
                  bgColor="white"
                  border="2px"
                  borderColor="highlight"
                  color="highlight"
                  _hover={{ bg: 'white' }}
                  mb="30px"
                >
                  Ver o conteúdo dos desafios
                </Button>
              </Link>
            </>
          )}
        </Flex>
        {!painel && (
          <Avatar
            size="xl"
            src={category?.image ? category.image : '/images/saude.png'}
            alt="Imagem da jornada"
          />
        )}
      </Flex>
      {!painel && team && (
        <Box w="100%" maxW="100%" py="0" px="2rem">
          <Flex justify="space-between" align="center" mb="0.5rem">
            <Text color="highlight" fontWeight="bold">
              Seu progresso:
            </Text>
            <Text color="highlight">{team.progress}/100%</Text>
          </Flex>
          <Box>
            <Progress hasStripe colorScheme="pink" value={team.progress} />
          </Box>
        </Box>
      )}
    </Flex>
  );
};

export default TrailInfo;

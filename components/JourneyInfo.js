import { useState, useEffect } from 'react';
import api from '@services/api';
import { Flex, Box, Progress, Text, Avatar } from '@chakra-ui/react';

const JourneyInfo = ({ status, jornadaSlug }) => {
  const [journey, setJourney] = useState(null);

  useEffect(() => {
    const getData = async () => {
      await api
        .get(`journey/${jornadaSlug}`)
        .then((res) => setJourney(res.data));
    };

    getData();
  }, [jornadaSlug, setJourney]);

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
        mb="2rem"
      >
        <Text
          fontSize="1.4rem"
          lineHeight="1.6rem"
          fontWeight="bold"
          maxW="200px"
        >
          {journey?.title}
        </Text>
        <Avatar
          size="lg"
          src={
            journey?.image ? journey.image : '/images/journey-placeholder.jpg'
          }
          alt="Imagem da jornada"
        />
      </Flex>
      <Box w="100%" maxW="100%" py="0" px="2rem">
        <Flex justify="space-between" align="center" mb="0.5rem">
          <Text>Seu progresso:</Text>
          <Text>{status}/100%</Text>
        </Flex>
        <Box>
          <Progress hasStripe colorScheme="pink" value={status} />
        </Box>
      </Box>
    </Flex>
  );
};

export default JourneyInfo;

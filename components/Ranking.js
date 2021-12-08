/* eslint-disable no-underscore-dangle */
import { Flex, Text, Avatar, Box, Image } from '@chakra-ui/react';

const Ranking = ({ noTitle, ranking, teamId }) => (
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
      {ranking.length > 0 ? (
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
            <Avatar mr="15px" name="Nome perfil" src={team.avatar} bg="none" />
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
        <Text textAlign="center" pt="2rem" color="gray.600">
          Nenhum time nessa trilha
        </Text>
      )}
    </Flex>
  </Flex>
);

export default Ranking;

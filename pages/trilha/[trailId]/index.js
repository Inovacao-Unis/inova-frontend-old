import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Container,
  Text,
  Flex,
  Image,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Heading,
} from '@chakra-ui/react';
import Layout from '@components/Layout';
import withAuth from '@components/withAuth';
import Ranking from '@components/Ranking';
import TrailInfo from '@components/TrailInfo';
import api from '@services/api';

const Journey = () => {
  const Router = useRouter();
  const { trailId } = Router.query;
  const [trail, setTrail] = useState(null);
  const [info, setInfo] = useState(true);
  const [responses, setResponses] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const getData = async () => {
      await api.get(`trail/${trailId}`).then((res) => setTrail(res.data));
    };

    getData();
  }, [trailId]);

  useEffect(() => {
    const getData = async () => {
      await api
        .get(`game-responses/${trailId}`)
        .then((res) => setResponses(res.data));
    };

    getData();
  }, [trailId]);

  return (
    <Layout profile>
      <Container maxW="container.xl" zIndex="800" pb="100px">
        <Flex py={4}>
          <Flex w="100%" flexDirection="column" align="center" flex="1">
            <Heading
              fontWeight="700"
              textAlign="center"
              mb="20px"
              display={{ base: 'block', xl: 'none' }}
            >
              {trail?.title}
            </Heading>
            <Flex
              onClick={() => Router.push(`/trilha/${trailId}/1`)}
              cursor="pointer"
              mr={{ base: '180px', lg: 'auto' }}
              ml={{ base: 'auto', lg: '180px' }}
              direction="column"
              align="center"
            >
              <Image
                src="/images/planets/1.png"
                boxSize={{ base: '100%', lg: '180px' }}
              />
              <Text>Etapa 1</Text>
            </Flex>
            <Flex
              onClick={() =>
                responses[1] ? Router.push(`/trilha/${trailId}/2`) : null
              }
              cursor={responses[1] ? 'pointer' : 'inherit'}
              mr={{ base: 'auto', lg: '180px' }}
              ml={{ base: '180px', lg: 'auto' }}
              direction="column"
              align="center"
            >
              <Image
                src="/images/planets/2.png"
                boxSize={{ base: '100%', lg: '250px' }}
                style={
                  responses[1]
                    ? { filter: 'none' }
                    : { filter: 'grayscale(100%)' }
                }
              />
              <Text color={responses[1] ? 'white' : 'gray'}>Etapa 2</Text>
            </Flex>
            <Flex
              onClick={() =>
                responses[2] ? Router.push(`/trilha/${trailId}/3`) : null
              }
              cursor={responses[2] ? 'pointer' : 'inherit'}
              mr={{ base: '180px', lg: 'auto' }}
              ml={{ base: 'auto', lg: '180px' }}
              direction="column"
              align="center"
            >
              <Image
                src="/images/planets/3.png"
                boxSize={{ base: '100%', lg: '200px' }}
                style={
                  responses[2]
                    ? { filter: 'none' }
                    : { filter: 'grayscale(100%)' }
                }
              />
              <Text color={responses[2] ? 'white' : 'gray'}>Etapa 3</Text>
            </Flex>
            <Flex
              onClick={() =>
                responses[3] ? Router.push(`/trilha/${trailId}/4`) : null
              }
              cursor={responses[3] ? 'pointer' : 'inherit'}
              mr={{ base: 'auto', lg: '150px' }}
              ml={{ base: '150px', lg: 'auto' }}
              direction="column"
              align="center"
            >
              <Image
                src="/images/planets/4.png"
                boxSize={{ base: '100%', lg: '220px' }}
                style={
                  responses[3]
                    ? { filter: 'none' }
                    : { filter: 'grayscale(100%)' }
                }
              />
              <Text color={responses[3] ? 'white' : 'gray'}>Etapa 4</Text>
            </Flex>
          </Flex>
          <Box w="400px" display={{ base: 'none', xl: 'block' }}>
            {trail && <TrailInfo status={30} trail={trail} />}
            <Ranking />
          </Box>
        </Flex>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton />
            <ModalBody>
              {info && trail ? (
                <TrailInfo status={30} trail={trail} />
              ) : (
                <Ranking />
              )}
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="pink" mr={3} onClick={onClose}>
                Fechar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Container>

      <Box
        display={{ base: 'block', xl: 'none' }}
        pos="fixed"
        w="100%"
        bottom="0"
        left="0"
        zIndex="999"
      >
        <Flex>
          <Button
            onClick={() => {
              setInfo(true);
              onOpen();
            }}
            w="100%"
            borderRadius="0"
            bg="white"
            color="wine"
            mr="1px"
          >
            Informações
          </Button>
          <Button
            onClick={() => {
              setInfo(false);
              onOpen();
            }}
            w="100%"
            borderRadius="0"
            bg="white"
            color="wine"
            ml="1px"
          >
            Ranking
          </Button>
        </Flex>
      </Box>
    </Layout>
  );
};

export default withAuth(Journey);

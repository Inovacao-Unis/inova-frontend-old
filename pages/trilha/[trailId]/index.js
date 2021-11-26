/* eslint-disable no-underscore-dangle */
import { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Container,
  Text,
  Flex,
  Image,
  Button,
  Modal,
  ModalHeader,
  ModalOverlay,
  ModalContent,
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
import { FaMapSigns } from 'react-icons/fa';
import { getAPI } from '@services/axios';

const Journey = ({ trail, responses, team, ranking }) => {
  console.log('team ', team);
  const Router = useRouter();
  const { trailId } = Router.query;
  const [info, setInfo] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenStart,
    onOpen: onOpenStart,
    onClose: onCloseStart,
  } = useDisclosure();

  return (
    <Layout profile>
      <Container maxW="container.xl" zIndex="800" pb="100px">
        <Flex py={4}>
          {responses && (
            <Flex w="100%" flexDirection="column" align="center" flex="1">
              <Heading
                fontWeight="700"
                textAlign="center"
                mb="20px"
                display={{ base: 'block', xl: 'none' }}
              >
                {trail?.title}
              </Heading>
              <Flex w={{ base: '86%', lg: '300px' }} mx="auto" my="50px">
                <Button
                  w="100%"
                  mx="auto"
                  mb="20px"
                  bg="white"
                  size="lg"
                  _hover={{ bg: 'white' }}
                  color="highlight"
                  onClick={onOpenStart}
                >
                  <FaMapSigns fontSize={30} />
                  <Text ml="10px">Comece aqui</Text>
                </Button>
              </Flex>
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
                  boxSize={{ base: '100%', lg: '200px' }}
                />
                <Text>Planeta 1</Text>
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
                  boxSize={{ base: '100%', lg: '200px' }}
                  style={
                    responses[1]
                      ? { filter: 'none' }
                      : { filter: 'grayscale(100%)' }
                  }
                />
                <Text color={responses[1] ? 'white' : 'gray'}>Planeta 2</Text>
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
                <Text color={responses[2] ? 'white' : 'gray'}>Planeta 3</Text>
              </Flex>
              <Flex
                onClick={() =>
                  responses[3] ? Router.push(`/trilha/${trailId}/4`) : null
                }
                cursor={responses[3] ? 'pointer' : 'inherit'}
                mr={{ base: 'auto', lg: '180px' }}
                ml={{ base: '180px', lg: 'auto' }}
                direction="column"
                align="center"
              >
                <Image
                  src="/images/planets/4.png"
                  boxSize={{ base: '100%', lg: '240px' }}
                  style={
                    responses[3]
                      ? { filter: 'none' }
                      : { filter: 'grayscale(100%)' }
                  }
                />
                <Text color={responses[3] ? 'white' : 'gray'}>Planeta 4</Text>
              </Flex>
            </Flex>
          )}
          <Box w="400px" display={{ base: 'none', xl: 'block' }}>
            {trail && <TrailInfo status={30} trail={trail} team={team} />}
            <Ranking ranking={ranking} teamId={team._id} />
          </Box>
        </Flex>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton />
            <ModalBody>
              {info && trail ? (
                <TrailInfo status={30} trail={trail} team={team} />
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
      <Modal isOpen={isOpenStart} onClose={onCloseStart}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Introdução</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              A partir de agora, vocês começarão uma trilha de aprendizado
              dividida em planetas… os planetas inovadores.
            </Text>
            <br />
            <Text>
              Ao final de cada planeta, você e o seu time serão capazes de
              desempenhar funções necessárias para atingir o ápice de
              desempenho, seja resolvendo um problema dentro de uma empresa ou
              criando a sua própria empresa.
            </Text>
            <br />
            <Text>
              Primeiro, vocês terão que escolher qual desafio irão enfrentar na
              nossa lista de desafios. Irão pensar em como querem resolvê-lo, e
              aí sim começarão a passar pelos planetas a fim de descobrir se
              essa sua ideia é ou não válida e como reproduzir a ideia de
              maneira escalável.
            </Text>
            <br />
            <Text>E aí? Estão prontos para entrar na Galáxia da Inovação?</Text>
            <br />
            <Text>O que será que virá em cada planeta?</Text>
            <br />
            <Text>Bora descobrir?</Text>
            <br />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="pink" mr={3} onClick={onCloseStart}>
              Fechar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Layout>
  );
};

export default withAuth(Journey);

export async function getServerSideProps(ctx) {
  try {
    const apiServer = getAPI(ctx);
    const { trailId } = ctx.query;

    const trail = await apiServer.get(`trail/${trailId}`);
    const responses = await apiServer.get(`game-responses/${trailId}`);
    const team = await apiServer.get(`game-team/${trailId}`);
    const ranking = await apiServer.get(`game-ranking/${trailId}`);

    return {
      props: {
        trail: trail.data,
        responses: responses.data,
        team: team.data,
        ranking: ranking.data,
      },
    };
  } catch (err) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
}

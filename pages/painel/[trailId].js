import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Container,
  Text,
  Flex,
  Button,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Heading,
  toast,
  Editable,
  EditableInput,
  EditablePreview,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
} from '@chakra-ui/react';
import Layout from '@components/Layout';
import withAuth from '@components/withAuth';
import Ranking from '@components/Ranking';
import TrailInfo from '@components/TrailInfo';
import { useAuth } from '@contexts/AuthContext';
import api from '@services/api';

const Painel = () => {
  const Router = useRouter();
  const { trailId } = Router.query;
  const { leader } = useAuth();
  const [trail, setTrail] = useState(null);
  const [responses, setResponses] = useState(null);
  const [points, setPoints] = useState('');

  useEffect(() => {
    const getData = async () => {
      await api.get(`trail/${trailId}`).then((res) => setTrail(res.data));
    };

    getData();
  }, [trailId]);

  useEffect(() => {
    const getData = async () => {
      await api
        .get(`game-responses-leader/${trailId}`)
        .then((res) => setResponses(res.data));
    };

    getData();
  }, [trailId]);

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

  const handleTrail = () => {
    console.log('trail ', trail);
  };

  return (
    <Layout profile>
      <Container maxW="container.xl" zIndex="800" pb="100px" minH="89vh">
        <Flex direction="column" m="70px 0">
          <Heading
            fontSize="2.5rem"
            fontWeight="700"
            textAlign="center"
            mb="15px"
          >
            painel da trilha
          </Heading>
          <Button
            maxW="400px"
            mx="auto"
            mb="20px"
            bg="white"
            _hover={{ bg: 'white' }}
            color="highlight"
            onClick={() =>
              copyCodeToClipboard(`http://localhost:3000/t/${trail?.code}`)
            }
          >
            Copiar link da trilha
          </Button>
        </Flex>
        <Flex p="30px" mx="auto" maxW="900px" bg="white">
          <Tabs colorScheme="pink" isFitted w="100%">
            <TabList>
              <Tab color="black">Ranking</Tab>
              <Tab color="black">Respostas</Tab>
              <Tab color="black">Editar</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <Ranking noTitle />
              </TabPanel>
              <TabPanel>
                <Flex direction="column">
                  {responses &&
                    responses.map((item) => (
                      <Flex
                        direction="column"
                        border="1px"
                        borderColor="gray.400"
                        mb="20px"
                        p="20px"
                        borderRadius="4px"
                      >
                        <Text color="black" mb="5px">
                          Resposta: {item.response}
                        </Text>
                        <Flex w="100%">
                          <Flex align="center" mr="20px">
                            <NumberInput
                              min={0}
                              max={100}
                              maxW="80px"
                              color="black"
                              defaultValue={points}
                              onChange={(value) => setPoints(value)}
                            >
                              <NumberInputField />
                            </NumberInput>
                            <Text color="black">/100</Text>
                          </Flex>
                          <Flex w="100%">
                            <Input placeholder="Feedback" />
                          </Flex>
                        </Flex>
                      </Flex>
                    ))}
                </Flex>
              </TabPanel>
              <TabPanel>
                <Flex direction="column" maxW="400px">
                  <FormControl pb="40px">
                    <FormLabel color="black" fontWeight="600" fontSize="1rem">
                      Título da trilha
                    </FormLabel>
                    <Box mb="10px">
                      <Editable
                        border="1px"
                        borderColor="gray.400"
                        borderRadius="4px"
                        color="gray.600"
                        defaultValue={trail?.title}
                        px="10px"
                        py="10px"
                      >
                        <EditablePreview />
                        <EditableInput />
                      </Editable>
                    </Box>
                  </FormControl>
                  <FormControl maxW="400px" pb="40px">
                    <FormLabel color="black" fontWeight="600" fontSize="1rem">
                      Cronograma
                    </FormLabel>
                    <Box mb="10px">
                      <Editable
                        border="1px"
                        borderColor="gray.400"
                        borderRadius="4px"
                        color="gray.600"
                        defaultValue="Take some chakra"
                        px="10px"
                        py="10px"
                      >
                        <EditablePreview />
                        <EditableInput />
                      </Editable>
                    </Box>
                  </FormControl>
                  <Button
                    bg="highlight"
                    _hover={{ bg: 'highlight' }}
                    onClick={handleTrail}
                  >
                    Salvar
                  </Button>
                </Flex>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Flex>
      </Container>
    </Layout>
  );
};

export default withAuth(Painel);

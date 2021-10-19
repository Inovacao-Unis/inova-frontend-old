/* eslint-disable no-underscore-dangle */
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Text,
  Flex,
  Button,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useToast,
  Editable,
  EditableInput,
  EditablePreview,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Textarea,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import Ranking from '@components/Ranking';
import { useAuth } from '@contexts/AuthContext';
import api from '@services/api';
import ModalResponse from '@components/ModalResponse';

const PainelAdmin = ({ trail }) => {
  const { leader } = useAuth();
  const [teams, setTeams] = useState(null);
  const [points, setPoints] = useState(0);
  const [feedback, setFeedback] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [select, setSelect] = useState(null);
  const toast = useToast();

  useEffect(() => {
    const getData = async () => {
      await api
        .get(`painel-teams/${trail._id}`)
        .then((res) => setTeams(res.data));
    };

    if (trail) {
      getData();
    }
  }, [trail, select]);

  const handleTrail = () => {
    console.log('trail ', trail);
  };

  const handleModal = (response) => {
    setSelect(response);
    onOpen();
  };

  const handlePoints = async () => {
    await api
      .post('points', {
        value: points,
        feedback,
        responseId: select._id,
        leaderId: leader,
        trailId: select.trailId,
        teamId: select.teamId,
      })
      .then(() => {
        toast({
          title: 'Resposta avaliada!',
          status: 'success',
          duration: 3000,
        });
        setSelect(null);
        onClose();
      })
      .catch((err) => {
        console.error('Erro: ', err.response.data.error);
        toast({
          title: 'Houve um erro!',
          status: 'error',
          duration: 3000,
        });
      });
  };

  return (
    <Flex p="30px" mx="auto" maxW="900px" bg="white">
      <Tabs colorScheme="pink" isFitted w="100%">
        <TabList>
          <Tab color="black">Ranking</Tab>
          <Tab color="black">Respostas</Tab>
          <Tab color="black">Editar/Excluir</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Ranking noTitle />
          </TabPanel>
          <TabPanel>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Time</Th>
                  <Th textAlign="center">Etapa 1</Th>
                  <Th textAlign="center">Etapa 2</Th>
                  <Th textAlign="center">Etapa 3</Th>
                  <Th textAlign="center">Etapa 4</Th>
                </Tr>
              </Thead>
              <Tbody>
                {teams?.map((team) => (
                  <Tr>
                    <Td color="black">{team.name}</Td>
                    <Td color="black" textAlign="center">
                      <Flex direction="column" w="100%" align="center">
                        {team.responses.find((item) => item.stage === 1) ? (
                          <Text color="black" mb="10px">
                            {team.responses[
                              team.responses.findIndex(
                                (item) => item.stage === 1,
                              )
                            ].points.value || '-'}
                          </Text>
                        ) : (
                          <Text color="black" mb="10px">
                            -
                          </Text>
                        )}
                        {team.responses.find((item) => item.stage === 1) ? (
                          <Button
                            onClick={() =>
                              handleModal(
                                team.responses[
                                  team.responses.findIndex(
                                    (item) => item.stage === 1,
                                  )
                                ],
                              )
                            }
                            size="sm"
                          >
                            Ver
                          </Button>
                        ) : null}
                      </Flex>
                    </Td>
                    <Td color="black" textAlign="center">
                      <Flex direction="column" w="100%" align="center">
                        {team.responses.find((item) => item.stage === 2) ? (
                          <Text color="black" mb="10px">
                            {team.responses[
                              team.responses.findIndex(
                                (item) => item.stage === 2,
                              )
                            ].points?.value || '-'}
                          </Text>
                        ) : (
                          <Text color="black" mb="10px">
                            -
                          </Text>
                        )}
                        {team.responses.find((item) => item.stage === 2) ? (
                          <Button
                            onClick={() =>
                              handleModal(
                                team.responses[
                                  team.responses.findIndex(
                                    (item) => item.stage === 2,
                                  )
                                ],
                              )
                            }
                            size="sm"
                          >
                            Ver
                          </Button>
                        ) : null}
                      </Flex>
                    </Td>
                    <Td color="black" textAlign="center">
                      <Flex direction="column" w="100%" align="center">
                        {team.responses.find((item) => item.stage === 3) ? (
                          <Text color="black" mb="10px">
                            {team.responses[
                              team.responses.findIndex(
                                (item) => item.stage === 3,
                              )
                            ].points?.value || '-'}
                          </Text>
                        ) : (
                          <Text color="black" mb="10px">
                            -
                          </Text>
                        )}
                        {team.responses.find((item) => item.stage === 3) ? (
                          <Button
                            onClick={() =>
                              handleModal(
                                team.responses[
                                  team.responses.findIndex(
                                    (item) => item.stage === 3,
                                  )
                                ],
                              )
                            }
                            size="sm"
                          >
                            Ver
                          </Button>
                        ) : null}
                      </Flex>
                    </Td>
                    <Td color="black" textAlign="center">
                      <Flex direction="column" w="100%" align="center">
                        {team.responses.find((item) => item.stage === 4) ? (
                          <Text color="black" mb="10px">
                            {team.responses[
                              team.responses.findIndex(
                                (item) => item.stage === 4,
                              )
                            ].points?.value || '-'}
                          </Text>
                        ) : (
                          <Text color="black" mb="10px">
                            -
                          </Text>
                        )}
                        {team.responses.find((item) => item.stage === 4) ? (
                          <Button
                            onClick={() =>
                              handleModal(
                                team.responses[
                                  team.responses.findIndex(
                                    (item) => item.stage === 4,
                                  )
                                ],
                              )
                            }
                            size="sm"
                          >
                            Ver
                          </Button>
                        ) : null}
                      </Flex>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Resposta do time</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Flex direction="column">
                    <Text fontWeight="bold">Resposta:</Text>
                    <Text>{select?.response}</Text>
                  </Flex>
                  {select?.points ? (
                    <Flex direction="column">
                      <Text pt="10px" fontWeight="bold">
                        Pontos:
                      </Text>
                      <Text>{select?.points?.value}</Text>
                      <Text pt="10px" fontWeight="bold">
                        Feedback:
                      </Text>
                      <Text>{select?.points?.feedback}</Text>
                    </Flex>
                  ) : (
                    <Flex direction="column">
                      <FormControl pt="15px" w="80px" isRequired id="response">
                        <FormLabel>Pontos</FormLabel>
                        <NumberInput
                          min={0}
                          max={5}
                          value={points}
                          onChange={(value) => setPoints(value)}
                        >
                          <NumberInputField />
                        </NumberInput>
                      </FormControl>
                      <FormControl pt="15px" isRequired id="response">
                        <FormLabel>Feedback</FormLabel>
                        <Textarea
                          value={feedback}
                          onChange={(e) => setFeedback(e.target.value)}
                          placeholder="Digite o feedback para o time"
                        />
                      </FormControl>
                    </Flex>
                  )}
                </ModalBody>

                <ModalFooter>
                  <Button variant="ghost" bg="gray.100" onClick={onClose}>
                    Fechar
                  </Button>
                  {select?.points ? null : (
                    <Button
                      ml="10px"
                      colorScheme="blue"
                      mr={3}
                      onClick={handlePoints}
                    >
                      Salvar
                    </Button>
                  )}
                </ModalFooter>
              </ModalContent>
            </Modal>
          </TabPanel>
          <TabPanel>
            {trail && (
              <Box mt="20px" maxW="400px" mx="auto">
                <Flex direction="column" mx="auto">
                  <FormControl pb="10px">
                    <FormLabel color="black" fontWeight="600" fontSize="1rem">
                      Título da trilha
                    </FormLabel>
                    <Box mb="5px">
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
                  <FormControl pb="20px">
                    <FormLabel color="black" fontWeight="600" fontSize="1rem">
                      Cronograma
                    </FormLabel>
                    <Box mb="10px">
                      <Editable
                        border="1px"
                        maxlength="50"
                        borderColor="gray.400"
                        borderRadius="4px"
                        color="gray.600"
                        defaultValue="Take some chakra"
                        px="10px"
                        py="10px"
                      >
                        <EditablePreview maxW="100%" w="100%" />
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
                <Flex
                  border="1px"
                  borderColor="red"
                  direction="column"
                  maxW="400px"
                  mx="auto"
                  p="10px"
                  mt="80px"
                  borderRadius="4px"
                >
                  <Text color="gray.800" mb="10px">
                    Depois de excluir uma trilha, não há como voltar atrás.
                  </Text>
                  <Button colorScheme="red">Deletar trilha</Button>
                </Flex>
              </Box>
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
};

export default PainelAdmin;

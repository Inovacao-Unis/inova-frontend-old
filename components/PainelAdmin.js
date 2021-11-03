/* eslint-disable no-underscore-dangle */
import { useState, useEffect, useRef } from 'react';
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
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react';
import Ranking from '@components/Ranking';
import { useAuth } from '@contexts/AuthContext';
import api from '@services/api';

const PainelAdmin = ({ trail }) => {
  const Router = useRouter();
  const { leader } = useAuth();
  const [teams, setTeams] = useState(null);
  const [points, setPoints] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [title, setTitle] = useState('');
  const [schedule, setSchedule] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [select, setSelect] = useState(null);
  const toast = useToast();
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const onCloseAlert = () => setIsOpenAlert(false);
  const cancelRef = useRef();

  useEffect(() => {
    if (trail) {
      setTitle(trail.title);
      setSchedule(trail.schedule);
    }
  }, [trail]);

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

  // eslint-disable-next-line consistent-return
  const editTrail = async () => {
    if (title === '' && schedule === '') {
      toast({
        title: 'Por favor, informe o título e cronograma',
        status: 'warning',
        duration: 3000,
      });
      return null;
    }

    if (title === '') {
      toast({
        title: 'Por favor, informe o título',
        status: 'warning',
        duration: 3000,
      });
      return null;
    }

    if (schedule === '') {
      toast({
        title: 'Por favor, informe o cronograma',
        status: 'warning',
        duration: 3000,
      });
      return null;
    }

    await api
      .put(`trail/${trail._id}`, {
        title,
        schedule,
      })
      .then(() =>
        toast({
          title: 'Alterado com sucesso',
          status: 'success',
          duration: 3000,
        }),
      )
      .catch((err) => {
        toast({
          title: 'Houve um erro',
          status: 'error',
          duration: 3000,
        });
        if (err.response) {
          return console.log(err.response.data.error);
        }
        return console.log('Ocorreu um erro. Tente novamente, por favor.');
      });
  };

  const deleteTrail = async () => {
    await api
      .delete(`trail/${trail._id}`)
      .then(() => {
        toast({
          title: 'Trilha deletada',
          status: 'success',
          duration: 3000,
        });
        Router.push('/minha-conta');
      })
      .catch((err) => {
        onCloseAlert();
        toast({
          title: 'Houve um erro',
          status: 'error',
          duration: 3000,
        });
        if (err.response) {
          console.log(err.response.data.error);
        } else {
          console.log('Ocorreu um erro. Tente novamente, por favor.');
        }
      });
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
    <Flex
      p={{ base: '10px', lg: '30px' }}
      mx="auto"
      borderRadius="4px"
      maxW={{ base: '100%', lg: '900px' }}
      bg="white"
    >
      <Tabs
        colorScheme="pink"
        isFitted
        w="100%"
        overflowX={{ base: 'scroll', lg: 'inherit' }}
      >
        <TabList>
          <Tab color="black">Ranking</Tab>
          <Tab color="black">Respostas</Tab>
          <Tab color="black">Editar/Excluir</Tab>
        </TabList>

        <TabPanels>
          <TabPanel p="0">
            <Ranking noTitle />
          </TabPanel>
          <TabPanel p="0">
            {teams?.length > 0 ? (
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
                              ].points?.value || '-'}
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
            ) : (
              <Text textAlign="center" pt="2rem" color="gray.600">
                Nenhum time nessa trilha
              </Text>
            )}
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
          <TabPanel p="0">
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
                        defaultValue={trail.title}
                        px="10px"
                        py="10px"
                      >
                        <EditablePreview maxW="100%" w="100%" />
                        <EditableInput
                          onChange={(e) => setTitle(e.target.value)}
                        />
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
                        maxLength="50"
                        borderColor="gray.400"
                        borderRadius="4px"
                        color="gray.600"
                        defaultValue={trail?.schedule}
                        px="10px"
                        py="10px"
                      >
                        <EditablePreview maxW="100%" w="100%" />
                        <EditableInput
                          onChange={(e) => setSchedule(e.target.value)}
                        />
                      </Editable>
                    </Box>
                  </FormControl>

                  <Button
                    bg="highlight"
                    _hover={{ bg: 'highlight' }}
                    onClick={editTrail}
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
                  <Button
                    colorScheme="red"
                    onClick={() => setIsOpenAlert(true)}
                  >
                    Deletar trilha
                  </Button>
                  <AlertDialog
                    isOpen={isOpenAlert}
                    leastDestructiveRef={cancelRef}
                    onClose={onCloseAlert}
                  >
                    <AlertDialogOverlay>
                      <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                          Deletar trilha
                        </AlertDialogHeader>

                        <AlertDialogBody>Tem certeza?</AlertDialogBody>

                        <AlertDialogFooter>
                          <Button ref={cancelRef} onClick={onCloseAlert}>
                            Cancelar
                          </Button>
                          <Button
                            colorScheme="red"
                            onClick={deleteTrail}
                            ml={3}
                          >
                            Deletar
                          </Button>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialogOverlay>
                  </AlertDialog>
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

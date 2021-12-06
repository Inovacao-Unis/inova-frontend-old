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
  FormHelperText,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Textarea,
  Input,
  Link,
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

const PainelAdmin = ({ trail, teams, ranking, reload, setReload }) => {
  const Router = useRouter();
  const { leader } = useAuth();
  const [points, setPoints] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [title, setTitle] = useState('');
  const [schedule, setSchedule] = useState('');
  const [note, setNote] = useState(null);
  const [users, setUsers] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [select, setSelect] = useState(null);
  const toast = useToast();
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const onCloseAlert = () => setIsOpenAlert(false);
  const cancelRef = useRef();

  useEffect(() => {
    setTitle(trail.title);
    setSchedule(trail.schedule);
  }, [setTitle, setSchedule]);

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
      .then(() => {
        toast({
          title: 'Alterado com sucesso',
          status: 'success',
          duration: 3000,
        });
        setReload(!reload);
      })
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

  // eslint-disable-next-line consistent-return
  const handlePoints = async () => {
    if (!points || !feedback) {
      toast({
        title: 'Por favor, informe os pontos e feedback',
        status: 'error',
        duration: 3000,
      });
      return null;
    }

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
        setPoints(null);
        setFeedback(null);
        toast({
          title: 'Resposta avaliada!',
          status: 'success',
          duration: 3000,
        });
        setReload(!reload);
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

  const convertNote = (usersList) => {
    const newUsersList = [];
    usersList.forEach((user) => {
      const result = (user.points * note) / 100 / 4;
      const userObject = {
        user: user.user,
        points: result,
      };
      newUsersList.push(userObject);
    });
    setUsers(newUsersList);
  };

  const handleUsers = async () => {
    await api.get(`painel-users/${trail._id}`).then((res) => {
      convertNote(res.data);
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
          <Tab color="black">Conversor de notas</Tab>
          <Tab color="black">Editar/Excluir</Tab>
        </TabList>

        <TabPanels>
          <TabPanel
            w={{ base: '100%', lg: '500px' }}
            mx="auto"
            p={{ base: '0', lg: 'var(--chakra-space-4)' }}
          >
            <Ranking ranking={ranking} noTitle />
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
                    <Tr key={team._id}>
                      <Td color="black">
                        <Box>
                          <Text mb="10px">{team.name}</Text>
                          <Box>
                            {team.users?.map((user) => (
                              <Text key={user} fontSize="xs" color="gray.500">
                                {user}
                              </Text>
                            ))}
                          </Box>
                        </Box>
                      </Td>
                      <Td color="black" textAlign="center">
                        <Flex direction="column" w="100%" align="center">
                          {team.responses.find((item) => item.stage === 1) ? (
                            <Text color="black" mb="10px">
                              {team.responses[
                                team.responses.findIndex(
                                  (item) => item.stage === 1,
                                )
                              ].points?.value == null
                                ? '-'
                                : team.responses[
                                    team.responses.findIndex(
                                      (item) => item.stage === 1,
                                    )
                                  ].points?.value}
                            </Text>
                          ) : (
                            <Text color="black" mb="10px">
                              -
                            </Text>
                          )}
                          {team.responses.find((item) => item.stage === 1) ? (
                            <Button
                              onClick={() => {
                                setPoints(null);
                                setFeedback(null);
                                handleModal(
                                  team.responses[
                                    team.responses.findIndex(
                                      (item) => item.stage === 1,
                                    )
                                  ],
                                );
                              }}
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
                              ].points?.value == null
                                ? '-'
                                : team.responses[
                                    team.responses.findIndex(
                                      (item) => item.stage === 2,
                                    )
                                  ].points?.value}
                            </Text>
                          ) : (
                            <Text color="black" mb="10px">
                              -
                            </Text>
                          )}
                          {team.responses.find((item) => item.stage === 2) ? (
                            <Button
                              onClick={() => {
                                setPoints(null);
                                setFeedback(null);
                                handleModal(
                                  team.responses[
                                    team.responses.findIndex(
                                      (item) => item.stage === 2,
                                    )
                                  ],
                                );
                              }}
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
                              ].points?.value == null
                                ? '-'
                                : team.responses[
                                    team.responses.findIndex(
                                      (item) => item.stage === 3,
                                    )
                                  ].points?.value}
                            </Text>
                          ) : (
                            <Text color="black" mb="10px">
                              -
                            </Text>
                          )}
                          {team.responses.find((item) => item.stage === 3) ? (
                            <Button
                              onClick={() => {
                                setPoints(null);
                                setFeedback(null);
                                handleModal(
                                  team.responses[
                                    team.responses.findIndex(
                                      (item) => item.stage === 3,
                                    )
                                  ],
                                );
                              }}
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
                              ].points?.value == null
                                ? '-'
                                : team.responses[
                                    team.responses.findIndex(
                                      (item) => item.stage === 4,
                                    )
                                  ].points?.value}
                            </Text>
                          ) : (
                            <Text color="black" mb="10px">
                              -
                            </Text>
                          )}
                          {team.responses.find((item) => item.stage === 4) ? (
                            <Button
                              onClick={() => {
                                setPoints(null);
                                setFeedback(null);
                                handleModal(
                                  team.responses[
                                    team.responses.findIndex(
                                      (item) => item.stage === 4,
                                    )
                                  ],
                                );
                              }}
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
            ) : null}
            {!(teams?.length > 0) ? (
              <Text textAlign="center" pt="2rem" color="gray.600">
                Nenhum time nessa trilha
              </Text>
            ) : null}
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Resposta do time</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Flex direction="column">
                    <Text fontWeight="bold">Resposta:</Text>
                    <Link href={select?.response} isExternal>
                      <Text color="highlight">{select?.response}</Text>
                    </Link>
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
                        <FormLabel mb="0">Pontos</FormLabel>
                        <FormHelperText mt="0" mb="10px">
                          De 0 até 100
                        </FormHelperText>
                        <NumberInput
                          min={0}
                          max={100}
                          value={points || 0}
                          onChange={(value) => setPoints(value)}
                        >
                          <NumberInputField
                            color={points ? 'black' : 'gray.300'}
                          />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                      </FormControl>
                      <FormControl pt="15px" isRequired id="response">
                        <FormLabel>Feedback</FormLabel>
                        <Textarea
                          value={feedback || ''}
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
            <Box>
              <FormControl pt="15px">
                <FormLabel color="black" mb="0">
                  Nota total dessa atividade:
                </FormLabel>
                <FormHelperText mt="0" mb="10px">
                  Converta os pontos da plataforma para a nota que gostaria de
                  dar.
                </FormHelperText>
                <NumberInput
                  color="black"
                  min={0}
                  max={100}
                  value={note || 0}
                  onChange={(value) => setNote(value)}
                >
                  <NumberInputField color="black" />
                  <NumberInputStepper color="black">
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
              <Button bg="highlight" onClick={handleUsers}>
                Converter
              </Button>
            </Box>
            <Box>
              {users?.length > 0 &&
                users.map((user) => (
                  <Flex>
                    <Text color="black">{user.user}</Text>
                    <Text color="black">{user.points}</Text>
                  </Flex>
                ))}
            </Box>
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

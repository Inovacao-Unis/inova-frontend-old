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
  toast,
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
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [select, setSelect] = useState(null);

  useEffect(() => {
    const getData = async () => {
      await api
        .get(`painel-teams/${trail?._id}`)
        .then((res) => setTeams(res.data));
    };

    getData();
  }, [trail]);

  const handleTrail = () => {
    console.log('trail ', trail);
  };

  const handleModal = (response) => {
    setSelect(response);
    onOpen();
  };

  return (
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
                <ModalHeader>Modal Title</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Text>Resposta: {select?.response}</Text>
                </ModalBody>

                <ModalFooter>
                  <Button colorScheme="blue" mr={3} onClick={onClose}>
                    Close
                  </Button>
                  <Button variant="ghost">Secondary Action</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
            <Flex direction="column">
              {teams?.map((team) => (
                <Flex>
                  <Text color="black">{team.name}</Text>
                  <Flex>
                    {team.responses.find((item) => item.stage === 1) ? (
                      <Text color="black">
                        {
                          team.responses[
                            team.responses.findIndex((item) => item.stage === 1)
                          ].response
                        }
                      </Text>
                    ) : (
                      <Text color="black">-</Text>
                    )}
                  </Flex>
                  <Flex>
                    {team.responses.find((item) => item.stage === 2) ? (
                      <Text color="black">
                        {
                          team.responses[
                            team.responses.findIndex((item) => item.stage === 2)
                          ].response
                        }
                      </Text>
                    ) : (
                      <Text color="black">-</Text>
                    )}
                  </Flex>
                  <Flex>
                    {team.responses.find((item) => item.stage === 3) ? (
                      <Text color="black">
                        {
                          team.responses[
                            team.responses.findIndex((item) => item.stage === 3)
                          ].response
                        }
                      </Text>
                    ) : (
                      <Text color="black">-</Text>
                    )}
                  </Flex>
                  <Flex>
                    {team.responses.find((item) => item.stage === 4) ? (
                      <Text color="black">
                        {
                          team.responses[
                            team.responses.findIndex((item) => item.stage === 4)
                          ].response
                        }
                      </Text>
                    ) : (
                      <Text color="black">-</Text>
                    )}
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
  );
};

export default PainelAdmin;

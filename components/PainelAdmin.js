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
} from '@chakra-ui/react';
import Ranking from '@components/Ranking';
import { useAuth } from '@contexts/AuthContext';
import api from '@services/api';

const PainelAdmin = ({ trail }) => {
  const { leader } = useAuth();
  const [teams, setTeams] = useState(null);

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
                      <Text color="black">Não</Text>
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
                      <Text color="black">Não</Text>
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
                      <Text color="black">Não</Text>
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
                      <Text color="black">Não</Text>
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

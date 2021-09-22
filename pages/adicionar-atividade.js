import { useState, useEffect } from 'react';
import api from '@services/api';
import Layout from '@components/Layout';
import withAuth from '@components/withAuth';
import Link from 'next/link';
import {
  Container,
  Heading,
  Flex,
  Text,
  Button,
  Box,
  Stack,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react';

const adicionarAtividade = () => {
  const [activities, setActivities] = useState([]);
  const [checkedItems, setCheckedItems] = useState([false, false]);

  const allChecked = checkedItems.every(Boolean);
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked;

  return (
    <Layout>
      <Container maxW="container.xl" zIndex="800" pb="100px">
        <Heading
          fontSize="2.5rem"
          fontWeight="700"
          textAlign="center"
          m="100px auto"
        >
          adicionar atividade
        </Heading>
        <Flex direction="column">
          <FormControl>
            <FormLabel>Título</FormLabel>
            <Input placeholder="Título da atividade" />
          </FormControl>
          <Box>
            <Checkbox
              isChecked={allChecked}
              isIndeterminate={isIndeterminate}
              onChange={(e) =>
                setCheckedItems([e.target.checked, e.target.checked])
              }
            >
              Todos
            </Checkbox>
          </Box>
          <Flex>
            <Box>
              <Checkbox
                isChecked={allChecked}
                isIndeterminate={isIndeterminate}
                onChange={(e) =>
                  setCheckedItems([e.target.checked, e.target.checked])
                }
              >
                Saúde
              </Checkbox>
              <Stack pl={6} mt={1} spacing={1}>
                <Checkbox
                  isChecked={checkedItems[0]}
                  onChange={(e) =>
                    setCheckedItems([e.target.checked, checkedItems[1]])
                  }
                >
                  Atendimento em hospitais
                </Checkbox>
                <Checkbox
                  isChecked={checkedItems[1]}
                  onChange={(e) =>
                    setCheckedItems([checkedItems[0], e.target.checked])
                  }
                >
                  Tratamento em clínicas
                </Checkbox>
              </Stack>
            </Box>
            <Box>
              <Checkbox
                isChecked={allChecked}
                isIndeterminate={isIndeterminate}
                onChange={(e) =>
                  setCheckedItems([e.target.checked, e.target.checked])
                }
              >
                Engenharia
              </Checkbox>
              <Stack pl={6} mt={1} spacing={1}>
                <Checkbox
                  isChecked={checkedItems[0]}
                  onChange={(e) =>
                    setCheckedItems([e.target.checked, checkedItems[1]])
                  }
                >
                  Desafio 1
                </Checkbox>
                <Checkbox
                  isChecked={checkedItems[1]}
                  onChange={(e) =>
                    setCheckedItems([checkedItems[0], e.target.checked])
                  }
                >
                  Desafio 2
                </Checkbox>
              </Stack>
            </Box>

            <Box>
              <Checkbox
                isChecked={allChecked}
                isIndeterminate={isIndeterminate}
                onChange={(e) =>
                  setCheckedItems([e.target.checked, e.target.checked])
                }
              >
                Gestão
              </Checkbox>
              <Stack pl={6} mt={1} spacing={1}>
                <Checkbox
                  isChecked={checkedItems[0]}
                  onChange={(e) =>
                    setCheckedItems([e.target.checked, checkedItems[1]])
                  }
                >
                  Desafio 1
                </Checkbox>
                <Checkbox
                  isChecked={checkedItems[1]}
                  onChange={(e) =>
                    setCheckedItems([checkedItems[0], e.target.checked])
                  }
                >
                  Desafio 2
                </Checkbox>
              </Stack>
            </Box>
          </Flex>
        </Flex>
      </Container>
    </Layout>
  );
};

export default withAuth(adicionarAtividade);

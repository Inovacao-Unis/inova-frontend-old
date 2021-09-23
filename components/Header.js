import { useState, useEffect } from 'react';
import {
  Flex,
  Container,
  Box,
  Image,
  Spacer,
  List,
  ListItem,
  Center,
  Text,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
} from '@chakra-ui/react';
import api from '@services/api';
import { BellIcon, AddIcon } from '@chakra-ui/icons';
import Link from 'next/link';
import { useRouter } from 'next/router';
import firebase from '../lib/firebase';

export default function Header({ profile, activityBtn }) {
  const Router = useRouter();
  const { activityId } = Router.query;
  const [team, setTeam] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [challenges, setChallenges] = useState([]);
  const [challengesChecked, setChallengesChecked] = useState([]);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const getData = async () => {
      await api.get(`game-team/${activityId}`).then((res) => setTeam(res.data));
    };

    getData();
  }, [activityId]);

  const getChallenges = async () => {
    await api.get('challenges').then((res) => setChallenges(res.data));
  };

  const handleModal = () => {
    getChallenges();
    onOpen();
  };

  const teste = () => {
    console.log('challenges ', challengesChecked);
  };

  return (
    <Box
      borderBottom="solid 0.5px rgba(255, 255, 255, 0.13)"
      zIndex="999"
      py="10px"
    >
      <Container maxW="container.xl">
        <Flex>
          <Center cursor="pointer" onClick={() => Router.push('/minha-conta')}>
            <Box maxWidth="150">
              <Image src="/images/logo.png" alt="Logo UaiInovei" />
            </Box>
          </Center>
          <Spacer />
          {profile ? (
            <Flex align="center">
              <Flex align="center" mr="3rem">
                <Box maxW="25px" mr="0.5rem">
                  <Image src="/images/pointIcon.png" alt="Ícone dos pontos" />
                </Box>
                <Text fontSize="1.2rem" color="#fec739">
                  {team.points}
                </Text>
              </Flex>
              <Popover zIndex="999">
                <PopoverTrigger>
                  <BellIcon mr="1.5rem" w={8} h={8} cursor="pointer" />
                </PopoverTrigger>
                <PopoverContent
                  zIndex="999"
                  mt="2"
                  color="gray.600"
                  borderColor="#fff"
                  _focus={{
                    boxShadow: '0 0 0 3px rgba(0, 0, 0, 0.3)',
                    outline: '2px solid transparent',
                  }}
                >
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverHeader fontWeight="bold">Notificações</PopoverHeader>
                  <PopoverBody zIndex="999">
                    <List>
                      <ListItem fontSize=".9rem" py=".8rem">
                        Você completou sua jornada!
                      </ListItem>
                      <ListItem fontSize=".9rem" py=".8rem">
                        Você ganhou 30 pontos!
                      </ListItem>
                      <ListItem fontSize=".9rem" py=".8rem">
                        Você ganhou 20 pontos!
                      </ListItem>
                      <ListItem fontSize=".9rem" py=".8rem">
                        Você ganhou 30 pontos!
                      </ListItem>
                      <ListItem fontSize=".9rem" py=".8rem">
                        Você ganhou 20 pontos!
                      </ListItem>
                      <ListItem fontSize=".9rem" py=".8rem">
                        Você começou uma nova jornada!
                      </ListItem>
                    </List>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
              <Menu>
                <MenuButton zIndex="999">
                  <Avatar name="Nome perfil" src="/images/zebra.jpg" />
                </MenuButton>
                <MenuList zIndex="999">
                  <MenuItem color="highlight">
                    <Link href="/minha-conta">
                      <a>Minhas atividades</a>
                    </Link>
                  </MenuItem>
                  <MenuItem color="highlight">
                    <Link href="/perfil">
                      <a>Perfil</a>
                    </Link>
                  </MenuItem>
                  <MenuItem color="highlight">
                    <Link href="/editar-perfil">
                      <a>Configurações</a>
                    </Link>
                  </MenuItem>
                  <MenuItem
                    color="highlight"
                    onClick={async () => {
                      await firebase.auth().signOut();
                      window.location.href = '/';
                    }}
                  >
                    Sair
                  </MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          ) : null}
          {activityBtn && (
            <Flex>
              <Menu>
                <MenuButton
                  zIndex="999"
                  bg="white"
                  color="black"
                  w="40px"
                  h="40px"
                  borderRadius="5px"
                >
                  <AddIcon color="gray.900" />
                </MenuButton>
                <MenuList zIndex="999">
                  <MenuItem color="gray.600">
                    <Link href="/minha-conta">
                      <a>Criar atividade</a>
                    </Link>
                  </MenuItem>
                  <MenuItem color="gray.600">
                    <Flex>
                      <Button onClick={handleModal}>Criar atividade</Button>

                      <Modal isOpen={isOpen} onClose={onClose} size="6xl">
                        <ModalOverlay />
                        <ModalContent>
                          <ModalHeader>Modal Title</ModalHeader>
                          <ModalCloseButton />
                          <ModalBody>
                            <FormControl>
                              <FormLabel>Título da atividade</FormLabel>
                              <Input placeholder="Digite o título" />
                            </FormControl>
                            <Button onClick={teste}>Teste aqui</Button>
                            <Button onClick={() => setChecked(true)}>
                              Marcar todos
                            </Button>
                            <Flex justify="space-between">
                              {challenges &&
                                challenges.map((category) => (
                                  <Box>
                                    <Checkbox
                                      isChecked={checked}
                                      onChange={(e) =>
                                        setChecked(e.target.checked)
                                      }
                                    >
                                      <Text fontWeight="bold" fontSize="1.1rem">
                                        {category.title}
                                      </Text>
                                    </Checkbox>
                                    <Stack pl={6} mt={1} spacing={1}>
                                      {category.challenges.map((challenge) => (
                                        <Checkbox
                                          isChecked={checked}
                                          onChange={(e) => {
                                            // setChecked(e.target.checked);
                                            // setChallengesChecked((arr) => [
                                            //   ...arr,
                                            //   challenge,
                                            // ]);
                                            console.log('e', e);
                                          }}
                                        >
                                          {challenge.title}
                                        </Checkbox>
                                      ))}
                                    </Stack>
                                  </Box>
                                ))}
                            </Flex>
                          </ModalBody>
                          <ModalFooter>
                            <Button mr={3} variant="ghost" onClick={onClose}>
                              Fechar
                            </Button>
                            <Button colorScheme="blue">Adicionar</Button>
                          </ModalFooter>
                        </ModalContent>
                      </Modal>
                    </Flex>
                  </MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          )}
        </Flex>
      </Container>
    </Box>
  );
}

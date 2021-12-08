/* eslint-disable no-underscore-dangle */
import { useState, useEffect, useRef } from 'react';
import {
  Flex,
  Container,
  Box,
  Image,
  Spacer,
  Center,
  Text,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  MenuDivider,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useToast,
} from '@chakra-ui/react';
import api from '@services/api';
import { useAuth } from '@contexts/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/router';
import firebase from '../lib/firebase';

export default function Header({ profile, activityBtn, painel }) {
  const Router = useRouter();
  const { trailId } = Router.query;
  const { user, leader, isAuthenticated } = useAuth();
  const [team, setTeam] = useState({});
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const onCloseAlert = () => setIsOpenAlert(false);
  const cancelRef = useRef();
  const toast = useToast();

  useEffect(() => {
    const getData = async () => {
      await api
        .get(`game-team/${trailId}`)
        .then((res) => {
          setTeam(res.data);
        })
        .catch((err) => {
          if (err.response) {
            return console.log(err.response.data.error);
          }
          return console.log('Ocorreu um erro. Tente novamente, por favor.');
        });
    };

    if (trailId && !painel) {
      getData();
    }
  }, [trailId, user]);

  const deleteAccount = async () => {
    await user
      .delete()
      .then(() => {
        toast({
          title: 'Conta deletada',
          status: 'success',
          duration: 3000,
        });
        Router.push('/');
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

  return (
    <Box
      borderBottom="solid 0.5px rgba(255, 255, 255, 0.13)"
      zIndex="999"
      py="10px"
    >
      <Container maxW="container.xl">
        <Flex>
          <Center
            cursor="pointer"
            onClick={() => {
              if (isAuthenticated) {
                Router.push('/minha-conta');
              }
            }}
          >
            <Box maxWidth="100px">
              <Image src="/images/logo.png" alt="Logo UaiInovei" />
            </Box>
          </Center>
          <Spacer />
          {profile ? (
            <Flex align="center">
              <Flex align="center" mr={{ base: '20px', lg: '3rem' }}>
                <Box maxW="25px" mr="0.5rem">
                  <Image src="/images/pointIcon.png" alt="Ícone dos pontos" />
                </Box>
                <Text fontSize="1.2rem" color="white">
                  {team?.points || '0'}
                </Text>
              </Flex>
              {/* <Popover zIndex="999">
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
              </Popover> */}
              <Menu>
                <MenuButton zIndex="999">
                  <Avatar src={team.avatar} bg="transparent" size="md" />
                </MenuButton>
                <MenuList zIndex="999">
                  <MenuItem color="highlight">
                    <Link href="/minha-conta">
                      <a>Minhas trilhas</a>
                    </Link>
                  </MenuItem>
                  <MenuItem color="highlight">
                    <Link href={`/time/${trailId}`}>
                      <a>Área do Time</a>
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
            <Flex align="center">
              {leader && (
                <Box>
                  <Link href="/adicionar-trilha">
                    <a>
                      <Button
                        bgColor="highlight"
                        color="white"
                        _hover={{ bg: 'highlight' }}
                        fontSize={['.8rem', '1rem']}
                      >
                        Criar trilha
                      </Button>
                    </a>
                  </Link>
                </Box>
              )}
              <Menu>
                <MenuButton zIndex="999" ml={['10px', '30px']}>
                  <Avatar src={user?.photoURL} bg="transparent" size="md" />
                </MenuButton>
                <MenuList zIndex="999">
                  <Box p=".8rem">
                    <Text color="gray.700">{user?.displayName}</Text>
                    <Text color="gray.700" fontSize=".9rem">
                      {user?.email}
                    </Text>
                  </Box>
                  <MenuItem
                    justifyContent="center"
                    onClick={() => setIsOpenAlert(true)}
                  >
                    <Box
                      bg="black"
                      py="2px"
                      w="100%"
                      fontSize=".9rem"
                      textAlign="center"
                      borderRadius="4px"
                    >
                      Deletar conta
                    </Box>
                  </MenuItem>
                  <AlertDialog
                    isOpen={isOpenAlert}
                    leastDestructiveRef={cancelRef}
                    onClose={onCloseAlert}
                  >
                    <AlertDialogOverlay>
                      <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                          Deletar conta
                        </AlertDialogHeader>

                        <AlertDialogBody>Tem certeza?</AlertDialogBody>

                        <AlertDialogFooter>
                          <Button ref={cancelRef} onClick={onCloseAlert}>
                            Cancelar
                          </Button>
                          <Button
                            colorScheme="red"
                            onClick={deleteAccount}
                            ml={3}
                          >
                            Deletar
                          </Button>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialogOverlay>
                  </AlertDialog>
                  <MenuDivider />
                  <MenuItem
                    justifyContent="center"
                    border="1px"
                    borderRadius="3px"
                    maxW="100px"
                    mx="auto"
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
          )}
          {painel && (
            <Link href="/minha-conta">
              <a>
                <Button
                  bgColor="highlight"
                  color="white"
                  _hover={{ bg: 'highlight' }}
                >
                  Voltar
                </Button>
              </a>
            </Link>
          )}
        </Flex>
      </Container>
    </Box>
  );
}

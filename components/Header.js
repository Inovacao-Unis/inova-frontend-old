/* eslint-disable no-underscore-dangle */
import { useState, useEffect } from 'react';
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
} from '@chakra-ui/react';
import api from '@services/api';
import { useAuth } from '@contexts/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/router';
import firebase from '../lib/firebase';

export default function Header({ profile, activityBtn, painel }) {
  const Router = useRouter();
  const { trailId } = Router.query;
  const { leader } = useAuth();
  const [team, setTeam] = useState({});

  useEffect(() => {
    const getData = async () => {
      await api.get(`game-team/${trailId}`).then((res) => setTeam(res.data));
    };

    if (trailId) {
      getData();
    }
  }, [trailId]);

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
                <Text fontSize="1.2rem" color="white">
                  {team?.points?.value || '0'}
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
                  {team?.avatar && (
                    <Avatar
                      name="Nome perfil"
                      src={team.avatar}
                      bg="transparent"
                      size="md"
                    />
                  )}
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
              <Box ml={['10px', '30px']}>
                <Button
                  fontSize={['.8rem', '1rem']}
                  color="black"
                  onClick={async () => {
                    await firebase.auth().signOut();
                    window.location.href = '/';
                  }}
                >
                  Sair
                </Button>
              </Box>
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

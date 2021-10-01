/* eslint-disable no-underscore-dangle */
import { useState, useEffect } from 'react';
import api from '@services/api';
import Layout from '@components/Layout';
import { useAuth } from '@contexts/AuthContext';
import withAuth from '@components/withAuth';
import Link from 'next/link';
import { Container, Heading, Flex, Text, Button } from '@chakra-ui/react';

const minhaConta = () => {
  const { user, leader } = useAuth();
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const getData = async () => {
      await api.get('game-activities').then((res) => setActivities(res.data));
    };

    getData();
  }, [setActivities]);

  return (
    <Layout activityBtn>
      <Container maxW="container.xl" zIndex="800" pb="100px">
        <Heading
          fontSize="2.5rem"
          fontWeight="700"
          textAlign="center"
          m="100px auto"
        >
          minhas trilhas
        </Heading>
        <Flex justify="space-between" wrap="wrap">
          {activities && activities.length > 0 ? (
            activities.map((activity) => (
              <Flex
                key={activity.team._id}
                direction="column"
                justify="center"
                align="center"
                textAlign="center"
                borderRadius="10px"
                my="40px"
                h="300px"
                w="250px"
                mx="auto"
                bgColor="white"
                color="black"
              >
                <Flex direction="column" p="40px">
                  <Text
                    fontSize="1.4rem"
                    lineHeight="20px"
                    fontWeight="700"
                    mb="16px"
                  >
                    {activity.title}
                  </Text>
                  {activity &&
                  user &&
                  activity.team.users.includes(user.uid) ? (
                    <Link href={`/trilha/${activity._id}`}>
                      <Button
                        bgColor="highlight"
                        color="white"
                        _hover={{ bg: 'highlight' }}
                        mb="5px"
                      >
                        Acessar
                      </Button>
                    </Link>
                  ) : null}
                  {activity && leader && activity.leaderId === leader ? (
                    <Link href="#">
                      <Button
                        border="2px"
                        borderColor="highlight"
                        bg="white"
                        color="highlight"
                        _hover={{ bg: 'white' }}
                      >
                        Gerenciar
                      </Button>
                    </Link>
                  ) : null}
                </Flex>
              </Flex>
            ))
          ) : (
            <Text>Nenhuma jornada</Text>
          )}
        </Flex>
      </Container>
    </Layout>
  );
};

export default withAuth(minhaConta);

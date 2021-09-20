import { useState, useEffect } from 'react';
import api from '@services/api';
import Layout from '@components/Layout';
import withAuth from '@components/withAuth';
import Link from 'next/link';
import {
  Container,
  Heading,
  Flex,
  Grid,
  Image,
  Text,
  Button,
} from '@chakra-ui/react';

const minhaConta = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const getData = async () => {
      await api.get('game-activities').then((res) => setActivities(res.data));
    };

    getData();
  }, []);

  return (
    <Layout profile>
      <Container maxW="container.xl" zIndex="800">
        <Heading
          fontSize="2.5rem"
          fontWeight="700"
          textAlign="center"
          m="100px auto"
        >
          minhas atividades
        </Heading>
        <Grid
          templateColumns="repeat(auto-fit, minmax(275px, 300px))"
          gap="100px"
        >
          {activities && activities.length > 0 ? (
            activities.map((activity) => (
              // eslint-disable-next-line no-underscore-dangle
              <Link key={activity._id} href={`/atividade/${activity._id}`}>
                <Flex
                  direction="column"
                  justify="center"
                  align="center"
                  textAlign="center"
                  borderRadius="10px"
                  my="40px"
                  h="300px"
                  mx="auto"
                  bgColor="white"
                  color="black"
                  cursor="pointer"
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
                    <Button
                      bgColor="highlight"
                      color="white"
                      _hover={{ bg: 'highlight' }}
                    >
                      Acessar
                    </Button>
                  </Flex>
                </Flex>
              </Link>
            ))
          ) : (
            <Text>Nenhuma jornada</Text>
          )}
        </Grid>
      </Container>
    </Layout>
  );
};

export default withAuth(minhaConta);

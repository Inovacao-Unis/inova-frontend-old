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
  const [journeys, setJourneys] = useState([]);

  useEffect(() => {
    const getData = async () => {
      await api.get('journeys').then((res) => setJourneys(res.data));
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
          minhas jornadas
        </Heading>
        <Grid
          templateColumns="repeat(auto-fit, minmax(275px, 300px))"
          gap="100px"
        >
          {journeys && journeys.length > 0 ? (
            journeys.map((journey) => (
              // eslint-disable-next-line no-underscore-dangle
              <Link key={journey._id} href={`/jornada/${journey.slug}`}>
                <Flex
                  direction="column"
                  justify="center"
                  align="center"
                  textAlign="center"
                  borderRadius="10px"
                  mt="10px"
                  mb="80px"
                  mx="auto"
                  bgColor="white"
                  color="black"
                  cursor="pointer"
                >
                  <Image
                    src={
                      journey?.image
                        ? journey.image
                        : '/images/journey-placeholder.jpg'
                    }
                    alt="Imagem da jornada"
                    borderRadius="10px 10px 0 0"
                    minH="196px"
                  />
                  <Flex direction="column" p="40px">
                    <Text
                      fontSize="1.4rem"
                      lineHeight="20px"
                      fontWeight="700"
                      mb="16px"
                    >
                      {journey.title}
                    </Text>
                    <Text lineHeight="130%" mb="16px" minH="64px" maxH="8rem">
                      {journey.description}
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

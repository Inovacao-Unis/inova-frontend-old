import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Container, Flex, Button, Heading, toast } from '@chakra-ui/react';
import Layout from '@components/Layout';
import withAuth from '@components/withAuth';
import PainelAdmin from '@components/PainelAdmin';
import api from '@services/api';

const Painel = () => {
  const Router = useRouter();
  const { trailId } = Router.query;
  const [trail, setTrail] = useState(null);

  useEffect(() => {
    const getData = async () => {
      await api.get(`trail/${trailId}`).then((res) => setTrail(res.data));
    };

    getData();
  }, [trailId]);

  const copyCodeToClipboard = (url) => {
    navigator.clipboard.writeText(url);

    toast({
      title: 'Link copiado',
      position: 'bottom-left',
      status: 'success',
      duration: 9000,
      isClosable: true,
    });
  };

  return (
    <Layout profile>
      <Container maxW="container.xl" zIndex="800" pb="100px" minH="89vh">
        <Flex direction="column" m="70px 0">
          <Heading
            fontSize="2.5rem"
            fontWeight="700"
            textAlign="center"
            mb="15px"
          >
            painel da trilha
          </Heading>
          <Button
            maxW="400px"
            mx="auto"
            mb="20px"
            bg="white"
            _hover={{ bg: 'white' }}
            color="highlight"
            onClick={() =>
              copyCodeToClipboard(`http://localhost:3000/t/${trail?.code}`)
            }
          >
            Copiar link da trilha
          </Button>
        </Flex>
        <PainelAdmin trail={trail} />
      </Container>
    </Layout>
  );
};

export default withAuth(Painel);

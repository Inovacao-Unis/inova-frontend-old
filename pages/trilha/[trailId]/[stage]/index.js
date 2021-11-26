/* eslint-disable react/no-danger */
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Container, Box, Text } from '@chakra-ui/react';
import Link from 'next/link';
// import ReactMarkdown from 'react-markdown';
import Short from '@components/Short';
import api from '@services/api';
import um from '@content/um.md';
import dois from '@content/dois.md';
import tres from '@content/tres.md';
import quatro from '@content/quatro.md';

import Layout from '@components/Layout';
import { getAPI } from '@services/axios';

export default function BlogPost() {
  const Router = useRouter();
  const { trailId, stage } = Router.query;

  useEffect(() => {
    let isMounted = true;
    const getData = async () => {
      // eslint-disable-next-line consistent-return
      await api.get(`game-responses/${trailId}`).then((res) => {
        const page = Number(stage);
        if (page === 1) {
          return null;
        }
        if (!res.data[page - 1]) {
          // eslint-disable-next-line no-return-assign
          window.location.href = '/minha-conta';
        }
      });
    };

    if (isMounted) {
      getData();
    }
    return () => {
      isMounted = false;
    };
  }, [trailId]);

  function createMarkup(content) {
    if (content === '1') {
      return {
        __html: um,
      };
    }
    if (content === '2') {
      return {
        __html: dois,
      };
    }
    if (content === '3') {
      return {
        __html: tres,
      };
    }

    return {
      __html: quatro,
    };
  }

  return (
    <>
      <Layout profile>
        <Box w="100%" maxW="100%" zIndex="900" pb="5rem">
          <Container
            mt="3rem"
            bgColor="white"
            color="black"
            maxW="800px"
            py="40px"
            px="40px"
            borderRadius="4px"
          >
            <Box mb="30px">
              ←{' '}
              <Link href={`/trilha/${trailId}`}>
                <a>Voltar</a>
              </Link>
            </Box>
            <Text>Planeta {stage}</Text>
            <Box>
              <div
                className="archive"
                dangerouslySetInnerHTML={createMarkup(stage)}
              >
                {/* {stage === '1' && <ReactMarkdown>{um}</ReactMarkdown>}
                {stage === '2' && <ReactMarkdown>{dois}</ReactMarkdown>}
                {stage === '3' && <ReactMarkdown>{tres}</ReactMarkdown>}
                {stage === '4' && (
                  <ReactMarkdown >{quatro}</ReactMarkdown>
                )} */}
              </div>
              <Short stage={stage} trailId={trailId} />
            </Box>
          </Container>
        </Box>
      </Layout>
    </>
  );
}

export async function getServerSideProps(ctx) {
  try {
    const apiServer = getAPI(ctx);
    const { trailId, stage } = ctx.query;

    const res = await apiServer.get(`game-responses/${trailId}`);

    const page = Number(stage);

    if (page === 1) {
      return {
        props: {},
      };
    }
    if (!res.data[page - 1]) {
      return {
        redirect: {
          destination: '/minha-conta',
          permanent: false,
        },
      };
    }

    return {
      props: {},
    };
  } catch (err) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
}

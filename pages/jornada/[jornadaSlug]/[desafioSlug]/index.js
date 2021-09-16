import { useRouter } from 'next/router';
import { Container, Box, Text, Heading } from '@chakra-ui/react';
import Link from 'next/link';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import Short from '@components/Short';

import Layout from '@components/Layout';
import getSlugs from '@utils/getSlugs';

export default function BlogPost() {
  const Router = useRouter();
  const { jornadaSlug } = Router.query;
  return (
    <>
      <Layout profile>
        <Box
          bgColor="white"
          color="black"
          w="100%"
          maxW="100%"
          zIndex="900"
          pb="5rem"
        >
          <Container mt="3rem">
            <Box>
              ←{' '}
              <Link href={`/jornada/${jornadaSlug}`}>
                <a>Voltar</a>
              </Link>
            </Box>
            <Heading>Desafio 01</Heading>
            <Box>
              <div className="archive">
                <ReactMarkdown>Texto aqui</ReactMarkdown>
              </div>
              <Short />
            </Box>
          </Container>
        </Box>
      </Layout>
    </>
  );
}

// export async function getStaticProps({ ...ctx }) {
//   const { slug } = ctx.params;

//   const content = await import(`content/challenges/${slug}.md`);
//   const config = await import(`../../siteconfig.json`);
//   const data = matter(content.default);

//   const { title } = data.data;

//   return {
//     props: {
//       title: config.title,
//       description: config.description,
//       frontmatter: {
//         title,
//       },
//       markdownBody: data.content,
//     },
//   };
// }

// export async function getStaticPaths() {
//   const challengesSlugs = ((context) => getSlugs(context))(
//     require.context('content/challenges', true, /\.md$/),
//   );

//   const paths = challengesSlugs.map((slug) => `/desafio/${slug}`);

//   return {
//     paths, // An array of path names, and any params
//     fallback: false, // so that 404s properly appear if something's not matching
//   };
// }

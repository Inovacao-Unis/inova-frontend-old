import { useRouter } from 'next/router';
import { Container, Box, Text, Heading } from '@chakra-ui/react';
import Link from 'next/link';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import Short from '@components/Short';
import problema from '@content/problema.md';

import Layout from '@components/Layout';
import getSlugs from '@utils/getSlugs';

export default function BlogPost() {
  const Router = useRouter();
  const { trailId, stage } = Router.query;

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
            <Box>
              ←{' '}
              <Link href={`/atividade/${trailId}`}>
                <a>Voltar</a>
              </Link>
            </Box>
            <Heading>Etapa {stage}</Heading>
            <Box>
              <div className="archive">
                <ReactMarkdown>{problema}</ReactMarkdown>
              </div>
              <Short stage={stage} trailId={trailId} />
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

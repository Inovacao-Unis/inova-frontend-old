/* eslint-disable react/no-danger */
import { useRouter } from 'next/router';
import { Container, Box, Heading } from '@chakra-ui/react';
import Link from 'next/link';
//import ReactMarkdown from 'react-markdown';
import Short from '@components/Short';
import um from '@content/um.md';
import dois from '@content/dois.md';
import tres from '@content/tres.md';
import quatro from '@content/quatro.md';

import Layout from '@components/Layout';

export default function BlogPost() {
  const Router = useRouter();
  const { trailId, stage } = Router.query;

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
            <Box mb="10px">
              ←{' '}
              <Link href={`/trilha/${trailId}`}>
                <a>Voltar</a>
              </Link>
            </Box>
            <Heading>Planeta {stage}</Heading>
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

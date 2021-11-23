import { Container, Box, Flex, Center, Link } from '@chakra-ui/react';
import { FaInstagram, FaYoutube, FaRegEnvelope } from 'react-icons/fa';

export default function Footer() {
  return (
    <Box borderTop="1px" borderColor="gray.600">
      <Container maxW="container.xl">
        <Center py="20px">
          <Flex w="100%" maxW="200px" justify="space-between">
            <Link href="https://www.instagram.com/uaiinovei/" isExternal>
              <FaInstagram size="1.2em" />
            </Link>
            <Link
              href="https://www.youtube.com/channel/UCxxK7gTgTU8-leEJ1pU7zXQ"
              isExternal
            >
              <FaYoutube size="1.2em" />
            </Link>
            <Link href="mailto:inovacao@unis.edu.br" isExternal>
              <FaRegEnvelope size="1.2em" />
            </Link>
          </Flex>
        </Center>
      </Container>
    </Box>
  );
}

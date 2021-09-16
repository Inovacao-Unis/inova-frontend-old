import { Container, Box, Center, Text } from '@chakra-ui/react';

export default function Footer() {
  return (
    <Box borderTop="1px" borderColor="gray.600">
      <Container maxW="container.xl">
        <Center py="15px">
          <Text>Redes Sociais</Text>
        </Center>
      </Container>
    </Box>
  );
}

import { Flex, Text } from '@chakra-ui/react';

export default function Custom404() {
  return (
    <Flex
      justify="center"
      align="center"
      w="100%"
      h="100vh"
      p={4}
      color="white"
    >
      <Text fontSize="2xl">Ops! Houve um erro.</Text>
    </Flex>
  );
}

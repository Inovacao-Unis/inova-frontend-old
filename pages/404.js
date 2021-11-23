import { useEffect } from 'react';
import Router from 'next/router';
import { Flex, Text } from '@chakra-ui/react';

export default function Custom404() {
  useEffect(() => {
    const redirect = Router.push('/');
    return redirect;
  }, [Router]);

  return (
    <Flex
      justify="center"
      align="center"
      w="100%"
      h="100vh"
      p={4}
      color="white"
    >
      <Text fontSize="2xl">Ops! Essa página não existe.</Text>
    </Flex>
  );
}

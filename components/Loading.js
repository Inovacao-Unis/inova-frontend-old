import { Box, Center, CircularProgress } from '@chakra-ui/react';

export default function Loading() {
  return (
    <Box h="100vh" w="100%">
      <Box
        id="main"
        backgroundColor="var(--wine)"
        color="var(--white)"
        overflow="hidden"
        zIndex="1"
      >
        <div id="stars" />
        <div id="stars2" />
        <div id="stars3" />
        <Center h="100vh">
          <CircularProgress
            isIndeterminate
            value={30}
            size="120px"
            color="highlight"
          />
        </Center>
      </Box>
    </Box>
  );
}

import { Box, Flex } from '@chakra-ui/react';
import Header from './Header';
import Footer from './Footer';

function Layout({ children, noHeader, profile, activityBtn }) {
  return (
    <Box>
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
        <Flex flexDirection="column" w="100%" zIndex="888">
          {noHeader ? null : (
            <Header profile={profile} activityBtn={activityBtn} />
          )}
          {children}
          <Footer />
        </Flex>
      </Box>
    </Box>
  );
}

export default Layout;

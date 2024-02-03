import { Heading, Link as ChakraLink, VStack, Box, useBreakpointValue } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import './ErrorPage.scss';

const ErrorPage = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box className={`${isMobile ? 'errorMobile' : 'errorDesktop'}`}>
      <Box className='errorTop'></Box>
      <VStack className='errorWrapper'>
        <Heading>Oops, something went wrong!</Heading>
        <ChakraLink as={ReactRouterLink} to='/'>
          Go back to startpage
        </ChakraLink>
      </VStack>
    </Box>
  );
};

export default ErrorPage;

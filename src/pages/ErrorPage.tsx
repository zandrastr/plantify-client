import { Heading, Image, Link as ChakraLink, VStack } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <VStack>
      <Image boxSize='150px' src='' fallbackSrc='https://via.placeholder.com/150' alt='' />
      <Heading>Oops, something went wrong!</Heading>

      <ChakraLink textDecoration='underline' as={ReactRouterLink} to='/'>
        Go back to startpage
      </ChakraLink>
    </VStack>
  );
};

export default ErrorPage;

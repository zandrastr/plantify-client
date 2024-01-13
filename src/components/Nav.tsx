import { Link as ReactRouterLink } from 'react-router-dom';
import { Link as ChakraLink, HStack } from '@chakra-ui/react';

export const Nav = () => {
  return (
    <HStack spacing='20px'>
      <ChakraLink as={ReactRouterLink} to='/'>
        Home
      </ChakraLink>
      <ChakraLink as={ReactRouterLink} to='/profile'>
        Profile
      </ChakraLink>
      <ChakraLink as={ReactRouterLink} to='/favorites'>
        Favorites
      </ChakraLink>
      <ChakraLink as={ReactRouterLink} to='/about'>
        About
      </ChakraLink>
      <ChakraLink as={ReactRouterLink} to='/login'>
        Login
      </ChakraLink>
      <ChakraLink as={ReactRouterLink} to='/'>
        Logout
      </ChakraLink>
    </HStack>
  );
};

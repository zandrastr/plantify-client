import { Link as ReactRouterLink } from 'react-router-dom';
import { Link as ChakraLink, HStack } from '@chakra-ui/react';
import { useContext } from 'react';
import { IUserContext, UserContext } from '../contexts/userContext';

export const Nav = () => {
  const { logout, isLoggedIn } = useContext(UserContext) as IUserContext;

  return (
    <>
      <HStack spacing='20px'>
        {isLoggedIn && (
          <>
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
            <ChakraLink as={ReactRouterLink} to='/' onClick={logout}>
              Logout
            </ChakraLink>
          </>
        )}

        {!isLoggedIn && (
          <>
            <ChakraLink as={ReactRouterLink} to='/'>
              Home
            </ChakraLink>
            <ChakraLink as={ReactRouterLink} to='/about'>
              About
            </ChakraLink>
            <ChakraLink as={ReactRouterLink} to='/login'>
              Login
            </ChakraLink>
          </>
        )}
      </HStack>
    </>
  );
};

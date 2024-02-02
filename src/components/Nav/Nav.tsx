import { Link as ReactRouterLink } from 'react-router-dom';
import { Link as ChakraLink, HStack, Text, useBreakpointValue } from '@chakra-ui/react';
import { useContext } from 'react';
import { IUserContext, UserContext } from '../../contexts/userContext';
import { HamburgerMenu } from '../HamburgerMenu/HamburgerMenu';
import { PiPottedPlant } from 'react-icons/pi';
import './Nav.scss';

export const Nav = () => {
  const { logout, isLoggedIn } = useContext(UserContext) as IUserContext;
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <HStack className='navWrapper' mt={[2, 2, 10]} mb={[2, 2, 10]}>
      <HStack className='logoWrapper'>
        <PiPottedPlant />
        <Text>Plantify</Text>
      </HStack>

      {isMobile && (
        <HStack className='menuWrapperMobile'>
          <HamburgerMenu />
        </HStack>
      )}

      {!isMobile && (
        <HStack className='menuWrapperDesktop' spacing={12}>
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
      )}
    </HStack>
  );
};

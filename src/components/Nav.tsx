import { Link as ReactRouterLink } from 'react-router-dom';
import { Link as ChakraLink, HStack, Text, useBreakpointValue } from '@chakra-ui/react';
import { useContext } from 'react';
import { IUserContext, UserContext } from '../contexts/userContext';
import { HamburgerMenu } from './HamburgerMenu';
import { PiPottedPlant } from 'react-icons/pi';
import { useTheme } from '@chakra-ui/react';

export const Nav = () => {
  const { logout, isLoggedIn } = useContext(UserContext) as IUserContext;
  const isMobile = useBreakpointValue({ base: true, md: false });
  const theme = useTheme();

  return (
    <HStack justify='space-between' fontFamily={theme.fonts.robotoMono} fontSize={18} fontWeight={600} mt={[2, 2, 10]} mb={[2, 2, 10]} maxW='100%'>
      <HStack ml={8}>
        <PiPottedPlant fontSize={28} />
        <Text>Plantify</Text>
      </HStack>

      {isMobile && (
        <HStack m={5}>
          <HamburgerMenu />
        </HStack>
      )}

      {!isMobile && (
        <HStack spacing={8} mr={20}>
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

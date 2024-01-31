import { Link as ReactRouterLink } from 'react-router-dom';
import { Icon, IconButton, Menu, MenuButton, MenuItem, MenuList, Show, VStack } from '@chakra-ui/react';
import { useContext } from 'react';
import { IUserContext, UserContext } from '../contexts/userContext';
import { HamburgerIcon } from '@chakra-ui/icons';
import { FiLogIn, FiLogOut, FiHeart } from 'react-icons/fi';
import { GoHome } from 'react-icons/go';
import { GoInfo } from 'react-icons/go';
import { CgProfile } from 'react-icons/cg';

export const HamburgerMenu = () => {
  const { isLoggedIn } = useContext(UserContext) as IUserContext;

  return (
    <>
      {isLoggedIn && (
        <Menu>
          <MenuButton as={IconButton} aria-label='Options' icon={<HamburgerIcon />} variant='outline' />
          <VStack>
            <MenuList>
              <MenuItem as={ReactRouterLink} to='/'>
                <Icon as={GoHome} mr={2} /> Home
              </MenuItem>

              <MenuItem as={ReactRouterLink} to='/profile'>
                <Icon as={CgProfile} mr={2} /> Profile
              </MenuItem>

              <MenuItem as={ReactRouterLink} to='/favorites'>
                <Icon as={FiHeart} mr={2} /> Favorites
              </MenuItem>

              <MenuItem as={ReactRouterLink} to='/about'>
                <Icon as={GoInfo} mr={2} /> About
              </MenuItem>

              <MenuItem as={ReactRouterLink} to='/login'>
                <Icon as={FiLogOut} mr={2} /> Logout
              </MenuItem>
            </MenuList>
          </VStack>
        </Menu>
      )}

      {!isLoggedIn && (
        <Menu>
          <MenuButton as={IconButton} aria-label='Options' icon={<HamburgerIcon />} variant='outline' />
          <VStack>
            <MenuList>
              <MenuItem as={ReactRouterLink} to='/'>
                <Icon as={GoHome} mr={2} /> Home
              </MenuItem>

              <MenuItem as={ReactRouterLink} to='/about'>
                <Icon as={GoInfo} mr={2} /> About
              </MenuItem>

              <MenuItem as={ReactRouterLink} to='/login'>
                <Icon as={FiLogIn} mr={2} /> Login
              </MenuItem>
            </MenuList>
          </VStack>
        </Menu>
      )}
    </>
  );
};

import { Link as ReactRouterLink } from 'react-router-dom';
import { Icon, IconButton, Menu, MenuButton, MenuItem, MenuList, VStack } from '@chakra-ui/react';
import { useContext } from 'react';
import { IUserContext, UserContext } from '../../contexts/userContext';
import { HamburgerIcon } from '@chakra-ui/icons';
import { FiLogIn, FiLogOut, FiHeart } from 'react-icons/fi';
import { GoHome, GoInfo } from 'react-icons/go';
import { CgProfile } from 'react-icons/cg';
import './HamburgerMenu.scss';

export const HamburgerMenu = () => {
  const { isLoggedIn } = useContext(UserContext) as IUserContext;

  return (
    <>
      {isLoggedIn && (
        <Menu>
          <MenuButton as={IconButton} aria-label='Options' icon={<HamburgerIcon />} variant='outline' />
          <VStack className='hamburgerMenu'>
            <MenuList>
              <MenuItem as={ReactRouterLink} to='/'>
                <Icon as={GoHome} /> Home
              </MenuItem>

              <MenuItem as={ReactRouterLink} to='/profile'>
                <Icon as={CgProfile} /> Profile
              </MenuItem>

              <MenuItem as={ReactRouterLink} to='/favorites'>
                <Icon as={FiHeart} /> Favorites
              </MenuItem>

              <MenuItem as={ReactRouterLink} to='/about'>
                <Icon as={GoInfo} /> About
              </MenuItem>

              <MenuItem as={ReactRouterLink} to='/login'>
                <Icon as={FiLogOut} /> Logout
              </MenuItem>
            </MenuList>
          </VStack>
        </Menu>
      )}

      {!isLoggedIn && (
        <Menu>
          <MenuButton as={IconButton} aria-label='Options' icon={<HamburgerIcon />} variant='outline' />
          <VStack className='hamburgerMenu'>
            <MenuList>
              <MenuItem as={ReactRouterLink} to='/'>
                <Icon as={GoHome} /> Home
              </MenuItem>

              <MenuItem as={ReactRouterLink} to='/about'>
                <Icon as={GoInfo} /> About
              </MenuItem>

              <MenuItem as={ReactRouterLink} to='/login'>
                <Icon as={FiLogIn} /> Login
              </MenuItem>
            </MenuList>
          </VStack>
        </Menu>
      )}
    </>
  );
};

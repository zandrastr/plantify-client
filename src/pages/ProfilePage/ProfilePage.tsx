import { Heading, Text, VStack, Link as ChakraLink, Avatar, HStack, Box } from '@chakra-ui/react';
import { EmailIcon, LockIcon } from '@chakra-ui/icons';
import { useContext } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { IUserContext, UserContext } from '../../contexts/userContext';
import './ProfilePage.scss';

const ProfilePage = () => {
  const { currentUser } = useContext(UserContext) as IUserContext;

  return (
    <>
      <Box className='profileTop'></Box>
      <VStack className='profileWrapper'>
        <Heading>Profile</Heading>

        <Avatar className='avatar' />
        <Text className='profileName'>{currentUser?.name}</Text>

        <Box className='profileTextWrapper'>
          <HStack>
            <EmailIcon />
            <Text>{currentUser?.email}</Text>
          </HStack>

          <HStack>
            <LockIcon />
            <Text>******</Text>
          </HStack>
        </Box>

        <ChakraLink as={ReactRouterLink} to='/profile/edit' className='profileEditBtn'>
          Edit Profile
        </ChakraLink>
      </VStack>
    </>
  );
};

export default ProfilePage;

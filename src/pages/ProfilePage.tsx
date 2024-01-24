import { Heading, Text, VStack, Link as ChakraLink, Avatar, HStack } from '@chakra-ui/react';
import { EmailIcon, LockIcon } from '@chakra-ui/icons';
import { useContext } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { IUserContext, UserContext } from '../contexts/userContext';

const ProfilePage = () => {
  const { currentUser } = useContext(UserContext) as IUserContext;

  return (
    <VStack>
      <Heading>Profile</Heading>

      <Avatar bg='teal.500' />
      <Text>{currentUser?.name}</Text>

      <HStack>
        <EmailIcon />
        <Text>{currentUser?.email}</Text>
      </HStack>

      <HStack>
        <LockIcon />
        <Text>******</Text>
      </HStack>

      <ChakraLink as={ReactRouterLink} to='/profile/edit'>
        Edit Profile
      </ChakraLink>
    </VStack>
  );
};

export default ProfilePage;

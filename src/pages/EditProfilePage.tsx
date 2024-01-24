import { Heading, Text, VStack, FormControl, FormLabel, Input, FormErrorMessage, Button, useToast, Link as ChakraLink } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, Link as ReactRouterLink } from 'react-router-dom';
import { IUserContext, UserContext } from '../contexts/userContext';
import { SubmitHandler, useForm } from 'react-hook-form';
import { updateUser } from '../services/user.services';

interface IEditUserData {
  email: string;
  password: string;
  name: string;
}
interface IFormData extends IEditUserData {
  _id: string;
  repeatPassword: string;
}

const EditProfilePage = () => {
  const { currentUser, updateUserProfile } = useContext(UserContext) as IUserContext;
  const [serverErrorMessage, setServerErrorMessage] = useState<String>('');
  const navigate = useNavigate();
  const toast = useToast();

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
    getValues,
    reset,
  } = useForm<IFormData>();

  useEffect(() => {
    if (currentUser) {
      const defaultFormValues = {
        email: currentUser.email,
        name: currentUser.name,
      };
      reset(defaultFormValues);
    }
  }, [currentUser]);

  const validateRepeatPassword = (value: string) => {
    const password = getValues('password');
    return password === value || 'Passwords do not match';
  };

  const handleToast = () => {
    toast({
      description: 'Profile updated successfully',
      status: 'success',
      duration: 5000,
      isClosable: true,
      position: 'top-right',
    });
  };

  const onSubmit: SubmitHandler<IEditUserData> = async ({ email, password, name }) => {
    setServerErrorMessage('');
    try {
      const { userInfo } = await updateUser(currentUser!._id, email, password, name);
      updateUserProfile(userInfo);
      navigate('/profile');
      handleToast();
    } catch (error: any) {
      console.error('Error submitting edit profile data:', error);
      const errorMessage = error.response.data.message;
      setServerErrorMessage(errorMessage || 'An error occurred');
    }
  };

  return (
    <>
      <VStack>
        <Heading>Edit Profile</Heading>
        <Text color='red'>{serverErrorMessage}</Text>
        {currentUser && (
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <FormControl isInvalid={errors.name !== undefined}>
              <FormLabel htmlFor='name'>First name</FormLabel>
              <Input
                id='name'
                {...register('name', {
                  required: 'Name is required',
                  minLength: { value: 2, message: 'Minimum length should be 2' },
                })}
              />
              <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.email !== undefined}>
              <FormLabel htmlFor='email'>Email</FormLabel>
              <Input
                id='email'
                type='email'
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: 'Email is not in a valid format',
                  },
                })}
              />
              <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.password !== undefined}>
              <FormLabel htmlFor='password'>New password</FormLabel>
              <Input
                id='password'
                type='password'
                {...register('password', {
                  minLength: { value: 4, message: 'Password should have at least 4 characters' },
                })}
              />
              <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.repeatPassword !== undefined}>
              <FormLabel htmlFor='repeatPassword'>Repeat new password</FormLabel>
              <Input
                id='repeatPassword'
                type='password'
                {...register('repeatPassword', {
                  validate: validateRepeatPassword,
                })}
              />
              <FormErrorMessage>{errors.repeatPassword && errors.repeatPassword.message}</FormErrorMessage>
            </FormControl>

            <Button mt={4} mr={4}>
              <ChakraLink as={ReactRouterLink} to='/profile'>
                Cancel
              </ChakraLink>
            </Button>

            <Button mt={4} colorScheme='teal' type='submit' isLoading={isSubmitting}>
              Save
            </Button>
          </form>
        )}
      </VStack>
    </>
  );
};

export default EditProfilePage;

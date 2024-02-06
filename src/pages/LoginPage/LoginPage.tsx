import { FormControl, FormErrorMessage, FormLabel, Heading, Input, Text, VStack, Link as ChakraLink, Button, Box } from '@chakra-ui/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';
import { ILoginData } from '../../models/auth.model';
import { login } from '../../services/auth.services';
import { useContext, useEffect, useState } from 'react';
import { IUserContext, UserContext } from '../../contexts/userContext';
import './LoginPage.scss';

const LoginPage = () => {
  const { handleCurrentUserInfo } = useContext(UserContext) as IUserContext;

  const [serverErrorMessage, setServerErrorMessage] = useState('');
  const [emailDefaultValue, setEmailDefaultValue] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem('email');
    if (email) {
      setEmailDefaultValue(email);
    }
    localStorage.removeItem('email');
  }, []);

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
  } = useForm<ILoginData>();

  const onSubmit: SubmitHandler<ILoginData> = async ({ email, password }) => {
    setServerErrorMessage('');
    try {
      const requestBody = { email, password };
      const { userInfo } = await login(requestBody);
      handleCurrentUserInfo(userInfo);

      const plantInLocal = localStorage.getItem('plant');

      if (plantInLocal) {
        navigate('/plant');
      } else {
        navigate('/');
      }
    } catch (error: any) {
      console.error('Error submitting login data:', error);
      const errorMessage = error.response.data.message;
      setServerErrorMessage(errorMessage || 'An error occurred');
    }
  };

  return (
    <Box className='loginPageWrapper'>
      <Box className='loginTop'></Box>
      <VStack className='loginFormWrapper'>
        <Heading>Login</Heading>
        <Text className='errorMessage'>{serverErrorMessage}</Text>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <FormControl isInvalid={errors.email !== undefined}>
            <FormLabel htmlFor='email'>Email</FormLabel>
            <Input
              defaultValue={emailDefaultValue}
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
            <FormLabel htmlFor='password'>Password</FormLabel>
            <Input
              id='password'
              type='password'
              {...register('password', {
                required: 'Password is required',
              })}
            />
            <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
          </FormControl>
          <Box className='buttonWrapper'>
            <Button className='loginButton' mt={4} colorScheme='teal' type='submit' isLoading={isSubmitting}>
              Login
            </Button>
          </Box>
        </form>
        <Text> New user?</Text>
        <ChakraLink as={ReactRouterLink} to='/signup' className='signupLink'>
          Signup
        </ChakraLink>
      </VStack>
    </Box>
  );
};

export default LoginPage;

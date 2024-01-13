import { FormControl, FormErrorMessage, FormLabel, Heading, Image, Input, Text, VStack, Link as ChakraLink, Button } from '@chakra-ui/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link as ReactRouterLink } from 'react-router-dom';
import { ILoginData } from '../models/auth.model';
import { login } from '../services/auth.services';
import { useEffect, useState } from 'react';

const LoginPage = () => {
  const [serverErrorMessage, setServerErrorMessage] = useState('');
  const [emailDefaultValue, setEmailDefaultValue] = useState('');

  useEffect(() => {
    const email = localStorage.getItem('email');
    if (email) {
      setEmailDefaultValue(email);
    }
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
      await login(requestBody);
    } catch (error: any) {
      console.error('Error submitting login data:', error);
      const errorMessage = error.response.data.message;
      setServerErrorMessage(errorMessage || 'An error occurred');
    }
  };

  return (
    <VStack>
      <Image boxSize='150px' objectFit='cover' src='' fallbackSrc='https://via.placeholder.com/150' alt='' />
      <Heading>Login</Heading>
      <Text color='red'>{serverErrorMessage}</Text>

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

        <Button mt={4} colorScheme='teal' type='submit' isLoading={isSubmitting}>
          Login
        </Button>
      </form>
      <Text> New user?</Text>
      <ChakraLink as={ReactRouterLink} to='/signup'>
        Signup
      </ChakraLink>
    </VStack>
  );
};

export default LoginPage;

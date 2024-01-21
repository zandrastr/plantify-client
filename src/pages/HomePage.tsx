import { FormControl, FormErrorMessage, FormLabel, Heading, Image, Input, Text, VStack, Link as ChakraLink, Button, HStack } from '@chakra-ui/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { getPlantImage, getPlantInfo } from '../services/plant.services';
import { IUserContext, UserContext } from '../contexts/userContext';
export interface IPlantSearch {
  plantName: string;
}

const HomePage = () => {
  const { isLoggedIn } = useContext(UserContext) as IUserContext;
  const [serverErrorMessage, setServerErrorMessage] = useState('');
  const [plantNotFoundMessage, setPlantNotFoundMessage] = useState('');
  const navigate = useNavigate();

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
  } = useForm<IPlantSearch>();

  const onSubmit: SubmitHandler<IPlantSearch> = async ({ plantName }) => {
    setServerErrorMessage('');
    try {
      const plantInfoResult = await getPlantInfo(plantName);

      if (plantInfoResult.latinName.toLowerCase() === 'plantundefined') {
        setPlantNotFoundMessage('Plant not found.');
        return;
      }
      const plantImageResult = await getPlantImage(plantName);
      const plant = { ...plantInfoResult, imageUrl: plantImageResult };
      localStorage.setItem('plant', JSON.stringify(plant));
      navigate('/plant');
    } catch (error: any) {
      console.error('Error submitting plant search data:', error);
      const errorMessage = error.response.data.message;
      setServerErrorMessage(errorMessage || 'An error occurred');
    }
  };

  return (
    <VStack>
      <Image src='' fallbackSrc='' alt='' />
      <Heading>Find a plant</Heading>
      {plantNotFoundMessage !== '' && <Text color='red'>{plantNotFoundMessage}</Text>}
      {serverErrorMessage !== '' && <Text color='red'>{serverErrorMessage}</Text>}
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <FormControl isInvalid={errors.plantName !== undefined}>
          <FormLabel htmlFor='plantName'>Plant name</FormLabel>
          <Input
            id='plantName'
            {...register('plantName', {
              required: 'Plant name is required',
            })}
          />
          <FormErrorMessage>{errors.plantName && errors.plantName.message}</FormErrorMessage>
        </FormControl>

        <Button mt={4} colorScheme='teal' type='submit' isLoading={isSubmitting}>
          Search
        </Button>
      </form>
      {!isLoggedIn && (
        <>
          <ChakraLink as={ReactRouterLink} to='/login'>
            Login
          </ChakraLink>
          <HStack>
            <Text> New user?</Text>
            <ChakraLink as={ReactRouterLink} to='/signup'>
              Signup
            </ChakraLink>
          </HStack>
        </>
      )}
      ;
    </VStack>
  );
};

export default HomePage;

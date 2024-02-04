import { FormControl, FormErrorMessage, Heading, Input, Text, VStack, Button, useBreakpointValue, Box, HStack } from '@chakra-ui/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getPlantImage, getPlantInfo } from '../../services/plant.services';
import { PiPottedPlant } from 'react-icons/pi';
import './HomePage.scss';

export interface IPlantSearch {
  plantName: string;
}

const HomePage = () => {
  const [serverErrorMessage, setServerErrorMessage] = useState('');
  const [plantNotFoundMessage, setPlantNotFoundMessage] = useState('');
  const navigate = useNavigate();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<IPlantSearch>();

  useEffect(() => {
    localStorage.removeItem('plant');
  }, []);

  const onSubmit: SubmitHandler<IPlantSearch> = async ({ plantName }) => {
    setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isMobile && (
        <VStack className='mobileWrapper'>
          <Box className='sloganContainer'>
            <Text className='sloganText' fontSize={['m', 'm', 'xl']}>
              Your AI-powered plant search engine & virtual plant library
            </Text>
          </Box>

          {plantNotFoundMessage !== '' && <Text className='attentionText'>{plantNotFoundMessage}</Text>}
          {serverErrorMessage !== '' && <Text className='attentionText'>{serverErrorMessage}</Text>}

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <FormControl isInvalid={errors.plantName !== undefined}>
              <Input
                className='formInput'
                placeholder='🔍 Plant name...'
                aria-label='Plant name'
                {...register('plantName', {
                  required: 'Plant name is required',
                })}
              />
              <FormErrorMessage>{errors.plantName && errors.plantName.message}</FormErrorMessage>
            </FormControl>

            <Button colorScheme='green' type='submit' isLoading={isLoading}>
              Search
            </Button>
          </form>
        </VStack>
      )}

      {!isMobile && (
        <VStack className='desktopWrapper'>
          <Box className='sloganContainer'>
            <Text className='sloganText' fontSize={['2xl', '2xl', '3xl']}>
              Your AI-powered plant search engine & virtual plant library
            </Text>
          </Box>

          <Box className='searchContainer'>
            <VStack className='searchWrapper'>
              <HStack className='headingWrapper'>
                <PiPottedPlant className='icon' />
                <Heading className='heading' fontSize={['xl', 'xl', '3xl']}>
                  Plantify
                </Heading>
              </HStack>
              {plantNotFoundMessage !== '' && <Text className='attentionText'>{plantNotFoundMessage}</Text>}
              {serverErrorMessage !== '' && <Text className='attentionText'>{serverErrorMessage}</Text>}

              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <FormControl isInvalid={errors.plantName !== undefined}>
                  <Input
                    className='formInput'
                    placeholder='🔍 Plant name...'
                    aria-label='Plant name'
                    {...register('plantName', {
                      required: 'Plant name is required',
                    })}
                  />
                  <FormErrorMessage>{errors.plantName && errors.plantName.message}</FormErrorMessage>
                </FormControl>

                <Button colorScheme='green' type='submit' isLoading={isLoading}>
                  Search
                </Button>
              </form>
            </VStack>
          </Box>
        </VStack>
      )}
    </>
  );
};
export default HomePage;

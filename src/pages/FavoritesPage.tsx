import { Box, Button, HStack, Heading, Image, Text, VStack } from '@chakra-ui/react';
import { IPlantModel } from '../models/plant.model';
import { useContext } from 'react';
import { IUserContext, UserContext } from '../contexts/userContext';

const FavoritesPage = () => {
  const { currentUser } = useContext(UserContext) as IUserContext;
  const userFavorites = currentUser!.favorites;

  const handleRemove = () => {
    console.log('Clicked to remove a plant from favorites');
  };

  const openPlantModal = () => {
    console.log('Clicked on a favorite to open plant modal');
  };

  return (
    <>
      <Heading>Favorites</Heading>

      {userFavorites.map((plant: IPlantModel) => (
        <Box key={plant._id}>
          <HStack>
            <HStack onClick={openPlantModal}>
              <Image boxSize='50px' src={plant.imageUrl} fallbackSrc='https://via.placeholder.com/50' alt={plant.name} />
              <VStack>
                <Text>{plant.name}</Text>
                <Text>{plant.latinName}</Text>
              </VStack>
            </HStack>
            <Button onClick={handleRemove}>-</Button>
          </HStack>
        </Box>
      ))}
    </>
  );
};

export default FavoritesPage;

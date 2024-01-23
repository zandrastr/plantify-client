import { Box, Button, HStack, Heading, Image, Text, VStack, useToast, useDisclosure } from '@chakra-ui/react';
import { IPlantModel } from '../models/plant.model';
import { useContext, useState } from 'react';
import { IUserContext, UserContext } from '../contexts/userContext';
import { removePlant } from '../services/user.services';
import RemovePlantModal from '../components/RemovePlantModal';

const FavoritesPage = () => {
  const { currentUser, removeFromFavorites } = useContext(UserContext) as IUserContext;
  const userFavorites = currentUser!.favorites;
  const [selectedPlantToRemove, setSelectedPlantToRemove] = useState<IPlantModel | null>(null);
  const { isOpen: isRemoveModalOpen, onOpen: onOpenRemoveModal, onClose: onCloseRemoveModal } = useDisclosure();
  const toast = useToast();

  const openPlantModal = () => {
    console.log('Clicked on a favorite to open plant modal');
  };

  const handleRemove = async (plant: IPlantModel) => {
    onOpenRemoveModal();
    setSelectedPlantToRemove(plant);
  };

  const confirmRemove = async (plantId: string) => {
    if (currentUser && plantId) {
      try {
        await removePlant(currentUser._id, plantId);
        removeFromFavorites(plantId);
        handleToast();
      } catch (error) {
        console.error('Something went wrong:', error);
      }
    }
  };

  const handleToast = () => {
    toast({
      description: 'Plant removed from favorites',
      status: 'success',
      duration: 5000,
      isClosable: true,
      position: 'top-right',
    });
    onCloseRemoveModal();
  };

  return (
    <>
      <Heading>Favorites</Heading>
      {userFavorites.length > 0 ? (
        <>
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
                <Button onClick={() => handleRemove(plant)}>-</Button>
              </HStack>
            </Box>
          ))}
        </>
      ) : (
        <Text>No plants saved yet</Text>
      )}
      <RemovePlantModal
        message={`Do you want to remove ${selectedPlantToRemove!.name} from favorites?`}
        buttonText='Confirm Remove'
        isOpen={isRemoveModalOpen}
        onClose={onCloseRemoveModal}
        onOpen={onOpenRemoveModal}
        mainFunction={() => confirmRemove(selectedPlantToRemove!._id!)}
      />
    </>
  );
};

export default FavoritesPage;

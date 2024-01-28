import { Box, Button, HStack, Heading, Image, Text, VStack, useToast, useDisclosure } from '@chakra-ui/react';
import { IPlantModel } from '../models/plant.model';
import { useContext, useState } from 'react';
import { IUserContext, UserContext } from '../contexts/userContext';
import { removePlant } from '../services/user.services';
import ConfirmModal from '../components/ConfirmModal';
import PlantCardModal from '../components/PlantCardModal';

const FavoritesPage = () => {
  const { currentUser, removeFromFavorites } = useContext(UserContext) as IUserContext;
  const userFavorites = currentUser!.favorites;
  const [selectedPlantToRemove, setSelectedPlantToRemove] = useState<IPlantModel | null>(null);
  const [selectedPlantToDisplay, setSelectedPlantToDisplay] = useState<IPlantModel | null>(null);
  const { isOpen: isConfirmModalOpen, onOpen: onOpenConfirmModal, onClose: onCloseConfirmModal } = useDisclosure();
  const { isOpen: isPlantCardModalOpen, onOpen: onOpenPlantCardModal, onClose: onClosePlantCardModal } = useDisclosure();
  const toast = useToast();

  const handleDisplayPlantModal = (plant: IPlantModel) => {
    onOpenPlantCardModal();
    setSelectedPlantToDisplay(plant);
  };

  const handleRemove = async (plant: IPlantModel) => {
    onOpenConfirmModal();
    setSelectedPlantToRemove(plant);
  };

  const confirmRemove = async () => {
    if (currentUser && selectedPlantToRemove) {
      try {
        await removePlant(currentUser._id, selectedPlantToRemove._id!);
        removeFromFavorites(selectedPlantToRemove._id!);
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
    onCloseConfirmModal();
  };

  return (
    <>
      <Heading>Favorites</Heading>
      {userFavorites.length === 0 && <Text>No plants saved yet.</Text>}
      {userFavorites.length > 0 &&
        userFavorites.map((plant: IPlantModel) => (
          <Box key={plant._id}>
            <HStack>
              <HStack onClick={() => handleDisplayPlantModal(plant)}>
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
      {selectedPlantToRemove && (
        <ConfirmModal
          message={`Do you want to remove ${selectedPlantToRemove.name} from favorites?`}
          buttonText='Confirm Remove'
          isOpen={isConfirmModalOpen}
          onClose={onCloseConfirmModal}
          onOpen={onOpenConfirmModal}
          mainFunction={confirmRemove}
        />
      )}
      {selectedPlantToDisplay && <PlantCardModal selectedPlant={selectedPlantToDisplay} isOpen={isPlantCardModalOpen} onClose={onClosePlantCardModal} onOpen={onOpenPlantCardModal} />}
    </>
  );
};

export default FavoritesPage;

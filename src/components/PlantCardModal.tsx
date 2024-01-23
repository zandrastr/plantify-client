import { Button, Heading, Image, Text, VStack, Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import { IPlantModel } from '../models/plant.model';

interface PlantCardModalProps {
  selectedPlant: IPlantModel;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const PlantCardModal = ({ selectedPlant, isOpen, onClose }: PlantCardModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          <VStack>
            <Image boxSize='150px' src={selectedPlant.imageUrl} fallbackSrc='https://via.placeholder.com/150' alt={selectedPlant.name} />
            <Heading>{selectedPlant.name}</Heading>
            <Heading>{selectedPlant.latinName}</Heading>
            <Text>{selectedPlant.description}</Text>
            <Text>{selectedPlant.waterNeeds}</Text>
            <Text>{selectedPlant.sunNeeds}</Text>
            <Button>Share</Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default PlantCardModal;

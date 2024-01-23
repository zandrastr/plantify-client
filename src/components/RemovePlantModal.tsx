import { Button, Text, Modal, ModalOverlay, ModalContent, ModalFooter, ModalBody } from '@chakra-ui/react';

interface RemovePlantModalProps {
  message: string;
  buttonText: string;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  mainFunction: () => void;
}

const RemovePlantModal = ({ message, buttonText, isOpen, onClose, mainFunction }: RemovePlantModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          <Text>{message}</Text>
        </ModalBody>

        <ModalFooter>
          <Button mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={mainFunction}>{buttonText}</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default RemovePlantModal;

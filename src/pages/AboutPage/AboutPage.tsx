import { Box, Heading, Text, VStack } from '@chakra-ui/react';
import './AboutPage.scss';
import { PiPottedPlant } from 'react-icons/pi';

const AboutPage = () => {
  return (
    <>
      <Box className='aboutTop'></Box>
      <VStack className='aboutWrapper'>
        <Heading>About</Heading>

        <PiPottedPlant className='aboutLogo' />

        <Text>
          Welcome to Plantify, Your Green Oasis in the Digital World! Believe in the transformative power of plants, whether you're a seasoned plant parent or just discovering your green thumb. This
          app is designed to be your ultimate companion on your botanical journey, where the wonders of nature meet cutting-edge technology, creating a seamless and enriching experience for plant
          enthusiasts of all levels.
        </Text>
        <Text>
          Not just a search engine powered by AI, Plantify serves as your passport to the botanical universe. Explore a vast database of plants from all corners of the globe, each accompanied by
          interesting facts, care tips, and stunning visuals. Whether on the hunt for a new addition to your indoor jungle or curious about the flora in a distant land, Plantify has you covered.
        </Text>
      </VStack>
    </>
  );
};

export default AboutPage;

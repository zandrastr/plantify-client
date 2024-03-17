import { Box, Heading, Text, VStack, Badge, Link, HStack, useBreakpointValue } from '@chakra-ui/react';
import './AboutPage.scss';
import { PiPottedPlant } from 'react-icons/pi';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const AboutPage = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box className='aboutPageWrapper'>
      <VStack className='aboutSectionWrapper'>
        <Box className='aboutTop'></Box>
        <Box className='aboutContentWrapper'>
          <Heading>About</Heading>

          <PiPottedPlant className='aboutLogo' />

          <Text className='aboutText'>
            I created this full stack web application as my final project during my studies at the Front End Developer program at Medieinstitutet. I wanted to create a user-friendly online tool for
            plant lovers, making it easy to discover, save and share plant information and care tips.
          </Text>

          <Text> For those interested in the tech stack: </Text>
          <Box className={`${isMobile ? 'techStackMobile' : 'techStackDesktop'}`}>
            <Badge>React</Badge>
            <Badge>Typescript</Badge>
            <Badge>Chakra UI</Badge>
            <Badge>Sass</Badge>
            <Badge>Open AI</Badge>

            <Badge>Node</Badge>
            <Badge>Express</Badge>
            <Badge>MongoDB</Badge>
          </Box>
        </Box>
      </VStack>
      <Box className='aboutMe'>
        <Text className='madeBy'> Made by Sandra - 2024</Text>

        <VStack>
          <HStack className='socialLinks'>
            <Link
              href='https://github.com/zandrastr'
              isExternal
            >
              <FaGithub
                aria-label='Visit Sandras GitHub profile'
                tabIndex={0}
              />
            </Link>

            <Link
              href='https://www.linkedin.com/in/sandrawebdev/'
              isExternal
            >
              <FaLinkedin
                aria-label='Visit Sandras LinkedIn profile'
                tabIndex={0}
              />
            </Link>
          </HStack>
        </VStack>
      </Box>
    </Box>
  );
};

export default AboutPage;

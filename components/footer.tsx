import {
  Box,
  chakra,
  Container,
  Link,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
} from '@chakra-ui/react';
import { FaLinkedinIn, FaTwitter, FaGithub } from 'react-icons/fa';
import { ReactNode } from 'react';

const SocialButton = ({
  children,
  label,
  href,
}: {
  children: ReactNode;
  label: string;
  href: string;
}) => {
  return (
    <chakra.button
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      rounded={'full'}
      w={8}
      h={8}
      cursor={'pointer'}
      as={'a'}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
      }}>
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export default function SmallCentered() {
  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}>
      <Container
        as={Stack}
        maxW={'6xl'}
        py={4}
        spacing={4}
        justify={'center'}
        align={'center'}>
        <Stack direction={'row'} spacing={6}>
          <Link colorScheme="purple.400" variant="ghost"  fontWeight='bold' href={'/'}>Home</Link>
          <Link fontWeight='bold' href={'sell'}>Sell Tickets</Link>
          <Link fontWeight='bold' href={'collections'}>Collectibles</Link>
          <Link fontWeight='bold' href={'dashboard'}>Dashboard</Link>
        </Stack>
      </Container>

      <Box
        borderTopWidth={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('purple.200', 'purple.700')}>
        <Container
          as={Stack}
          maxW={'6xl'}
          py={4}
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          justify={{ base: 'center', md: 'space-between' }}
          align={{ base: 'center', md: 'center' }}>
          <Text>© 2021 Made with  ❤ by Sabelo</Text>
          <Stack direction={'row'} spacing={6}>
            <SocialButton label={'Twitter'} href={'https://twitter.com/SabeloMkhwanaz'}>
              <FaTwitter />
            </SocialButton>
            <SocialButton label={'Github'} href={'https://github.com/SabeloMkhwanzi'}>
              <FaGithub />
            </SocialButton>
            {/* <SocialButton label={'Linkdeni'} href={'https://www.linkedin.com/in/sabelo-mkhwanazi-54ba431b1/'}>
              <FaLinkedinIn />
            </SocialButton> */}
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
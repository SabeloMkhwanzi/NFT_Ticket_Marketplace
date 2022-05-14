import {
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  Link
} from '@chakra-ui/react';

export default function SplitScreen() {
  return (
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={6} w={'full'} maxW={'lg'}>
          <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
            <Text
              as={'span'}
              position={'relative'}
              _after={{
                content: "''",
                width: 'full',
                height: { base: '20%', md: '30%' },
                position: 'absolute',
                bottom: 1,
                left: 0,
                bg: 'purple.400',
                zIndex: -1,
              }}>
              NFT Ticketing
            </Text>
            <br />{' '}
            <Text color={'purple.400'} as={'span'}>
              MarketPlace
            </Text>{' '}
          </Heading>
          <Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.500'}>
            NFTs, is now ready to move forward to various other markets.
            Event market where NFT can connect the physical and digital ticketing,
             to enhance the ticketing experience for both attendees and organizers.
          </Text>
          <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
            <Button
            bg={'purple.400'}
              color={'white'}
              _hover={{
                bg: 'purple.500',}}
            ><Link 
               href={'sell'}
            >
              Sell Tickets
            </Link></Button>
            <Button             
              variant="outline"           
            ><Link href={'sell'}>How It Works</Link></Button>
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={'Login Image'}
          objectFit={'cover'}
          src={
            'https://images.unsplash.com/photo-1549499090-d7ac0cec89f4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=880&q=80'
          }
        />
      </Flex>
    </Stack>
  );
}
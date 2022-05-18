import {
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";

import ButtonConnect from "./buttonConnect/index";

export default function SplitScreen() {
  const BodyBgColor = useColorModeValue("#FFF8D5", "gray.600");
  const SubHeaderTextColor = useColorModeValue("gray.600", "white");
  const ButtonColorMode = useColorModeValue("#B4ECE3", "#B4ECE3");
  const ButtonTextColor = useColorModeValue("#8479E1", "black");
  const HeaderTextColor = useColorModeValue("#733C3C", "#B4ECE3");

  return (
    <Stack
      pt={5}
      bg={BodyBgColor}
      minH={"100vh"}
      direction={{ base: "column", md: "row" }}
    >
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={6} w={"full"} maxW={"lg"}>
          <Heading fontSize={{ base: "3xl", md: "4xl", lg: "7xl" }}>
            <Text
              fontFamily="cursive"
              as={"span"}
              position={"relative"}
              _after={{
                content: "''",
                width: "full",
                height: { base: "20%", md: "30%" },
                position: "absolute",
                bottom: 1,
                left: 0,
                bg: "purple.400",
                zIndex: -1,
              }}
            >
              NFT Ticketing
            </Text>
            <br />
            <Text fontFamily="cursive" color={HeaderTextColor} as={"span"}>
              MarketPlace
            </Text>{" "}
          </Heading>
          <Text
            fontFamily="monospace"
            fontSize={{ base: "md", lg: "2xl" }}
            color={SubHeaderTextColor}
          >
            Discover the best innovative decentralized NFT Ticketing
            MarketPlace. In this platform you will create your Tickets for any
            event on the blockchain, Store it using IPFS and sell via SMART
            CONTRACT.
          </Text>
          <Stack direction={{ base: "column", md: "row" }} spacing={4}>
            <Button
              textColor={ButtonTextColor}
              borderRadius="lg"
              bgColor={ButtonColorMode}
              shadow="lg"
              fontSize="m"
              textTransform="uppercase"
              fontWeight="normal"
              as="kbd"
              letterSpacing={2}
              textDecoration="none"
            >
              <Link href={"sell"}>Create Tickets</Link>
            </Button>
            <ButtonConnect />
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={"cover-image"}
          objectFit="cover"
          borderRadius="2xl"
          src={
            "https://images.unsplash.com/photo-1549499090-d7ac0cec89f4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=880&q=80"
          }
        />
      </Flex>
    </Stack>
  );
}

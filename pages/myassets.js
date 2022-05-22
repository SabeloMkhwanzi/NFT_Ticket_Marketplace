import { ethers } from "ethers";
import { useEffect, useState } from "react";
import axios from "axios";
import Web3Modal from "web3modal";
import {
  SimpleGrid,
  Flex,
  Box,
  Image,
  useColorModeValue,
  Heading,
  Text,
  Divider,
  Avatar,
  chakra,
  Icon,
  Stack,
} from "@chakra-ui/react";

import Head from "next/head";

import { nftmarketaddress, nftaddress } from "../config";

import Market from "../utils/NFTMarket.json";
import NFT from "../utils/NFT.json";

export default function CreatorDashboard() {
  const BodyBgColor = useColorModeValue("#FFF8D5", "gray.600");
  const CollheaderColor = useColorModeValue("gray.800", "white");
  const bgColor = useColorModeValue("white", "gray.800");
  const Fontcolor = useColorModeValue("gray.700", "gray.200");
  const Textcolor = useColorModeValue("gray.800", "black");

  const [nfts, setNfts] = useState([]);
  const [sold, setSold] = useState([]);
  const [loadingState, setLoadingState] = useState("not-loaded");
  useEffect(() => {
    loadNFTs();
  }, []);
  async function loadNFTs() {
    const web3Modal = new Web3Modal({
      network: "mainnet",
      cacheProvider: true,
    });
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const marketContract = new ethers.Contract(
      nftmarketaddress,
      Market.abi,
      signer
    );
    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider);
    const data = await marketContract.fetchItemsCreated();

    const items = await Promise.all(
      data.map(async (i) => {
        const tokenUri = await tokenContract.tokenURI(i.tokenId);
        const meta = await axios.get(tokenUri);
        let price = ethers.utils.formatUnits(i.price.toString(), "ether");
        let item = {
          price,
          tokenId: i.tokenId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          sold: i.sold,
          image: meta.data.image,
          name: meta.data.name,
          description: meta.description,
        };
        return item;
      })
    );
    /* create a filtered array of items that have been sold */
    const soldItems = items.filter((i) => i.sold);
    setSold(soldItems);
    setNfts(items);
    setLoadingState("loaded");
  }
  if (loadingState === "loaded" && !nfts.length)
    return (
      <Box minH={"80vh"} bg={BodyBgColor}>
        <Text
          bgGradient="linear(to-l, #8479E1, #8479E1)"
          bgClip="text"
          fontSize="6xl"
          fontWeight="extrabold"
          my="0.5"
          textAlign="center"
        >
          No List Tickets
        </Text>
      </Box>
    );
  return (
    <div>
      <Head>
        <title>List Tickets</title>
      </Head>
      <Box minH={"80vh"} pattern="glamorous" width="100%" bg={BodyBgColor}>
        <Heading
          fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
          color={CollheaderColor}
          justify="center"
          align="center"
          pt="10"
        >
          <Text color={"black.400"}>TICKETS CREATED</Text>{" "}
        </Heading>
        <SimpleGrid columns={[1, null, 3]} spacingX="10px" spacingY="10px">
          {nfts.map((nft, i) => (
            <Flex
              key={i}
              p={50}
              w="full"
              alignItems="center"
              justifyContent="center"
              minH={"80vh"}
            >
              <Box
                p={5}
                w="sm"
                mx="auto"
                bg={bgColor}
                shadow="lg"
                rounded="xl"
                overflow="hidden"
              >
                <Image
                  borderRadius="xl"
                  w="full"
                  h={56}
                  fit="cover"
                  objectPosition="center"
                  src={nft.image}
                  alt={`Picture of ${nft.name}`}
                />

                <Box py={4} px={6}>
                  <chakra.h1
                    fontSize="xl"
                    fontWeight="bold"
                    fontFamily="cursive"
                    color={TextCardColorMode}
                  >
                    {nft.name}
                  </chakra.h1>

                  <chakra.p
                    letterSpacing={2}
                    fontWeight="normal"
                    fontFamily="fantasy"
                    py={2}
                    color={"gray.600"}
                  >
                    {nft.description}
                  </chakra.p>

                  <Flex alignItems="center" mt={4} color={TextCardColorMode}>
                    <Icon as={MdOutlineSell} h={6} w={6} mr={2} />
                    <Stack direction="row">
                      <chakra.h1
                        fontSize="md"
                        color={TextCardColorMode}
                        fontFamily="monospace"
                      >
                        {nft.price} {""}
                      </chakra.h1>
                      <Text
                        fontFamily="monospace"
                        fontWeight="bold"
                        fontSize="md"
                        color={TextCardColorMode}
                      >
                        {" "}
                        Matic
                      </Text>
                    </Stack>
                  </Flex>

                  <Flex alignItems="center" mt={4} color={TextCardColorMode}>
                    <Icon as={VscSymbolNumeric} h={6} w={6} mr={2} />

                    <chakra.h1
                      fontSize="sm"
                      color={TextCardColorMode}
                      fontFamily="monospace"
                    >
                      Ticket Id: {nft.tokenId}
                    </chakra.h1>
                  </Flex>

                  <Flex alignItems="center" mt={4} color={TextCardColorMode}>
                    {/* <Icon as={GiReceiveMoney} h={6} w={6} mr={2} /> */}
                    <Text fontSize="sm" fontFamily="monospace" pr={2}>
                      Seller:{" "}
                    </Text>

                    <chakra.h1
                      fontSize="sm"
                      color="blue.500"
                      fontFamily="monospace"
                    >
                      {getEllipsisTxt(nft.seller)}
                    </chakra.h1>
                  </Flex>

                  <Flex alignItems="center" mt={4} color={Fontcolor}>
                    {/* <Icon as={GiCrossedChains} h={6} w={6} mr={2} /> */}
                    <Avatar
                      size="sm"
                      src="https://d2wsuxmhzdmk4i.cloudfront.net/matic-network.png"
                    />
                    <chakra.h1
                      fontFamily="monospace"
                      px={2}
                      fontSize="sm"
                      color={TextCardColorMode}
                    >
                      Polygon Network
                    </chakra.h1>
                  </Flex>
                </Box>
              </Box>
            </Flex>
          ))}
        </SimpleGrid>

        <Divider orientation="horizontal" color="black" />
        {Boolean(sold.length) && (
          <>
            <Heading
              fontSize={{ base: "2xl", md: "3xl", lg: "2xl" }}
              color={Textcolor}
              justify="center"
              align="center"
              pt="10"
            >
              <Text color={"black.400"}>TICKETS SOLD</Text>{" "}
            </Heading>
            <SimpleGrid columns={[1, null, 3]} spacingX="10px" spacingY="10px">
              {sold.map((nft, i) => (
                <Flex
                  key={i}
                  p={50}
                  w="full"
                  alignItems="center"
                  justifyContent="center"
                  minH="100vh"
                >
                  <Box
                    p={5}
                    w="sm"
                    mx="auto"
                    bg={bgColor}
                    shadow="lg"
                    rounded="xl"
                    overflow="hidden"
                  >
                    <Image
                      borderRadius="xl"
                      w="full"
                      h={56}
                      fit="cover"
                      objectPosition="center"
                      src={nft.image}
                      alt={`Picture of ${nft.name}`}
                    />

                    <Box py={4} px={6}>
                      <chakra.h1
                        fontSize="xl"
                        fontWeight="bold"
                        fontFamily="cursive"
                        color={TextCardColorMode}
                      >
                        {nft.name}
                      </chakra.h1>

                      <chakra.p
                        letterSpacing={2}
                        fontWeight="normal"
                        fontFamily="fantasy"
                        py={2}
                        color={"gray.600"}
                      >
                        {nft.description}
                      </chakra.p>

                      <Flex
                        alignItems="center"
                        mt={4}
                        color={TextCardColorMode}
                      >
                        <Icon as={MdOutlineSell} h={6} w={6} mr={2} />
                        <Stack direction="row">
                          <chakra.h1
                            fontSize="md"
                            color={TextCardColorMode}
                            fontFamily="monospace"
                          >
                            {nft.price} {""}
                          </chakra.h1>
                          <Text
                            fontFamily="monospace"
                            fontWeight="bold"
                            fontSize="md"
                            color={TextCardColorMode}
                          >
                            {" "}
                            Matic
                          </Text>
                        </Stack>
                      </Flex>

                      <Flex
                        alignItems="center"
                        mt={4}
                        color={TextCardColorMode}
                      >
                        <Icon as={VscSymbolNumeric} h={6} w={6} mr={2} />

                        <chakra.h1
                          fontSize="sm"
                          color={TextCardColorMode}
                          fontFamily="monospace"
                        >
                          Ticket Id: {nft.tokenId}
                        </chakra.h1>
                      </Flex>

                      <Flex
                        alignItems="center"
                        mt={4}
                        color={TextCardColorMode}
                      >
                        {/* <Icon as={GiReceiveMoney} h={6} w={6} mr={2} /> */}
                        <Text fontSize="sm" fontFamily="monospace" pr={2}>
                          Seller:{" "}
                        </Text>

                        <chakra.h1
                          fontSize="sm"
                          color="blue.500"
                          fontFamily="monospace"
                        >
                          {getEllipsisTxt(nft.seller)}
                        </chakra.h1>
                      </Flex>

                      <Flex alignItems="center" mt={4} color={Fontcolor}>
                        {/* <Icon as={GiCrossedChains} h={6} w={6} mr={2} /> */}
                        <Avatar
                          size="sm"
                          src="https://d2wsuxmhzdmk4i.cloudfront.net/matic-network.png"
                        />
                        <chakra.h1
                          fontFamily="monospace"
                          px={2}
                          fontSize="sm"
                          color={TextCardColorMode}
                        >
                          Polygon Network
                        </chakra.h1>
                      </Flex>
                    </Box>
                  </Box>
                </Flex>
              ))}
            </SimpleGrid>
          </>
        )}
      </Box>
    </div>
  );
}

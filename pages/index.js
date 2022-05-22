import { ethers } from "ethers";
import { useEffect, useState } from "react";
import axios from "axios";
import Web3Modal, { connectors } from "web3modal";
import {
  SimpleGrid,
  Flex,
  Box,
  Image,
  useColorModeValue,
  Button,
  Heading,
  Text,
  Stack,
  Divider,
  chakra,
  Icon,
  Avatar,
} from "@chakra-ui/react";
import Head from "next/head";
import { MdOutlineSell } from "react-icons/md";
import { VscSymbolNumeric } from "react-icons/vsc";
import { GiTicket } from "react-icons/gi";
import { nftaddress, nftmarketaddress } from "../config";

import NFT from "../utils/NFT.json";
import Market from "../utils/NFTMarket.json";

import Hero from "../components/hero.tsx";

export default function Home() {
  const BodyBgColor = useColorModeValue("#FFF8D5", "gray.600");
  const TextCardColorMode = useColorModeValue("gray.800", "white");
  const ButtonTextColor = useColorModeValue("white", "black");
  const ButtonColorMode = useColorModeValue("#8479E1", "#8479E1");
  const CollheaderColor = useColorModeValue("gray.800", "white");
  const bgColor = useColorModeValue("white", "gray.800");
  const Fontcolor = useColorModeValue("gray.700", "gray.200");

  const [nfts, setNfts] = useState([]);
  const [loadingState, setLoadingState] = useState("not-loaded");
  useEffect(() => {
    loadNFTs();
  }, []);
  async function loadNFTs() {
    /* create a generic provider and query for unsold market items */
    const provider = new ethers.providers.JsonRpcProvider(
      "https://polygon-mumbai.infura.io/v3/e2a657a09d56489e8d5eb38815ec1b58"
    );
    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider);
    const marketContract = new ethers.Contract(
      nftmarketaddress,
      Market.abi,
      provider
    );
    const data = await marketContract.fetchMarketItems();

    /*
     *  map over items returned from smart contract and format
     *  them as well as fetch their token metadata
     */
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
          image: meta.data.image,
          name: meta.data.name,
          description: meta.data.description,
        };
        return item;
      })
    );
    setNfts(items);
    setLoadingState("loaded");
  }
  async function buyNft(nft) {
    /* needs the user to sign the transaction, so will use Web3Provider and sign it */
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(nftmarketaddress, Market.abi, signer);

    /* user will be prompted to pay the asking process to complete the transaction */
    const price = ethers.utils.parseUnits(nft.price.toString(), "ether");
    const transaction = await contract.createMarketSale(
      nftaddress,
      nft.tokenId,
      {
        value: price,
      }
    );
    await transaction.wait();
    loadNFTs();
  }

  const getEllipsisTxt = (str, n = 6) => {
    if (str) {
      return `${str.slice(0, n)}...${str.slice(str.length - n)}`;
    }
    return "";
  };

  if (loadingState === "loaded" && !nfts.length)
    return <h1>No items in Marketplace!</h1>;

  console.log(nfts, "image");

  return (
    <>
      <Head>
        <title>TicketVast - NFT Ticket MarketPlace</title>
      </Head>
      <>
        <Hero />

        <Box pattern="glamorous" width="100%" bg={BodyBgColor}>
          <Heading
            fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
            color={CollheaderColor}
            justify="center"
            align="center"
            pt="10"
          >
            <Stack direction="row" justifyContent="center">
              <Text fontFamily="cursive" color="black" as="span">
                Ticket
              </Text>
              <GiTicket size="2.5rem" />{" "}
              <Text fontFamily="cursive" color="#733C3C" as="span">
                MarketPlace
              </Text>{" "}
            </Stack>
          </Heading>

          <SimpleGrid columns={[1, null, 4]} spacingX={4} spacingY={4}>
            {nfts.map((nft, i) => (
              <Flex
                key={i}
                p={50}
                w="full"
                alignItems="center"
                justifyContent="center"
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
                    <Flex alignItems="center" mt={4} color={TextCardColorMode}>
                      <Button
                        textColor={ButtonTextColor}
                        borderRadius="lg"
                        borderColor="gray.500"
                        bgColor={ButtonColorMode}
                        shadow="lg"
                        fontSize="m"
                        textTransform="uppercase"
                        fontWeight="normal"
                        as="kbd"
                        letterSpacing={1}
                        width="full"
                        onClick={() => buyNft(nft)}
                      >
                        Buy
                      </Button>
                    </Flex>
                  </Box>
                </Box>
              </Flex>
            ))}
          </SimpleGrid>
        </Box>
      </>
    </>
  );
}

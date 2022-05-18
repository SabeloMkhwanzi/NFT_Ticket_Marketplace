/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
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
} from "@chakra-ui/react";
import PillPity from "pill-pity";
import Head from "next/head";

import { nftaddress, nftmarketaddress } from "../config";
import NFT from "../artifacts/contracts/NFT.sol/NFT.json";
import Market from "../artifacts/contracts/NFTMarket.sol/NFTMarket.json";

import Hero from "../components/hero.tsx";

export default function Home() {
  const BodyBgColor = useColorModeValue("#FFF8D5", "gray.600");
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

  if (loadingState === "loaded" && !nfts.length)
    return <h1>No items in Marketplace!</h1>;

  console.log(nfts, "image");

  return (
    <>
      <Head>
        <title>TicketVast</title>
      </Head>
      <>
        <Hero />
        <PillPity pattern="glamorous" width="100%" bg={BodyBgColor}>
          <Heading
            fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
            color={useColorModeValue("gray.800", "white")}
            justify="center"
            align="center"
            pt="10"
          >
            <Text color={"purple.400"}>MarketPlace</Text>{" "}
          </Heading>

          <SimpleGrid columns={[1, null, 3]} spacingX="10px" spacingY="10px">
            {nfts.map((nft, i) => (
              <Flex
                key={i}
                p={50}
                w="full"
                alignItems="center"
                justifyContent="center"
              >
                <Box
                  bg={useColorModeValue("white", "gray.800")}
                  maxW="sm"
                  borderWidth="1px"
                  rounded="lg"
                  shadow="lg"
                  position="relative"
                >
                  <Image
                    src={nft.image}
                    alt={`Picture of ${nft.name}`}
                    roundedTop="lg"
                    boxSize="350px"
                    objectFit="cover"
                    width="100%"
                    maxHeight="100%"
                  />

                  <Box p="6">
                    <Flex
                      mt="1"
                      justifyContent="space-between"
                      alignContent="center"
                    >
                      <Box
                        fontSize="lg"
                        fontWeight="bold"
                        as="h4"
                        lineHeight="tight"
                        isTruncated
                      >
                        {nft.name}
                      </Box>
                      <Button
                        bg="purple.400"
                        size="md"
                        onClick={() => buyNft(nft)}
                      >
                        Buy
                      </Button>
                    </Flex>
                    <Flex justifyContent="space-between" alignContent="center">
                      <Box
                        fontSize="1xl"
                        fontWeight="semibold"
                        color={useColorModeValue("gray.800", "white")}
                      >
                        {nft.description}
                      </Box>
                    </Flex>
                    <Flex justifyContent="space-between" alignContent="center">
                      <Box
                        fontSize="2xl"
                        color={useColorModeValue("gray.800", "white")}
                      >
                        <Box
                          as="span"
                          color={"gray.600"}
                          fontSize="lg"
                          pl="250"
                        >
                          Matic
                        </Box>
                        {nft.price}
                      </Box>
                    </Flex>
                  </Box>
                </Box>
              </Flex>
            ))}
          </SimpleGrid>
        </PillPity>
      </>
    </>
  );
}

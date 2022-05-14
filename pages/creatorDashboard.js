/* pages/dashboard.js */
/* eslint-disable react-hooks/rules-of-hooks */
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
  Button,
  Heading,
  Text,
} from "@chakra-ui/react";
import PillPity from "pill-pity";
import Head from "next/head";

import { marketplaceAddress } from "../config";

import NFTMarketplace from "../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json";

export default function CreatorDashboard() {
  const [nfts, setNfts] = useState([]);
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

    const contract = new ethers.Contract(
      marketplaceAddress,
      NFTMarketplace.abi,
      signer
    );
    const data = await contract.fetchItemsListed();

    const items = await Promise.all(
      data.map(async (i) => {
        const tokenUri = await contract.tokenURI(i.tokenId);
        const meta = await axios.get(tokenUri);
        let price = ethers.utils.formatUnits(i.price.toString(), "ether");
        let item = {
          price,
          tokenId: i.tokenId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          image: meta.data.image,
        };
        return item;
      })
    );

    setNfts(items);
    setLoadingState("loaded");
  }

  if (loadingState === "loaded" && !nfts.length)
    return (
      <Heading
        fontSize={{ base: "2xl", md: "3xl", lg: "2xl" }}
        color={useColorModeValue("gray.800", "black")}
        justify="center"
        align="center"
        pt="10"
      >
        <Text color={"black.400"}>No assets owned</Text>{" "}
      </Heading>
    );
  return (
    <div>
      <Head>
        <title>Resell items</title>
      </Head>
      <PillPity pattern="glamorous" width="100%" height="100%">
        <Heading
          fontSize={{ base: "2xl", md: "3xl", lg: "2xl" }}
          color={useColorModeValue("gray.800", "black")}
          justify="center"
          align="center"
          pt="10"
        >
          <Text color={"black.400"}>COLLECTIBLES</Text>{" "}
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
                      <Box as="span" color={"gray.600"} fontSize="lg" pl="250">
                        Eth
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
    </div>
  );
}

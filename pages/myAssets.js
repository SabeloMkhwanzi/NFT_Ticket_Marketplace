/* pages/my-nfts.js */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import axios from "axios";
import Web3Modal from "web3modal";
import { useRouter } from "next/router";
import Head from "next/head";

import {
  SimpleGrid,
  Flex,
  Box,
  Image,
  useColorModeValue,
  Heading,
  Text,
  Divider,
} from "@chakra-ui/react";
import PillPity from "pill-pity";

import { marketplaceAddress } from "../config";

import NFTMarketplace from "../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json";

export default function MyAssets() {
  const [nfts, setNfts] = useState([]);
  const [loadingState, setLoadingState] = useState("not-loaded");
  const router = useRouter();
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

    const marketplaceContract = new ethers.Contract(
      marketplaceAddress,
      NFTMarketplace.abi,
      signer
    );
    const data = await marketplaceContract.fetchMyNFTs();

    const items = await Promise.all(
      data.map(async (i) => {
        const tokenURI = await marketplaceContract.tokenURI(i.tokenId);
        const meta = await axios.get(tokenURI);
        let price = ethers.utils.formatUnits(i.price.toString(), "ether");
        let item = {
          price,
          tokenId: i.tokenId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          image: meta.data.image,
          tokenURI,
        };
        return item;
      })
    );
    setNfts(items);
    setLoadingState("loaded");
  }
  function listNFT(nft) {
    router.push(`/resell-nft?id=${nft.tokenId}&tokenURI=${nft.tokenURI}`);
  }
  if (loadingState === "loaded" && !nfts.length)
    return <h1 className="py-10 px-20 text-3xl">No assets created</h1>;
  return (
    <div>
      <Head>
        <title>Dashboard</title>
      </Head>
      <PillPity pattern="glamorous" width="100%">
        <Heading
          fontSize={{ base: "2xl", md: "3xl", lg: "2xl" }}
          color={useColorModeValue("gray.800", "black")}
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

        {/* <Divider orientation="horizontal" color="black" />
        {Boolean(sold.length) && (
          <>
            <Heading
              fontSize={{ base: "2xl", md: "3xl", lg: "2xl" }}
              color={useColorModeValue("gray.800", "black")}
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
                      <Flex
                        justifyContent="space-between"
                        alignContent="center"
                      >
                        <Box
                          fontSize="1xl"
                          fontWeight="semibold"
                          color={useColorModeValue("gray.800", "white")}
                        >
                          {nft.description}
                        </Box>
                      </Flex>
                      <Flex
                        justifyContent="space-between"
                        alignContent="center"
                      >
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
          </>
        )} */}
      </PillPity>
    </div>
  );
}

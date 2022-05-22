import { useState } from "react";
import { useRouter } from "next/router";
import { ethers } from "ethers";
import { create as ipfsHttpClient } from "ipfs-http-client";
import Web3Modal from "web3modal";
import Head from "next/head";

const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

import { nftaddress, nftmarketaddress } from "../config";

import NFT from "../utils/NFT.json";
import Market from "../utils/NFTMarket.json";

import {
  Box,
  Stack,
  Heading,
  Text,
  Container,
  Input,
  Button,
  SimpleGrid,
  Image,
  useColorModeValue,
} from "@chakra-ui/react";

export default function CreateItem() {
  const BodyBgColor = useColorModeValue("#FFF8D5", "gray.600");
  const HeaderTextColor = useColorModeValue("black", "#B4ECE3");
  const ParagraphTextColor = useColorModeValue("gray.600", "white");

  const [fileUrl, setFileUrl] = useState(null);
  const [formInput, updateFormInput] = useState({
    price: "",
    name: "",
    description: "",
  });
  const router = useRouter();

  async function onChange(e) {
    const file = e.target.files[0];
    try {
      const added = await client.add(file, {
        progress: (prog) => console.log(`received: ${prog}`),
      });
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      setFileUrl(url);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }
  async function createItem() {
    const { name, description, price } = formInput;
    if (!name || !description || !price || !fileUrl) return;
    /* first, upload to IPFS */
    const data = JSON.stringify({
      name,
      description,
      image: fileUrl,
    });
    try {
      const added = await client.add(data);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      /* after file is uploaded to IPFS, pass the URL to save it on Polygon */
      createSale(url);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }

  async function createSale(url) {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    /* next, create the item */
    let contract = new ethers.Contract(nftaddress, NFT.abi, signer);
    let transaction = await contract.createToken(url);
    let tx = await transaction.wait();
    let event = tx.events[0];
    let value = event.args[2];
    let tokenId = value.toNumber();
    const price = ethers.utils.parseUnits(formInput.price, "ether");

    /* then list the item for sale on the marketplace */
    contract = new ethers.Contract(nftmarketaddress, Market.abi, signer);
    let listingPrice = await contract.getListingPrice();
    listingPrice = listingPrice.toString();

    transaction = await contract.createMarketItem(nftaddress, tokenId, price, {
      value: listingPrice,
    });
    await transaction.wait();
    router.push("/");
  }

  return (
    <>
      <Head>
        <title>Create Ticket</title>
      </Head>
      <Box position={"relative"} bg={BodyBgColor}>
        <Container
          bg={BodyBgColor}
          as={SimpleGrid}
          maxW={"7xl"}
          columns={{ base: 1, md: 2 }}
          spacing={{ base: 10, lg: 32 }}
          py={{ base: 10, sm: 20, lg: 32 }}
        >
          <Stack spacing={{ base: 10, md: 20 }}>
            <Heading
              lineHeight={1.1}
              fontSize={{ base: "3xl", sm: "4xl", md: "5xl", lg: "6xl" }}
              color={HeaderTextColor}
            >
              Using NFT to Sell Tickets could Reduce costs{" "}
              <Text
                as={"span"}
                bgGradient="linear(to-r, red.400,pink.400)"
                bgClip="text"
              >
                &
              </Text>{" "}
              Prevents Fake Tickets and Scams
            </Heading>
          </Stack>
          <Stack
            bg={BodyBgColor}
            rounded={"xl"}
            p={{ base: 4, sm: 6, md: 8 }}
            spacing={{ base: 8 }}
            maxW={{ lg: "lg" }}
          >
            <Stack spacing={4}>
              <Heading
                lineHeight={1.1}
                fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
                color={HeaderTextColor}
              >
                Quick Production
                <Text
                  as={"span"}
                  bgGradient="linear(to-r, red.400,pink.400)"
                  bgClip="text"
                  color={HeaderTextColor}
                >
                  !
                </Text>
              </Heading>
              <Text
                color={ParagraphTextColor}
                fontSize={{ base: "sm", sm: "md" }}
              >
                NFT-based tickets act as programmable money, providing unlimited
                potential for new revenue opportunities. An NFT can be minted
                and ready to sell in less than a minute.
                <br />
                <br />
                <Text color="red" as="mark" textTransform="uppercase">
                  NB: make sure you`re connected to Polygon testnet
                </Text>
              </Text>
            </Stack>
            <Box as={"form"} mt={10}>
              <Stack spacing={4}>
                <Input
                  type="text"
                  placeholder="Event Name"
                  bg={"gray.100"}
                  border={0}
                  color={"gray.500"}
                  _placeholder={{
                    color: "gray.500",
                  }}
                  onChange={(e) =>
                    updateFormInput({ ...formInput, name: e.target.value })
                  }
                />
                <Input
                  type="text"
                  placeholder="Event Location date time"
                  bg={"gray.100"}
                  border={0}
                  color={"gray.500"}
                  _placeholder={{
                    color: "gray.500",
                  }}
                  onChange={(e) =>
                    updateFormInput({
                      ...formInput,
                      description: e.target.value,
                    })
                  }
                />
                <Input
                  type="number"
                  placeholder="Amount in Matic"
                  bg={"gray.100"}
                  border={0}
                  color={"gray.500"}
                  _placeholder={{
                    color: "gray.500",
                  }}
                  onChange={(e) =>
                    updateFormInput({ ...formInput, price: e.target.value })
                  }
                />
                <Input
                  type="file"
                  name="Asset"
                  fontFamily={"heading"}
                  bg={"gray.200"}
                  color={"gray.800"}
                  onChange={onChange}
                />
                {fileUrl && (
                  // eslint-disable-next-line jsx-a11y/alt-text
                  <Image
                    src={fileUrl}
                    roundedTop="lg"
                    boxSize="350px"
                    objectFit="cover"
                    width="50%"
                    maxHeight="50%"
                  />
                )}
              </Stack>
              <Button
                fontFamily={"heading"}
                mt={8}
                w={"full"}
                bg={("purple.400", "purple.400")}
                color={"white"}
                _hover={("purple.400", "purple.400")}
                onClick={createItem}
              >
                Mint Ticket
              </Button>
            </Box>
            form
          </Stack>
        </Container>
      </Box>
    </>
  );
}

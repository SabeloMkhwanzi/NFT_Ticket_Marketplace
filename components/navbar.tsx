/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import {
  Box,
  Flex,
  HStack,
  Link,
  Button,
  useDisclosure,
  Stack,
  Text,
} from "@chakra-ui/react";

import {
  useColorMode,
  useColorModeValue,
  IconButton,
  IconButtonProps,
} from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";

import { HamburgerIcon, CloseIcon, AddIcon } from "@chakra-ui/icons";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

type ColorModeSwitcherProps = Omit<IconButtonProps, "aria-label">;

export const ColorModeSwitcher = (props: ColorModeSwitcherProps) => {
  const { toggleColorMode } = useColorMode();
  const text = useColorModeValue("dark", "light");
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);

  return (
    <IconButton
      size="md"
      fontSize="lg"
      variant="ghost"
      color="current"
      marginLeft="2"
      onClick={toggleColorMode}
      icon={<SwitchIcon />}
      aria-label={`Switch to ${text} mode`}
      {...props}
    />
  );
};

export default function withAction() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            color="purple.600"
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Box>
              <Text fontSize="3xl" fontWeight="bold">
                TicketVast
              </Text>
            </Box>

            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              <Stack direction={"row"} spacing={6}>
                <Link
                  px={2}
                  py={1}
                  fontWeight="bold"
                  rounded={"md"}
                  _hover={{
                    textDecoration: "none",
                    bg: useColorModeValue("purple.400", "purple.400"),
                  }}
                  href={"/"}
                >
                  Home
                </Link>
                <Link
                  px={2}
                  py={1}
                  fontWeight="bold"
                  rounded={"md"}
                  _hover={{
                    textDecoration: "none",
                    bg: useColorModeValue("purple.400", "purple.400"),
                  }}
                  href={"createItem"}
                >
                  Create Item
                </Link>
                <Link
                  px={2}
                  py={1}
                  fontWeight="bold"
                  rounded={"md"}
                  _hover={{
                    textDecoration: "none",
                    bg: useColorModeValue("purple.400", "purple.400"),
                  }}
                  href={"creatorDashboard"}
                >
                  CreatorDashboard
                </Link>
                <Link
                  px={2}
                  py={1}
                  fontWeight="bold"
                  rounded={"md"}
                  _hover={{
                    textDecoration: "none",
                    bg: useColorModeValue("purple.400", "purple.400"),
                  }}
                  href={"myAssets"}
                >
                  Dashboard
                </Link>
              </Stack>
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <ColorModeSwitcher
              variant={"solid"}
              bg={"purple.400"}
              size={"sm"}
              mr={4}
            />

            <Button
              onClick={onOpen}
              variant={"solid"}
              bg={"purple.400"}
              size={"sm"}
              mr={4}
              leftIcon={<AddIcon />}
            >
              connect wallet
            </Button>

            <Modal onClose={onClose} isOpen={isOpen} isCentered>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Connect Wallet</ModalHeader>
                <ModalCloseButton />
                <ModalBody>Please connect to Polygon Testnet</ModalBody>
                <ModalFooter>
                  <Button onClick={onClose}>Close</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              <Link
                px={2}
                py={1}
                fontWeight="bold"
                color="purple.600"
                rounded={"md"}
                _hover={{
                  textDecoration: "none",
                  bg: useColorModeValue("gray.200", "gray.700"),
                }}
                href={"/"}
              >
                Home
              </Link>
              <Link
                px={2}
                py={1}
                fontWeight="bold"
                color="purple.600"
                rounded={"md"}
                _hover={{
                  textDecoration: "none",
                  bg: useColorModeValue("gray.200", "gray.700"),
                }}
                href={"createItem"}
              >
                Creator Items
              </Link>
              <Link
                px={2}
                py={1}
                fontWeight="bold"
                color="purple.600"
                rounded={"md"}
                _hover={{
                  textDecoration: "none",
                  bg: useColorModeValue("gray.200", "gray.700"),
                }}
                href={"creatorDashboard"}
              >
                Creator Dashboard
              </Link>
              <Link
                px={2}
                py={1}
                fontWeight="bold"
                color="purple.600"
                rounded={"md"}
                _hover={{
                  textDecoration: "none",
                  bg: useColorModeValue("gray.200", "gray.700"),
                }}
                href={"myAssets"}
              >
                My Assets
              </Link>
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}

function setWalletAddress(wallet: any) {
  throw new Error("Function not implemented.");
}

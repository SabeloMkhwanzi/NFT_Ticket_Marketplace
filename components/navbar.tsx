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
import { GiTicket } from "react-icons/gi";

import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

type ColorModeSwitcherProps = Omit<IconButtonProps, "aria-label">;

//import WalletButton from "./WalletButton";
import ButtonConnect from "./buttonConnect/index";

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
  const BodyBgColor = useColorModeValue("#FFF8D5", "gray.600");

  return (
    <>
      <Box bg={BodyBgColor} px={4}>
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
            <Stack direction="row-reverse">
              <GiTicket size="2.5rem" />
              <Text fontFamily="cursive" fontSize="3xl" fontWeight="bold">
                TicketVast
              </Text>
            </Stack>

            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              <Stack direction={"row"} spacing={12} ml="60%">
                <Link
                  py={3}
                  fontSize="lg"
                  textTransform="uppercase"
                  fontWeight="normal"
                  as="kbd"
                  letterSpacing={2}
                  _hover={{
                    textDecorationColor: "red.300",
                  }}
                  href={"/"}
                >
                  Home
                </Link>
                <Link
                  py={3}
                  fontSize="lg"
                  textTransform="uppercase"
                  fontWeight="normal"
                  as="kbd"
                  letterSpacing={1}
                  href={"sell"}
                >
                  Mint Tickets
                </Link>
                <Link
                  py={3}
                  fontSize="lg"
                  textTransform="uppercase"
                  fontWeight="normal"
                  as="kbd"
                  letterSpacing={2}
                  href={"collections"}
                >
                  Collectibles
                </Link>
                <Link
                  py={3}
                  fontSize="lg"
                  textTransform="uppercase"
                  fontWeight="normal"
                  as="kbd"
                  letterSpacing={2}
                  href={"dashboard"}
                >
                  Dashboard
                </Link>
              </Stack>
            </HStack>
          </HStack>

          <Flex alignItems={"center"}>
            <ButtonConnect />
            <ColorModeSwitcher variant="ghost" size="sm" mr={4} />
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              <Link
                px={2}
                py={1}
                fontSize="lg"
                textTransform="uppercase"
                fontWeight="normal"
                as="kbd"
                letterSpacing={2}
                color="purple.600"
                href={"/"}
              >
                Home
              </Link>
              <Link
                px={2}
                py={1}
                fontSize="lg"
                textTransform="uppercase"
                fontWeight="normal"
                as="kbd"
                letterSpacing={2}
                color="purple.600"
                href={"sell"}
              >
                Sell Ticket
              </Link>
              <Link
                px={2}
                py={1}
                fontSize="lg"
                textTransform="uppercase"
                fontWeight="normal"
                as="kbd"
                letterSpacing={2}
                color="purple.600"
                href={"collections"}
              >
                Collectibles
              </Link>
              <Link
                px={2}
                py={1}
                fontSize="lg"
                textTransform="uppercase"
                fontWeight="normal"
                as="kbd"
                letterSpacing={3}
                color="purple.600"
                href={"dashboard"}
              >
                Dashboard
              </Link>
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}

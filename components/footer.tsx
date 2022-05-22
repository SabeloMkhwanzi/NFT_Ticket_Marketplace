import {
  Box,
  chakra,
  Container,
  Link,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
} from "@chakra-ui/react";
import { FaLinkedinIn, FaTwitter, FaGithub } from "react-icons/fa";
import { ReactNode } from "react";

const SocialButton = ({
  children,
  label,
  href,
}: {
  children: ReactNode;
  label: string;
  href: string;
}) => {
  return (
    <chakra.button
      bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
      rounded={"full"}
      w={8}
      h={8}
      cursor={"pointer"}
      as={"a"}
      href={href}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      _hover={{
        bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export default function SmallCentered() {
  const BodyBgColor = useColorModeValue("#FFF8D5", "gray.600");

  return (
    <Box
      borderTopWidth={3}
      borderStyle={"solid"}
      borderColor={useColorModeValue("purple.200", "")}
      bg={BodyBgColor}
      color={useColorModeValue("gray.700", "gray.200")}
    >
      <Container
        as={Stack}
        maxW={"6xl"}
        py={4}
        spacing={4}
        justify={"center"}
        align={"center"}
      >
        <Stack direction={"row"} spacing={6}>
          <Link
            fontSize="lg"
            textTransform="uppercase"
            fontWeight="normal"
            as="kbd"
            letterSpacing={2}
            color={useColorModeValue("purple.600", "white")}
            href={"/"}
          >
            Home
          </Link>
          <Link
            fontSize="lg"
            textTransform="uppercase"
            fontWeight="normal"
            as="kbd"
            letterSpacing={2}
            color={useColorModeValue("purple.600", "white")}
            href={"sell"}
          >
            Create Tickets
          </Link>
          <Link
            fontSize="lg"
            textTransform="uppercase"
            fontWeight="normal"
            as="kbd"
            letterSpacing={2}
            color={useColorModeValue("purple.600", "white")}
            href={"collections"}
          >
            Collectibles
          </Link>
          <Link
            fontSize="lg"
            textTransform="uppercase"
            fontWeight="normal"
            as="kbd"
            letterSpacing={2}
            color={useColorModeValue("purple.600", "white")}
            href={"myassets"}
          >
            My Assets
          </Link>
        </Stack>
      </Container>

      <Box
        borderTopWidth={2}
        borderStyle={"solid"}
        borderColor={useColorModeValue("purple.100", "")}
      >
        <Container
          as={Stack}
          maxW={"6xl"}
          py={4}
          direction={{ base: "column", md: "row" }}
          spacing={4}
          justify={{ base: "center", md: "space-between" }}
          align={{ base: "center", md: "center" }}
        >
          <Text
            fontSize="lg"
            textTransform="uppercase"
            fontWeight="normal"
            as="kbd"
            letterSpacing={2}
            color={useColorModeValue("purple.600", "white")}
          >
            © 2022 Made with ❤ by Sabelo
          </Text>
          <Stack direction={"row"} spacing={6}>
            <SocialButton
              label={"Twitter"}
              href={"https://twitter.com/SabeloMkhwanaz"}
            >
              <FaTwitter />
            </SocialButton>
            <SocialButton
              label={"Github"}
              href={"https://github.com/SabeloMkhwanzi"}
            >
              <FaGithub />
            </SocialButton>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}

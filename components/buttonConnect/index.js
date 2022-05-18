import React from "react";

import { Button, useColorModeValue } from "@chakra-ui/react";

import { GiWallet } from "react-icons/gi";

// Import Wagmi hooks
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

function ButtonConnect() {
  // bgColor
  const ButtonTextColor = useColorModeValue("white", "black");
  const ButtonColorMode = useColorModeValue("#8479E1", "#8479E1");
  const { data } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();

  const getEllipsisTxt = (str, n = 6) => {
    if (str) {
      return `${str.slice(0, n)}...${str.slice(str.length - n)}`;
    }
    return "";
  };

  if (data) {
    return (
      <Button
        color={ButtonTextColor}
        borderRadius="lg"
        bgColor={ButtonColorMode}
        leftIcon={<GiWallet />}
        onClick={() => disconnect()}
        shadow="lg"
        fontSize="m"
        textTransform="uppercase"
        fontWeight="normal"
        as="kbd"
        letterSpacing={2}
      >
        {getEllipsisTxt(data.address)}
        {/* {`${Number(getBalance?.formatted).toFixed(3)} ETH`} */}
      </Button>
    );
  }
  return (
    <>
      <Button
        textColor={ButtonTextColor}
        borderRadius="lg"
        borderColor="gray.500"
        bgColor={ButtonColorMode}
        leftIcon={<GiWallet />}
        onClick={() => connect()}
        shadow="lg"
        fontSize="m"
        textTransform="uppercase"
        fontWeight="normal"
        as="kbd"
        letterSpacing={1}
      >
        Connect Wallet
      </Button>
    </>
  );
}

export default ButtonConnect;

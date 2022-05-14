import "../styles/globals.css";
//import Link from "next/link";
import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "../components/navbar.tsx";
import Footer from "../components/footer.tsx";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </ChakraProvider>
  );
}

export default MyApp;

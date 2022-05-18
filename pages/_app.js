import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "../components/navbar.tsx";
import Footer from "../components/footer.tsx";
import { Provider, createClient } from "wagmi";

const client = createClient();

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Provider client={client}>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </Provider>
    </ChakraProvider>
  );
}

export default MyApp;

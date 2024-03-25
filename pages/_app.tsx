import { FC, useEffect } from "react";
import firebase from "firebase/compat/app";

import { ChakraProvider } from "@chakra-ui/react";

import { theme } from "@/themes";

import { Provider as ReduxProvider } from "react-redux";
import { store } from "@/store";

import "../styles/globals.css";
import "@fontsource/open-sans/300.css";
import "@fontsource/open-sans/400.css";
import "@fontsource/open-sans/500.css";
import "@fontsource/open-sans/600.css";
import "@fontsource/open-sans/700.css";
import "@fontsource/open-sans/800.css";

import Head from "next/head";
import { firebaseOptions } from "@/firebase";
import { Compose } from "@/contexts";
import UserProvider from "src/contexts/user";
import DistrictProvider from "src/contexts/districts";
import EmergencyProvider from "src/contexts/emergency";
import ComplaintProvider from "src/contexts/complaints";
import SettingsProvider from "src/contexts/settings";
import TrackerProvider from "src/contexts/trackers";
import { NewTrackerModal } from "@/components";
import DirectoryProvider from "src/contexts/directories";
import BannersProvider from "src/contexts/banners";
import ProgramProvider from "src/contexts/programs";
import { NewComplaintModal } from "src/components/newConplaintModal";

const MyApp: FC<{ Component: FC; pageProps: any }> = ({ Component, pageProps }) => {
  useEffect(() => {
    firebase.initializeApp(firebaseOptions);
  }, []);

  useEffect(() => {
    navigator.serviceWorker.getRegistration();
  }, []);

  return (
    <ReduxProvider store={store}>
      <ChakraProvider theme={theme}>
        <Head>
          <script
            src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAZzoNtUdkbca0OIFvzYZNmiuhQvJjpS0E&libraries=places&libraries=drawing"
            async
            defer
          ></script>
        </Head>
        <Compose
          providers={[
            SettingsProvider,
            UserProvider,
            DistrictProvider,
            EmergencyProvider,
            ComplaintProvider,
            TrackerProvider,
            DirectoryProvider,
            BannersProvider,


            ProgramProvider

            
          ]}
        >
          <ComponentMain Component={<Component {...pageProps} />} />
        </Compose>
      </ChakraProvider>
    </ReduxProvider>
  );
};

const ComponentMain = ({ Component }: any) => {
  return (
    <>
      <NewTrackerModal />
      <NewComplaintModal/>
      {Component}
    </>
  );
};

export default MyApp;

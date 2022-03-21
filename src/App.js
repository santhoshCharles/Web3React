import React, { useState, useEffect } from "react";
import { Provider, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Routes } from "./Routes/Routes";
import { ToastContainer, toast } from "react-toastify";
import { Web3Provider } from "./web3/contexts/web3Context";
import {
  loadWeb3,
  loadBlockChainData,
  listenAccountChange,
  listenNetworkChange,
} from "./web3/functions/web3";

import SplashScreen from "./components/SplashScreen/SplashScreen";

import "react-toastify/dist/ReactToastify.css";
import "react-phone-number-input/style.css";
import "react-perfect-scrollbar/dist/css/styles.css";

const App = ({ store, persistor }) => {
  const [loading, setLoading] = useState(false);
  const [networkDetails, setNetworkDetails] = useState({
    address: "",
    web3: "",
    connected: "",
    connectTag: "",
    chainData: "",
    wallet: "",
    chainId: "",
    networkId: "",
    balance: "",
  });
  
  const resetApp = async () => {
    setNetworkDetails({
      address: "",
      web3: "",
      connected: false,
      connectTag: "",
      chainData: "",
      wallet: "",
      chainId: "",
      networkId: "",
      balance: "",
    });
    const web3 = window.web3;
    // localStorage.clear();
    //close -> disconnect
    if (web3 && web3.currentProvider && web3.currentProvider.disconnect) {
      await web3.currentProvider.disconnect();
    }
  };
  
  const handleConnect = async () => {
    const metaMaskInstalled = typeof window.web3 !== "undefined";
    if (metaMaskInstalled) {
      setLoading(true);
      await loadWeb3(setLoading);
      await loadBlockChainData(setNetworkDetails, networkDetails, setLoading);
      await listenAccountChange(
        setNetworkDetails,
        networkDetails,
        setLoading,
        resetApp
      );
      await listenNetworkChange(
        setNetworkDetails,
        networkDetails,
        setLoading,
        resetApp
      );
    } else {
      toast.info(
        "Metamask Extension Not Found ! Please Install Metamask to Connect"
      );
    }
  };
  
  useEffect(() => {
    let injected = localStorage.getItem("injected");
    if (injected && injected !== undefined) {
      let walletName = localStorage.getItem("wallet_name");
      if (walletName && walletName !== undefined && store.getState().auth.tokenVerified) {
        if (walletName === "metamask") {
          handleConnect();
        }
      }
    }
  }, []);
  
  /* Provide Redux store */
  return (
    <Web3Provider
      value={{
        loadWeb3,
        loading,
        setLoading,
        networkDetails,
        setNetworkDetails,
        loadBlockChainData,
        listenAccountChange,
        listenNetworkChange,
        handleConnect,
        resetApp,
      }}
    >
      <Provider store={store}>
        {/* Asynchronously persist redux stores and show `SplashScreen` while it's loading. */}
        <PersistGate persistor={persistor} loading={<SplashScreen />}>
          <Routes />
          <ToastContainer autoClose={3000} />
        </PersistGate>
      </Provider>
      {/* <ToastContainer /> */}
    </Web3Provider>
  );
};

export default App;

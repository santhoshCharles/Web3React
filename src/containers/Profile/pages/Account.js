import React, { useContext, useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Web3 from "web3";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Web3Context } from "../../../web3/contexts/web3Context";
import copy_paste from "../../../assets/images/copy_paste.png";
import Metamask from "../../../assets/images/metamask.svg";
import { isValidWalletAccount } from "../../../utils";
import { poolMethods } from "../../../web3/functions/factory";
import { ellipseAddress } from "../../../web3/helpers/utils";
import { enviornment } from "../../../constants/constants";
import { updateProfileAsync } from "../../Profile/redux/userProfileApi";

const Account = () => {
  const dispatch = useDispatch();
  const [isCopied, setIsCopied] = useState(false);
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");

  const { walletAddress } = useSelector((state) => state.auth.user);

  const { networkDetails, handleConnect } = useContext(Web3Context);

  const onCopyText = () => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  const connectWallet = () => {
    handleConnect();
  };

  useEffect(() => {
    if (networkDetails && networkDetails.connected) {
      (async () => {
        let bal = await networkDetails.web3.eth.getBalance(
          networkDetails.address
        );
        setAddress(networkDetails.address);
        if (bal && bal !== 0) {
          setBalance(parseFloat(bal / enviornment.divideValue).toFixed(2));
        }
      })();
    }
  }, [networkDetails]);

  useEffect(() => {
    if (address && !walletAddress) {
      dispatch(
        updateProfileAsync({
          walletAddress: networkDetails.address,
        })
      );
    }
  }, [address, walletAddress]);

  return (
    <Container className="bg-white shadowBox radius-top-0 ReferralsPage">
      {networkDetails.connected &&
      isValidWalletAccount(networkDetails.address, walletAddress) ? (
        <>
          <div className="Ape_text pb-3 f34_medium_Neue">
            Account Balance <br />{" "}
            <span className="color_blue f40_extraRegu_Neue text-break wall_address">
              {balance}
            </span>
          </div>
          <div className="Ape_text pb-3 f34_medium_Neue">
            Wallet Address <br />{" "}
            <span className="color_blue f40_extraRegu_Neue text-break wall_address">
              {ellipseAddress(networkDetails.address)}
            </span>
          </div>
        </>
      ) : !networkDetails.connected ? (
        <a className="btn btn-blue" onClick={connectWallet}>
          Connect
        </a>
      ) : (
        <div>
          {walletAddress ? (
            <div className="Ape_text pb-3 f34_medium_Neue">
              Your valid wallet account Address is{" "}
              {ellipseAddress(walletAddress)} <br />
              Please connect to this wallet account.
            </div>
          ) : (
            <div className="Ape_text pb-3 f34_medium_Neue">
              Please connect to your wallet account.
            </div>
          )}
        </div>
      )}
    </Container>
  );
};

export default Account;

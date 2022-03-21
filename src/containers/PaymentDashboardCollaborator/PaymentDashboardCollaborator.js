import React, { useState, useEffect, useContext } from "react";
import { Container, Table, InputGroup, FormControl, Button } from "react-bootstrap";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { Link } from "react-router-dom";
import { PageTitle } from "../../components/PageTitle/PageTitle";

import Database from "./../../assets/images/Database.svg";
import withdraw from "./../../assets/images/withdraw.svg";
import LoadingImage from "./../../assets/images/Rolling-1s-200px.svg";
import Etherim from "./../../assets/images/ethereum.svg";
import Walletgreen from "./../../assets/images/Wallet_green.svg";
import save_money from "./../../assets/images/save-money.svg";
import arrowright_green from "./../../assets/images/arrowright_green.svg";
import { PaymentDashboardActions } from "./redux/paymentDashboardAction";
import {
  getCurrentWorkTaskAsync,
  getTransactionHistoryAsync,
} from "./redux/paymentDashboardApi";
import { dayDifferenceTimestamp } from "../../utils";
import moment from "moment";
import { Web3Context } from "../../web3/contexts/web3Context";

const PaymentDashboardCollaborator = () => {
  const dispatch = useDispatch();

  const { networkDetails } = useContext(Web3Context);

  const {
    currentWorkTask,
    isLoading,
    transactionLimit,
    transactionHistory,
    refreshTransactions,
    refreshWorkTasks,
    workTasksLimit
  } = useSelector((state) => state.paymentDashboard, shallowEqual);
  useEffect(() => {
    dispatch(getCurrentWorkTaskAsync());
    dispatch(getTransactionHistoryAsync());
  }, []);

  useEffect(() => {
    if(refreshTransactions) dispatch(getTransactionHistoryAsync());
  }, [refreshTransactions])

  useEffect(() => {
    if(refreshWorkTasks) dispatch(getCurrentWorkTaskAsync());
  }, [refreshWorkTasks])

  const daysDifferenceEndDate = (endDate) => {
    return dayDifferenceTimestamp(endDate, Date.now());
  };

  const setBatchNumber = () => {
    dispatch(PaymentDashboardActions.setWorkTaskBatchNumber(workTasksLimit + 5));
  };
  const setTransactionHistoryBatchNumber = () => {
    dispatch(
      PaymentDashboardActions.setTransactionBatchNumber(transactionLimit + 5)
    );
  };
  return (
    <>
      <PageTitle title="Dashboard" />
      <div className="pt-80 pb-80 min-height-50vh">
        {/*         <Container className="shadowBox bg-white">
          <div className="re_borderBox row">
            <div className="re_borderBoxItem col">
              <div className="d-flex flex-column align-items-center justify-content-end h-100">
                <div className="p4 opacity50">Net Income</div>
                <img src={Database} alt="" width="28px" className="my-2" />
                <div className="h5">$14,000.00</div>
              </div>
            </div>
            <div className="re_borderBoxItem col">
              <div className="d-flex flex-column align-items-center justify-content-end h-100">
                <div className="p4 opacity50">Balance Withdrawn</div>
                <img src={withdraw} alt="" className="my-2" />
                <div className="h5">$10,000.00</div>
              </div>
            </div>
            <div className="re_borderBoxItem col">
              <div className="d-flex flex-column align-items-center justify-content-end h-100">
                <div className="p4 opacity50">Available for withdrawal</div>
                <img src={save_money} alt="" className="my-2" />
                <div className="h5">$1,100.00</div>
              </div>
            </div>
          </div>
        </Container> */}
        
        <Container className="shadowBox bg-white mt-4">
          <div className="re_Profiletabs mb-4">
            <button type="button" className="active">
              My Wallets
            </button>
          </div>
          <div className={`row align-items-center mb-4 ${networkDetails.chainId == "0x1" && "walletBackground"}`}>
            <div className=" col-lg-4  ">
              <div className=" d-flex align-items-center currancy_name p3">
                {/* <img src={Etherim} className="mr-3 " /> */}
                <div>Ethereum</div>
              </div>
            </div>
            <div className=" col-lg-8 ">
              <div className="row align-items-center">
                <div className=" col-lg-4  ">
                  <div className=" d-flex align-items-center currancy_name p4 justify-content-lg-end my-3 my-lg-0">
                    <img src={Walletgreen} className="mr-3 " /><div className="color_gray">Wallet Address </div>
                  </div>
                </div>
                <div className=" col-lg-8 ">
                  <InputGroup className="input-border ">
                    <FormControl
                      className="p3"
                      value={networkDetails && networkDetails.address}
                      disabled={true}
                    />
                    <InputGroup.Prepend>

                      <Button variant="link" className="button mr-0">

                        <img src={arrowright_green} />
                      </Button>

                    </InputGroup.Prepend>

                  </InputGroup>
                </div>
              </div>
            </div>
          </div>

          <div className={`row align-items-center mb-4 ${networkDetails.chainId == "0x13881" && "walletBackground"}`}>
            <div className=" col-lg-4  ">
              <div className=" d-flex align-items-center currancy_name p3">
                {/* <img src={Etherim} className="mr-3 " /> */}
                <div>Polygon</div>
              </div>
            </div>
            <div className=" col-lg-8 ">
              <div className="row align-items-center">
                <div className=" col-lg-4  ">
                  <div className=" d-flex align-items-center currancy_name p4 justify-content-lg-end my-3 my-lg-0">
                    <img src={Walletgreen} className="mr-3 " /><div className="color_gray">Wallet Address </div>
                  </div>
                </div>
                <div className=" col-lg-8 ">
                  <InputGroup className="input-border ">
                    <FormControl

                      className="p3"
                      value={networkDetails && networkDetails.address}
                      disabled={true}
                    />
                    <InputGroup.Prepend>

                      <Button variant="link" className="button mr-0">

                        <img src={arrowright_green} />
                      </Button>

                    </InputGroup.Prepend>

                  </InputGroup>
                </div>
              </div>
            </div>
          </div>

          <div className={`row align-items-center mb-4 ${networkDetails.chainId == "0x61" && "walletBackground"}`}>
            <div className=" col-lg-4  ">
              <div className=" d-flex align-items-center currancy_name p3">
                {/* <img src={Etherim} className="mr-3 " /> */}
                <div>Binance Smart Chain</div>
              </div>
            </div>
            <div className=" col-lg-8 ">
              <div className="row align-items-center">
                <div className=" col-lg-4  ">
                  <div className=" d-flex align-items-center currancy_name p4 justify-content-lg-end my-3 my-lg-0">
                    <img src={Walletgreen} className="mr-3 " /><div className="color_gray">Wallet Address </div>
                  </div>
                </div>
                <div className=" col-lg-8 ">
                  <InputGroup className="input-border ">
                    <FormControl

                      className="p3"
                      value={networkDetails && networkDetails.address}
                      disabled={true}
                    />
                    <InputGroup.Prepend>

                      <Button variant="link" className="button mr-0">

                        <img src={arrowright_green} />
                      </Button>

                    </InputGroup.Prepend>

                  </InputGroup>
                </div>
              </div>
            </div>
          </div>

          <div className={`row align-items-center mb-4 ${networkDetails.chainId == "0x6357d2e0" && "walletBackground"}`}>
            <div className=" col-lg-4  ">
              <div className=" d-flex align-items-center currancy_name p3">
                {/* <img src={Etherim} className="mr-3 " /> */}
                <div>Harmony</div>
              </div>
            </div>
            <div className=" col-lg-8 ">
              <div className="row align-items-center">
                <div className=" col-lg-4  ">
                  <div className=" d-flex align-items-center currancy_name p4 justify-content-lg-end my-3 my-lg-0">
                    <img src={Walletgreen} className="mr-3 " /><div className="color_gray">Wallet Address </div>
                  </div>
                </div>
                <div className=" col-lg-8 ">
                  <InputGroup className="input-border ">
                    <FormControl

                      className="p3"
                      value={networkDetails && networkDetails.address}
                      disabled={true}
                    />
                    <InputGroup.Prepend>

                      <Button variant="link" className="button mr-0">

                        <img src={arrowright_green} />
                      </Button>

                    </InputGroup.Prepend>

                  </InputGroup>
                </div>
              </div>
            </div>
          </div>
        </Container>

        <Container className="shadowBox bg-white mt-4">
          <div className="re_Profiletabs ">
            <button type="button" className="active">
              Transactions
            </button>
          </div>
          {transactionHistory &&
            transactionHistory.records &&
            transactionHistory.records.length > 0 ? (
            <Table responsive className="re_table">
              <thead>
                <tr>
                  <th>WorkTask Name</th>
                  <th>Total Bonus Earned</th>
                  <th>Minimum Guaranteed Payment</th>
                  <th>Currency</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {transactionHistory.records.map((transaction) => (
                  <tr>
                    <td>
                      {transaction.packages.name}
                      <Link to={`/project-details/${transaction._id}`}>
                        (View Project)
                      </Link>
                    </td>
                    <td></td>
                    <td>
                      <div className="d-flex justify-content-start">
                        <div className="re_ellips max-width-290px">
                          {`${transaction.tokenName ? transaction.tokenName : '$'}${transaction.packages.minimumCost}`}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="re_ellips max-width-120px">
                        {transaction.tokenName ? transaction.tokenName : '-'}
                      </div>
                    </td>
                    <td>{`${transaction.tokenName ? transaction.tokenName : '$'}${transaction.packages.minimumCost}`}</td>
                  </tr>
                ))}
                {transactionHistory &&
                  transactionHistory.recordsFiltered <
                  transactionHistory.recordsTotal ? (
                  <button
                    type="button"
                    className="btn btn-gray btn-sm"
                    onClick={setTransactionHistoryBatchNumber}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        Loading...
                        <img
                          src={LoadingImage}
                          alt="LoadingImage"
                          width="20px"
                          className="ml-2"
                        />
                      </>
                    ) : (
                      "Show More"
                    )}
                  </button>
                ) : null}
              </tbody>
            </Table>
          ) : (
            <div className="text-center p3 color_gray ">
              No transaction history found
            </div>
          )}
        </Container>
        <Container className="shadowBox bg-white mt-4">
          <div className="re_Profiletabs ">
            <button type="button" className="active">
              Current WorkTasks
            </button>
          </div>
          {currentWorkTask &&
            currentWorkTask.records &&
            currentWorkTask.records.length > 0 ? (
            <Table responsive className="re_table">
              <thead>
                <tr>
                  <th>WorkTask Name</th>
                  <th>Minimum Guaranteed Payment</th>
                  <th>Currency</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {currentWorkTask.records.map((record) => (
                  <tr>
                    <td>
                      {record.packages.name}
                      <Link to={`/project-details/${record._id}`}>
                        (View Project)
                      </Link>
                    </td>
                    <td>{record.tokenName ? record.tokenName : '$' + record.packages.minimumCost}</td>
                    <td>
                      <div className="d-flex justify-content-start">
                        <div className="re_ellips max-width-290px">
                          {record.tokenName ? record.tokenName : '-'}
                        </div>
                      </div>
                    </td>
                    <td>{record.tokenName ? record.tokenName : '$' + record.packages.minimumCost}</td>
                  </tr>
                ))}
                {currentWorkTask &&
                  currentWorkTask.recordsFiltered <
                  currentWorkTask.recordsTotal ? (
                  <button
                    type="button"
                    className="btn btn-gray btn-sm"
                    onClick={setBatchNumber}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        Loading...
                        <img
                          src={LoadingImage}
                          alt="LoadingImage"
                          width="20px"
                          className="ml-2"
                        />
                      </>
                    ) : (
                      "Show More"
                    )}
                  </button>
                ) : null}
              </tbody>
            </Table>
          ) : (
            <div className="text-center p3 color_gray ">
              No worktask present
            </div>
          )}
        </Container>
      </div>
    </>
  );
};

export default PaymentDashboardCollaborator;

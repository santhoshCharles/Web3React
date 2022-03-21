import React, { useEffect, useContext } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { Container, Table, InputGroup, FormControl, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { PageTitle } from "../../components/PageTitle/PageTitle";

import bonus from "./../../assets/images/dashboard/bonus.svg";
import money from "./../../assets/images/dashboard/money.svg";
import moneybag from "./../../assets/images/dashboard/money-bag.svg";
import pay from "./../../assets/images/dashboard/pay.svg";
import ReturnCancellations from "./../../assets/images/dashboard/ReturnCancellations.svg";
import Etherim from "./../../assets/images/ethereum.svg";
import Walletgreen from "./../../assets/images/Wallet_green.svg";
import arrowright_green from "./../../assets/images/arrowright_green.svg";
import {
  getCurrentWorkTaskInitiatorAsync,
  getDeliveredWorkTaskInitiatorAsync
} from "../PaymentDashboardCollaborator/redux/paymentDashboardApi"
import LoadingImage from "./../../assets/images/Rolling-1s-200px.svg";
import { PaymentDashboardActions } from "../PaymentDashboardCollaborator/redux/paymentDashboardAction";
import { Web3Context } from "../../web3/contexts/web3Context";

const ExpensesDashBoardInitiator = () => {
  const dispatch = useDispatch()

  const { networkDetails } = useContext(Web3Context);

  const {
    currentWorkTaskInitiator,
    isLoading,
    workTasksLimitIn,
    transactionLimit,
    transactionHistory,
    deliveredWorkTask,
    refreshWorkTasksIn,
    deliveredworkTasksLimitIn,
    refreshDeliveredWorkTasksIn
  } = useSelector((state) => state.paymentDashboard, shallowEqual);

  useEffect(() => {
    dispatch(getCurrentWorkTaskInitiatorAsync());
    dispatch(getDeliveredWorkTaskInitiatorAsync());
  }, []);

  useEffect(() => {
    if(refreshWorkTasksIn)
    dispatch(getCurrentWorkTaskInitiatorAsync());
  }, [refreshWorkTasksIn]);

  useEffect(() => {
    if(refreshDeliveredWorkTasksIn)
    dispatch(getDeliveredWorkTaskInitiatorAsync());
  }, [refreshDeliveredWorkTasksIn]);

  const setBatchNumber = () => {
    dispatch(PaymentDashboardActions.setWorkTaskBatchNumberIn(workTasksLimitIn + 1));
  };

  const setDeliveredBatchNumber = () => {
    dispatch(PaymentDashboardActions.setDeliveredWorkTaskBatchNumberIn(deliveredworkTasksLimitIn + 1));
  };
  

  return (
    <>
    {console.log({networkDetails})}
      <PageTitle title="Dashboard" />
      <div className="pt-80 pb-80 min-height-50vh">
        {/* <Container className="shadowBox bg-white">
          <div className="re_borderBox row">
            <div className="re_borderBoxItem col">
              <div className="d-flex flex-column align-items-center justify-content-end h-100">
                <div className="p4 opacity50">
                  Total Remaining
                  <br />
                  Budget
                </div>
                <img src={moneybag} alt="" width="28px" className="my-2" />
                <div className="h5">$14,000.00</div>
              </div>
            </div>
            <div className="re_borderBoxItem col">
              <div className="d-flex flex-column align-items-center justify-content-end h-100">
                <div className="p4 opacity50">
                  Total
                  <br />
                  Spent
                </div>
                <img src={money} alt="" className="my-2" />
                <div className="h5">$10,000.00</div>
              </div>
            </div>
            <div className="re_borderBoxItem col">
              <div className="d-flex flex-column align-items-center justify-content-end h-100">
                <div className="p4 opacity50">
                  Bonuses
                  <br />
                  Distributed
                </div>
                <img src={bonus} alt="" className="my-2" />
                <div className="h5">$1,100.00</div>
              </div>
            </div>
            <div className="re_borderBoxItem col">
              <div className="d-flex flex-column align-items-center justify-content-end h-100">
                <div className="p4 opacity50">
                  Guaranteed Payment
                  <br />
                  Distributed
                </div>
                <img src={pay} alt="" className="my-2" />
                <div className="h5">$1,100.00</div>
              </div>
            </div>
            <div className="re_borderBoxItem col">
              <div className="d-flex flex-column align-items-center justify-content-end h-100">
                <div className="p4 opacity50">
                  Return from
                  <br />
                  Cancellations
                </div>
                <img src={ReturnCancellations} alt="" className="my-2" />
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
              Current WorkTasks
            </button>
          </div>
          {currentWorkTaskInitiator &&
            currentWorkTaskInitiator.records &&
            currentWorkTaskInitiator.records.length > 0 ? (
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
                {currentWorkTaskInitiator.records.map((record) => (
                  <tr key={record._id}>
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
                {currentWorkTaskInitiator &&
                  currentWorkTaskInitiator.recordsFiltered <
                  currentWorkTaskInitiator.recordsTotal ? (
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

        <Container className="shadowBox bg-white mt-4">
          <div className="re_Profiletabs ">
            <button type="button" className="active">
              Delivered WorkTasks
            </button>
          </div>
          {deliveredWorkTask &&
            deliveredWorkTask.records &&
            deliveredWorkTask.records.length > 0 ? (
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
                {deliveredWorkTask.records.map((record) => (
                  <tr key={record._id}>
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
                {deliveredWorkTask &&
                  deliveredWorkTask.recordsFiltered <
                  deliveredWorkTask.recordsTotal ? (
                  <button
                    type="button"
                    className="btn btn-gray btn-sm"
                    onClick={setDeliveredBatchNumber}
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
              No delivered worktask present
            </div>
          )}
        </Container>
      </div>
    </>
  );
};

export default ExpensesDashBoardInitiator;

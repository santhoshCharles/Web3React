import React, { useState, useEffect } from "react";
import picon from "../../../assets/images/p-icon.png";
import success from "../../../assets/images/success.svg";
import Database from "../../../assets/images/Database.svg";
import EarningModal from "../../../components/Modal/EarningModal";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { getEarningListAsync } from "../redux/userProfileApi"
import { ReactTimeAgoC } from "../../../components/utils/ReactTimeAgoC";
import SplashScreen from "../../../components/SplashScreen/SplashScreen";

const Earnings = () => {
  const [show, setShow] = useState(false);
  const [selectedPackage, setPackageData] = useState({});
  const handleClose = () => setShow(false);
  const handleShow = (data) => {
    setShow(true);
    setPackageData(data)
    console.log({data})
  }

  const dispatch = useDispatch()

  const {
    earningList,
    isLoading
  } = useSelector((state) => state.userProfile, shallowEqual);

  useEffect(() => {
    dispatch(getEarningListAsync())
  }, [])

  return (
    <>
    {isLoading && <SplashScreen />}
      <Container className="bg-white shadowBox radius-top-0">
        {/* ----------- */}
        {/* <div className="text-center my-5 color_gray h3">
          You will soon be able to track your earnings & allocations here.
        </div> */}
        {earningList && earningList.map((earningData, index) => {
          return (<div className="row mx-0 justify-content-between re_EarningsList" key={index}>
            <div className="col-md-8 d-flex  align-items-center">
              <div className="re_picon">
                <img src={picon} alt="icon" className="mw-100 mh-100" />
              </div>
              <div className="pl-3">
                <div className="d-flex flex-md-row flex-column align-items-start align-items-lg-center pb-2">
                  <div className="p4 pr-2">{earningData.name}</div>
                  <span className="p4 color_gray text-nowrap">
                    <ReactTimeAgoC date={new Date(earningData.endDate)} />
                  </span>
                </div>
                <div className="d-flex flex-md-row flex-column align-items-start align-items-md-center pb-2">
                  <div className="h5 d-flex align-items-center pr-3">
                    <img src={Database} alt="Database" className="mr-2" />
                    <span>{earningData.total}</span>
                  </div>
                  <div className="h5 d-flex align-items-center">
                    <img src={success} alt="success" className="mr-2" />
                    <span>{earningData.review}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 d-flex align-items-center justify-content-md-end">
              <button
                type="button"
                className="btn btn-blue"
                onClick={() => handleShow(earningData)}
              >
                View Detail
              </button>
            </div>
          </div>)
        })}

        {/* ----------- */}

        <EarningModal show={show} handleClose={handleClose} {...selectedPackage}/>
      </Container>
    </>
  );
};
export default Earnings;

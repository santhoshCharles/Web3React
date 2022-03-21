import React, { useState } from "react";
import { Container } from "react-bootstrap";
import {
  ListItems,
  ListItems2,
} from "../../../components/PackagesList/ListItems";

import buttonShow from "../../../assets/images/buttonShow.svg"
import payment1 from "../../../assets/images/payment1.svg"
import payment2 from "../../../assets/images/payment2.svg"
import payment3 from "../../../assets/images/payment3.svg"

const Payments = () => {
  const [showTab, setShowTab] = useState(0)
  const handleChangeTab = (e) => {
    setShowTab(e)
    if (showTab === 1 && e === 1 || showTab === 2 && e === 2 || showTab === 3 && e === 3 || showTab === 4 && e === 4) {
      setShowTab(0)
    }
  }
  return (
    <>
      <Container className="shadowBox radius-top-0 bg-white">
        <div className="re_dashboardBoxInitiator">
          <div className="text-center re_dashboardBoxInitiatorItem">
            <img src={payment1} alt={payment1} />
            <div className="p4 pt-3 pb-1">
              Bonus received
            </div>
            <div className="h1">$25.00</div>
          </div>
          <div className="text-center re_dashboardBoxInitiatorItem">
            <img src={payment2} alt={payment2} />
            <div className="p4 pt-3 pb-1">
              Current Balance
            </div>
            <div className="h1">$25.00</div>
          </div>
          <div className="text-center re_dashboardBoxInitiatorItem">
            <img src={payment3} alt={payment3} />
            <div className="p4 pt-3 pb-1">
              Total Earned
            </div>
            <div className="h1">$25.00</div>
          </div>
        </div>
      </Container>
      <Container className="bg-white shadowBox mt-4">
        <div className="d-flex align-items-center justify-content-between">
          <div className="h3">Minimum Guaranteed Payments</div>
          <button type="button" className={`btn btn-link ${showTab === 1 ? "rotate180" : ""}`} onClick={() => handleChangeTab(1)}>
            <img src={buttonShow} alt="Show" />
          </button>
        </div>
        {showTab === 1 && <div className=" pt-3">
          <ListItems
            usd={true}
            title="Latest Package name here"
            link="/package-details"
            tag1="Cooperative"
            tag2="Granted"
            tag3="21 March, 2021"
            tag4="Intermediate"
            bonus="50000.00"
          />
          <ListItems
            usd={true}
            title="Latest Package name here"
            link="/package-details"
            tag1="Cooperative"
            tag2="Granted"
            tag3="21 March, 2021"
            tag4="Intermediate"
            bonus="50000.00"
          />
        </div>}
      </Container>
      <Container className="bg-white shadowBox mt-4">
        <div className="d-flex align-items-center justify-content-between">
          <div className="h3">Bonus received: <span className="color_gray">$25.00</span></div>
          <button type="button" className={`btn btn-link ${showTab === 2 ? "rotate180" : ""}`} onClick={() => handleChangeTab(2)}>
            <img src={buttonShow} alt="Show" />
          </button>
        </div>
        {showTab === 2 && <div className=" pt-3">
          <ListItems2
            usd={true}
            title="Project name here"
            link="/project-details"
            tag1="Category"
            tag2="21 March, 2021"
            bonus="50000.00"
          />
          <ListItems2
            usd={true}
            title="Project name here"
            link="/project-details"
            tag1="Category"
            tag2="21 March, 2021"
            bonus="50000.00"
          />
        </div>}
      </Container>
      <Container className="bg-white shadowBox mt-4">
        <div className="d-flex align-items-center justify-content-between">
          <div className="h3">Current Balance: <span className="color_gray">$25.00</span></div>
          <button type="button" className={`btn btn-link ${showTab === 3 ? "rotate180" : ""}`} onClick={() => handleChangeTab(3)}>
            <img src={buttonShow} alt="Show" />
          </button>
        </div>
        {showTab === 3 && <div className=" pt-3">
          <ListItems
            usd={true}
            title="Latest Package name here"
            link="/package-details"
            tag1="Cooperative"
            tag2="Granted"
            tag3="21 March, 2021"
            tag4="Intermediate"
            bonus="50000.00"
          />
          <ListItems
            usd={true}
            title="Latest Package name here"
            link="/package-details"
            tag1="Cooperative"
            tag2="Granted"
            tag3="21 March, 2021"
            tag4="Intermediate"
            bonus="50000.00"
          />
        </div>}
      </Container>
      <Container className="bg-white shadowBox mt-4">
        <div className="d-flex align-items-center justify-content-between">
          <div className="h3">Total Earned: <span className="color_gray">$25.00</span></div>
          <button type="button" className={`btn btn-link ${showTab === 4 ? "rotate180" : ""}`} onClick={() => handleChangeTab(4)}>
            <img src={buttonShow} alt="Show" />
          </button>
        </div>
        {showTab === 4 && <div className=" pt-3">
          <ListItems
            usd={true}
            title="Latest Package name here"
            link="/package-details"
            tag1="Cooperative"
            tag2="Granted"
            tag3="21 March, 2021"
            tag4="Intermediate"
            bonus="50000.00"
          />
          <ListItems
            usd={true}
            title="Latest Package name here"
            link="/package-details"
            tag1="Cooperative"
            tag2="Granted"
            tag3="21 March, 2021"
            tag4="Intermediate"
            bonus="50000.00"
          />
        </div>}
      </Container>
    </>
  );
};
export default Payments;

import React from "react";

import cloud from "../../assets/images/cloud-computing.png";

const NoData = () => {
  return (
    <>
      <div className="Re_NoDataFound">
        <img src={cloud} alt="No Data" className="opacity30" />
        <div className="pt-3 h3 ">Sorry! no data found</div>
        <div className="pb-3 p2 opacity30">Try something else</div>
      </div>
    </>
  );
};
export default NoData;

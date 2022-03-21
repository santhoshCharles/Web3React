import React from "react";
import closeGray from "../../assets/images/closeGray.svg";

export const GrayChipItem = (props) => {
  return (
    <>
      <div className="re_tag_item">
        {props.item}
        <button type="button" className="button" onClick={props.onClick}>
          {props.close && <img src={closeGray} alt="close" width="10px" />}
        </button>
      </div>
    </>
  );
};

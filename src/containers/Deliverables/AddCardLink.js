import React from "react";
import PlusGreen from "./../../assets/images/PlusGreen.svg";

const AddCardLink = (props) => {
  return (
    <>
      <button
        type="button"
        className="re_workBox re_addCardBtn d-flex justify-content-center align-items-center"
        onClick={props.onClick}
      >
        <img src={PlusGreen} alt="" className="mr-2" />
        Add a card
      </button>
    </>
  );
};

export default AddCardLink;

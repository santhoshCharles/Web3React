import React from "react";

import logo from "../../assets/images/logo.svg";

const SplashScreen = () => {
  return (
    <>
      <div id="splash-screen">
        <img src={logo} width="150px" alt="Logo" />
        <svg className="splash-spinner" viewBox="0 0 50 50">
          <circle
            className="path"
            cx="25"
            cy="25"
            r="20"
            fill="none"
            strokeWidth="5"
          ></circle>
        </svg>
      </div>
    </>
  );
};
export default SplashScreen;

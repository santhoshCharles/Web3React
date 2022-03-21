import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

export const OtpTimer = (props) => {
  const { seconds, handleResendOtp, setIsExpired } = props;

  const [timerSeconds, setTimerSeconds] = useState(seconds || 120);
  useEffect(() => {
    if (timerSeconds > 0) {
      setTimeout(() => setTimerSeconds(timerSeconds - 1), 1000);
    }
    if (timerSeconds === 0) {
      setIsExpired(true);
    }
  }, [timerSeconds]);

  const onBtnClick = () => {
    setTimerSeconds(seconds || 60);
    setIsExpired(false);
    typeof handleResendOtp === "function" && handleResendOtp();
  };

  return (
    <div className="p3 pt-4 text-center d-flex align-items-center justify-content-center">
      Didn't get OTP?
      <Button
        variant="link"
        disabled={timerSeconds}
        onClick={() => onBtnClick()}
        className="ml-2"
      >
        Resend Now{" "}
        {timerSeconds
          ? "(" + (timerSeconds < 10 ? "0" : "") + timerSeconds + ")"
          : null}
      </Button>
    </div>
  );
};

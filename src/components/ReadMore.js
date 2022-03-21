import React, { useState } from "react";

export const ReadMore = ({ children }) => {
  const text = children;

  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <div className="p4 color_gray Note re_width-500px">
      {isReadMore ? text.slice(0, 150) : text}
      {text !== undefined && text.length > 150 && (
        <span onClick={toggleReadMore} className="read-or-hide">
          {isReadMore ? "...read more" : " show less"}
        </span>
      )}
    </div>
  );
};
export const ReadMore2 = ({ children }) => {
  const text = children;

  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <div className="p4 color_gray">
      {isReadMore ? text.slice(0, 100) : text}
      {text !== undefined && text.length > 100 && (
        <span onClick={toggleReadMore} className="color_blue cursor-pointer">
          {isReadMore ? "Learn more" : " Learn less"}
        </span>
      )}
    </div>
  );
};
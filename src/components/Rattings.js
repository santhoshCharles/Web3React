import React from "react"
import ReactStars from "react-rating-stars-component";
import { Star, StarHalf, StarFill } from 'react-bootstrap-icons';

export const Rattings =({ name, value, onChange })=>{
    const settings = {      
        size: 30,
        count: 5,
        color: "#50EAA5",
        activeColor: "#50EAA5",
        value,
        a11y: true,
        isHalf: false,
        emptyIcon: <Star/>,
        halfIcon: <StarHalf/>,
        filledIcon: <StarFill/>,
        classNames:"re_ratting",
        onChange: (newValue) => onChange(newValue, name),
      };
    return <ReactStars key={value}  {...settings} />
}
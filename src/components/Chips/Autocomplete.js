import React, { useEffect, useState } from "react";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { Typeahead } from "react-bootstrap-typeahead";

export const Autocomplete = (props) => {
  const [items, setItems] = useState([]);
  const [value, setValue] = useState([]);

  useEffect(() => {
    if (props.selected.length > 0) {
      let value = props.itemList.filter((r) => {
        let val = props.selected.find((x) => x._id === r._id);
        if (val !== undefined) {
          return r._id !== val._id;
        }
        return r;
      });

      setItems(value);
    } else {
      setItems(props.itemList);
    }
  }, [props]);

  return (
    <>
      <Typeahead
        id="typeHead"
        onChange={(e) => props.callback(e)}
        options={items}
        placeholder={props.placeholder}
        selected={value}
        className="re_inputRoudedChip"
      />
    </>
  );
};

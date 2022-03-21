export const Checkbox = (props) => {
  return (
    <label
      className={`re_checkbox ${props.medium ? "medium" : ""} ${
        props.small ? "small" : ""
        }`}
    >
      <input type="checkbox" name={props.name} onChange={props.onChange} value={props.value} checked={props.checked} />
      <span>{props.text}</span>
    </label>
  );
};

export const Radiobox = (props) => {
  return (
    <label
      className={`re_radiobox ${props.medium ? "medium" : ""} ${
        props.small ? "small" : ""
        }`}
    >
      <input type="radio" name={props.name} onChange={props.onChange} value={props.value} checked={props.checked} defaultChecked={props.defaultChecked} />
      <span>{props.text}</span>
    </label>
  );
};

/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";

const CustomCheckbox = ({ text, states, setStates }) => {
  const [value, setValue] = useState(false);

  const handleOnChange = (e) => {
    setValue((value) => !value);
    if (states.includes(text)) {
      setStates([...states.filter((state) => state !== text)]);
    } else {
      setStates([...states, text]);
    }
  };

  return (
    <div className="flex items-center gap-2 md:gap-4">
      <input
        type="checkbox"
        className="rounded-md border-slate-300 text-sky-400 outline-none"
        value={value}
        checked={value}
        onChange={(e) => handleOnChange(e)}
      />
      <span className="text-xs font-semibold">{text}</span>
    </div>
  );
};

export default CustomCheckbox;

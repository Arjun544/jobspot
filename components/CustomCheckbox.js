import React, { useState } from "react";

const CustomCheckbox = ({ text }) => {
  const [value, setValue] = useState(false);

  return (
    <div className="flex items-center gap-4">
      <input
        type="checkbox"
        className="rounded-md border-slate-300 text-sky-400 outline-none"
        value={value}
        onChange={() => setValue((value) => !value)}
      />
      <span className="text-xs font-semibold">{text}</span>
    </div>
  );
};

export default CustomCheckbox;

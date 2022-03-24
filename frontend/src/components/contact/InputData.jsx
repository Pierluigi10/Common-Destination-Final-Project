import React from "react";

function InputData({placeholder,name,value,onChange} ){
  return (
    <>
      <input
        type="text"
        placeholder={placeholder}
        name={name}
        value={value}
        required={true}
        onChange={onChange}
      />
    </>
  );
}

export default InputData;

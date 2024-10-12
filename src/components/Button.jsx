import React from "react";

const Button = ({
  label,
  color = "bg-blue-800",
  hoverColor = "hover:bg-blue-900",
  fullWidthOnMobile = false,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`${color} text-white px-4 py-2 rounded-md ${hoverColor} ${
        fullWidthOnMobile ? "w-full sm:w-auto" : "w-auto"
      }`}
    >
      {label}
    </button>
  );
};

export default Button;

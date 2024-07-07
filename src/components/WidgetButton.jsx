import React from "react";
import { useDrag } from "react-dnd";
import { ItemTypes } from "../constants";
import ButtonSvg from "../assets/svg/ButtonSvg";

const WidgetButton = ({ type, children, className }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.WIDGET,
    item: { type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const classes = `button relative inline-flex items-center justify-center h-11 transition-colors hover:text-color-1 px-7 text-n-1 bg-blue-500 rounded ${
    isDragging ? "opacity-50" : ""
  } ${className || ""}`;
  const spanClasses = "relative z-10";

  return (
    <button ref={drag} className={classes}>
      <span className={spanClasses}>{children}</span>
      {ButtonSvg(false)}
    </button>
  );
};

export default WidgetButton;

import React from "react";
import { useDrag } from "react-dnd";
import { ItemTypes } from "../constants";
import NavbarWidget from "./widgets/NavbarWidget";

const DroppableItem = ({ id, type, left, top, moveItem, deleteItem }) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.WIDGET,
    item: { id, type, left, top },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const style = {
    left,
    top,
    opacity: isDragging ? 0.5 : 1,
    position: "absolute",
    cursor: "move",
  };

  let content = null;

  switch (type) {
    case "navbar":
      content = <NavbarWidget />;
      break;
    case "text":
      content = (
        <button className="bg-yellow-300 p-2 rounded">Text Section</button>
      );
      break;
    case "image":
      content = (
        <button className="bg-green-300 p-2 rounded">Image Section</button>
      );
      break;
    default:
      content = null;
  }

  return (
    <div
      ref={drag}
      style={style}
      className="p-2 bg-blue-300 border border-blue-500 rounded"
    >
      {content}
    </div>
  );
};

export default DroppableItem;

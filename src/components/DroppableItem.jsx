import React from "react";
import { useDrag } from "react-dnd";
import { ItemTypes } from "../constants";
import NavbarWidget from "./widgets/NavbarWidget";
import "./DroppableItem.css";

const DroppableItem = ({ id, type, left, top, deleteItem }) => {
  const [{ isDragging }, drag, preview] = useDrag({
    type: ItemTypes.WIDGET,
    item: { id, type, left, top },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
    end: (item, monitor) => {
      const offset = monitor.getClientOffset();
      if (!offset) return;

      const dropAreaRect = document
        .querySelector(".relative.overflow-auto")
        .getBoundingClientRect();
      const isOutside =
        offset.x < dropAreaRect.left ||
        offset.x > dropAreaRect.right ||
        offset.y < dropAreaRect.top ||
        offset.y > dropAreaRect.bottom;

      if (isOutside) {
        deleteItem(item.id);
      }
    },
  });

  const style = {
    left,
    top,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={preview}
      style={style}
      className="p-2 bg-blue-300 border border-blue-500 rounded draggable-item"
    >
      {type === "navbar" && <NavbarWidget />}
      {type === "text" && <button>Text Section</button>}
      {type === "image" && <button>Image</button>}
      <div ref={drag} className="drag-handle"></div>
      <div className="resizable-handle"></div>
    </div>
  );
};

export default DroppableItem;

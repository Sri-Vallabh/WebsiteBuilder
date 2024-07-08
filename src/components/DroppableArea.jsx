import React, { useState, useRef, useEffect } from "react";
import { useDrop } from "react-dnd";
import { ItemTypes } from "../constants";
import DroppableItem from "./DroppableItem";
import { FaTrash } from "../assets";

const DroppableArea = () => {
  const [droppedItems, setDroppedItems] = useState([]);
  const [areaWidth, setAreaWidth] = useState(1500);
  const [areaHeight, setAreaHeight] = useState(600);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0 });
  const [deletedItemId, setDeletedItemId] = useState(null);

  const dropAreaRef = useRef(null);

  const [{ canDrop, isOver }, drop] = useDrop({
    accept: ItemTypes.WIDGET,
    drop: (item, monitor) => {
      const offset = monitor.getClientOffset();
      if (!dropAreaRef.current) return;

      const dropAreaRect = dropAreaRef.current.getBoundingClientRect();
      const newItem = {
        id: item.id || Date.now(),
        type: item.type,
        left: offset.x - dropAreaRect.left,
        top: offset.y - dropAreaRect.top,
      };

      console.log("New item position:", newItem);

      const isOutside = !monitor.isOver({ shallow: true });

      if (isOutside) {
        deleteItem(item.id);
      } else {
        const existingIndex = droppedItems.findIndex(
          (i) => i.id === newItem.id
        );
        if (existingIndex !== -1) {
          setDroppedItems((prevItems) => {
            const updatedItems = [...prevItems];
            updatedItems[existingIndex] = newItem;
            return updatedItems;
          });
        } else {
          setDroppedItems((prevItems) => [...prevItems, newItem]);
        }
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  useEffect(() => {
    if (dropAreaRef.current) {
      drop(dropAreaRef.current);
    }
  }, [drop]);

  const deleteItem = (id) => {
    setDeletedItemId(id);
    setDroppedItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleMouseDown = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    if (
      clientX > left + width - 20 &&
      clientX < left + width &&
      clientY > top + height - 20 &&
      clientY < top + height
    ) {
      setIsResizing(true);
      setResizeStart({ x: clientX, y: clientY });
    }
  };

  const handleMouseMove = (e) => {
    if (!isResizing) return;
    const deltaX = e.clientX - resizeStart.x;
    const deltaY = e.clientY - resizeStart.y;
    setAreaWidth((prevWidth) => prevWidth + deltaX);
    setAreaHeight((prevHeight) => prevHeight + deltaY);
    setResizeStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsResizing(false);
  };

  const handleMouseLeave = () => {
    setIsResizing(false);
  };

  const isActive = canDrop && isOver;
  const backgroundColor = isActive ? "bg-green-200" : "bg-white";

  return (
    <div
      ref={dropAreaRef}
      className={`relative overflow-auto border-2 border-gray-300 rounded-lg p-4 ${backgroundColor}`}
      style={{ width: areaWidth, height: areaHeight }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={`absolute bottom-0 right-0 w-6 h-6 cursor-se-resize ${
          isResizing ? "bg-blue-500" : "bg-transparent"
        }`}
        onMouseDown={handleMouseDown}
      />
      <h3 className="text-lg font-bold mb-2">Drop Zone</h3>
      <p className="text-gray-600">Drag and drop your widgets here.</p>
      {isActive && <div className="text-green-500">Release to drop</div>}
      {droppedItems.map((item) => (
        <DroppableItem
          key={item.id}
          id={item.id}
          type={item.type}
          left={item.left}
          top={item.top}
          deleteItem={deleteItem}
        />
      ))}
      {deletedItemId && (
        <div
          className="absolute top-0 right-0 p-2 cursor-pointer"
          onClick={() => setDeletedItemId(null)}
        >
          <FaTrash size={20} color="#f44336" />
        </div>
      )}
    </div>
  );
};

export default DroppableArea;

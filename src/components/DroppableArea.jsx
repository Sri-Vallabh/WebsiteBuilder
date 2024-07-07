import React, { useState } from "react";
import { useDrop } from "react-dnd";
import { ItemTypes } from "../constants";
import DroppableItem from "./DroppableItem";
import { FaTrash } from "../assets"; // Import trash icon from React Icons

const DroppableArea = () => {
  const [droppedItems, setDroppedItems] = useState([]);
  const [areaWidth, setAreaWidth] = useState(1500); // Initial width of droppable area
  const [areaHeight, setAreaHeight] = useState(600); // Initial height of droppable area
  const [isResizing, setIsResizing] = useState(false);
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0 });
  const [deletedItemId, setDeletedItemId] = useState(null);

  const [{ canDrop, isOver }, drop] = useDrop({
    accept: ItemTypes.WIDGET,
    drop: (item, monitor) => {
      const offset = monitor.getClientOffset();
      const newItem = {
        id: item.id || Date.now(), // Generate unique ID if it's a new item
        type: item.type,
        left: offset.x - 5, // Adjust for container offset and size
        top: offset.y - 5, // Adjust for container offset
      };

      const isOutside = !monitor.isOver({ shallow: true });

      if (isOutside) {
        // Delete the item if dropped outside
        deleteItem(item.id);
      } else {
        // Update existing item's position or add new item inside the droppable area
        const existingIndex = droppedItems.findIndex(
          (i) => i.id === newItem.id
        );
        if (existingIndex !== -1) {
          // Update existing item's position
          setDroppedItems((prevItems) => {
            const updatedItems = [...prevItems];
            updatedItems[existingIndex] = newItem;
            return updatedItems;
          });
        } else {
          // Add new item
          setDroppedItems((prevItems) => [...prevItems, newItem]);
        }
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const deleteItem = (id) => {
    setDeletedItemId(id);
    setDroppedItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleMouseDown = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    if (
      clientX > left + width - 20 && // Check if mouse is near the right edge
      clientX < left + width && // Ensure it's exactly on the right edge
      clientY > top + height - 20 && // Check if mouse is near the bottom edge
      clientY < top + height // Ensure it's exactly on the bottom edge
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
      ref={drop}
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

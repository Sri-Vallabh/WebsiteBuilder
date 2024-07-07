import React, { useState } from "react";

const NavbarWidget = () => {
  const [navbarItems, setNavbarItems] = useState([
    { id: 1, text: "Home" },
    { id: 2, text: "About" },
    { id: 3, text: "Services" },
  ]);

  const addItem = () => {
    const newItem = { id: navbarItems.length + 1, text: "New Item" };
    setNavbarItems([...navbarItems, newItem]);
  };

  const editItem = (index, newText) => {
    setNavbarItems((prevItems) => {
      const newItems = [...prevItems];
      newItems[index].text = newText;
      return newItems;
    });
  };

  const removeItem = (index) => {
    setNavbarItems((prevItems) => {
      const newItems = [...prevItems];
      newItems.splice(index, 1);
      return newItems;
    });
  };

  const handleEdit = (index) => {
    const newText = prompt("Enter new text:");
    if (newText !== null) {
      editItem(index, newText);
    }
  };

  return (
    <div className="my-4">
      <h3 className="text-lg font-bold mb-2">Navbar Widget</h3>
      <div className="bg-gray-200 rounded-lg p-4">
        {/* Navbar items */}
        <ul className="flex space-x-4">
          {navbarItems.map((item, index) => (
            <li key={item.id}>
              <a
                href="#"
                className="text-blue-500 hover:text-blue-700"
                onClick={() => handleEdit(index)}
              >
                {item.text}
              </a>
              <button
                className="ml-2 text-red-500 hover:text-red-700"
                onClick={() => removeItem(index)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
        <button
          className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          onClick={addItem}
        >
          Add Item
        </button>
      </div>
    </div>
  );
};

export default NavbarWidget;

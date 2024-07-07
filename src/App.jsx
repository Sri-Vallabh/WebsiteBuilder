import React from "react";
import Header from "./components/Header";
import ButtonGradient from "./assets/svg/ButtonGradient";
import WidgetContainer from "./components/WidgetContainer";
import DroppableArea from "./components/DroppableArea"; // Import the new component
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const App = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
        {/* Header */}
        <Header />

        {/* Widget Container */}
        <WidgetContainer />

        {/* Scrollable Drop Zone */}
        <DroppableArea />
      </div>
      <ButtonGradient />
    </DndProvider>
  );
};

export default App;

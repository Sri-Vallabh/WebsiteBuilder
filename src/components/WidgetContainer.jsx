import React from "react";
import WidgetButton from "./WidgetButton";
import Section from "./Section";

const WidgetContainer = () => {
  return (
    <Section
      className="pt-[12rem] -mt-[5.25rem]"
      crosses
      crossesOffset="lg:translate-y-[5.25rem]"
      customPaddings
      id="hero"
    >
    <div className="relative bg-n-8 rounded-lg shadow-lg p-4">
      <h2 className="text-xl font-bold mb-4 text-center">Widgets</h2>
      <WidgetButton type="navbar">Navbar</WidgetButton>
      <WidgetButton type="text">Text Section</WidgetButton>
      <WidgetButton type="image">Image</WidgetButton>
    </div>
    </Section>
  );
};

export default WidgetContainer;

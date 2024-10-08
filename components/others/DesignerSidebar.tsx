import React from "react";
import useDesigner from "../hooks/useDesigner";
import FormElementSidebar from "./FormElementSidebar";
import PropertiesElementSidebar from "./PropertiesElementSidebar";

const DesignerSidebar = () => {
  const { selectedElement } = useDesigner();
  return (
    <aside className="max-w-[400px] w-[400px] flex flex-col flex-grow gap-2 border-l-2 border-muted p-4  bg-background overflow-y-auto h-full ">
    {!selectedElement && (<FormElementSidebar/>)}
    {selectedElement && (<PropertiesElementSidebar/>)}
    </aside>
  );
};

export default DesignerSidebar;

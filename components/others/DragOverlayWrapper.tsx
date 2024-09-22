'use client'
import { Active, DragOverlay, useDndMonitor } from "@dnd-kit/core";
import React, { useState } from "react";
import { SidebarButtonElementsDragOverlay } from "./SidebarButtonElements";
import { ElementsType, FormElements } from "./FormElements";
import useDesigner from "../hooks/useDesigner";

const DragOverlayWrapper = () => {
  const {elements}=useDesigner()
  const [draggedItem, setDraggedItem] = useState<Active | null>(null);
  useDndMonitor({
    onDragStart: (event) => {
      setDraggedItem(event.active);
    },
    onDragCancel: () => {
      setDraggedItem(null);
    },
    onDragEnd: () => {
      setDraggedItem(null);
    },
  });
  if (!draggedItem) {
    return null;
  }
  let node = <div>No Drag Overlay</div>;
  const isSidebarButtonElement =
    draggedItem?.data.current?.isDesignerBtnElement;

  if (isSidebarButtonElement) {
    const type = draggedItem.data.current?.type as ElementsType;
    node = (
      <SidebarButtonElementsDragOverlay FormElement={FormElements[type]} />
    );
  }
  const isDesignerElement=draggedItem.data.current?.isDesignerElement
  if (isDesignerElement) {
    const elementId=draggedItem.data.current?.elementId
    const element=elements.find(el=>el.id===elementId)
    if (!element) node = <div>Element Not Found</div>
    else{
      const DesignerElementComponent=FormElements[element.type].designerComponent

      node=
      <div className="bg-accent flex rounded-md border h-[120px] w-full py-2 px-4 opacity-80 pointer-events-none ">
        <DesignerElementComponent elementInstance={element}/>
      </div>
    }
  }
  return <DragOverlay>{node}</DragOverlay>;
};

export default DragOverlayWrapper;

"use client";

import { DragEndEvent, useDndMonitor, useDroppable } from "@dnd-kit/core";
import DesignerSidebar from "./DesignerSidebar";
import { cn } from "@/lib/utils";
import useDesigner from "../hooks/useDesigner";
import { ElementsType, FormElements } from "./FormElements";
import { IdGenerator } from "@/lib/IdGenerator";
import DesignerElementWrapper from "./DesignerElementWrapper";

const Designer = () => {
  const { addElements, elements, selectedElement, setSelectedElement,removeElement } =
    useDesigner();
  const dropable = useDroppable({
    id: "designer-droppable-area",
    data: {
      isDesignerDropArea: true,
    },
  });

  useDndMonitor({
    onDragEnd: (event: DragEndEvent) => {
      const { active, over } = event;
      if (!active || !over) {
        return;
      }

      const isDesignerBtnElement = active.data.current?.isDesignerBtnElement;
      const isDroppingOverDesignerDropArea =
        over.data.current?.isDesignerDropArea;
      if (isDesignerBtnElement && isDroppingOverDesignerDropArea) {
        const type = active.data.current?.type;
        const newElement = FormElements[type as ElementsType].construct(
          IdGenerator()
        );
        addElements(elements.length, newElement);
        return;
      }

      const isDroppingOverDesignerElementTopHalf =
        over?.data?.current?.isTopHalfDesignerElement;

      const isDroppingOverDesignerElementBottomHalf =
        over?.data?.current?.isBottomHalfDesignerElement;

      const isDroppingOverDesignerElement =
        isDroppingOverDesignerElementBottomHalf ||
        isDroppingOverDesignerElementTopHalf;

      const droppingSidebarBtnOverDesignerElement =
        isDesignerBtnElement && isDroppingOverDesignerElement;

      if (droppingSidebarBtnOverDesignerElement) {
        const type = active.data.current?.type;
        const newElement = FormElements[type as ElementsType].construct(
          IdGenerator()
        );
        const overId = over.data.current?.elementId;
        const overElementIndex = elements.findIndex((el) => el.id === overId);
        if (overElementIndex) {
          throw new Error("Index Not Found");
        }
        let indexForNewElement = overElementIndex;
        if (isDroppingOverDesignerElementBottomHalf) {
          indexForNewElement = overElementIndex + 1;
        }
        addElements(indexForNewElement, newElement);
        return;
      }

      const isDraggingDesignerElement = active.data.current?.isDesignerElement;
      const draggingDesignerElementOverAnotherDesignerElement =
        isDroppingOverDesignerElement && isDraggingDesignerElement;
      if (draggingDesignerElementOverAnotherDesignerElement) {
        const activeId=active.data.current?.elementId
        const overId=over.data.current?.elementId

        const activeElementIndex=elements.findIndex(el=>el.id===activeId)

        const overElementIndex=elements.findIndex(el=>el.id===overId)

        if (activeElementIndex === -1 || overElementIndex === -1) {
            throw new Error("Element Not Found ")
        }

        let indexForNewElement = overElementIndex;
        if (isDroppingOverDesignerElementBottomHalf) {
          indexForNewElement = overElementIndex + 1;
        }

        const activeElement={...elements[activeElementIndex]}
        removeElement(activeId)
        addElements(indexForNewElement,activeElement)
      }
    },
  });
  return (
    <div className="flex w-full h-full">
      <div
        className="p-4  w-full "
        onClick={() => {
          if (selectedElement) {
            setSelectedElement(null);
          }
        }}
      >
        <div
          ref={dropable.setNodeRef}
          className={cn(
            "bg-background h-full max-w-[920px] m-auto rounded-xl flex flex-col items-center justify-start flex-1 overflow-y-auto ",
            dropable.isOver && "ring-2 ring-primary ring-inset"
          )}
        >
          {!dropable.isOver && elements.length === 0 && (
            <p className="text-3xl text-muted-foreground flex flex-grow items-center font-bold">
              Drop Here
            </p>
          )}
          {dropable.isOver && elements.length === 0 && (
            <div className="p-4 w-full">
              <div className="h-[120px] rounded-md bg-primary/20"></div>
            </div>
          )}
          {elements.length > 0 && (
            <div className="flex flex-col  w-full gap-2 p-4 ">
              {elements.map((element, i) => {
                return <DesignerElementWrapper key={i} element={element} />;
              })}
            </div>
          )}
        </div>
      </div>
      <DesignerSidebar />
    </div>
  );
};

export default Designer;

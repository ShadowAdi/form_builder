import React from "react";
import { FormElement } from "./FormElements";
import { Button } from "../ui/button";
import { useDraggable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";

const SidebarButtonElements = ({
  FormElement,
}: {
  FormElement: FormElement;
}) => {
  const { icon: Icon, label } = FormElement.designerBtnElements;
  const draggable = useDraggable({
    id: "designer-btn-" + FormElement.type,
    data: {
      type: FormElement.type,
      isDesignerBtnElement: true,
    },
  });
  return (
    <Button
      ref={draggable.setNodeRef}
      {...draggable.listeners}
      {...draggable.attributes}
      variant={"outline"}
      className={cn(
        "flex flex-col gap-2 h-[120px] w-[120px] cursor-grab ",
        draggable.isDragging && "ring-2 ring-primary"
      )}
    >
      <Icon className="h-8 w-8 text-primary cursor-grab " />
      <p className="text-xs">{label}</p>
    </Button>
  );
};

export const SidebarButtonElementsDragOverlay = ({
  FormElement,
}: {
  FormElement: FormElement;
}) => {
  const { icon: Icon, label } = FormElement.designerBtnElements;

  return (
    <Button
      variant={"outline"}
      className="flex flex-col gap-2 h-[120px] w-[120px] cursor-grab "
    >
      <Icon className="h-8 w-8 text-primary cursor-grab " />
      <p className="text-xs">{label}</p>
    </Button>
  );
};

export default SidebarButtonElements;

"use client";
import {
  ElementsType,
  FormElement,
} from "../others/FormElements";
import { Label } from "../ui/label";

import { RiSeparator } from "react-icons/ri";
import { Separator } from "../ui/separator";
const type: ElementsType = "SeparatorField";

export const SeparatorFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
  }),
  designerBtnElements: {
    icon: RiSeparator,
    label: "Separator Field",
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesForm,
  validate: () => true,
};

function DesignerComponent() {
  return (
    <div className="flex gap-2 w-full flex-col ">
      <Label className="text-muted-foreground">Separator Field</Label>
      <Separator />
    </div>
  );
}

function FormComponent() {
  return <Separator />;
}

function PropertiesForm() {
  return <p>No Propeties For This Element</p>;
}

import React from "react";
import SidebarButtonElements from "./SidebarButtonElements";
import { FormElements } from "./FormElements";
import { Separator } from "../ui/separator";

const FormElementSidebar = () => {
  return (
    <div>
      <p className="text-sm text-foreground/70">Drag And Drop Elements</p>
      <Separator className="my-2" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 place-items-center">
        <p className="text-sm text-muted-foreground col-span-1 md:col-span-2 my-2 place-self-start">
          Layout Elements
        </p>

        <SidebarButtonElements FormElement={FormElements.TitleField} />
        <SidebarButtonElements FormElement={FormElements.SubTitleField} />
        <SidebarButtonElements FormElement={FormElements.ParagraphField} />
        <SidebarButtonElements FormElement={FormElements.SeparatorField} />
        <SidebarButtonElements FormElement={FormElements.SpacerField} />

        <p className="text-sm text-muted-foreground col-span-1 md:col-span-2 my-2 place-self-start">
          Form Elements
        </p>
        <SidebarButtonElements FormElement={FormElements.TextField} />
        <SidebarButtonElements FormElement={FormElements.NumberField} />
        <SidebarButtonElements FormElement={FormElements.TextAreaField} />
        <SidebarButtonElements FormElement={FormElements.DateField} />
        <SidebarButtonElements FormElement={FormElements.SelectField} />
        <SidebarButtonElements FormElement={FormElements.CheckboxField} />

      </div>
    </div>
  );
};

export default FormElementSidebar;

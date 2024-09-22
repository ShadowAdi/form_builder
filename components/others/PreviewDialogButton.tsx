import React from "react";
import { Button } from "../ui/button";
import { MdPreview } from "react-icons/md";
import useDesigner from "../hooks/useDesigner";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { FormElements } from "./FormElements";

const PreviewDialogButton = () => {
  const { elements } = useDesigner();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"} className="gap-2">
          <MdPreview className="h-6 w-6" />
          Preview
        </Button>
      </DialogTrigger>
      <DialogContent className="w-screen h-screen max-h-screen max-w-full flex-grow flex flex-col  p-0 gap-0">
        <div className="px-4 py-2 border-b">
          <p className="text-lg text-muted-foreground font-bold">
            Form Preview
          </p>
          <p className="text-sm text-muted-foreground ">
            This is How your form will look like to users
          </p>
        </div>
        <div className="bg-accent flex flex-col flex-grow items-center justify-center p-4 bg-[url(/paper.svg)] dark:bg-[url(/paper-dark.svg)] overflow-y-auto">
          <div className="max-w-[620px] flex flex-col flex-grow gap-4 bg-background h-full w-full rounded-3xl p-8 overflow-y-auto ">
            {elements.map((element, i) => {
              const FormComponent=FormElements[element.type].formComponent
              return <FormComponent key={i} elementInstance={element}/>;
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PreviewDialogButton;

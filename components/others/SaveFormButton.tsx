import React, { useTransition } from "react";
import { Button } from "../ui/button";
import { HiSaveAs } from "react-icons/hi";
import useDesigner from "../hooks/useDesigner";
import { UpdateFormContent } from "@/actions/Form";
import { toast } from "@/hooks/use-toast";
import { FaSpinner } from "react-icons/fa";

const SaveFormButton = ({id}:{id:number}) => {
  const { elements } = useDesigner();
  const [loading, startTransition] = useTransition();

  const updateFormContent = async () => {
    try {
      const JsonElements = JSON.stringify(elements);
      console.log(JsonElements,"JSon Elements")
      await UpdateFormContent(id, JsonElements);
      toast({
        title: "Success",
        description: "Your Form has been saved",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  };
  return (
    <Button
      variant={"outline"}
      className="gap-2"
      disabled={loading}
      onClick={() => {
        startTransition(updateFormContent);
      }}
    >
      <HiSaveAs className="h-4 w-4" />
      Save
      {loading && <FaSpinner className="animate-spin"/>}
    </Button>
  );
};

export default SaveFormButton;

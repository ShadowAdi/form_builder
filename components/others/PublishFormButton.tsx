import React, {  useTransition } from "react";
import { Button } from "../ui/button";
import { MdOutlinePublish } from "react-icons/md";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { FaIcons } from "react-icons/fa";
import { toast } from "@/hooks/use-toast";
import { PublishForm } from "@/actions/Form";
import { useRouter } from "next/navigation";

const PublishFormButton = ({id}:{id:number}) => {
  const router=useRouter()
  const [loading,startTransition]=useTransition()
  async function publishForm() {
    try {
      await PublishForm(id)
      toast({
        title:"Success",
        description:"Your form is now available to the public"
       }) 
       router.refresh()
    } catch (error) {
     toast({
      title:"Error",
      description:"Something went wrong"
     }) 
    }
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant={"outline"}
          className="gap-2 text-white bg-gradient-to-r from-indigo-400 to-cyan-400"
        >
          <MdOutlinePublish className="h-6 w-6" />
          Publsih
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely Sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This Action cannot be undone. After Publishing you cannot be able to
            edit this form
            <br /> <br />
            <span className="font-medium">
              By Pubishing this form you will make it public and also you can
              collect submission
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction disabled={loading} onClick={(e)=>{
            e.preventDefault()
            startTransition(publishForm)
          }}>
            Proceed {loading && <FaIcons className="animate-spin"/>} 
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PublishFormButton;

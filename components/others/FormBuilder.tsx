"use client";
import { Form } from "@prisma/client";
import React, { useEffect, useState } from "react";
import PreviewDialogButton from "./PreviewDialogButton";
import SaveFormButton from "./SaveFormButton";
import PublishFormButton from "./PublishFormButton";
import Designer from "./Designer";
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import DragOverlayWrapper from "./DragOverlayWrapper";
import useDesigner from "../hooks/useDesigner";
import { FaSpinner } from "react-icons/fa";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "@/hooks/use-toast";
import Link from "next/link";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import Confetti from 'react-confetti'

const FormBuilder = ({ form }: { form: Form }) => {
  const { setElements,setSelectedElement } = useDesigner();
  const [isReady, setIsReady] = useState(false);
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 300,
      tolerance: 5,
    },
  });

  useEffect(() => {
    if (isReady) {
      return;
    }
    const elements = JSON.parse(form.content);
    setElements(elements);
    setSelectedElement(null)
    const readyTimeout = setTimeout(() => {
      setIsReady(true);
    }, 500);
    return () => clearTimeout(readyTimeout);
  }, [form, setElements,setSelectedElement,isReady]);

  const sensor = useSensors(mouseSensor, touchSensor);

  const shareUrl = `${window.location.origin}/submit/${form.shareUrl}`;

  if (!isReady) {
    return (
      <div className="flex flex-col justify-center items-center w-full h-full ">
        <FaSpinner className="h-12 w-12 animate-spin " />
      </div>
    );
  }

  if (form.published) {
    return (
      <>
      <Confetti height={window.innerHeight} width={window.innerWidth} numberOfPieces={1000} recycle={false}/>
      <div className="flex items-center justify-center h-full w-full  flex-col ">
        <div className="max-w-md ">
          <h1 className="text-4xl text-center font-bold text-primary  border-b pb-2 mb-10 ">
            🎊🎊 Form Published 🎊🎊
          </h1>
          <h2 className="text-2xl ">Share This form</h2>
          <h3 className="text-muted-foreground border-b text-xl pb-10">
            Anyone with the link can view and submit the form
          </h3>
          <div
            className="
        my-4 flex flex-col w-full items-center gap-2 border-b pb-4 "
          >
            <Input readOnly className="w-full " value={shareUrl} />
            <Button
              className="mt-2 w-full"
              onClick={() => {
                navigator.clipboard.writeText(shareUrl);
                toast({
                  title: "Success",
                  description: "Link Copied to Clipboard",
                });
              }}
            >
              Copy Link
            </Button>
          </div>
          <div
            className="
          flex justify-between"
          >
            <Button variant={"link"} asChild>
              <Link href={"/"} className="gap-2">
                <BsArrowLeft />
                Go Back Home
              </Link>
            </Button>
            <Button variant={"link"} asChild>
              <Link href={"/forms/" + form.id} className="gap-2">
                Form Details
                <BsArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </div>
      </>
    );
  }
  return (
    <DndContext sensors={sensor}>
      <main className="flex flex-col w-full h-full">
        <nav className="flex justify-between border-b-2 p-4 gap-3 items-center">
          <h2 className="truncate font-medium ">
            <span className="text-muted-foreground mr-2 ">Form:</span>
            {form.name}
          </h2>
          <div className="flex items-center hap-2">
            <PreviewDialogButton />
            {form.published ? (
              <></>
            ) : (
              <>
                <SaveFormButton id={form.id} />
                <PublishFormButton id={form.id} />
              </>
            )}
          </div>
        </nav>
        <div className="flex w-full items-center flex-grow justify-center relative overflow-y-auto h-[200px] bg-accent bg-[url(/paper.svg)] dark:bg-[url(/paper-dark.svg)]">
          <Designer />
        </div>
      </main>
      <DragOverlayWrapper />
    </DndContext>
  );
};

export default FormBuilder;

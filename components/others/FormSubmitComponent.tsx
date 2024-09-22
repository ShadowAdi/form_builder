"use client";
import React, { useCallback, useRef, useState, useTransition } from "react";
import { FormElementInstance, FormElements } from "./FormElements";
import { Button } from "../ui/button";
import { HiCursorClick } from "react-icons/hi";
import { toast } from "@/hooks/use-toast";
import { FaSpinner } from "react-icons/fa";
import { SubmitForm } from "@/actions/Form";

const FormSubmitComponent = ({
  formUrl,
  content,
}: {
  formUrl: string;
  content: FormElementInstance[];
}) => {
  const formValues = useRef<{ [key: string]: string }>({});
  const formErrors = useRef<{ [key: string]: boolean }>({});
  const [renderKey, setRenderKey] = useState(new Date().getTime());
  const [submitted, setSubmitted] = useState(false);
  const [pending, startTransition] = useTransition();

  const vaidateForm: () => boolean = useCallback(() => {
    for (const field of content) {
      const actualValue = formValues.current[field.id] || "";
      const valid = FormElements[field.type].validate(field, actualValue);
      if (!valid) {
        formErrors.current[field.id] = true;
      }
    }
    if (Object.keys(formErrors.current).length > 0) {
      return false;
    }
    return true;
  }, [content]);

  const submitValues = (key: string, value: string) => {
    formValues.current[key] = value;
  };
  const submitForm = async () => {
    formErrors.current = {};
    const validForm = vaidateForm();
    if (!validForm) {
      toast({
        title: "Error",
        description: "Please Check the form for errors",
        variant: "destructive",
      });
      return;
    }

    try {
      const JsonContent = JSON.stringify(formValues.current);
      await SubmitForm(formUrl, JsonContent);
      setSubmitted(true);
    } catch (error) {
      toast({
        title: "Error",
        description: "Something Went Wrong",
        variant: "destructive",
      });
    }
  };

  if (submitted) {
    return (
      <div className="flex justify-center w-full h-full items-center p-8">
        <div
          key={renderKey}
          className="flex flex-col gap-4 max-w-[620px] flex-grow bg-background p-8 w-full overflow-y-auto border shadow-xl shadow-blue-700 rounded"
        >
          <h1 className="text-2xl font-bold">Form Submitted</h1>
          <p className="text-muted-foreground">
            Thankyou For Submitting the form, you can close this page now
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center w-full  h-full items-center p-8">
      <div
        key={renderKey}
        className="flex flex-col gap-4 max-w-[620px] flex-grow bg-background p-8 w-full overflow-y-auto border shadow-xl shadow-blue-700 rounded"
      >
        {content.map((element) => {
          const FormElement = FormElements[element.type].formComponent;
          return (
            <FormElement
              submitValue={submitValues}
              key={element.id}
              elementInstance={element}
              isInvalid={formErrors.current[element.id]}
              defaultValue={formValues.current[element.id]}
            />
          );
        })}
        <Button
          className="mt-8"
          onClick={() => startTransition(submitForm)}
          disabled={pending}
        >
          {!pending && (
            <>
              <HiCursorClick className="mr-2" />
              Submit
            </>
          )}
          {pending && <FaSpinner className="animate-spin" />}
        </Button>
      </div>
    </div>
  );
};

export default FormSubmitComponent;

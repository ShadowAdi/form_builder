import { GetFormContentByUrl } from "@/actions/Form";
import { FormElementInstance } from "@/components/others/FormElements";
import FormSubmitComponent from "@/components/others/FormSubmitComponent";
import React from "react";

const SubmitForm = async ({
  params,
}: {
  params: {
    formUrl: string;
  };
}) => {
  const form = await GetFormContentByUrl(params.formUrl);
  if (!form) {
    throw new Error("Form Not Found");
  }
  const formContent = JSON.parse(form.content) as FormElementInstance[];
  return <FormSubmitComponent formUrl={params.formUrl} content={formContent} />;
};

export default SubmitForm;

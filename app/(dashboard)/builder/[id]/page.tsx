import { GetFormByParams } from "@/actions/Form";
import FormBuilder from "@/components/others/FormBuilder";
import React from "react";

const BuilderPage =async ({ params }: { params: { id: string } }) => {
  const {id}=params
  const form=await GetFormByParams(Number(id))
  if (!form) {
    throw new Error("Form Not Found")
  }
  return <FormBuilder form={form}/>;
};

export default BuilderPage;

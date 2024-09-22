import React from "react";
import { Skeleton } from "../ui/skeleton";
import { GetForms } from "@/actions/Form";
import FormCard from "./FormCard";

const FormCards = async () => {
  const forms = await GetForms();
  return (
    <>
      {forms.map((form, i) => {
        return <FormCard key={i} form={form} />;
      })}
    </>
  );
};

export const FormCardSkeleton = () => {
  return <Skeleton className="border-2 bg-primary/20 h-[190px] w-full " />;
};

export default FormCards;

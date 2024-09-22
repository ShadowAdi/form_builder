"use client";

import  { useContext } from "react";
import { DesignContext } from "../context/DesignerContext";

const useDesigner = () => {
  const context = useContext(DesignContext);
  if (!context) {
    throw new Error("Use Designer must  be used waiting at a designer context");
  }
  return context;
};

export default useDesigner;

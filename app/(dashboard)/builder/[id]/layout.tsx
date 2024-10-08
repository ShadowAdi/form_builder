import Navbar from "@/components/others/Navbar";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full flex flex-grow mx-auto flex-col min-h-screen  ">
      <Navbar />

      {children}
    </div>
  );
};

export default layout;

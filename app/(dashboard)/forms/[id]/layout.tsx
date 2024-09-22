import Navbar from "@/components/others/Navbar";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full flex flex-grow mx-auto  flex-col">
      <Navbar />

      {children}
    </div>
  );
};

export default layout;

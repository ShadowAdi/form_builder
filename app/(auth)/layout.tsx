import Logo from "@/components/others/Logo";
import { ModeToggle } from "@/components/others/Toggle";
import React from "react";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-background max-h-screen  min-w-full ">
      <nav className="flex py-3 px-5 justify-between w-full items-center border-b border-b-gray-400">
        <Logo />
        <ModeToggle />
      </nav>
      <main className="flex w-full flex-grow h-full items-center justify-center">{children}</main>
    </div>
  );
}

export default Layout;

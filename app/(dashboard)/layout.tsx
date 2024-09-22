import React from "react";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-background max-h-screen  min-w-full ">
      <main className="flex w-full flex-grow">{children}</main>
    </div>
  );
}

export default Layout;

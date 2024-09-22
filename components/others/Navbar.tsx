import React from "react";
import Logo from "./Logo";
import { ModeToggle } from "./Toggle";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

const Navbar = () => {
  return (
    <nav className="flex py-3 px-5 justify-between w-full items-center border-b border-b-gray-400">
      <Logo />
      <div className="flex gap-5 items-center">
        <ModeToggle />
        <SignedIn>
          <UserButton />
        </SignedIn>

        <SignedOut>
          <SignInButton />
        </SignedOut>
      </div>
    </nav>
  );
};

export default Navbar;

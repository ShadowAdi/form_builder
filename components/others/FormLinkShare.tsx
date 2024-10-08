"use  client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Share1Icon } from "@radix-ui/react-icons";
import { toast } from "@/hooks/use-toast";

const FormLinkShare = ({ shareUrl }: { shareUrl: string }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }

  const shareLink = `${window.location.origin}/submit/${shareUrl}`;
  return (
    <div className="flex flex-grow gap-4 items-center">
      <Input value={shareLink} readOnly />
      <Button
        className="w-[250px]"
        onClick={() => {
          navigator.clipboard.writeText(shareLink);
          toast({ title: "Success", description: "Url Copied" });
        }}
      >
        <Share1Icon className="w-4 h-4 mr-2" />
        Share Link
      </Button>
    </div>
  );
};

export default FormLinkShare;

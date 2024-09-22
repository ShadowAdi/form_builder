'use client'
import { GetFormStats } from "@/actions/Form";
import CreateForm from "@/components/others/CreateForm";
import FormCards, { FormCardSkeleton } from "@/components/others/FormCards";
import Navbar from "@/components/others/Navbar";
import StatsCards from "@/components/others/StatsCards";
import { Separator } from "@radix-ui/react-dropdown-menu";
import React, { Suspense, useEffect, useState } from "react";

export default function Home() {
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);
  if (!domLoaded) {
    return null
  }
  return (
    <div className="flex flex-col w-full h-full px-4">
    <Navbar/>
    <div className="container mb-3 mx-auto pt-4">
      <Suspense fallback={<StatsCards loading={true} />}>
        <CardStatsWrapper />
      </Suspense>
      <Separator className="my-6" />
      <h2 className="text-4xl font-bold col-span-2">Your Forms</h2>
      <Separator className="my-6" />
      <div className="grid mx-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CreateForm />
        <Suspense
          fallback={[1, 2, 3, 4].map((el) => (
            <FormCardSkeleton key={el} />
          ))}
        >
          <FormCards/>
        </Suspense>
      </div>
    </div>
    </div>
  );
}

async function CardStatsWrapper() {
  const stats = await GetFormStats();
  return <StatsCards loading={false} data={stats} />;
}

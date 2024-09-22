'use client'
import React from "react";
import StatsCard from "@/components/others/StatsCard";
import VisitBtn from "@/components/others/VisitBtn";
import { LuView } from "react-icons/lu";
import {HiCursorClick} from "react-icons/hi"
import {FaWpforms} from "react-icons/fa"
import {TbArrowBounce} from "react-icons/tb"
import FormLinkShare from "@/components/others/FormLinkShare";
import SubmissionsTable from "@/components/others/SubmissionsTable";
import { Form } from "@prisma/client";



const BuilderPage = ({ form }:{form:Form}) => {
    const { visits, submissions } = form;
  
    let submissionRate = 0;
    if (visits > 0) {
      submissionRate = (submissions / visits) * 100;
    }
  
    const bounceRate = 100 - submissionRate;
    return (
      <>
        <div className="py-10 w-full px-5 flex  justify-between items-center  border-t  border-b border-muted">
          <div className="flex justify-between container">
            <h1 className="text-4xl font-bold truncate">{form.name}</h1>
            <VisitBtn shareUrl={form.shareUrl} />
          </div>
        </div>
        <div className="border-b w-full px-5 flex  justify-between items-center    py-4 border-muted">
          <div className="container flex gap-2 items-center justify-between">
            <FormLinkShare shareUrl={form.shareUrl} />
          </div>
        </div>
        <div className="w-full py-4 px-3 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 container">
          <StatsCard
            title={"Total Visits"}
            icon={<LuView className="text-blue-600" />}
            helper="All time from visits"
            value={visits.toLocaleString()}
            loading={false}
            className="shadow-md shadow-blue-600"
          />
          <StatsCard
            title={"Total Submissions"}
            icon={<FaWpforms className="text-orange-400" />}
            helper="All time from Submissions"
            value={submissions.toLocaleString()}
            loading={false}
            className="shadow-md shadow-orange-400"
          />
          <StatsCard
            title={"Submission Rate"}
            icon={<HiCursorClick className="text-purple-600" />}
            helper="Visits that result in form submission"
            value={submissionRate.toLocaleString()}
            loading={false}
            className="shadow-md shadow-purple-600"
          />
          <StatsCard
            title={"Bounce Rate"}
            icon={<TbArrowBounce className="text-red-600" />}
            helper="Visits that leaves without interacting"
            value={bounceRate.toLocaleString()}
            loading={false}
            className="shadow-md shadow-red-600"
          />
        </div>
        <div className="container w-full px-5 flex  justify-between items-center    pt-10">
          <SubmissionsTable id={form.id}/>
        </div>
  
      </>
    );
  };
  
  export default BuilderPage;
  
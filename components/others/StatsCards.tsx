import { GetFormStats } from "@/actions/Form";
import React from "react";
import StatsCard from "./StatsCard";
import { LuView } from "react-icons/lu";
import {HiCursorClick} from "react-icons/hi"
import {FaWpforms} from "react-icons/fa"
import {TbArrowBounce} from "react-icons/tb"


interface StatsCardProps {
  loading?: boolean;
  data?: Awaited<ReturnType<typeof GetFormStats>>;
}

export const StatsCards = ({ loading, data }: StatsCardProps) => {
  console.log(data)
  return (
    <div className="w-full px-5  justify-center items-center pt-8 gap-7 grid grid-cols-3 md:grid-cols-1 lg:grid-cols-4">
      <StatsCard
        title={"Total Visits"}
        icon={<LuView className="text-blue-600" />}
        helper="All time from visits"
        value={data?.visits.toLocaleString()}
        loading={loading}
        className="shadow-md shadow-blue-600"
      />
      <StatsCard
        title={"Total Submissions"}
        icon={<FaWpforms className="text-orange-400" />}
        helper="All time from Submissions"
        value={data?.submissions.toLocaleString()}
        loading={loading}
        className="shadow-md shadow-orange-400"
      />
      <StatsCard
        title={"Submission Rate"}
        icon={<HiCursorClick className="text-purple-600" />}
        helper="Visits that result in form submission"
        value={data?.submissionRate.toLocaleString()}
        loading={loading}
        className="shadow-md shadow-purple-600"
      />
      <StatsCard
        title={"Bounce Rate"}
        icon={<TbArrowBounce className="text-red-600" />}
        helper="Visits that leaves without interacting"
        value={data?.bounceRate.toLocaleString()}
        loading={loading}
        className="shadow-md shadow-red-600"
      />
    </div>
  );
};

export default StatsCards;

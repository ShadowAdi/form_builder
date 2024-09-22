import React, { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

interface StatsCardProps {
  title: string;
  helper: string;
  value?: string;
  loading?: boolean;
  className: string;
  icon: ReactNode;
}

const StatsCard = ({
  title,
  icon,
  helper,
  value,
  loading,
  className,
}: StatsCardProps) => {
  return (
    <Card className={className}>
      <CardHeader className="flex gap-3 flex-row items-end justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground ">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {loading && (
            <Skeleton>
              <span className="opacity-0">0</span>
            </Skeleton>
          )}
          {!loading && value}
        </div>
        <p className="text-xs to-muted-foreground">{helper}</p>
      </CardContent>
    </Card>
  );
};

export default StatsCard;

import React from "react";
import Skeleton from "@/components/Skeleton";

const LayoutFallBack: React.FC = () => {
  return (
    <div className="w-full flex flex-col gap-6">
      <Skeleton width="w-full" height="40px">
        <div className="bg-gray-200 rounded-md h-10"></div>
      </Skeleton>

      <div className="laptop:flex laptop:gap-6 desktop:gap-8 laptop:justify-between">
        {/* Placeholder for SideSection */}
        <Skeleton width="w-full laptop:w-[30%]" height="400px">
          <div className="bg-gray-200 rounded-md h-full"></div>
        </Skeleton>

        {/* Placeholder for Main Section */}
        <Skeleton width="w-full" height="90vh">
          <div className="bg-gray-200 rounded-md h-full"></div>
        </Skeleton>
      </div>
    </div>
  );
};

export default LayoutFallBack;

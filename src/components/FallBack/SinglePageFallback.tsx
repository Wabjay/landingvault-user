import React from "react";

const SinglePageFallBack: React.FC = () => {
  return (
        <div className="laptop:flex laptop:gap-6 desktop:gap-8 laptop:justify-between">
        <div
          className={`laptop:sticky laptop:top-[66px] laptop:h-inherit mb-10 laptop:mb-0 w-full laptop:max-w-[500px] laptop:pb-[100px] bigScreen:max-w-[700px] bigScreen:mr-[136px]
      `}
        >
          <div className="w-[60%] h-8 bg-gray-200 animate-pulse mb-3"></div>
          <div className="w-[90%] h-11 bg-gray-200 animate-pulse mb-6"></div>
          <div className="w-full h-[300px] bg-gray-200 animate-pulse mb-10"></div>
          <div className="w-full h-10 bg-gray-200 animate-pulse rounded-xl"></div>
        </div>
        <div
          className={` order-first w-full whitespace-nowrap border transition-all
       "border-grey-50 h-[95vh] bg-gray-200 animate-pulse"
      `}
        ></div>
      </div>
  );
};

export default SinglePageFallBack;

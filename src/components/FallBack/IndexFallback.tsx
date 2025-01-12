// SkeletonLoader.tsx

const IndexFallback: React.FC = () => {
    return (
      <div className="grid tablet:grid-cols-2 laptop:grid-cols-4 gap-5 desktop:gap-6 justify-between">

        {Array(4)  // Adjust the number of skeletons based on how many cards you want to show as placeholders
                .fill(null)
                .map((_, index) =>
      <div key={index} className="w-full max-w-[264px] flex h-[auto] hover:bg-gray-50 text-16 font-medium focus:outline-none mb-6">
        <div className="flex flex-col text-left gap-y-2 tablet:max-w-[528px]">
          {/* Skeleton Image section */}
          <div className="w-[264px] h-[278px] bg-gray-200 animate-pulse"></div>
          <div className="p-2">
            {/* Skeleton for Brand Name */}
            <div className="bg-gray-200 w-[255px] h-4 mb-2 animate-pulse"></div>
            {/* Skeleton for Additional Text */}
            <div className="bg-gray-200 w-[255px] h-4 animate-pulse"></div>
          </div>
        </div>
      </div>
                )}
                </div>
    );
  };
  
  export default IndexFallback;
  
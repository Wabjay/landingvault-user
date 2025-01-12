// SkeletonLoader.tsx

const HeroFallback: React.FC = () => {
  return (
     
      <div className="laptop:h-full flex flex-col gap-6 justify-between text-left laptop:col-span-4">
        <div
          className={`whitespace-nowrap border transition-all
       "border-grey-50 w-full h-[100%] bg-gray-200 animate-pulse"
      `}
        ></div>
        <div
          className={`whitespace-nowrap border transition-all
       "border-grey-50 w-full h-[60%] bg-gray-200 animate-pulse"
      `}
        ></div>
      </div>
  );
};

export default HeroFallback;

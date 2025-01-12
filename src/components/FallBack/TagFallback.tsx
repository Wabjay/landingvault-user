// SkeletonLoader.tsx

const TagFallback: React.FC = () => {
  return (
    <div style={{display: "-webkit-box"}} className=" overflow-scroll gap-3 py-2 scrollbar-hide w-full max-w-full no-scrollbar">
      {Array(10) // Adjust the number of skeletons based on how many cards you want to show as placeholders
        .fill(null)
        .map((_, index) => (
          <div
            key={index}
            className={`whitespace-nowrap rounded-full border transition-all border-grey-50 w-[100px] h-8 bg-gray-200 animate-pulse`}
          ></div>
        ))}
    </div>
  );
};

export default TagFallback;

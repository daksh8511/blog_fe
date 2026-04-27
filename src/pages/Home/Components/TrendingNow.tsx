import { FaArrowTrendUp } from "react-icons/fa6";

const TrendingNow = () => {
  const trendingtopic = [
    {
      id: 1,
      content: "Quantum Computing: Beyond the Hype Cycle",
      topic_related: "Tech",
      reading_duration: "6 min",
    },

    {
      id: 2,
      content: "The Psychology of Long-Form Concentration",
      topic_related: "Health",
      reading_duration: "12 min",
    },

    {
      id: 3,
      content: "Quantum Computing: Beyond the Hype Cycle",
      topic_related: "Tech",
      reading_duration: "8 min",
    },
  ];
  return (
    <div className="bg-gray-50 px-5 py-5 rounded-2xl">
      <div className="flex items-center gap-2 mb-3">
        <FaArrowTrendUp />
        <h2>Trending now</h2>
      </div>
      <div className="flex flex-col gap-4">
        {trendingtopic?.map((topic) => {
          return (
            <div className="flex gap-3 items-center">
              <h2 className="text-5xl w-[50px] font-bold text-gray-300">{topic?.id}</h2>
              <div>
                <h2 className="text-xl hover:underline cursor-pointer">{topic?.content}</h2>
                <h4 className="text-gray-400">{topic?.topic_related} - {topic?.reading_duration} read</h4>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TrendingNow;

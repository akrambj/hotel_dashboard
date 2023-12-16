import React from "react";

const Overview = () => {
  const staticCards = [
    { number: 30000, name: "Booking Operations" },
    { number: 12000, name: "Done Booking" },
    { number: 17000, name: "Satisfied Clients" },
  ];
  return (
    <div className="px-10">
      <h2 className="font-semibold">In the last 30 days,</h2>
      <div className="flex items-center gap-4 my-2">
        {staticCards.map((card, index) => (
          <div
            key={index}
            className="w-[300px] rounded-lg shadow-2xl h-[120px] staticCard flex flex-col justify-center px-5 gap-3 text-white"
          >
            <h2 className="text-3xl font-bold">{card.number}</h2>
            <h3 className="text-md font-semibold">{card.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Overview;

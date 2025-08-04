// import React from "react";
// import { useNavigate } from "react-router-dom";
// import Blinkit from "../assets/img/blinkit.svg";
// import Zepto from "../assets/img/zepto.svg";
// import Flipkart from "../assets/img/flipkartlogo.svg";

// const Channels = () => {
//   const navigate = useNavigate();
  
//   const logos = [
//     {
//       name: "Blinkit",
//       bgColor: "bg-yellow-400",
//       img: Blinkit,
//     },
//     {
//       name: "Zepto",
//       bgColor: "bg-[#3b006a]",
//       img: Zepto,
//     },
//     {
//       name: "Flipkart",
//       bgColor: "bg-white",
//       img: Flipkart,
//     },
//   ];

//   const handleChannelClick = (channelName) => {
//     navigate(`/channel/${channelName}`);
//   };

//   return (
//     <div className="min-h-screen flex flex-col gap-8 p-4 items-center justify-center">
//       {logos.map((logo, index) => (
//         <div
//           key={index}
//           onClick={() => handleChannelClick(logo.name)}
//           className={`w-80 h-32 py-10 flex items-center justify-center ${logo.bgColor} rounded shadow-md cursor-pointer hover:scale-105 transition-transform`}
//         >
//           <img src={logo.img} alt={logo.name} className="h-24 object-contain" />
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Channels;



// import React from "react";
// import { useNavigate } from "react-router-dom";
// import Blinkit from "../assets/img/blinkit.svg";
// import Zepto from "../assets/img/zepto.svg";
// import Flipkart from "../assets/img/flipkartlogo.svg";

// const Channel = () => {
//   const navigate = useNavigate();
  
//   const logos = [
//     {
//       name: "Blinkit",
//       bgColor: "bg-yellow-400",
//       img: Blinkit,
//     },
//     {
//       name: "Zepto",
//       bgColor: "bg-[#3b006a]",
//       img: Zepto,
//     },
//     {
//       name: "Flipkart",
//       bgColor: "bg-white",
//       img: Flipkart,
//     },
//   ];

//   const handleChannelClick = (channelName) => {
//     navigate(`/quick-commerce/channel/${channelName}`);
//   };

//   return (
//     <div className="min-h-screen flex flex-col gap-8 p-4 items-center justify-center">
//       {logos.map((logo, index) => (
//         <div
//           key={index}
//           onClick={() => handleChannelClick(logo.name)}
//           className={`w-80 h-32 py-10 flex items-center justify-center ${logo.bgColor} rounded shadow-md cursor-pointer hover:scale-105 transition-transform`}
//         >
//           <img src={logo.img} alt={logo.name} className="h-24 object-contain" />
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Channel;





// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Blinkit from "../assets/img/blinkit.svg";
// import Zepto from "../assets/img/zepto.svg";
// import Flipkart from "../assets/img/flipkartlogo.svg";
// import TabsNavigation from "../components/TabsNavigation";

// const Channel = () => {
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState("channelPerformance");
  
//   const logos = [
//     {
//       name: "Blinkit",
//       bgColor: "bg-yellow-400",
//       img: Blinkit,
//     },
//     {
//       name: "Zepto",
//       bgColor: "bg-[#3b006a]",
//       img: Zepto,
//     },
//     {
//       name: "Flipkart",
//       bgColor: "bg-white",
//       img: Flipkart,
//     },
//   ];

//   const handleChannelClick = (channelName) => {
//     navigate(`/quick-commerce/channel/${channelName}`);
//   };

//   const handleTabChange = (tabId) => {
//     setActiveTab(tabId);
//     if (tabId === "executive") {
//       navigate("/quick-commerce");
//     }
//   };

//   return (
//     <div className="p-6 max-w-7xl mx-auto bg-[#D4EAD9] min-h-screen">
//       <TabsNavigation activeTab={activeTab} onTabChange={handleTabChange} />
      
//       {activeTab === "channelPerformance" && (
//         <div className="min-h-screen flex flex-col gap-8 p-4 items-center justify-center">
//           <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md">
//             <h1 className="text-2xl font-bold mb-6">Channel Performance</h1>
//             <p className="text-gray-600 mb-8">
//               Select a channel to view detailed performance metrics and analytics
//             </p>
            
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               {logos.map((logo, index) => (
//                 <div
//                   key={index}
//                   onClick={() => handleChannelClick(logo.name)}
//                   className={`w-full h-32 flex items-center justify-center ${logo.bgColor} rounded-lg shadow-md cursor-pointer hover:scale-105 transition-transform`}
//                 >
//                   <img 
//                     src={logo.img} 
//                     alt={logo.name} 
//                     className="h-16 object-contain" 
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}
      
//       {activeTab === "executive" && (
//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <p>Redirecting to Executive Dashboard...</p>
//         </div>
//       )}
      
//       {activeTab === "demandSupply" && (
//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <h2 className="text-2xl font-bold mb-4">Demand & Supply</h2>
//           <p className="text-gray-500">This is a placeholder for the Demand & Supply dashboard content.</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Channel;




import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Blinkit from "../assets/img/blinkit.svg";
import Zepto from "../assets/img/zepto.svg";
import Flipkart from "../assets/img/flipkartlogo.svg";

// Reusable TabsNavigation Component
const TabsNavigation = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: "executive", label: "Executive" },
    { id: "channelPerformance", label: "Channel Performance" },
    { id: "demandSupply", label: "Demand & Supply" },
  ];

  return (
    <div className="flex border-b border-gray-200 mb-6">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === tab.id
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

const Channel = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("channelPerformance");
  
  const logos = [
    {
      name: "Blinkit",
      bgColor: "bg-yellow-400",
      img: Blinkit,
    },
    {
      name: "Zepto",
      bgColor: "bg-[#3b006a]",
      img: Zepto,
    },
    {
      name: "Flipkart",
      bgColor: "bg-white",
      img: Flipkart,
    },
  ];

  const handleChannelClick = (channelName) => {
    navigate(`/quick-commerce/channel/${channelName}`);
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    if (tabId === "executive") {
      navigate("/quick-commerce");
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto bg-[#D4EAD9]">
      {/* Added tabs navigation */}
      <TabsNavigation activeTab={activeTab} onTabChange={handleTabChange} />
      
      {/* Existing UI remains exactly the same */}
      <div className="min-h-screen flex flex-col gap-8 p-4 items-center justify-center">
        {logos.map((logo, index) => (
          <div
            key={index}
            onClick={() => handleChannelClick(logo.name)}
            className={`w-80 h-32 py-10 flex items-center justify-center ${logo.bgColor} rounded shadow-md cursor-pointer hover:scale-105 transition-transform`}
          >
            <img src={logo.img} alt={logo.name} className="h-24 object-contain" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Channel;
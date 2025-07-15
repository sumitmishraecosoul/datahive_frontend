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



import React from "react";
import { useNavigate } from "react-router-dom";
import Blinkit from "../assets/img/blinkit.svg";
import Zepto from "../assets/img/zepto.svg";
import Flipkart from "../assets/img/flipkartlogo.svg";

const Channel = () => {
  const navigate = useNavigate();
  
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

  return (
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
  );
};

export default Channel;
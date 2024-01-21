import React from "react";

const VideoModal = ({ video, onClose }) => {
  return (
   <div className="fixed inset-0 z-50 flex items-center justify-center bg-black dark:bg-opacity-80" onClick={onClose}>
   <div className="rounded-lg overflow-hidden" onClick={(e) => e.stopPropagation()}>
     <div className="relative overflow-hidden sm:w-96 md:w-screen lg:w-screen">
       <iframe
         title={video.name}
         className="w-full h-96"
         src={`https://www.youtube.com/embed/${video.key}`}
         allowFullScreen
       ></iframe>
     </div>
     {/* <h2 className="text-xl font-semibold mt-4">{video.name}</h2> */}
     <p className="text-gray-600 mt-2">{video.description}</p>
   </div>
 </div>
  );
};

export default VideoModal;

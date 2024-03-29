import React, { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa6";

const VideoList = ({ videos }) => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  console.log(videos);
  console.log(selectedVideo);
  const openVideoModal = (video) => {
    setSelectedVideo(video);
  };

  const closeVideoModal = () => {
    setSelectedVideo(null);
  };
  // const selectedVideos =
  //   videos && videos.length > 0 ? videos[1] || videos[2] : null;
  const trailerVideo = videos.find((video) => video.type === "Trailer");

  const selectedVideos = trailerVideo ? trailerVideo : videos.slice(0, 1);

  return (
    <div>
      {selectedVideos && (
        <div key={selectedVideos.id} className="mt-1 mb-1 ">
          {/* <h3 className="text-lg font-semibold">{selectedVideos?.name}</h3> */}
          <button
            onClick={() => openVideoModal(selectedVideos)}
            className="bg-red-800 text-white px-2 py-1.5 rounded flex items-center"
          >
            <FaPlay className="mr-1" />
            Watch Trailer
          </button>
        </div>
      )}

      {selectedVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black dark:bg-opacity-80"
          onClick={closeVideoModal}
        >
          <div
            className="rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative overflow-hidden sm:w-96 md:w-screen lg:w-screen">
              <iframe
                title={selectedVideos.name}
                className="w-full h-96"
                src={`https://www.youtube.com/embed/${selectedVideos.key}`}
                allowFullScreen
              ></iframe>
            </div>
            {/* <h2 className="text-xl font-semibold mt-4">{video.name}</h2> */}
            <p className="text-gray-600 mt-2">{selectedVideos.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoList;

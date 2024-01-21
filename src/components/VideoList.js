import React, { useState } from "react";
import VideoModal from "./VideoModal";
const VideoList = ({ videos }) => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  const openVideoModal = (video) => {
    setSelectedVideo(video);
  };

  const closeVideoModal = () => {
    setSelectedVideo(null);
  };
  const selectedVideos =
    videos && videos.length > 0 ? videos[0] || videos[1] : null;
  return (
    <div>
      {selectedVideos && (
        <div key={selectedVideos.id} className="mt-1 mb-1 ">
          {/* <h3 className="text-lg font-semibold">{selectedVideos?.name}</h3> */}
          <button
            onClick={() => openVideoModal(selectedVideos)}
            className="bg-red-800 text-white px-2 py-1.5 rounded">
            Watch Trailer
          </button>
      
        </div>
      )}

      {selectedVideo && (
        <VideoModal video={selectedVideo} onClose={closeVideoModal} />
      )}
    </div>
  );
};

export default VideoList;

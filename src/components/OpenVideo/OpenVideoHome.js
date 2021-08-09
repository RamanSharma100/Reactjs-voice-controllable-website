import React from "react";
import "./openVideoHome.scss";

const OpenVideoHome = ({ setOpenVideoHome, selectedVideos }) => {
  return (
    <div className="col-md-12 position-fixed d-flex align-items-center justify-content-center top-0 left-0 w-100 h-100 openVideoHome">
      <div className="w-50 h-auto bg-white rounded shadow">
        <div className="openVideoHomeHeader d-flex align-items-center justify-content-between w-100 py-3 px-5 border-bottom">
          <p className="h3">Select Video</p>
          <i
            className="fas fa-times"
            style={{ cursor: "pointer" }}
            onClick={() => setOpenVideoHome(false)}
          ></i>
        </div>
        <div className="d-flex w-100 gap-2 align-items-center justify-content-center py-3">
          {selectedVideos &&
            selectedVideos.map((video, index) => (
              <div
                key={index + 9516478}
                className="border col-md-5 px-0 mx-auto rounded"
              >
                {console.log(video)}
                <p className="w-100 text-center py-1 bg-dark mb-2 text-white">
                  {video.from}
                </p>
                <img
                  width="100%"
                  src={video.video.snippet.thumbnails.default.url}
                  alt=""
                />
                <hr />
                <p className="lead small px-5 font-weight-normal text-center py-1">
                  {index + 1}. {video.video.snippet.title}
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default OpenVideoHome;

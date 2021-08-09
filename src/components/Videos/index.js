import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import "./index.scss";

const Videos = ({ start, end, nextPage, prevPage, countPages }) => {
  const { videosLoading, videos } = useSelector(
    (state) => ({
      videosLoading: state.videos.videosLoading,
      videos: state.videos.videos,
    }),
    shallowEqual
  );

  return (
    <div className="container-fluid">
      <h1 className="display-3 text-center my-4">
        Videos - Page {countPages} of {Math.ceil(videos.length / 12)}
      </h1>
      <div className="row py-5 px-4 justify-content-center">
        {videosLoading ? (
          <div className="col-md-12">
            <h1 className="display-1 my-5 text-center">Loading videos...</h1>
          </div>
        ) : (
          <>
            {videos.slice(start, end).map((video, index) => (
              <div
                className="card px-0 col-md-4 me-1 mb-3"
                key={index + 295648}
              >
                <img
                  className="card-img-top"
                  src={video.snippet.thumbnails.high.url}
                  alt={video.snippet.title}
                  height={video.snippet.thumbnails.high.height}
                />
                <div className="card-body">
                  <h5 className="card-title text-justify">
                    {video.snippet.title}
                  </h5>
                  <p className="card-text text-justify">
                    {video.snippet.description}
                  </p>
                </div>
                <div className="card-footer bg-white">
                  <Link
                    to={`/video/${video.id.videoId}`}
                    className="btn btn-primary btn-block"
                  >
                    <i className="fa fa-eye"></i> See Video
                  </Link>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
      <div className="row my-5 px-4 align-items-center justify-content-around">
        <button
          type="button"
          className="btn btn-primary"
          disabled={start === 0}
          onClick={() => prevPage()}
        >
          <i className="fas fa-angle-left"></i> Prev Page
        </button>
        <button
          type="button"
          className="btn btn-primary"
          disabled={videos.length - (end + 1) < 0}
          onClick={() => nextPage()}
        >
          Next Page <i className="fas fa-angle-right"></i>
        </button>
      </div>
    </div>
  );
};

export default Videos;

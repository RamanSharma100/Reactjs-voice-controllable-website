import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Home = () => {
  const { videosLoading, videos, popularVideos } = useSelector(
    (state) => ({
      videosLoading: state.videos.videosLoading,
      videos: state.videos.videos,
      popularVideos: state.videos.popularVideos,
    }),
    shallowEqual
  );

  return (
    <div className="container-fluid">
      <div className="row m-5">
        <div className="col-md-5 mx-auto overflow-hidden">
          <h1 className="display-4 border-bottom pb-3 mb-3 text-center">
            Uploads
          </h1>
          <div className="videos">
            {videosLoading
              ? "Loading..."
              : videos.slice(0, 5).map((video, id) => (
                  <div className="card mb-3" key={id}>
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
          </div>
        </div>
        <div className="col-md-5 overflow-hidden mx-auto">
          <h1 className="display-4 border-bottom pb-3 mb-3 text-center">
            Popular Uploads
          </h1>
          <div className="videos">
            {videosLoading
              ? "Loading..."
              : popularVideos.slice(0, 5).map((video, id) => (
                  <div className="card mb-3" key={id}>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

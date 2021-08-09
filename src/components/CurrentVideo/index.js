import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { addVideoDetail } from "../../redux/actionCreators/videoDetailActionCreator";

const CurrentVideo = () => {
  const { id } = useParams();
  const {
    videoDeatilLoading,
    videoDetail,
    videosAll,
    videosLoading,
  } = useSelector((state) => ({
    videoDeatilLoading: state.videoDetail.videoDetailLoading,
    videoDetail: state.videoDetail.video,
    videosAll: state.videos.videos,
    videosLoading: state.videos.videosLoading,
  }));

  const videos = videosAll.filter((video) => video.id.videoId !== id && video);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addVideoDetail(id));
  }, [dispatch, id]);

  return (
    <div className="container-fluid">
      <div className="row m-5">
        <div className="col-md-8 mx-auto">
          {videoDeatilLoading ? (
            "Loading"
          ) : (
            <>
              <div className="card mb-3">
                <iframe
                  frameBorder="0"
                  height="480"
                  src={`https://www.youtube.com/embed/${id}`}
                  allowfullScreen
                ></iframe>
                <div className="card-body px-5">
                  <div className="d-flex w-100 align-items-center justify-content-between">
                    <p>{videoDetail.items[0].statistics.viewCount} Views</p>
                    <div className="d-flex">
                      <p className="mr-3">
                        <i className="fa fa-thumbs-up"></i>{" "}
                        {videoDetail.items[0].statistics.likeCount}
                      </p>
                      <p>
                        <i className="fa fa-thumbs-down"></i>{" "}
                        {videoDetail.items[0].statistics.dislikeCount}
                      </p>
                    </div>
                  </div>
                  <h5 className="card-title py-2">
                    {videoDetail.items[0].snippet.title}
                  </h5>
                  <p className="card-text py-2">
                    {videoDetail.items[0].snippet.description}
                  </p>
                  <p className="comments">
                    {videoDetail.items[0].statistics.commentCount} Comments
                  </p>
                </div>
                <div className="card-footer d-flex flex-wrap text-justify px-5 bg-white border-0">
                  {videoDetail.items[0].snippet.tags.map((tag, id) => (
                    <p
                      className="bg-secondary py-1 px-2 mr-2 text-white"
                      key={id + 456}
                    >
                      {tag}
                    </p>
                  ))}
                </div>
              </div>
              <div className="d-flex flex-wrap">
                {videosLoading
                  ? "Loading"
                  : videos.slice(9, videos.length).map((video, id) => (
                      <div className="card col-md-6 px-0 mb-3" key={id + 250}>
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
            </>
          )}
        </div>
        <div className="col-md-4 mx-auto">
          {videosLoading
            ? "Loading"
            : videos.slice(0, 9).map((video, id) => (
                <div className="card mb-3" key={id + 250}>
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
  );
};

export default CurrentVideo;

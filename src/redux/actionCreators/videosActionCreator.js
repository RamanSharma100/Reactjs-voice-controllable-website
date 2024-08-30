import axios from 'axios';

const setVideos = (data) => ({
  type: 'SET_VIDEOS',
  payload: data,
});
const setVideosLoading = (data) => ({
  type: 'SET_VIDEOS_LOADING',
  payload: data,
});
const setPopularUploads = (data) => ({
  type: 'SET_POPULAR_VIDEOS',
  payload: data,
});

export const addVideos = () => (dispatch) => {
  dispatch(setVideosLoading(true));
  axios
    .get(import.meta.env.VITE_APP_Youtube_API, {
      params: {
        channelId: 'UC3XkkDSSGqaBPimn22vCHDg',
        order: 'date',
        part: 'snippet',
        type: 'video',
        maxResults: 25,
        key: import.meta.env.VITE_APP_Youtube_API_Key,
      },
    })
    .then((res) => {
      dispatch(setVideos(res.data));
      dispatch(addPopularVideos());
    })
    .catch((err) => {
      console.log(err.message);
      dispatch(setVideosLoading(false));
    });
};
export const addPopularVideos = () => (dispatch) => {
  axios
    .get(import.meta.env.VITE_APP_Youtube_API, {
      params: {
        channelId: 'UC3XkkDSSGqaBPimn22vCHDg',
        order: 'viewCount',
        part: 'snippet',
        type: 'video',
        maxResults: 25,
        key: import.meta.env.VITE_APP_Youtube_API_Key,
      },
    })
    .then((res) => {
      dispatch(setPopularUploads(res.data));
      dispatch(setVideosLoading(false));
    })
    .catch((err) => {
      console.log(err.message);
      dispatch(setVideosLoading(false));
    });
};
